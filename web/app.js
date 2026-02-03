async function load(){
  const res = await fetch('../data/carbon_equipment.json');
  const data = await res.json();
  const tbody = document.querySelector('#equip tbody');
  const chips = document.querySelectorAll('.chip');
  let typeFilter = 'All', powerFilter = null; let query = '';
  function powerBadge(p){
    if(!p) return ''; const s=p.toLowerCase();
    let cls=''; if(s.includes('battery')) cls='battery'; else if(s.includes('hydrogen')) cls='h2'; else if(s.includes('hybrid')) cls='hybrid'; else if(s.includes('ethanol')||s.includes('methanol')) cls='ethanol';
    return `<span class="badge ${cls}">${p}</span>`;
  }
  function row(d){
    return `<tr>
      <td>${powerBadge(d.power_use)}</td>
      <td>${d.oem}</td>
      <td><strong>${d.model}</strong></td>
      <td>${d.country}</td>
      <td>${d.machine_type}</td>
      <td>${d.class_tonnage||''}</td>
      <td>${d.engine_power_kw||''}</td>
      <td>${d.blade_size_mm||''}</td>
      <td>${d.bucket_size_m3||''}</td>
      <td>${d.year_of_release||''}</td>
      <td>${d.status||''}</td>
      <td>${d.source_link ? `<a href="${d.source_link}" target="_blank">link</a>${d.source_date?`<br><small>${d.source_date}</small>`:''}`:''}</td>
    </tr>`;
  }
  function render(){
    tbody.innerHTML = data
      .filter(d => typeFilter==='All' || d.machine_type===typeFilter)
      .filter(d => !powerFilter || d.power_use===powerFilter)
      .filter(d => !query || (d.model+d.oem+d.country+d.power_use+d.machine_type).toLowerCase().includes(query))
      .map(row).join('');
  }
  chips.forEach(c=>c.addEventListener('click', e=>{
    const t = e.target.dataset.type; const p=e.target.dataset.power; 
    if(t){ typeFilter=t; }
    if(p){ powerFilter = (powerFilter===p)?null:p; }
    chips.forEach(x=>x.classList.remove('active'));
    e.target.classList.add('active');
    render();
  }))
  document.getElementById('search').addEventListener('input', e=>{query=e.target.value.toLowerCase(); render();});
  render();
}
load();
