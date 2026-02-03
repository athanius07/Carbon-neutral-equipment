# Power Automate Flow – Auto-update dataset from new publications

> Purpose: Search the web for new publications about low/zero-emission heavy equipment, route candidates for approval, and (if approved) create a Pull Request that updates `data/carbon_equipment.json` in GitHub.

## Trigger
- **Recurrence**: Daily at 02:00 local time.

## Variables
- **queries** (Array):
  - "Volvo EC230 Electric excavator site:volvoce.com"
  - "Komatsu PC210LCE electric excavator"
  - "Caterpillar 793 battery electric haul truck"
  - "Hitachi ZX55U-6EB electric"
  - "Liebherr R 9XX H2 excavator"
  - "XCMG XC968-EV electric wheel loader"
  - "DEVELON DX20ZE-7 electric mini excavator"
  - "Epiroc MT42 Battery Minetruck"
  - "Sandvik LH518B battery loader"
  - "Volvo HX04 fuel cell articulated hauler"
  - "XCMG GR350EP electric grader"

(Add/maintain queries per your portfolio.)

## Actions (high level)
1. **For each** `q` in *queries*:
   - Use **Bing Search v7** connector → Web Search for `q` (top 5 results).
   - **Filter array** to keep likely OEM or trade-press domains.
   - For each result → **HTTP** (GET) the page, then **HTML to text**.
   - **Compose** a draft record (JSON) with detected fields: `model`, `oem`, `machine_type`, `power_use`, `link`, `publishedDate` (if meta tag exists), else blank.
2. **Start and wait for an approval** (Everyone must approve) with a summary card showing the draft record + link.
3. **Condition**: If **Approved** → proceed.
4. **GitHub** connector:
   - **Get file content** `data/carbon_equipment.json` (main branch).
   - **Parse JSON**; **Append** new item (fill only known fields; others blank). Ensure unique `id` (slug from `oem-model`).
   - **Create a new branch** (e.g., `auto/update-YYYYMMDD-HHMM`).
   - **Create or update file** with updated JSON on the new branch (commit message: `chore(data): add ${model}`).
   - **Create pull request** to `main` with title `Automated data update` and assign reviewers.
5. (Optional) **Post adaptive card** to Teams with the PR link.

## JSON shape (payload appended)
```json
{
  "id": "oem-model-slug",
  "model": "",
  "oem": "",
  "country": "",
  "machine_type": "Dump truck | Bulldozer | Grader | Wheel loader | Excavator",
  "power_use": "Battery electric | Hydrogen fuel cell | Hydrogen (combustion) | Diesel-electric hybrid | Methanol | Other",
  "class_tonnage": "",
  "engine_power_kw": "",
  "blade_size_mm": "",
  "bucket_size_m3": "",
  "year_of_release": "",
  "status": "Released | Under development",
  "source_link": "",
  "source_date": "YYYY-MM-DD",
  "notes": ""
}
```

> **Governance tip**: keep humans-in-the-loop via Approvals to ensure data quality; the GitHub Action will reject invalid schema.
