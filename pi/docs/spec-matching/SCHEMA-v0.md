# Normalized Fixture Spec Schema (v0)

Built from two real cut sheets, both outdoor area/site pole fixtures, so
they're directly comparable:

- LSI Mirada Medium (MRM) — https://lsicorp.com/lighting/wp-content/uploads/sites/2/documents/products/MRM-Specsheet-061325.pdf
- Hubbell/Current Viper Silicone Strike (VP-SS) — https://cdn.currentlighting.com/site/specsheet/BEA_VIPERSPEC_Micro_Strike_Silicone_Strike.pdf

## The schema

Every field below is present, in some form, on both cut sheets — which is
why these two make a good first test pair.

| Field | LSI MRM source | Hubbell VP-SS source |
|---|---|---|
| `manufacturer` | "LSI Industries" | "Current Lighting / Hubbell" |
| `series` | "Mirada Medium (MRM)" | "Viper (VP)" |
| `catalog_number` | e.g. `MRM-LED-30L-SIL-3-40-70CRI` | e.g. `VP-SS-3-120L-230-4K7-3-UNV-ASQU-BLT` |
| `lumen_package_nominal` | e.g. 30,000 lm (from `30L`) | e.g. 36,000 lm (from `120L-230`) |
| `lumen_package_delivered` | actual tested lumens, varies by distribution/CCT — e.g. 32,656 for `30L-SIL-3-40-70CRI` | not in this sheet; separate "Lumens Data PDF" referenced |
| `wattage_nominal` | e.g. 213W (from `30L`) | e.g. 230W (from `120L-230`) |
| `efficacy_lpw` | given per config, e.g. 141 LPW | derivable (lumens/watts); not printed directly per SKU here |
| `cct_kelvin` | from CCT code (`50`,`40`,`35`,`30`,`27`) | from CCT/CRI combined code (`4K7`,`5K8`, etc.) |
| `cri` | from CRI code (`70CRI`/`80CRI`) | packed into same token as CCT (`4K7` = 4000K/70CRI) |
| `distribution_code` | `2,3,4,5W,FT,FTA,AM,LC,RC` | `2,3,4W,4F,5QM,5QW,LCC,RCC` — **different vocabulary, see problem below** |
| `ies_type` | printed explicitly per SKU in photometric report, e.g. "Type II - Short" | **not printed in this consolidated sheet** — would need the per-SKU photometric/IES file |
| `bug_rating` | printed, e.g. `B4-U0-G3` | not in this sheet |
| `voltage` | `UNV` (120-277V) or `HV` (347-480V) | `UNV`, or explicit `120/208/240/277/347/480` |
| `dimming_protocol` | 0-10V standard; wireless mesh options (AirLink) | 0-10V standard; NX/LightGRID+ wireless options |
| `mounting_type` | pole arm (B3 drill pattern), wall, slipfitter, tenon | arm/universal/adjustable/decorative/knuckle/trunnion/wall — more mounting variety |
| `ip_rating` | IP66 | IP65 (Micro Strike) or IP66 (Silicone Strike) |
| `impact_rating` | IK10 | IK10 (Silicone Strike only) |
| `certifications` | UL1598, UL8750, DLC, DarkSky, Title 24, RoHS, Buy American | UL1598, CSA, DLC, Buy American/Trade Agreements Act |
| `vibration_rating` | 3G (ANSI C136.31) | 1.5G (ANSI C136.31) — **not equivalent, real spec difference** |
| `weight_lbs` | 30 lbs (base) | 13.7–30.8 lbs depending on size (1–4) |
| `warranty_years` | 5 | 5 |

## The core unsolved problem: distribution codes don't share a vocabulary

This is the thing that will make or break automated matching, and these
two sheets prove it immediately:

- LSI's own codes (`FT`, `FTA`, `AM`, `LC`, `RC`) aren't IES-standard terms
  — they're LSI's naming for specific photometric shapes, and the sheet
  separately states each one's true IES Type/BUG rating in the
  photometric section (e.g. their "`FTA`" distribution turns out to be
  "Type VS - Short").
- Hubbell's Viper sheet doesn't print IES Type/BUG ratings in this
  consolidated document at all — those live in per-SKU photometric
  reports we don't have yet.
- So `LSI FTA` and `Hubbell 4F` **cannot be compared directly by code** —
  the only valid comparison point is the true IES Type + BUG rating,
  which requires either (a) the per-SKU photometric report, or (b) a
  manufacturer-specific lookup table mapping their proprietary codes to
  true IES Type (LSI's sheet gives us this for free; Hubbell's doesn't,
  here).

**Practical implication:** distribution matching is the hardest field in
this schema, not the easiest. Lumens/wattage/CCT/voltage are all
straightforward numeric or coded comparisons. Distribution needs either
real photometric data per candidate SKU, or accepting a lower-confidence
match on that one field while scoring the rest normally.

## Worked example — do these two actually match?

**Specified:** LSI `MRM-LED-30L-SIL-3-40-70CRI` — Type 3, 4000K, 70CRI,
30L nominal package, 32,656 delivered lumens, 213W nominal, 141 LPW,
IP66, IK10, 3G vibration, UL1598/DLC/Buy American.

**Candidate alternate:** Hubbell `VP-SS-3-120L-230-4K7-3-UNV-ASQU-BLT` —
Type 3 (Silicone Strike code `3`), 4000K/70CRI (`4K7`), 120L-230 platform
(36,000 lm nominal / 230W), Size 3, IP66, IK10, UL1598/DLC/Buy American.

| Field | Specified | Alternate | Within tolerance? |
|---|---|---|---|
| Distribution | Type 3 (LSI code `3`) | Type 3 (Hubbell code `3`) | Match on code — but see caveat above, not independently verified via IES Type |
| Lumens | 32,656 delivered | 36,000 nominal | +10.2% — borderline depending on tolerance band chosen |
| Wattage | 213W | 230W | +8.0% — within a typical ±10% band |
| CCT | 4000K | 4000K | Exact |
| CRI | 70 | 70 | Exact |
| Voltage | UNV | UNV | Exact |
| IP rating | IP66 | IP66 | Exact |
| Impact rating | IK10 | IK10 | Exact |
| Vibration rating | 3G | 1.5G | **Does not meet spec** — real disqualifying difference if the project has a vibration requirement (bridges/overpasses/high-traffic areas) |

**Conclusion:** this pair is a plausible alternate on lumens/wattage/CCT/
voltage/IP/impact, borderline on lumens, and would fail outright on
vibration rating if the specified application requires 3G. This is
exactly the kind of thing a human has to catch — an automated match on
the numeric fields alone would have missed the vibration-rating problem
entirely, which is why every match needs to surface *which* fields it
checked and which it couldn't verify, not just a pass/fail score.

## Recommended matching approach

1. **Hard-disqualifying fields** (no tolerance, must match or fail):
   voltage family, dimming protocol compatibility, IP rating (alternate
   must meet or exceed), mounting compatibility, listed certifications
   required by spec (UL/DLC/etc.), and any explicitly-called-out rating
   like vibration or impact when the project has that requirement.
2. **Tolerance-band fields** (numeric, ± some percentage): wattage,
   lumens, weight/EPA if pole loading matters.
3. **Exact-or-documented-substitute fields**: CCT (exact, or explicitly
   approved adjacent bin), CRI (meet or exceed).
4. **Needs-verification fields** (can't be confidently auto-scored from
   the consolidated cut sheet alone): true IES Type/BUG rating, actual
   photometric performance at the specified mounting height/spacing.
   These should always land in "review," never auto-approved.

## Next step

Encode each manufacturer's ordering-guide grammar as a small lookup
table/decoder — LSI's and Hubbell's are both fully spelled out on their
cut sheets (see `manufacturer-nomenclature/` once built), so this is a
one-time investment per manufacturer, not per-project work. Start with
these two since we already have real sheets and a real worked example.
