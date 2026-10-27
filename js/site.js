// EDIT HERE to add, remove or rename menu items. Every page uses this one list.
const MENU = [
  { label: 'Home', href: 'index.html' },
  { label: 'Studio info', href: 'biography.html', sub: [
    { label: 'Biography', href: 'biography.html' },
    { label: 'Studio policy', href: 'policy.html' },
    { label: 'Teaching philosophy', href: 'philosophy.html' } ] },
  { label: 'Resources', href: 'resources.html' },
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Contact', href: 'contact.html' }
];
const STUDIO_NAME = 'Le Piano Studio';
const here = location.pathname.split('/').pop() || 'index.html';
const link = i => `<a href="${i.href}"${i.href === here ? ' aria-current="page"' : ''}>${i.label}</a>`;
const items = MENU.map(i => i.sub
  ? `<li class="has-sub">${link(i)}<ul class="sub">${i.sub.map(s => `<li>${link(s)}</li>`).join('')}</ul></li>`
  : `<li>${link(i)}</li>`).join('');
document.getElementById('site-header').innerHTML =
  `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html">${STUDIO_NAME}</a><nav aria-label="Main"><ul class="nav">${items}</ul></nav></div></header>`;
document.getElementById('site-footer').innerHTML =
  `<footer class="site-footer"><div class="wrap">&copy; ${new Date().getFullYear()} ${STUDIO_NAME}</div></footer>`;
