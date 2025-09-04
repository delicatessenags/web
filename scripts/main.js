const WHATSAPP_NUMBER = "524491011704";
const INSTAGRAM_URL = "https://www.instagram.com/delicatessen.ags/";

// Datos de menú (extraídos de imágenes) + soporte OCR
let menuItems = [];// usado por OCR opcional
const menuData = [
  {
    category: 'Tablas Tradicional',
    note: 'Incluye tabla de madera. Mini botella de vino +$80',
    items: [
      { title: 'Mini', price: '$220', people: '1 persona', image: './images/WhatsApp Image 2025-09-03 at 20.03.03_a405d6d9.jpg' },
      { title: 'Chica', price: '$350', people: '2–3 personas', image: './images/WhatsApp Image 2025-09-03 at 20.04.20_526bfecb.jpg' },
      { title: 'Mediana', price: '$550', people: '4–6 personas', image: './images/WhatsApp Image 2025-09-03 at 20.03.54_7a2327b7.jpg' },
      { title: 'Grande', price: '$950', people: '8–10 personas', image: './images/WhatsApp Image 2025-09-03 at 20.04.20_ba962c1e.jpg' }
    ]
  },
  {
    category: 'Tablas Gourmet',
    note: 'Incluye tabla de madera. Mini botella de vino +$80',
    items: [
      { title: 'Mini', price: '$350', people: '1 persona', image: './images/WhatsApp Image 2025-09-03 at 20.03.54_46e9e8b2.jpg' },
      { title: 'Chica', price: '$500', people: '2–3 personas', image: './images/WhatsApp Image 2025-09-03 at 20.02.49_d5cb05c3.jpg' },
      { title: 'Mediana', price: '$750', people: '4–6 personas', image: './images/WhatsApp Image 2025-09-03 at 20.03.20_e4230149.jpg' },
      { title: 'Grande', price: '$1,300', people: '8–10 personas', image: './images/WhatsApp Image 2025-09-03 at 20.04.20_e79b1843.jpg' }
    ]
  },
  {
    category: 'Charolas',
    items: [
      { title: 'Chica', price: '$150', people: '1 persona', image: './images/WhatsApp Image 2025-09-03 at 20.02.10_1cbc37bf.jpg' },
      { title: 'Mediana', price: '$250', people: '2–3 personas', image: './images/WhatsApp Image 2025-09-03 at 20.02.11_0697874e.jpg' },
      { title: 'Grande', price: '$350', people: '4 personas', image: './images/WhatsApp Image 2025-09-03 at 20.03.36_8a11a2e0.jpg' }
    ]
  },
  {
    category: 'Paquetes para eventos',
    items: [
      { title: 'Paquete 1', variants: [ { label:'25 personas', price:'$2,900' }, { label:'35 personas', price:'$3,850' } ] },
      { title: 'Paquete 2', variants: [ { label:'45 personas', price:'$4,750' }, { label:'55 personas', price:'$5,775' } ] },
      { title: 'Paquete 3', variants: [ { label:'65 personas', price:'$6,500' }, { label:'80 personas', price:'$8,000' } ] },
      { title: 'Paquete 4', variants: [ { label:'90 personas', price:'$8,550' }, { label:'100 personas', price:'$9,500' } ] },
      { title: 'Paquete 5', variants: [ { label:'150 personas', price:'$13,500' }, { label:'200 personas', price:'$18,000' } ] }
    ]
  },
  {
    category: 'Individuales y extras',
    items: [
      { title: 'Capelos', price: '$35', people: 'sin fruta' },
      { title: 'Capelos', price: '$42', people: 'con fruta' },
      { title: 'Brochetas', price: '$25' },
      { title: 'Canapés', price: '$22' },
      { title: 'Dip', price: '$250' }
    ]
  },
  {
    category: 'Contenido y tamaños',
    note: 'Tamaños: Mini 16×16 (1), Chica 27×16 (2–3), Mediana 29×23 (4–6), Grande 39×23 (8–10).',
    items: [
      { title: 'Tradicional', description: 'Quesos: gouda, cheddar, manchego, chihuahua. Carnes: jamón serrano, pepperoni, salami, jamón alemán, jamón con tomate, selva negra, pastrami.' },
      { title: 'Gourmet', description: 'Quesos: provolone ahumado, gouda gourmet, al vino tinto, parmesano, de cabra, ibérico, edam, brie, azul. Carnes: salchichón, jamón serrano, lomo a la ceniza, chorizo pamplona, salami español, chorizo extra, selva negra, pastrami.' },
      { title: 'Extras', description: 'Aceitunas, fruta, ate de membrillo, pretzels y galletas.' }
    ]
  }
];

function createMenuCard(item){
  const card = document.createElement('article');
  card.className = 'card';
  // Sin fotografías en las tarjetas del menú
  const body = document.createElement('div');
  body.className = 'card-body';
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = item.title;
  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = item.description || item.people || '';
  const price = document.createElement('p');
  price.className = 'card-price';
  price.textContent = item.price ? `Desde ${item.price}` : ' ';
  const ctas = document.createElement('div');
  ctas.style.display = 'flex';
  ctas.style.gap = '8px';
  const wa = document.createElement('a');
  wa.className = 'btn btn-primary';
  const msg = encodeURIComponent(`Hola Delicatessen, quiero pedir ${item.title}${item.price?` (${item.price})`:''}`);
  wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  wa.target = '_blank'; wa.rel = 'noopener';
  wa.textContent = 'Pedir por WhatsApp';
  const ig = document.createElement('a');
  ig.className = 'btn btn-secondary';
  ig.href = INSTAGRAM_URL; ig.target = '_blank'; ig.rel = 'noopener';
  ig.textContent = 'Pedir por Instagram';
  ctas.append(wa, ig);
  body.append(title, desc, price, ctas);
  card.append(body);
  return card;
}

function renderMenu(){
  const grid = document.getElementById('menu-grid');
  const sizesGrid = document.getElementById('sizes-grid');
  grid.innerHTML = '';
  if(sizesGrid){
    sizesGrid.innerHTML = '';
    const sizes = [
      { title:'Mini', measure:'16 × 16 cm', people:'1 persona' },
      { title:'Chica', measure:'27 × 16 cm', people:'2–3 personas' },
      { title:'Mediana', measure:'29 × 23 cm', people:'4–6 personas' },
      { title:'Grande', measure:'39 × 23 cm', people:'8–10 personas' }
    ];
    sizes.forEach(s=>{
      const c = document.createElement('div');
      c.className = 'size-card';
      const t = document.createElement('div');
      t.className = 'size-title';
      t.textContent = s.title;
      const meta = document.createElement('div');
      meta.className = 'size-meta';
      const mBadge = document.createElement('span');
      mBadge.className = 'size-badge';
      mBadge.textContent = s.measure;
      const pBadge = document.createElement('span');
      pBadge.className = 'size-badge';
      pBadge.textContent = s.people;
      meta.append(mBadge,pBadge);
      c.append(t,meta);
      sizesGrid.appendChild(c);
    });
  }
  if(menuData && menuData.length){
    // Excluir "Contenido y tamaños" del grid principal (lo mostraremos abajo)
    const filtered = menuData.filter(s=> s.category !== 'Contenido y tamaños');
    filtered.forEach(section => {
      const h = document.createElement('h3');
      h.textContent = section.category;
      h.style.gridColumn = '1 / -1';
      h.style.margin = '18px 0 6px';
      grid.appendChild(h);
      if(section.note){
        const p = document.createElement('p');
        p.className = 'card-desc';
        p.style.gridColumn = '1 / -1';
        p.textContent = section.note;
        grid.appendChild(p);
      }
      (section.items||[]).forEach(item => {
        const card = createMenuCard(item);
        if(item.variants){
          const wrap = document.createElement('div');
          wrap.className = 'variants';
          item.variants.forEach(v=>{
            const span = document.createElement('span');
            span.className = 'variant';
            span.textContent = `${v.label}: ${v.price}`;
            wrap.appendChild(span);
          });
          card.querySelector('.card-body').insertBefore(wrap, card.querySelector('.card-price'));
          card.querySelector('.card-price').textContent = '';
        }
        grid.appendChild(card);
      });
    });
  } else if(menuItems.length){
    menuItems.forEach(item => grid.appendChild(createMenuCard(item)));
  } else {
    const note = document.createElement('p');
    note.className = 'card-desc';
    note.textContent = 'El menú se está preparando. Pronto verás tamaños y precios.';
    grid.append(note);
  }
  // Render contenidos (quesos/carnes/extras)
  const contenidoWrap = document.getElementById('contenido-list');
  if(contenidoWrap){
    contenidoWrap.innerHTML = '';
    const cont = menuData.find(s=> s.category === 'Contenido y tamaños');
    if(cont){
      cont.items.forEach(it=>{
        const d = document.createElement('div');
        d.className = 'contenido-item';
        const t = document.createElement('h3'); t.textContent = it.title;
        const p = document.createElement('p'); p.textContent = it.description || '';
        d.append(t,p);
        contenidoWrap.appendChild(d);
      });
    }
  }
}

// Galería a partir del contenido de /images (listado manual base)
const galleryImages = [
  "./images/WhatsApp Image 2025-09-03 at 20.04.20_ba962c1e.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.20_e79b1843.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.20_f8e4e686.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.21_a80c4c77.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.27_9b9c3b84.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.27_a7998aa3.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.27_ad3b7105.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.27_f1bfe618.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.27_0605c7ed.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.27_129d4075.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.03.54_7a2327b7.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.03.54_46e9e8b2.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.28_e51bfc6d.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.04.00_91670266.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.02.11_0697874e.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.03.36_8a11a2e0.jpg",
  "./images/WhatsApp Image 2025-09-03 at 20.03.20_e4230149.jpg"
];

function openLightbox(src){
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
}

function renderGallery(){
  const track = document.getElementById('carousel-track');
  if(!track) return;
  track.innerHTML = '';
  galleryImages.forEach(name => {
    const slide = document.createElement('a');
    slide.href = name;
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = name;
    img.alt = 'Tabla de charcutería Delicatessen';
    slide.appendChild(img);
    slide.addEventListener('click', (e)=>{ e.preventDefault(); openLightbox(name); });
    track.appendChild(slide);
  });
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  const viewport = document.getElementById('carousel-viewport');
  const scrollBy = () => viewport.clientWidth * 0.9;
  prev.addEventListener('click', ()=> track.scrollBy({ left: -scrollBy(), behavior:'smooth' }));
  next.addEventListener('click', ()=> track.scrollBy({ left: scrollBy(), behavior:'smooth' }));
  // Swipe
  let startX = 0; let isDown = false;
  viewport.addEventListener('pointerdown', (e)=>{ isDown = true; startX = e.clientX; viewport.setPointerCapture(e.pointerId); });
  viewport.addEventListener('pointerup', ()=>{ isDown=false; });
  viewport.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
    const dx = e.clientX - startX;
    track.scrollLeft -= dx; startX = e.clientX;
  });
}

function setupLightbox(){
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', (e)=>{
    if(e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });
}

function setupForm(){
  const form = document.getElementById('contact-form');
  if(!form) return; // formulario removido
}

function setYear(){
  const y = document.getElementById('year');
  y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderMenu();
  renderGallery();
  setupLightbox();
  setupForm();
  setYear();
  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = ()=>{ header.style.boxShadow = (window.scrollY>8)? '0 6px 18px rgba(0,0,0,.06)' : 'none'; };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({ behavior:'smooth', block:'start' }); }
      }
    });
  });
});

// OCR experimental opcional para extraer menú desde imágenes
function parseMenuText(text){
  // Heurística: líneas con precio (números con $ o cifras) y título anterior
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const items = [];
  for(let i=0;i<lines.length;i++){
    const line = lines[i];
    const priceMatch = line.match(/\$?\s?(\d{2,4})(?:\.(\d{2}))?/);
    if(priceMatch){
      const title = (lines[i-1] && !/\d/.test(lines[i-1])) ? lines[i-1] : 'Tabla';
      const price = priceMatch[0].startsWith('$') ? priceMatch[0] : `$${priceMatch[0].trim()}`;
      items.push({ title, price, description: '', image: undefined });
    }
  }
  return items;
}

window.__runOCR = async function(Tesseract){
  const images = [
    'WhatsApp Image 2025-09-03 at 20.02.48_140235bd.jpg',
    'WhatsApp Image 2025-09-03 at 20.02.48_32d8fb99.jpg',
    'WhatsApp Image 2025-09-03 at 20.02.49_d5cb05c3.jpg',
    'WhatsApp Image 2025-09-03 at 20.03.53_a61bd1ba.jpg'
  ];
  console.log('OCR: iniciando análisis de imágenes del menú...', images);
  const results = [];
  for(const name of images){
    try{
      const { data } = await Tesseract.recognize(`./images/${name}`, 'spa', { logger: m => console.log(m) });
      results.push({ name, text: data.text });
    }catch(e){
      console.warn('OCR error en', name, e);
    }
  }
  const parsed = results.flatMap(r => parseMenuText(r.text));
  // Consolidar por título similar (simple)
  const map = new Map();
  parsed.forEach(it=>{
    const key = it.title.toLowerCase();
    if(!map.has(key)) map.set(key, it);
  });
  menuItems = Array.from(map.values());
  console.log('OCR parseado', menuItems);
  renderMenu();
};


