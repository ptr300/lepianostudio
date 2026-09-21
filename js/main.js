// Dynamic content loader: reads CSV files in `/content/` and populates the static site.
function parseCSV(text){
  // Very small CSV parser: splits by lines and commas. Works for simple CSVs.
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if(lines.length === 0) return [];
  const header = lines[0].split(',').map(h=>h.trim());
  const rows = lines.slice(1).map(line=>{
    const parts = line.split(',');
    const obj = {};
    for(let i=0;i<header.length;i++){
      obj[header[i]] = (parts[i]||'').trim();
    }
    return obj;
  });
  return { header, rows };
}

async function loadSiteCSV(){
  try{
    const res = await fetch('content/site.csv');
    if(!res.ok) return;
    const text = await res.text();
    // support key,value simple CSV (with or without header)
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    let map = {};
    // detect header "key,value"
    if(lines[0].toLowerCase().startsWith('key') && lines[0].toLowerCase().includes('value')){
      const data = lines.slice(1);
      data.forEach(l=>{
        const idx = l.indexOf(',');
        if(idx>-1){
          const k = l.slice(0,idx).trim();
          const v = l.slice(idx+1).trim();
          map[k]=v;
        }
      });
    } else {
      // fallback: if header present, parse as header/rows and take first row
      const parsed = parseCSV(text);
      if(parsed.rows && parsed.rows.length>0){
        parsed.header.forEach(h=>{ map[h]=parsed.rows[0][h]; });
      }
    }

    // apply values to DOM
    if(map.name) document.querySelectorAll('#site-name').forEach(e=>e.textContent = map.name);
    if(map.bio) document.querySelectorAll('#site-bio').forEach(e=>e.textContent = map.bio);
    if(map.email) {
      document.querySelectorAll('#contact-email').forEach(a=>{ a.href = 'mailto:'+map.email; a.textContent = map.email; });
      document.querySelectorAll('form.contact-form').forEach(f=>{ if(f.action && f.action.startsWith('mailto:')) f.action = 'mailto:'+map.email; });
    }
    if(map.phone) document.querySelectorAll('#contact-phone').forEach(a=>{ a.href = 'tel:'+map.phone; a.textContent = map.phone; });
    ['youtube','instagram','facebook'].forEach(k=>{
      if(map[k]){
        const sel = document.querySelectorAll('[data-social="'+k+'"]');
        sel.forEach(a=>{ a.href = map[k]; });
      }
    });
    if(map.profile_image){
      const src = 'content/'+map.profile_image;
      document.querySelectorAll('.profile-pic').forEach(img=>{ img.src = src; });
    }
  }catch(err){ console.warn('Could not load site.csv',err); }
}

async function loadWorks(){
  try{
    const res = await fetch('content/works.csv');
    if(!res.ok) return;
    const text = await res.text();
    const parsed = parseCSV(text);
    const tbody = document.getElementById('works-tbody');
    if(!tbody) return;
    parsed.rows.forEach(r=>{
      const tr = document.createElement('tr');
      const t1 = document.createElement('td'); t1.textContent = r.title || '';
      const t2 = document.createElement('td'); t2.textContent = r.type || '';
      const t3 = document.createElement('td');
      const a = document.createElement('a'); a.textContent = (r.link && r.link !== '#') ? 'Buy / View' : 'Buy / View';
      a.href = r.link || '#'; a.target = '_blank';
      t3.appendChild(a);
      tr.appendChild(t1); tr.appendChild(t2); tr.appendChild(t3);
      tbody.appendChild(tr);
    });
  }catch(err){ console.warn('Could not load works.csv',err); }
}

async function loadRates(){
  try{
    const res = await fetch('content/rates.csv');
    if(!res.ok) return;
    const text = await res.text();
    const parsed = parseCSV(text);
    const ul = document.getElementById('rates-list');
    if(!ul) return;
    parsed.rows.forEach(r=>{
      const li = document.createElement('li');
      li.textContent = (r.duration ? r.duration+' min' : '') + (r.price ? ' — $'+r.price : '');
      ul.appendChild(li);
    });
  }catch(err){ console.warn('Could not load rates.csv',err); }
}

document.addEventListener('DOMContentLoaded', function(){
  // year
  var y = new Date().getFullYear();
  var els = [document.getElementById('year'),document.getElementById('year-2'),document.getElementById('year-3'),document.getElementById('year-4')];
  els.forEach(function(e){ if(e) e.textContent = y; });

  // load CSV content
  loadSiteCSV();
  loadWorks();
  loadRates();
});

