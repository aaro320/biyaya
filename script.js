// IMPORTANT: Replace this with your actual Facebook business page URL.
// Example: 'https://www.facebook.com/your-real-page-name'
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/johnaaron029';
// Optional: paste a direct Messenger link, e.g. https://m.me/your-real-page-name
const MESSENGER_URL = 'https://www.facebook.com/johnaaron029';

// Sample products/prices are placeholders. Edit them to match actual offerings.
const products = [
  {id:1,name:'Chocolate Chip Loaf',category:'loaves',price:180,description:'Rich chocolate loaf topped with chocolate chips and crunchy nuts.',image:'assets/chocolate-loaf.jpg',tag:'Actual product photo'},
  {id:2,name:'Classic Banana Bread',category:'loaves',price:150,description:'Soft and comforting banana loaf, perfect for sharing.',emoji:'🍌',tag:'Sample product'},
  {id:3,name:'Fudgy Brownies',category:'brownies',price:120,description:'Chocolatey brownie squares with a soft, fudgy center.',emoji:'🍫',tag:'Sample product'},
  {id:4,name:'Chocolate Chip Cookies',category:'cookies',price:100,description:'Golden cookies with delicious chocolate chips.',emoji:'🍪',tag:'Sample product'},
  {id:5,name:'Vanilla Celebration Cake',category:'cakes',price:550,description:'A soft vanilla cake for birthdays and special occasions.',emoji:'🎂',tag:'Sample product'},
  {id:6,name:'Double Chocolate Cookies',category:'cookies',price:120,description:'Chocolate cookies made for chocolate lovers.',emoji:'🍪',tag:'Sample product'},
  {id:7,name:'Mocha Loaf',category:'loaves',price:190,description:'Coffee and chocolate flavors in a tender loaf.',emoji:'☕',tag:'Sample product'},
  {id:8,name:'Walnut Brownies',category:'brownies',price:140,description:'Classic brownie bites with a crunchy walnut topping.',emoji:'🍫',tag:'Sample product'},
  {id:9,name:'Mini Cupcakes',category:'cakes',price:160,description:'A cheerful box of little sweet treats.',emoji:'🧁',tag:'Sample product'}
];
const money = value => '₱' + value.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
const grid = document.getElementById('product-grid');
function renderProducts(category='all'){
  const shown=products.filter(p=>category==='all'||p.category===category);
  grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-image">${p.image?`<img loading="lazy" src="${p.image}" alt="${p.name}">`:`<div class="product-art" role="img" aria-label="Sample illustration for ${p.name}">${p.emoji}</div>`}<span class="tag">${p.tag}</span></div><div class="product-info"><small>${p.category.replace(/^./,x=>x.toUpperCase())}</small><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button type="button" data-product="${p.id}">View Details ↗</button></div></div></article>`).join('');
}
renderProducts();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');renderProducts(btn.dataset.filter)}));
const dialog=document.getElementById('product-dialog');
grid.addEventListener('click',event=>{const btn=event.target.closest('[data-product]');if(!btn)return;const p=products.find(x=>x.id===Number(btn.dataset.product));document.getElementById('dialog-body').innerHTML=`<small>${p.tag}</small><h3 id="dialog-title">${p.name}</h3><p>${p.description}</p><strong>${money(p.price)}</strong><p>Ask us about current availability and pricing.</p><a class="button primary inquiry-link" href="#contact">Ask About This Product ↗</a>`;dialog.showModal();dialog.querySelector('.inquiry-link').addEventListener('click',()=>dialog.close())});
dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
function validExternalUrl(url){try{const u=new URL(url);return u.protocol==='https:'||u.protocol==='http:'}catch{return false}}
const pageConfigured=validExternalUrl(FACEBOOK_PAGE_URL);
const messengerConfigured=validExternalUrl(MESSENGER_URL);
document.querySelectorAll('.facebook-link').forEach(a=>{if(pageConfigured)a.href=FACEBOOK_PAGE_URL;else a.addEventListener('click',e=>{e.preventDefault();alert('The Facebook page link has not been added yet. Please update FACEBOOK_PAGE_URL in script.js.')})});
document.querySelectorAll('.messenger-link').forEach(a=>{if(messengerConfigured||pageConfigured)a.href=messengerConfigured?MESSENGER_URL:FACEBOOK_PAGE_URL;else a.addEventListener('click',e=>{e.preventDefault();alert('The Messenger link has not been added yet. Please update MESSENGER_URL in script.js.')})});
if(pageConfigured)document.getElementById('link-warning').hidden=true;
document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-header nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
