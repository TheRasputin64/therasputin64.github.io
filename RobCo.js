document.addEventListener('DOMContentLoaded',()=>{const e=document.getElementById('robco-card'),t=document.createElement('div');t.style.cssText=`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:#0A0A0A;
display:flex;
border:2px solid #5AEB5A;
box-shadow:0 0 10px rgba(90,235,90,0.3),inset 0 0 20px rgba(90,235,90,0.2);
font-family:'VT323',monospace;
opacity:0;
transition:opacity 0.3s;
overflow:hidden;
cursor:pointer;
`;const a=document.createElement('div');a.style.cssText=`
display:flex;
width:100%;
height:100%;
`;const i=document.createElement('div');i.style.cssText=`
width:70%;
position:relative;
display:flex;
justify-content:center;
align-items:center;
background:rgba(10,10,10,0.8);
`;const n=document.createElement('div');n.style.cssText=`
position:absolute;
top:10px;
left:10px;
color:#5AEB5A;
font-size:14px;
z-index:10;
`;const o=document.createElement('div');o.style.cssText=`
width:30%;
background:#0A0A0A;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;const s=document.createElement('div');s.style.cssText=`
color:#5AEB5A;
margin-bottom:5px;
text-align:center;
`;const r=document.createElement('div');r.style.cssText=`
color:#5AEB5A;
opacity:0.7;
text-align:center;
`;const l=document.createElement('div');l.style.cssText=`
position:absolute;
bottom:10px;
left:0;
width:100%;
color:#5AEB5A;
font-size:12px;
text-align:center;
opacity:0.6;
`;l.textContent="← → : NAV | R : ROTATE | +/- : ZOOM";const d=document.createElement('div');d.style.cssText=`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.15) 0px,
    rgba(0,0,0,0.15) 1px,
    transparent 1px,
    transparent 2px
);
pointer-events:none;
z-index:5;
`;const c=document.createElement('div');c.style.cssText=`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
`;const m=document.createElement('div');m.style.cssText=`
position:absolute;
top:10px;
left:0;
width:100%;
color:#5AEB5A;
font-size:16px;
text-align:center;
`;m.textContent="■ ROBCO INDUSTRIES (TM) TERMINAL";const p=[{name:"image1.jpg",size:"256 KB",type:"JPEG"},{name:"image2.png",size:"512 KB",type:"PNG"},{name:"image3.gif",size:"128 KB",type:"GIF"},{name:"image4.bmp",size:"1 MB",type:"BMP"},{name:"image5.tiff",size:"2 MB",type:"TIFF"}];let g=0;const u=[
{color1:'rgba(90,235,90,0.1)',color2:'rgba(90,235,90,0.1)'},
{color1:'rgba(87,173,29,0.1)',color2:'rgba(87,173,29,0.1)'},
{color1:'rgba(0,255,42,0.1)',color2:'rgba(0,255,42,0.1)'},
{color1:'rgba(0,255,34,0.1)',color2:'rgba(0,255,34,0.1)'},
{color1:'rgba(0,255,13,0.1)',color2:'rgba(0,255,13,0.1)'}
];let h=0;for(let e=0;e<3;e++){const t=document.createElement('div');t.style.cssText=`
width:33.33%;
height:100%;
background:${e===0?u[h].color1:e===1?u[h].color2:u[h].color1};
`;c.appendChild(t)}const x=document.createElement('div');x.style.cssText=`
width:100%;
height:100%;
position:relative;
overflow:hidden;
`;x.appendChild(c);x.appendChild(d);i.appendChild(n);i.appendChild(x);i.appendChild(m);i.appendChild(l);const b=()=>{const e=p[g];n.textContent=e.name,s.textContent=`Size: ${e.size}`,r.textContent=`Type: ${e.type}`;const t=c.children;t[0].style.background=u[h].color1,t[1].style.background=u[h].color2,t[2].style.background=u[h].color1};o.appendChild(s);o.appendChild(r);a.appendChild(i);a.appendChild(o);t.appendChild(a);e.style.position='relative';e.appendChild(t);const f=()=>{t.style.opacity='1',b()},y=()=>{t.style.opacity='0'};e.addEventListener('mouseenter',f);e.addEventListener('mouseleave',y);e.addEventListener('click',()=>{window.location.href='https://github.com/TheRasputin64/RobCoViewer'});document.addEventListener('keydown',e=>{if(t.style.opacity==='1')switch(e.key){case'ArrowLeft':const a=g;g=(g-1+p.length)%p.length,h=(h+1)%u.length,b();break;case'ArrowRight':const i=g;g=(g+1)%p.length,h=(h+1)%u.length,b();break;}})});