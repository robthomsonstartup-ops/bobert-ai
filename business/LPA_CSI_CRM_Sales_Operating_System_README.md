# LPA CSI CRM / Sales Operating System — README

## Purpose
This folder contains the working design, research, decisions, and operating rules for building the LPA CSI sales operating system.

Immediate objective: build a high quality national account pipeline and make the CRM useful as a sales operating system, not simply a database.

HubSpot is the current CRM, but not the permanent architecture. Information must remain portable to another CRM, Excel, CSV, NetSuite, an internal system, or a future custom platform.

## Core Architecture

**Market / Field Intelligence**
→ finds and structures useful information

**LPA CSI Sales Operating System**
→ decides what to do with the information

**CRM / ERP**
→ stores the durable relationship, activity, opportunity, quote, order, revenue, and margin record

Conceptually:

Company discovered → Fit → Priority → Timing → Growth / construction signal → Reason to contact → Target contact → Outreach → Working relationship → Opportunity → Quote → Order → Revenue / margin

Do not build a full custom CRM until Bobert, HubSpot, NetSuite, and the actual sales workflow have been mapped together.

## LPA CSI Target Account Philosophy

Prioritize scalable, repeatable lighting revenue.

Highest priority:
- National / global chains
- Retail
- Restaurants
- Automotive
- Hospitality
- Healthcare
- Fitness
- Service businesses
- Franchise organizations / large franchisees
- National developers / owners
- National / regional GCs
- Multi site construction / design build firms
- Distribution / logistics / warehouses / 3PL / cold storage
- Data centers / mission critical
- Industrial / manufacturing

Key question:

**If LPA CSI wins this relationship, how many additional lighting opportunities could realistically come from it?**

Favor many opportunities over one off projects.

Distribution and data centers deserve deliberate attention.

## Account Qualification

Do not rate an account highly simply because it is large.

Look for:
- New locations
- New markets
- Expansion
- Acquisitions
- New construction
- Major renovations
- Store / restaurant rollouts
- Distribution center expansion
- Data center campuses
- Manufacturing expansion
- Multi year development pipelines
- Multiple simultaneous projects
- National construction programs
- Repeat customers
- Standardized building / store designs
- Centralized procurement
- Lighting / controls requirements
- Ability to influence specifications

## Priority Structure

### A — ATTACK NOW
Strong LPA CSI fit + scalable opportunity + evidence of current activity / growth.

### B — DEVELOP
Strategic fit is good, but additional research, contacts, relationship development, or timing information is needed.

### C — HOLD / REMOVE FROM WORKING LIST
Poor fit, one off opportunity, duplicate, outdated / legacy relationship, local only company, or insufficient strategic value.

Do not delete HubSpot records unless explicitly requested. Prefer Active / Hold / Archived type status.

## Research Model

Research **growth and construction signals**, not simply company size.

Ask:

**Which companies are actively adding locations, entering markets, remodeling, franchising, developing standardized locations, or otherwise creating repeatable construction opportunities?**

Research:
- New location announcements
- Development pipelines
- Leases
- Permits
- Construction projects
- Franchise agreements
- Remodel programs
- New market entries
- Development partners
- Standardized prototypes
- Public filings
- Company announcements
- Industry publications
- Local development news
- Project databases / public records

Separate:

**Growth Evidence**
- New location count
- Development targets
- Expansion rate
- New markets
- Franchise growth

**Construction / Lighting Evidence**
- Active construction
- Ground up projects
- Remodels
- Lighting specifications
- Electrical scope
- Controls
- Photometrics
- Fixture packages
- Prototype / design standards
- Procurement activity

The goal is to know WHY an account is attractive, not merely assign a score.

## Contact Strategy

For priority accounts identify:
- VP / Director of Construction
- Construction
- Development
- Procurement / Purchasing
- Preconstruction / Estimating
- Facilities / Operations
- Real Estate
- Design / Architecture
- Electrical / Lighting
- National Accounts
- Franchise Development

Never invent contacts or email addresses.

## Outreach Philosophy

Emails should be short, direct, genuine, professional, conversational, specific, and not AI sounding.

Avoid unnecessary corporate language, sales pressure, and generic introductions when a real trigger exists.

The objective is usually to get to the right person or start a useful conversation.

Example philosophy:

Instead of saying a company is attractive because it is large, use a real trigger such as rapid store growth and ask what is working and what is not on the lighting side as they scale.

## CRM Architecture

The CRM should reinforce:

**COMPANY**
→ Is this worth pursuing?

**CONTACT**
→ Who can actually move this?

**REASON**
→ Why contact them now?

**ACTIVITY**
→ What happened?

**NEXT ACTION**
→ What happens next, and when?

**OPPORTUNITY**
→ Is there actual revenue attached?

HubSpot should be the system that remembers what has already been thought and done, not the system that forces unnecessary administrative work.

## Core Company Information

Every active account should eventually have:
- Company
- Website
- Location
- Account type
- Market / vertical
- National / multi site status
- Growth indicators
- Construction activity
- Lighting opportunity
- Existing contacts
- Key decision makers
- Priority
- Next action
- Outreach status

Avoid duplicate properties that answer the same question under different names.

Specifically review whether Priority, Lead Status, Account Classification, Lifecycle Stage, Timing, Market Signal Score, and Outreach Status overlap. Simplify where possible.

## Operational Views

Views should tell Rob what to do next.

Recommended starting concepts:
- A — Attack Now
- B — Develop
- C — Hold
- My Active Accounts
- Accounts Needing Research
- Accounts With No Contact
- Contacts Ready to Reach Out
- Follow Up Due
- No Activity / Stale
- Active Opportunities
- Customers / Expansion
- CBMC Legacy

Do not create or change views until the current configuration has been audited.

## QA / QC Requirements

Before modifying HubSpot, perform a read only audit of:
1. Company properties
2. Contact properties
3. Company / contact associations
4. Contact preview cards
5. Dropdown values
6. Views
7. Lists
8. Ownership
9. A / B / C prioritization
10. Outreach / activity fields
11. CBMC legacy separation
12. Active LPA CSI account structure

Produce a **KEEP / CHANGE / REMOVE / ADD** recommendation before structural changes.

Do not modify records during the initial QA / QC audit.

## CBMC Separation

CBMC is Rob's former company.

Keep CBMC accounts, historical data, and relationships separate from LPA CSI CRM sources unless historical knowledge is specifically being used as market intelligence.

Do not treat CBMC as an LPA CSI account.

Relationship driven opportunities from prior relationships are valuable, but they need to be modeled clearly so they are not confused with current LPA CSI customer status.

## Email / Activity Workflow

Current workflow while Outlook cannot be directly connected to ChatGPT:

**Outlook**
→ drag the .msg email into ChatGPT
→ read the actual email
→ identify company / contact / project
→ extract useful sales information
→ update HubSpot when available
→ associate with company and contact
→ optionally add a copy / summary to the company record
→ archive the Outlook email

Working rule:

**Inbox = work to do.**
**Processed = get it out of the Inbox.**
**HubSpot = the durable customer relationship record.**

## Temporary Record of Truth

When HubSpot is unavailable, ChatGPT and Claude may temporarily serve as the working record of truth.

Capture:
- Company
- Contact
- Email
- Date
- Subject
- Context
- What happened
- Outreach status
- Next action
- Opportunity / project information
- Important relationship information

Backfill HubSpot when access is restored.

Never claim an activity has been logged in HubSpot unless the write actually succeeded.

## Bobert Relationship

Bobert should conceptually provide intelligence, not become the CRM.

Useful overlap:
- Market Intelligence → CRM account / lead
- Fit score / Priority / Timing → qualification
- Target contact roles → contact strategy
- Project Intake → opportunity
- Field Intelligence → account / activity history
- Relationship driven discovery → account relationship / expansion model

**Bobert:** Find and structure intelligence.

**LPA CSI Sales OS:** Decide what to do with that intelligence.

**CRM / ERP:** Store the durable business record and economics.

## Design Principle

Platforms should become tools, not the operating system.

The operating system is:

**Company → Contact → Reason to Contact → Email / Call → Activity → Follow Up → Opportunity → Revenue**

Tools may change. The process and structured information should remain portable.

## Working Rule

Always ask:

**Does this help Rob get a scalable lighting opportunity or move an existing account forward?**

If not, do not spend unnecessary time on it.

## Immediate Priority

1. Build and QA the Active LPA CSI Company List
2. Ensure companies and contacts align
3. Simplify CRM properties
4. Build useful operational views
5. Research growth + construction signals
6. Identify decision makers
7. Establish reason to contact
8. Write targeted outreach
9. Track activity
10. Follow up
11. Develop opportunities
12. Backfill CRM when systems are available

Quality is more important than hitting an arbitrary number of companies.
