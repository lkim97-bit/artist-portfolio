'use strict';
const app=document.getElementById('app');
let entries=[],settings={},chosenTag='all',query='';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=s=>String(s||'').replace(/^\/+|^\.\//g,'');
const tags=e=>Array.isArray(e.tags)?e.tags:[];
function allTags(){let m={};entries.filter(e=>e.kind!=='activity').forEach(e=>tags(e).forEach(t=>m[t]=(m[t]||0)+1));return Object.keys(m).sort((a,b)=>m[b]-m[a]||a.localeCompare(b))}
const thumb=(e,mode='thumb')=>e.cover?`<img src="${esc(asset(e.cover))}" alt="${esc(e.image_alt||e.title)}" loading="lazy" class="${mode}">`:`<span class="empty-picture">image pending</span>`;
function visibleEntries(){
  return entries.filter(e=>(chosenTag==='all'||tags(e).includes(chosenTag))&&(!query||[e.title,e.description,e.year,...tags(e),e.collaborators||''].join(' ').toLowerCase().includes(query.toLowerCase())));
}
function renderIndex(){
  const visible=visibleEntries().filter(e=>e.kind!=='activity');
  const pictured=visible.filter(e=>e.cover);
  const primary=pictured[0], secondary=pictured[1];
  const rest=visible.filter(e=>!pictured.slice(0,2).includes(e));
  const count=String(visible.length).padStart(2,'0');
  const filters=allTags();
  const plate=(e,cl,num)=>e?`<a class="plate ${cl}" href="#/entry/${encodeURIComponent(e.slug)}" aria-label="Open ${esc(e.title)}"><img src="${esc(asset(e.cover))}" alt="${esc(e.image_alt||e.title)}"><span class="plate-note"><b>${num} / ${esc(e.title)}</b><small>${esc(tags(e).slice(0,2).join(' · '))}</small></span></a>`:'';
  app.innerHTML=`
  <section class="opening" aria-label="Selected works">
    <div class="opening-label"><span>SELECTED WORK</span><span>${count} entries in the index</span></div>
    <div class="atlas-composition">
      <div class="atlas-coordinate" aria-hidden="true"><span>ARCHIVE / OPENING</span><i></i><span>INDEX OF WORKS</span></div>
      ${plate(primary,'plate-one','01')}
      <div class="field-fragment"><div class="fragment-rule"></div><p>Selected work from an ongoing artistic and research practice.</p><span><a href="#/about">About the practice ↗</a></span></div>
      ${plate(secondary,'plate-two','02')}
      <div class="earth-signature" aria-hidden="true"><svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M5 81 C45 75 38 35 76 56 S125 113 160 60 201 53 234 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6 90 C43 88 51 44 81 67 S128 122 170 65 203 65 236 30" stroke="currentColor" stroke-width=".9"/><circle cx="76" cy="56" r="2.6" fill="currentColor"/><circle cx="160" cy="60" r="2.6" fill="currentColor"/></svg><span>field line</span></div>
    </div>
  </section>
  <section class="catalogue" id="index"><div class="catalogue-head"><h1>Index</h1><p>${count} works</p></div>
    <div class="toolbar"><div class="main-filters"><button data-filter="all" class="${chosenTag==='all'?'on':''}">all</button><button data-filter="Cloud6" class="${chosenTag==='Cloud6'?'on':''}">cloud6</button><button data-filter="Hajo" class="${chosenTag==='Hajo'?'on':''}">hajo</button><button data-filter="writing" class="${chosenTag==='writing'?'on':''}">writing</button><button data-filter="research" class="${chosenTag==='research'?'on':''}">research</button></div><details class="other-filters"><summary>all tags +</summary><div class="filter-dropdown">${filters.map(t=>`<button data-filter="${esc(t)}" class="${chosenTag===t?'on':''}">${esc(t)}</button>`).join('')}</div></details><input class="search" aria-label="Search entries" placeholder="search titles, tags, years" value="${esc(query)}"></div>
    <div class="register" role="list">${visible.map((e,i)=>`<a role="listitem" class="register-entry ${e.cover?'with-documentation':''}" href="#/entry/${encodeURIComponent(e.slug)}"><span class="register-no">${String(i+1).padStart(2,'0')}</span><span class="register-name">${esc(e.title)}</span><span class="register-kind">${esc(tags(e).slice(0,2).join(' / '))}</span><span class="register-year">${esc(e.year||'—')}</span><span class="register-arrow">↗</span></a>`).join('')||'<p class="no-results">Nothing filed here yet.</p>'}</div>
    <div class="catalogue-tail"><span>Use tags or search to move through the archive.</span><span>↝</span></div>
  </section>`;
  app.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{chosenTag=b.dataset.filter;renderIndex()});
  app.querySelector('.search').oninput=e=>{query=e.target.value;let pos=e.target.selectionStart;renderIndex();let f=app.querySelector('.search');f.focus();f.setSelectionRange(pos,pos)};
  document.getElementById('footer-count').textContent=`${entries.filter(e=>e.kind!=='activity').length} works`;
}
function renderElsewhere(){
  const activities=entries.filter(e=>e.kind==='activity').sort((a,b)=>String(b.year||'').localeCompare(String(a.year||'')));
  app.innerHTML=`<section class="elsewhere"><div class="elsewhere-intro"><p class="small-label">SELECTED ACTIVITY</p><h1>In Circulation<span class="mud-dot">.</span></h1><p>Writing, exhibitions, workshops, talks, press, and recognition.</p></div><div class="elsewhere-head"><span>ACTIVITY REGISTER</span><span>${String(activities.length).padStart(2,'0')} ITEMS</span></div><div class="elsewhere-list">${activities.length?activities.map((e,i)=>`<a href="#/entry/${encodeURIComponent(e.slug)}" class="activity-row"><span class="activity-year">${esc(e.year||'—')}</span><span class="activity-name">${esc(e.title)}<small>${esc(e.description||'')}</small></span><span class="activity-type">${esc(e.activity_type||'Other')}</span><span>↗</span></a>`).join(''):'<div class="elsewhere-empty"><p>Not everything needs to be a finished artwork to have a place here.</p><p>Publications, talks, fieldwork notes, workshops, conferences, and press will appear as they are added.</p></div>'}</div><p class="elsewhere-foot">An ongoing record, not a comprehensive CV.</p></section>`;
  document.getElementById('footer-count').textContent=`${activities.length} notes`;
}
function renderDetail(e){if(!e){app.innerHTML='<p>Entry not found. <a href="#/">Return to index</a></p>';return}
 let gallery=e.gallery?.length?e.gallery:e.cover?[{image:e.cover,caption:e.image_caption||''}]:[];
 app.innerHTML=`<section class="detail"><div class="detail-nav"><a href="#/">← Index</a><span>ENTRY / ${esc(String(entries.indexOf(e)+1).padStart(2,'0'))}</span></div><div class="detail-header"><p class="small-label">${esc(tags(e).join(' · '))}${e.year?' / '+esc(e.year):''}</p><h1>${esc(e.title)}</h1><p class="detail-intro">${esc(e.description||'')}</p></div><section class="detail-body"><div class="detail-gallery">${gallery.length?gallery.map(g=>`<figure><img src="${esc(asset(g.image||g))}" alt="${esc(g.alt||e.title)}" loading="lazy"><figcaption>${esc(g.caption||'')}</figcaption></figure>`).join(''):'<div class="no-images">Photographs and documents forthcoming.</div>'}</div><aside class="detail-notes"><p class="small-label">About the work</p><p>${esc(e.details||e.description||'')}</p>${e.collaborators?`<p class="small-label">With</p><p>${esc(e.collaborators)}</p>`:''}${e.external_url?`<p class="small-label">More elsewhere</p><p><a href="${esc(e.external_url)}" target="_blank" rel="noopener">${esc(e.external_label||'See full project')} ↗</a></p>`:''}<p class="small-label">Index terms</p><p>${tags(e).map(esc).join(' / ')}</p></aside></section>${e.sections?.length?`<section class="extended-project"><div class="extended-label">Project notes</div>${e.sections.map((sec,i)=>`<article class="extended-section"><span class="section-number">${String(i+1).padStart(2,"0")}</span><div><h2>${esc(sec.heading||"")}</h2>${String(sec.body||"").split(/\n\s*\n/).map(p=>`<p>${esc(p)}</p>`).join("")}</div></article>`).join("")}</section>`:""}</section>`;
 document.getElementById('footer-count').textContent='';}
function renderAbout(){app.innerHTML=`<section class="about"><p class="small-label">About the practice</p><h1>About</h1><div class="about-columns"><div><p class="about-lead">${esc(settings.bio||'Artist and researcher.')}</p><p>${esc(settings.bio_secondary||'')}</p></div><aside><div class="side-heading">Links</div><p>${settings.cloud6_url?`<a href="${esc(settings.cloud6_url)}" target="_blank" rel="noopener">Cloud6 ↗</a>`:'Cloud6 — link coming soon'}</p><p>${settings.hajo_url?`<a href="${esc(settings.hajo_url)}" target="_blank" rel="noopener">Hajo ↗</a>`:'Hajo'}</p><div class="side-heading">Correspondence</div><p>${settings.email?`<a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a>`:'Contact coming soon'}</p></aside></div></section>`;document.getElementById('footer-count').textContent='';}
function route(){window.scrollTo(0,0);let h=decodeURIComponent(location.hash||'#/');document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',h==='#/about'?a.dataset.nav==='about':h==='#/elsewhere'?a.dataset.nav==='elsewhere':a.dataset.nav==='index'));if(h==='#/about')renderAbout();else if(h==='#/elsewhere')renderElsewhere();else if(h.startsWith('#/entry/'))renderDetail(entries.find(e=>e.slug===h.slice(8)));else renderIndex()}
Promise.resolve().then(()=>{const node=document.getElementById('archive-data');if(node){const d=JSON.parse(node.textContent);return [d.entries,d.settings]}return Promise.all([fetch('data/entries.json').then(r=>r.json()),fetch('data/settings.json').then(r=>r.json())])}).then(([list,s])=>{entries=list.filter(e=>e.published!==false).sort((a,b)=>Number(a.order??999)-Number(b.order??999)||String(a.title).localeCompare(b.title));settings=s;const email=document.getElementById('email-nav');if(settings.email)email.href='mailto:'+settings.email;else email.hidden=true;window.addEventListener('hashchange',route);route()}).catch(err => {
  console.error("Portfolio loading error:", err);
  app.textContent = "Unable to load the portfolio.";
});

/* OPTICAL HOME — additive; does not change the Index or In Circulation. */
(function () {
  const beforeOpticalHome = renderIndex;
  renderIndex = function () {
    beforeOpticalHome();
    const opening = document.querySelector('.opening');
    if (!opening) return;
    const pictured = visibleEntries().filter(e => e.kind !== 'activity' && e.cover).slice(0, 2);
    const one = pictured[0], two = pictured[1];
    const picture = (e, name) => e ? `
      <a class="optical-work ${name}" href="#/entry/${encodeURIComponent(e.slug)}">
        <img src="${esc(asset(e.cover))}" alt="${esc(e.image_alt || e.title)}" loading="eager">
        <span>${esc(e.title)}</span>
      </a>` : '';
    opening.innerHTML = `
      <div class="optical-topline"><span>Selected works / an index</span><a href="#index">Browse all works ↓</a></div>
      <div class="optical-field" aria-label="Selected photographs and microscope study">
        ${picture(one,'optical-work-one')}
        ${picture(two,'optical-work-two')}
        <div class="optical-specimen">
          <div class="optical-specimen-surface" tabindex="0" role="img" aria-label="Microscope photograph. Move pointer over the image to magnify a detail.">
            <img src="images/microscope-study.png" alt="Magnified branching structures photographed at the microscopy lab" loading="lazy">
            <span class="optical-lens" aria-hidden="true"></span>
          </div>
          <span>microscope study / 2026 <small>↗ move to inspect</small></span>
        </div>
        <span class="optical-side-note">A closer look</span>
      </div>`;
    const surface = opening.querySelector('.optical-specimen-surface');
    const lens = surface?.querySelector('.optical-lens');
    if (!surface || !lens) return;
    const updateLens = (e) => {
      const r = surface.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
      const y = Math.max(0, Math.min(r.height, e.clientY - r.top));
      const lx = Math.max(0,Math.min(r.width - 1,x));
      const ly = Math.max(0,Math.min(r.height - 1,y));
      const zoom = 2.4;
      lens.style.left = `${lx}px`;
      lens.style.top = `${ly}px`;
      lens.style.backgroundSize = `${r.width * zoom}px ${r.height * zoom}px`;
      lens.style.backgroundPosition = `${-(lx * zoom - 54)}px ${-(ly * zoom - 54)}px`;
    };
    surface.addEventListener('pointerenter', e => { surface.classList.add('is-looking'); updateLens(e); });
    surface.addEventListener('pointermove', updateLens);
    surface.addEventListener('pointerleave', () => surface.classList.remove('is-looking'));
    surface.addEventListener('focus', () => {
      const r = surface.getBoundingClientRect();
      surface.classList.add('is-looking');
      updateLens({clientX:r.left+r.width/2,clientY:r.top+r.height/2});
    });
    surface.addEventListener('blur', () => surface.classList.remove('is-looking'));
  };
})();
