const API = '/api';
let token = null;
async function fetchVideos(q=''){ const res = await fetch(API + '/videos'); return res.json(); }
function render(items){ const list = document.getElementById('list'); list.innerHTML=''; items.forEach(v=>{ const d = document.createElement('div'); d.className='card'; d.innerHTML = `<h3>${v.title}</h3><p>${v.description||''}</p><div style="margin-top:8px"><button data-id="${v.id}">Play</button></div>`; d.querySelector('button').onclick=()=>play(v); list.appendChild(d); }); }
async function init(){ const r = await fetchVideos(); render(r.items); }
async function demoLogin(){ await fetch(API + '/auth/register', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email:'markjavier1648@gmail.com', password:'password'})}).catch(()=>{}); const res = await fetch(API + '/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email:'markjavier1648@gmail.com', password:'password'})}); const j = await res.json(); token = j.token; alert('logged in as admin'); }
function play(v){ fetch(API + '/videos/stream-token?id='+encodeURIComponent(v.id), { headers: { Authorization: 'Bearer ' + token } }).then(r=>r.json()).then(j=>{ const url = j.url; const video = document.getElementById('video'); if (Hls.isSupported()){ const hls = new Hls(); hls.loadSource(url); hls.attachMedia(video);} else { video.src = url; } }).catch(e=>{ alert('login required or error'); }); }
document.getElementById('login').addEventListener('click', demoLogin); init();
