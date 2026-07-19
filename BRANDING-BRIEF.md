# Bobert.ai Landing Page — Branding Update Brief

## File to Edit
`bobert-landing/index.html`
This is a single self-contained HTML file. All colors, fonts, logo, and copy are inline — no external stylesheets.

---

## What We Need Updated

The current landing page uses placeholder branding. Please update it to match the approved Bobert visual identity established by marketing. Specifically:

### 1. Logo / B-Mark
- The current page uses a plain red square with a white "B" as a placeholder
- Replace with the approved Bobert logomark / wordmark
- Source files: `Bobert_Approved_Logo_Source_Images.zip` (in this repo)
- The logo should appear in: the top nav, the phone mockup screen, and the footer

### 2. Color Palette (DECISION 009)
Current CSS variables to update:
```
--red:     #DC2626   ← update to approved brand red if different
--black:   #0A0A0A   ← update if brand background color differs
--surface: #141414   ← secondary background
--card:    #1A1A1A   ← card/panel background
```
The in-app accent red is `#D01E1E`. The hero/brand red is `#DC2626`.
Confirm both values against the approved palette and adjust.

### 3. Typography
- Current font: **Inter** (Google Fonts)
- If the brand uses a different typeface, swap the Google Fonts import and update `font-family` in the `body` rule
- Heading weights are 800–900; body is 400–500

### 4. Tagline
Approved tagline — do not change:
> **See what *others* drive past.**
- "others" should always appear in the brand red (`#DC2626` or approved equivalent)
- This appears in the hero `<h1>` and in the phone mockup `.app-tagline`

### 5. App Name
- Always **Bobert** — one word, capital B, no tagline suffix in the logo lockup

### 6. Phone Mockup
- The mockup is built in pure HTML/CSS (no image)
- Update the B-mark inside `.app-b` to match the approved icon if possible
- Or replace the entire mockup with a real app screenshot by swapping it for an `<img>` tag

---

## What NOT to Change
- Page structure and section order
- Copy / messaging (headlines, feature descriptions, CTA text)
- The YouTube video embed
- The email signup form behavior
- Meta tags and SEO content

---

## How to Push Changes
Once edits are made, commit and push:
```bash
cd ~/Desktop/cbmc-field-leads/bobert-landing
git add index.html
git commit -m "brand: apply approved Bobert visual identity"
git push
```
GitHub Pages will rebuild automatically within 60 seconds.

Live URL: **https://robthomsonstartup-ops.github.io/bobert-ai**
Custom domain (pending): **bobert.ai**
