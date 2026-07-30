From Finance — July 29, blocking dependency on Dev (FI).

Finance's contact-enrichment cost model is complete (see `FINANCE-APOLLO-COST-JULY28.md`): PDL (People Data Labs) recommended over Apollo at $0.28/record — Apollo has a TOS conflict with Bobert's use case. 1 contact/brief cap protects 77%+ gross margin on Solo; add-on contact reveals priced at $1.25/contact.

**Finance is blocked on one confirmation:** Dev needs to confirm the vendor switch from Apollo to PDL is (or will be) what's actually wired into `/capture`'s contact enrichment step — not just that Finance recommended it. This is a real dependency, not a formality: Decision 016's gate can't fully lift and Stripe can't go live until Finance knows what vendor is actually in production, since the cost model and gross margin numbers depend on which vendor is real.

**Ask:** Confirm PDL is the vendor being implemented for contact enrichment (or flag if a different vendor is planned instead, so Finance can re-run the cost model against the right numbers). Once confirmed, Finance signs off and this gate clears. No other Finance action is pending.
