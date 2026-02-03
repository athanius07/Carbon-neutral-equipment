# Low‑Carbon Heavy Equipment Tracker

This repository stores a public, auto‑updatable catalog of low/zero‑emission construction & mining machines and a static UI.

## Structure
```
/data
  ├── carbon_equipment.json   # canonical dataset
  ├── carbon_equipment.csv    # export for spreadsheets
  └── schema.json             # JSON Schema for validation
/web
  ├── index.html              # blue + light grey UI
  ├── styles.css
  └── app.js                  # filter/search + color chips
/flows
  └── power-automate-flow-outline.md  # step-by-step flow
/.github/workflows
  └── validate-data.yml       # CI: schema + uniqueness checks
/scripts
  └── validate.py
```

## Run locally
Open `web/index.html` in a browser. For GitHub Pages, set the site root to `/web`.

## Contributing
Submit Pull Requests that modify `data/carbon_equipment.json`. CI will validate formatting and schema.
