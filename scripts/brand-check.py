#!/usr/bin/env python3
"""
Bobert Brand Compliance Check
=============================
Turns ASSET-NOTICE.md from advice into a pass/fail gate.

Usage:
    python3 scripts/brand-check.py            # check repo
    python3 scripts/brand-check.py --strict   # warnings also fail

Exit codes:  0 = pass   1 = violations found

Every rule here maps to a locked DECISION. If a check fails, the fix is to
change the code — not the check. Changing a threshold requires amending the
DECISION it enforces.
"""
import os, re, sys, glob, hashlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STRICT = "--strict" in sys.argv

APPROVED_PALETTE = {
    "#1A1A1A": "Primary Black",
    "#DC2626": "Bobert Red",
    "#FFFFFF": "White",
    "#6B7280": "Mid Gray",
    "#F0F0F0": "Light Gray",
    "#1F2937": "Graphite (reserve)",
    "#D01E1E": "In-app accent red (UI only, never in logo)",
}
WORDMARKS = ("bobert-wordmark-white.png", "bobert-wordmark-dark.png")
MARKS = ("bobert-mark-white.png", "bobert-mark-dark.png")

errors, warnings = [], []
def err(rule, f, msg): errors.append((rule, f, msg))
def warn(rule, f, msg): warnings.append((rule, f, msg))


def html_files():
    out = []
    for p in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True):
        if "node_modules" in p or "/.git/" in p:
            continue
        out.append(p)
    return sorted(out)


def check_html(path):
    rel = os.path.relpath(path, ROOT)
    src = open(path, encoding="utf-8", errors="ignore").read()
    # strip script/style/title/meta so they don't count as rendered brand text
    body = re.sub(r"<script\b.*?</script>|<style\b.*?</style>|<title\b.*?</title>|<meta[^>]*>",
                  "", src, flags=re.S | re.I)

    # RULE 1 (DECISION 011) - wordmark must be an image, never typed text.
    has_wordmark_img = any(w in src for w in WORDMARKS)
    typed = [m.start() for m in re.finditer(r">\s*Bobert\s*<", body)]
    if typed and not has_wordmark_img:
        err("R1/D011", rel,
            f"{len(typed)} typed 'Bobert' text node(s) and NO approved wordmark image "
            f"anywhere on the page. Use assets/bobert-wordmark-white.png.")
    elif typed and has_wordmark_img:
        warn("R1/D011", rel,
             f"{len(typed)} typed 'Bobert' text node(s) alongside the wordmark image. "
             f"Confirm these are app-mockup UI, not brand chrome.")

    # RULE 1b (ASSET-NOTICE) - brand chrome must use an approved asset.
    for m in re.finditer(r'<(?:div|a)[^>]*class="[^"]*\b(?:logo|nav-brand|footer-brand)\b[^"]*"[^>]*>(.{0,400}?)</(?:div|a)>',
                         body, re.S | re.I):
        block = m.group(1)
        img = re.search(r'<img[^>]+src="([^"]+)"', block, re.I)
        if not img:
            if re.search(r"\bBobert\b", block):
                err("R1b/D011", rel, "Brand chrome renders 'Bobert' as text with no image.")
            continue
        srcv = os.path.basename(img.group(1))
        if srcv not in WORDMARKS + MARKS:
            err("R1b/D011", rel,
                f"Brand chrome uses '{srcv}' — not an approved wordmark/mark. "
                f"Approved: {', '.join(WORDMARKS + MARKS)}. "
                f"(icon.png/splash are app-store assets, not page logos.)")

    # RULE 2 (DECISION 010/011) - no filter or blend on logo imagery.
    for m in re.finditer(r"<img[^>]+>", src, re.I):
        tag = m.group(0)
        if re.search(r"bobert-(wordmark|mark)", tag):
            if re.search(r"filter\s*:", tag, re.I) or re.search(r"mix-blend-mode\s*:", tag, re.I):
                err("R2/D011", rel,
                    "CSS filter/blend applied inline to a logo image. "
                    "Filters destroy the red corner. Pick the correct variant instead.")
    for m in re.finditer(r"\.(nav|footer)-logo-mark[^{]*\{([^}]*)\}", src, re.I):
        if re.search(r"(filter|mix-blend-mode)\s*:\s*(?!none)", m.group(2), re.I):
            err("R2/D011", rel,
                "CSS filter/blend on logo class rule. Prohibited by DECISION 011.")

    # RULE 3 - every public page declares a favicon.
    if not re.search(r'rel=["\']?[^"\'>]*icon', src, re.I):
        err("R3", rel, "No <link rel=\"icon\"> declared.")

    # RULE 4 (DECISION 009) - palette discipline.
    # Neutrals and shades are permitted for UI depth; this reports drift, it does
    # not police every gradient. Saturated non-brand hues are the real signal.
    off = set(h.upper() for h in re.findall(r"#[0-9a-fA-F]{6}", src)) - set(APPROVED_PALETTE)
    def saturated(h):
        r, g, b = int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16)
        return max(r, g, b) - min(r, g, b) > 40
    loud = sorted(h for h in off if saturated(h))
    if loud:
        warn("R4/D009", rel,
             f"{len(loud)} saturated off-palette color(s): {', '.join(loud)}. "
             f"Confirm intentional; DECISION 009 locks the palette.")
    quiet = len(off) - len(loud)
    if quiet:
        warn("R4/D009", rel, f"{quiet} off-palette neutral shade(s) — likely UI depth, review if unexpected.")

    # RULE 5 (DECISION 009) - logo red is exactly #DC2626.
    if "#D01E1E" in src:
        ctx = [l for l in src.splitlines() if "#D01E1E" in l]
        for line in ctx:
            if re.search(r"logo|mark|wordmark|brand", line, re.I):
                err("R5/D009", rel,
                    "In-app accent red #D01E1E used in logo/brand context. "
                    "Logo red is always #DC2626.")


def check_assets():
    try:
        from PIL import Image
    except ImportError:
        warn("ASSETS", "-", "Pillow not installed; asset checks skipped. "
                            "pip3 install Pillow --break-system-packages")
        return
    A = os.path.join(ROOT, "assets")

    def load(name):
        p = os.path.join(A, name)
        return Image.open(p).convert("RGBA") if os.path.exists(p) else None

    # RULE 6 (DECISION 011) - wordmarks and marks must be transparent.
    for name in WORDMARKS + MARKS:
        im = load(name)
        if im is None:
            err("R6/D011", f"assets/{name}", "Approved asset missing.")
            continue
        if im.getchannel("A").getextrema()[0] != 0:
            err("R6/D011", f"assets/{name}",
                "No fully-transparent pixels — asset has a solid background.")

    # RULE 7 (DECISION 010) - red corner present in every mark/wordmark.
    for name in WORDMARKS + MARKS:
        im = load(name)
        if im is None:
            continue
        red = sum(1 for r, g, b, a in im.getdata()
                  if a > 200 and r > 170 and g < 95 and b < 95)
        if red == 0:
            err("R7/D010", f"assets/{name}",
                "Zero red pixels — the red corner is missing.")

    # RULE 8 (DECISION 012) - adaptive icon transparent + inside safe zone.
    ad = load("adaptive-icon.png")
    if ad is None:
        err("R8/D012", "assets/adaptive-icon.png", "Missing.")
    else:
        if ad.getchannel("A").getextrema()[0] != 0:
            err("R8/D012", "assets/adaptive-icon.png",
                "Not transparent. Android foreground layers must have alpha.")
        bb = ad.getbbox()
        if bb:
            span = max(bb[2] - bb[0], bb[3] - bb[1]) / ad.size[0]
            if span > 0.433:
                err("R8/D012", "assets/adaptive-icon.png",
                    f"Content spans {span*100:.1f}% of canvas; max is 43.2%. "
                    f"Corners will be clipped by circular masks.")

    # RULE 9 (DECISION 012) - no generating from the drifted-red source.
    wm = load("bobert-mark-white.png")
    if wm:
        reds = {(r, g, b) for r, g, b, a in wm.getdata()
                if a > 200 and r > 170 and g < 95 and b < 95}
        if reds and (220, 38, 38) not in reds:
            warn("R9/D012", "assets/bobert-mark-white.png",
                 f"Red drift: {sorted(reds)[:1]} is not #DC2626. "
                 f"Do not use this file as a generation source.")

    # RULE 10 - adaptive-icon must not be a copy of the app icon.
    def md5(n):
        p = os.path.join(A, n)
        return hashlib.md5(open(p, "rb").read()).hexdigest() if os.path.exists(p) else None
    if md5("adaptive-icon.png") and md5("adaptive-icon.png") == md5("icon.png"):
        err("R10/D012", "assets/adaptive-icon.png",
            "Byte-identical to icon.png — it is a renamed copy, not a foreground layer.")


def main():
    for f in html_files():
        check_html(f)
    check_assets()

    print("\nBobert Brand Compliance Check")
    print("=" * 60)
    if errors:
        print(f"\n  {len(errors)} VIOLATION(S)\n")
        for rule, f, m in errors:
            print(f"  [{rule}]  {f}\n      {m}\n")
    if warnings:
        print(f"\n  {len(warnings)} warning(s)\n")
        for rule, f, m in warnings:
            print(f"  [{rule}]  {f}\n      {m}\n")
    if not errors and not warnings:
        print("\n  PASS — no violations.\n")
    elif not errors:
        print("\n  PASS (with warnings).\n")

    print("=" * 60)
    fail = bool(errors) or (STRICT and bool(warnings))
    print("RESULT:", "FAIL" if fail else "PASS", "\n")
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
