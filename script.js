const DEFAULTS={
  heroA:'Mi piace avere idee.',heroB:'Ancora di più vederle prendere forma.',
  intro:'Mi occupo di comunicazione e marketing, affianco realtà molto diverse e nel frattempo porto avanti qualche progetto tutto mio.',
  about:'Ho studiato Economia e Marketing e oggi lavoro come freelance.\n\nAffianco aziende, professionisti e attività locali nella promozione dei loro progetti. Mi occupo di comunicazione, contenuti, campagne pubblicitarie, acquisizione di contatti e promozione di iniziative.\n\nOgni realtà ha esigenze diverse e mi piace trovare, insieme a chi ho davanti, un modo di lavorare concreto e sostenibile.\n\nQuando un progetto richiede competenze specifiche, collaboro con agenzie e altri professionisti.\n\nNel frattempo porto avanti anche alcune idee personali, nate dalla voglia di costruire qualcosa di mio e dalla curiosità di sperimentare.',
  service1:'Social media, piani editoriali, copywriting e promozione di prodotti e servizi.',
  service2:'Campagne Meta Ads e Google Ads, lead generation, landing page e strumenti per raccogliere e gestire i contatti.',
  service3:'Promozione di eventi e iniziative, partnership e comunicazione dedicata al territorio.',
  contact:'Se hai un progetto, una proposta di collaborazione o semplicemente qualcosa da raccontarmi, scrivimi.',
  email:'',phone:'331 8808072',linkedin:'https://www.linkedin.com/in/elvirapoldi/',instagram:'',images:{hero:'',about:'',wiva:'',elle:'',castel:''},
  projects:[
    {id:'wiva',category:'PROGETTO PERSONALE · STARTUP',title:'Wiva',description:'Wiva è un progetto dedicato a freelance e partite IVA. Nasce per semplificare la gestione quotidiana del lavoro autonomo, riunendo strumenti, informazioni e una community in un unico spazio. Sono co-founder e seguo la progettazione del prodotto e la comunicazione, mentre il mio socio si occupa dello sviluppo tecnico.',url:'https://wiva.it'},
    {id:'elle',category:'PROGETTO IMPRENDITORIALE · EVENTI',title:'Elle Hub',description:'Un progetto che porto avanti insieme a una collaboratrice, dedicato all’organizzazione di eventi e iniziative locali. Nasce per valorizzare le attività, le persone e le idee del territorio, creando occasioni di incontro e collaborazione.',url:''},
    {id:'castel',category:'PROGETTO TERRITORIALE · COMUNICAZIONE',title:'C’entro Castel',description:'Un’iniziativa che coinvolge oltre 50 attività di Castel Goffredo. Ho collaborato alla definizione dell’identità del progetto e alla creazione di materiali informativi, brochure e gift card per valorizzare il commercio locale.',url:''}
  ],
  clients:[{name:'fees',description:'Marketing e comunicazione',url:'https://fees.world'},{name:'Damiano Gervasi',description:'Comunicazione e campagne',url:'https://www.instagram.com/gervasi.damiano.insurance/'},{name:'Giulia educatore cinofilo',description:'Social ed eventi',url:'https://www.tellaroligiulia-dogcoaching.it'},{name:'Luisella 0-16',description:'Comunicazione social',url:'https://www.instagram.com/luisellaabbigliamentoescarpe/'},{name:'ed altri...',description:'',url:''}]
};
const STORAGE='elvira-portfolio-content-v1';
const copy=x=>JSON.parse(JSON.stringify(x));
function safeLoad(){try{const d=JSON.parse(localStorage.getItem(STORAGE));if(!d||typeof d!=='object')return copy(DEFAULTS);const clients=Array.isArray(d.clients)?copy(d.clients):copy(DEFAULTS.clients);const giulia=clients.find(c=>c.name==='Giulia Dog Coaching');if(giulia)giulia.name='Giulia educatore cinofilo';if(!clients.some(c=>c.name.toLowerCase().includes('ed altri')))clients.push({name:'ed altri...',description:'',url:''});clients.forEach(c=>{const fallback=DEFAULTS.clients.find(v=>v.name===c.name);if(c.url===undefined)c.url=fallback?.url||''});return {...copy(DEFAULTS),...d,phone:d.phone??DEFAULTS.phone,linkedin:d.linkedin||DEFAULTS.linkedin,images:{...DEFAULTS.images,...(d.images||{})},projects:Array.isArray(d.projects)?d.projects:copy(DEFAULTS.projects),clients}}catch{return copy(DEFAULTS)}}
let data=safeLoad();let activeTab='testi';
const el=(tag,cls='',content='')=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content)e.textContent=content;return e};
const save=()=>{try{localStorage.setItem(STORAGE,JSON.stringify(data))}catch{alert('Lo spazio di salvataggio del browser è pieno. Usa Esporta per conservare le modifiche.')}};
function photo(key,extraClass=''){const box=el('div','image-slot '+extraClass);box.dataset.image=key;setPhoto(box,key);return box}
function setPhoto(box,key){box.replaceChildren();box.classList.remove('mockup-wiva','project-elle-photo','mockup-castel','project-castel-photo');const src=data.images[key];if(src){const img=el('img');img.src=src;img.alt='Immagine '+key;box.append(img);return}
  if(key==='hero'||key==='about'){const img=el('img');img.src=key==='hero'?'assets/elvira-hero.webp':'assets/work-photo.webp';img.alt=key==='hero'?'Ritratto di Elvira':'Postazione di lavoro con il computer';box.append(img);return}
  if(key==='wiva'){box.classList.add('mockup-wiva');const laptop=el('div','laptop');const screen=el('div','laptop-screen');const img=el('img');img.src='assets/wiva-screen.png';img.alt='Schermata originale del sito Wiva';screen.append(img);laptop.append(screen,el('div','laptop-base'));box.append(laptop);return}
  if(key==='elle'){box.classList.add('project-elle-photo');const img=el('img');img.src='assets/elle-hub-photo.webp';img.alt='Le due fondatrici di Elle Hub durante un incontro sul palco';box.append(img);return}
  if(key==='castel'){box.classList.add('project-castel-photo');const img=el('img');img.src='assets/castel-two-cards.webp';img.alt='Due gift card C’entro Castel su fondo verde';box.append(img);return}
  const p=el('div','image-placeholder');p.append(el('span','',key==='hero'?'Una foto di te, qui.':'Un momento di lavoro'),el('small','','AGGIUNGI UNA TUA FOTO'));box.append(p)}
function render(){
  document.querySelectorAll('[data-text]').forEach(n=>n.textContent=data[n.dataset.text]||'');
  document.querySelectorAll('[data-image]').forEach(n=>setPhoto(n,n.dataset.image));
  const grid=document.getElementById('projectGrid');grid.replaceChildren();
  data.projects.forEach(p=>{const card=el('article','project-card');card.append(photo(p.id,'project-image'));card.append(el('div','project-meta',p.category),el('h3','',p.title),el('p','',p.description));if(p.url){const a=el('a','project-link','Visita il progetto');a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';card.append(a)}grid.append(card)});
  const clients=document.getElementById('clientList');clients.replaceChildren();
  data.clients.forEach(c=>{const isOther=c.name.toLowerCase().includes('ed altri');const row=el('div','client-row'+(isOther?' client-row-other':''));const name=el('strong','',c.name);if(c.url&&/^https?:\/\//i.test(c.url)){const a=el('a','client-anchor');a.href=c.url;a.target='_blank';a.rel='noopener noreferrer';a.append(name);row.append(a)}else row.append(name);clients.append(row)});
  const links=document.getElementById('contactLinks');links.replaceChildren();
  [['phone','Telefono'],['email','Email'],['linkedin','LinkedIn'],['instagram','Instagram']].forEach(([key,label])=>{
    if(!data[key])return;
    const a=el('a','',key==='phone'?data.phone:label);
    a.href=key==='phone'?'tel:'+data.phone.replace(/[^\d+]/g,''):key==='email'?'mailto:'+data[key]:data[key];
    if(key==='linkedin'||key==='instagram'){a.target='_blank';a.rel='noopener noreferrer'}
    links.append(a);
  });
}
const field=(label,value,onChange,multiline=false)=>{const wrap=el('label','field',label);const input=el(multiline?'textarea':'input');input.value=value??'';input.addEventListener('input',()=>onChange(input.value));wrap.append(input);return wrap};
const group=(title)=>{const g=el('div','field-group');g.append(el('h3','',title));return g};
function drawEditor(){const root=document.getElementById('editorFields');root.replaceChildren();if(activeTab==='testi'){
  [['heroA','Titolo principale'],['heroB','Titolo in corsivo'],['about','Chi sono'],['service1','Comunicazione e contenuti'],['service2','Marketing digitale'],['service3','Progetti e collaborazioni'],['contact','Testo contatti']].forEach(([key,label])=>root.append(field(label,data[key],v=>{data[key]=v;render();save()},['about','service1','service2','service3','contact'].includes(key))));
}else if(activeTab==='immagini'){
  [['hero','Fotografia principale'],['about','Fotografia nella sezione About'],['wiva','Immagine Wiva'],['elle','Immagine Elle Hub'],['castel','Immagine C’entro Castel']].forEach(([key,label])=>{const g=group(label);if(data.images[key]){const preview=el('img','preview-thumb');preview.src=data.images[key];g.append(preview)}const upload=el('input');upload.type='file';upload.accept='image/*';upload.addEventListener('change',async()=>{const f=upload.files?.[0];if(!f)return;if(f.size>7*1024*1024){alert('Scegli un’immagine sotto i 7 MB.');return}const reader=new FileReader();reader.onload=()=>{data.images[key]=reader.result;save();render();drawEditor()};reader.readAsDataURL(f)});g.append(upload,el('span','field-hint','JPG, PNG o WebP. Le foto rimangono in questo browser.'));const url=field('Oppure URL immagine',data.images[key]?.startsWith('data:')?'':data.images[key],v=>{data.images[key]=v;render();save()});g.append(url);const remove=el('button','reset-btn','Rimuovi immagine');remove.addEventListener('click',()=>{data.images[key]='';save();render();drawEditor()});g.append(remove);root.append(g)});
}else if(activeTab==='progetti'){
  data.projects.forEach((p,i)=>{const g=group(p.title);[['title','Nome'],['category','Categoria'],['description','Descrizione'],['url','Link']].forEach(([key,label])=>g.append(field(label,p[key],v=>{data.projects[i][key]=v;render();save()},key==='description')));root.append(g)});const clients=group('Realtà con cui lavoro');data.clients.forEach((c,i)=>{clients.append(field('Nome '+(i+1),c.name,v=>{data.clients[i].name=v;render();save()}),field('Link '+(i+1),c.url||'',v=>{data.clients[i].url=v;render();save()}))});root.append(clients)
  }else{[['phone','Telefono'],['email','Email'],['linkedin','Link LinkedIn'],['instagram','Link Instagram']].forEach(([key,label])=>root.append(field(label,data[key],v=>{data[key]=v;render();save()})))} }
function setOpen(open){document.getElementById('editor').classList.toggle('open',open);document.getElementById('editor').setAttribute('aria-hidden',String(!open));document.getElementById('editorBackdrop').hidden=!open;if(open)drawEditor()}
document.getElementById('editToggle').onclick=()=>setOpen(true);document.getElementById('closeEditor').onclick=()=>setOpen(false);document.getElementById('editorBackdrop').onclick=()=>setOpen(false);document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{activeTab=b.dataset.tab;document.querySelectorAll('[data-tab]').forEach(t=>t.classList.toggle('active',t===b));drawEditor()}));
document.getElementById('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=el('a');a.href=url;a.download='elvira-portfolio-contenuti.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
document.getElementById('importData').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const incoming=JSON.parse(await file.text());if(!incoming||typeof incoming!=='object'||!Array.isArray(incoming.projects)||!incoming.images)throw Error();data={...copy(DEFAULTS),...incoming,images:{...DEFAULTS.images,...incoming.images}};save();render();drawEditor();alert('Contenuti importati correttamente.')}catch{alert('Questo file non è un’esportazione valida del portfolio.')}e.target.value=''});
document.getElementById('resetData').onclick=()=>{if(!confirm('Ripristinare i testi e rimuovere le immagini personalizzate salvate in questo browser?'))return;data=copy(DEFAULTS);save();render();drawEditor()};
render();
