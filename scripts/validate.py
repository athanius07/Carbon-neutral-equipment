import json, sys
from jsonschema import validate

with open('data/schema.json','r',encoding='utf-8') as f: schema=json.load(f)
with open('data/carbon_equipment.json','r',encoding='utf-8') as f: data=json.load(f)
# basic uniqueness check on id and source_link
ids=set(); links=set();
for r in data:
    if r['id'] in ids: raise SystemExit(f"Duplicate id: {r['id']}")
    ids.add(r['id'])
    if r.get('source_link'):
        if r['source_link'] in links: raise SystemExit(f"Duplicate source_link: {r['source_link']}")
        links.add(r['source_link'])
validate(instance=data, schema=schema)
print('OK: schema and uniqueness checks passed')
