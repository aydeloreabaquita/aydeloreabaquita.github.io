// Adapt the supplied React Bits PillNav glide behavior to the site's native links.
(() => {
const nav=document.querySelector('.primary-nav');
if(!nav) return;
nav.classList.add('pill-nav');
const links=[...nav.querySelectorAll('a')];
const active=links.find(link=>link.getAttribute('aria-current')==='page') || links[0];
const glide=document.createElement('span');
glide.className='pill-nav-glide';glide.setAttribute('aria-hidden','true');nav.prepend(glide);
let focused=active;
function move(link) {
 focused=link;
 links.forEach(item=>item.classList.toggle('pill-nav-focus',item===link));
 nav.style.setProperty('--pill-left',`${link.offsetLeft}px`);
 nav.style.setProperty('--pill-width',`${link.offsetWidth}px`);
}
links.forEach(link=>{link.addEventListener('pointerenter',()=>move(link));link.addEventListener('focus',()=>move(link));});
nav.addEventListener('pointerleave',()=>move(nav.contains(document.activeElement)&&links.includes(document.activeElement)?document.activeElement:active));
nav.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!nav.contains(document.activeElement))move(active);}));
new ResizeObserver(()=>move(focused)).observe(nav);
document.fonts?.ready.then(()=>move(focused));move(active);
const toggle=document.querySelector('.menu-toggle');
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.focus();}});
})();
