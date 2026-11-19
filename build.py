"""Build JSON manifest and embed data into the HTML for a double-click offline preview."""
from pathlib import Path
import json,re
root=Path(__file__).parent
entries=[]
for f in sorted((root/'entries').glob('*.json')):
    entry=json.loads(f.read_text(encoding='utf-8'))
    entry.setdefault('slug',f.stem)
    entries.append(entry)
(root/'data').mkdir(exist_ok=True)
(root/'data'/'entries.json').write_text(json.dumps(entries,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
settings=json.loads((root/'data'/'settings.json').read_text(encoding='utf-8'))
payload=json.dumps({'entries':entries,'settings':settings},ensure_ascii=False).replace('<', '\\u003c')
index=root/'index.html'
html=index.read_text(encoding='utf-8')
pattern=r'(<script id="archive-data" type="application/json">).*?(</script>)'
html,count=re.subn(pattern,lambda m:m.group(1)+payload+m.group(2),html,flags=re.S)
if count!=1:raise RuntimeError('Embedded data script not found')
index.write_text(html,encoding='utf-8')
print(f'Built {len(entries)} entries and an offline-ready index.html')
