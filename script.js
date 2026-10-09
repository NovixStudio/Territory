let W=240,H=360;const K=1.5,N=23,WATER=255,P=N+1;
const tg=window.Telegram&&Telegram.WebApp;
if(tg){try{tg.ready();tg.expand();tg.setHeaderColor('#0b1220');tg.setBackgroundColor('#0b1220');tg.disableVerticalSwipes&&tg.disableVerticalSwipes()}catch(e){}}
const hap=t=>{try{if(sv.set.vib)tg.HapticFeedback.impactOccurred(t)}catch(e){}};
const $=id=>document.getElementById(id);
const myName=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.first_name)||'Ты';
let NAMES=[];
const esc=t=>String(t).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const POOL=['Аква','Борей','Вега','Гидра','Дельта','Эхо','Фокс','Гром','Хаос','Ирис','Джин','Кобра','Лава','Мара','Нова','Орион','Пантера','Квазар','Рысь','Сфинкс','Тайфун','Урал','Феникс','Хан','Цезарь','Шторм','Эльф','Юнона','Ястреб','Бизон','Alex','Dragon','Wolf','Ghost','Titan','Viper','Zeus','Ninja','Rex','Blaze','Storm','Drift','Pixel','Nomad','Raven','Atlas','Cyber','Magnus','Odin','Vortex','Zero','Lynx','Cobra','Nemo','Rogue','Tiger'];
function pickNames(){
 const a=[...POOL].sort(()=>Math.random()-.5).slice(0,N-1);
 NAMES=[(sv.set.name||myName).trim()||myName,...a];
}
const view=$('cv'),vctx=view.getContext('2d');
document.getElementById('chips').onclick=e=>{const v=e.target.dataset.v;if(v){$('pct').value=v;pv()}};
const off=document.createElement('canvas');off.width=W;off.height=H;
const octx=off.getContext('2d');let img=octx.createImageData(W,H),px=new Uint32Array(img.data.buffer);
function hsl(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return[f(0)*255|0,f(8)*255|0,f(4)*255|0]}
const col=[[0,0,0],[40,120,255]];for(let i=2;i<=N;i++)col[i]=hsl((i*47+20)%360,70,52);

const rev=new Uint8Array(P);
const bx0=new Int16Array(P),bx1=new Int16Array(P),by0=new Int16Array(P),by1=new Int16Array(P);
let comp=null,isl=[],ships=[],flakes=[],incAcc=0,deco=[],isle=null,islSize=[],pend=[],pendC=null,unlocked=false,startIsle=-1,flash=0,AL=0,abUses=0,fxs=[],shk=0,shkAmp=0;
function bb(p,i){const x=i%W,y=i/W|0;if(x<bx0[p])bx0[p]=x;if(x>bx1[p])bx1[p]=x;if(y<by0[p])by0[p]=y;if(y>by1[p])by1[p]=y}
let own,hh,baseC,sh,terr,troops,adj,attacks,phase='pick',tick=0,land=0,timer,earned=0;
const LEVELS=[
{t:'Остров',bots:11,goal:1,bg:1.15,ag:.35,ab:0,th:{b:[[224,208,152],[116,176,84],[74,138,68],[148,136,102],[214,216,222]],x1:[222,192,118],x2:[58,120,60],pole:[236,242,246],sh:[52,128,184],dp:[24,66,122],sea:.5,acc:'#3b82f6'}},
{t:'Пустыня',w:340,h:510,bots:14,goal:1,bg:1.3,ag:.5,ab:1,th:{b:[[238,214,160],[226,176,100],[200,132,76],[156,92,60],[112,64,52]],x1:[236,196,126],x2:[184,124,76],pole:null,sh:[64,168,160],dp:[22,98,108],sea:.36,acc:'#f59e0b'}},
{t:'Снежный архипелаг',snow:1,flat:1,w:460,h:690,isl:10,isc:1.4,sr:200,bots:22,goal:.9,bg:1.7,ag:.85,bf:7,bp:.15,bs:350,ab:1,th:{b:[[248,251,253],[228,240,248],[190,216,230],[128,148,168],[82,94,116]],x1:[212,226,236],x2:[92,146,134],pole:null,sh:[150,214,238],dp:[18,58,108],sea:.5,acc:'#38bdf8'}},
{t:'Рай',snow:1,fc:'rgba(255,170,205,.9)',flat:1,w:460,h:690,isl:2,fixed:1,ir:140,lagoon:1,deco:1,sr:200,bots:22,goal:.9,cm:3,bg:4,ag:1,bf:3,bp:.3,bs:1500,bc:.5,bsp:1.6,sf:25,smart:1,ab:1,para:1,gl:'rgba(88,28,100,.52)',th:{b:[[255,244,214],[190,244,172],[110,224,152],[110,200,120],[90,160,100]],x1:[255,230,152],x2:[255,192,216],pole:null,sh:[152,246,238],dp:[70,178,234],sea:.5,acc:'#f472b6'}},
{t:'Ад',snow:1,rise:1,fc:'rgba(255,150,50,.9)',hellfx:1,hell:1,adapt:1,focus:1,w:650,h:975,isl:8,ir:92,sr:230,
 pos:[[.25,.125],[.75,.125],[.25,.375],[.75,.375],[.25,.625],[.75,.625],[.25,.875],[.75,.875]],init:[0,1,4,5],hid:[2,3,6,7],
 bots:14,bs:2500,bs2:4000,bg:5,bc:.4,bsp:2,bf:3,sf:20,bp:.3,ag:1,goal:.9,cm:5,smart:1,ab:1,gl:'rgba(64,8,8,.62)',
 th:{b:[[96,72,70],[56,42,48],[44,32,40],[92,54,48],[132,74,56]],x1:[176,62,26],x2:[28,22,34],pole:null,sh:[255,128,28],dp:[150,30,10],sea:.5,acc:'#ef4444'}}];
let LV=LEVELS[0],cur=0;
let sv={coins:0,up:{g:0,a:0,s:0}};try{Object.assign(sv,JSON.parse(localStorage.getItem('terr1')||'{}'))}catch(e){}
function norm(){sv.set=Object.assign({vib:1,names:1,pct:30},sv.set);sv.done=sv.done||0;sv.ab=sv.ab||{};sv.slots=sv.slots||[null,null,null];sv.up=Object.assign({g:0,a:0,s:0,i:0,c:0,m:0,f:0},sv.up);sv.evo=sv.evo||0;sv.fp=Object.assign({map:'cont',theme:0,size:'M',bots:8,bg:1.2,bs:300,ag:50,bf:12,goal:90,cd:1,gcd:0,isl:5,smart:0,adapt:0,focus:0,rar:2,th:128,inv:0,slots:['blitz','breakthrough','mobil']},sv.fp)}norm();
const persist=()=>{try{localStorage.setItem('terr1',JSON.stringify(sv))}catch(e){}};
let perm,vals;
function initN(){vals=Float32Array.from({length:256},Math.random);const a=[...Array(256).keys()].sort(()=>Math.random()-.5);perm=new Uint8Array(512);for(let i=0;i<512;i++)perm[i]=a[i&255]}
function vn(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
 const g=(a,b)=>vals[perm[perm[(xi+a)&255]+((yi+b)&255)]];
 const l=(a,b,t)=>a+(b-a)*t;return l(l(g(0,0),g(1,0),u),l(g(0,1),g(1,1),u),v)}
const stops=[[0,[214,200,150]],[.05,[186,190,115]],[.15,[96,150,76]],[.45,[62,114,58]],[.7,[128,112,80]],[.88,[150,140,132]],[1,[240,240,244]]];
function landCol(h){for(let k=1;k<stops.length;k++)if(h<=stops[k][0]){const a=stops[k-1],b=stops[k],t=(h-a[0])/(b[0]-a[0]);return a[1].map((v,j)=>v+(b[1][j]-v)*t)}return stops[6][1]}

function gen(){
 const T=LV.th;initN();const lag=new Uint8Array(W*H);isle=LV.pos?new Uint8Array(W*H).fill(255):null;const e=new Float32Array(W*H);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const X=x/K,Y=y/K,wx=X,wy=Y;
  if(LV.isl)continue;
  let v=0,a=1,f=.017,t=0;
  for(let o=0;o<6;o++){v+=a*vn(wx*f+o*7.3,wy*f+o*3.1);t+=a;a*=.55;f*=2.1}
  v/=t;const dx=(x/W-.5)*2,dy=(y/H-.5)*2;v-=(dx*dx*.9+dy*dy*.7)*.45;
  e[y*W+x]=(x<3||y<3||x>W-4||y>H-4)?-1:v;
 }
 if(LV.custom){customMap(e)}else if(LV.isl){
  isl=[];const sc=LV.isc||1;
  if(LV.fixed){const R0=LV.ir;isl.push({x:W/2,y:H*.25,r:R0},{x:W/2,y:H*.75,r:R0})}
  else if(LV.pos)isl=LV.pos.map(([a,b])=>({x:W*a,y:H*b,r:LV.ir}));
  else for(let k=0;k<LV.isl;k++)for(let t=0;t<600;t++){
   const r=(26+Math.random()*20)*sc*(1-t/900),x=r*1.3+8+Math.random()*(W-r*2.6-16),y=r*1.3+8+Math.random()*(H-r*2.6-16);
   if(isl.every(q=>Math.hypot(q.x-x,q.y-y)>(q.r+r)*1.2+10)){isl.push({x,y,r});break}
  }
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
   let v=-1;
   if(LV.fixed){
    const nz=(a,b)=>vn(a*.02+9,b*.02+3)*.7+vn(a*.06,b*.06)*.3,q=isl[0],R0=q.r,xr=W-1-x,yr=H-1-y;
    v=Math.max(1-Math.hypot(x-q.x,y-q.y)/(R0*(.85+.3*nz(x,y))),1-Math.hypot(xr-q.x,yr-q.y)/(R0*(.85+.3*nz(xr,yr))));
   }else if(LV.pos){
    for(let k=0;k<isl.length;k++){const q=isl[k],ax=x-q.x,ay=y-q.y;if(ax*ax+ay*ay>q.r*q.r*1.7)continue;const nn=vn(x*.02+9+k*17,y*.02+3+k*11)*.7+vn(x*.06+k*5,y*.06)*.3,vk=1-Math.hypot(ax,ay)/(q.r*(.85+.3*nn));if(vk>v){v=vk;isle[y*W+x]=k}}
   }else{
    const n=vn(x*.05/sc+9,y*.05/sc+3)*.6+vn(x*.12/sc,y*.12/sc)*.4;
    for(const q of isl){const d=Math.hypot(x-q.x,y-q.y);v=Math.max(v,1-d/(q.r*(.62+.7*n)))}
   }
   if(LV.lagoon&&v>.55){lag[y*W+x]=1;v=-.5}
   e[y*W+x]=(x<3||y<3||x>W-4||y>H-4)?-1:v;
  }
 }
 const sea=LV.isl?0:Float32Array.from(e).sort()[W*H*T.sea|0];
 const lab=new Int32Array(W*H),st=new Int32Array(W*H);let best=0,bl=0,L=0;
 for(let i=0;i<W*H;i++){
  if(e[i]<=sea||lab[i])continue;L++;let sp=0,c=0;st[sp++]=i;lab[i]=L;
  while(sp){const j=st[--sp];c++;for(const k of[j-1,j+1,j-W,j+W])if(e[k]>sea&&!lab[k]){lab[k]=L;st[sp++]=k}}
  if(c>best){best=c;bl=L}
 }
 if(LV.isl){comp=lab.slice();best=0;for(let i=0;i<W*H;i++)if(e[i]>sea){lab[i]=1;best++}bl=1}
 land=best;own=new Uint8Array(W*H);hh=new Float32Array(W*H);baseC=new Uint8Array(W*H*3);sh=new Float32Array(W*H).fill(1);
 let mx=sea;for(let i=0;i<W*H;i++)if(lab[i]===bl&&e[i]>mx)mx=e[i];
 const sd=new Uint8Array(W*H);
 for(let i=0;i<W*H;i++)if(lab[i]===bl&&!(LV.hid&&LV.hid.includes(isle[i])))for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)sd[i+dy*W+dx]=1;
 for(let i=0;i<W*H;i++){
  let c;
  if(lab[i]===bl){let h=(e[i]-sea)/(mx-sea);hh[i]=LV.flat?0:h;if(LV.flat)h=Math.min(h,.6);
   const x=i%W,y=i/W|0,X=x/K,Y=y/K,m=vn(X*.045+50,Y*.045+90)*.65+vn(X*.13,Y*.13)*.35,tp=1-Math.abs(y/H-.5)*2+(vn(X*.03,Y*.03+9)-.5)*.3;
   c=h<.04?T.b[0]:h>.82?T.b[4]:h>.62?T.b[3]:h>.34?T.b[2]:T.b[1];
   if(h>.04&&h<.5&&m<.4)c=T.x1;
   else if(h>.2&&h<.62&&m>.6)c=T.x2;
   if(T.pole&&tp<.24&&h>.04&&h<.82)c=T.pole;
   if(i>W&&i<W*H-W){sh[i]=LV.flat?1:Math.max(.95,Math.min(1.07,1+((e[i-1]+e[i-W])-(e[i+1]+e[i+W]))*3))}
  }else{own[i]=WATER;c=sd[i]||lag[i]?T.sh:T.dp}
  baseC[i*3]=c[0];baseC[i*3+1]=c[1];baseC[i*3+2]=c[2];
 }
 pend=[];pendC=null;islSize=[];
 if(LV.hell){
  islSize=new Array(isl.length).fill(0);
  for(let i=0;i<W*H;i++)if(own[i]===0)islSize[isle[i]]++;
  const hf=new Uint8Array(isl.length);for(const k of LV.hid)hf[k]=1;
  for(let i=0;i<W*H;i++)if(own[i]===0&&hf[isle[i]])pend.push(i);
  pendC=new Uint8Array(pend.length*3);
  for(let j=0;j<pend.length;j++){const i=pend[j];pendC[j*3]=baseC[i*3];pendC[j*3+1]=baseC[i*3+1];pendC[j*3+2]=baseC[i*3+2];own[i]=WATER;baseC[i*3]=T.dp[0];baseC[i*3+1]=T.dp[1];baseC[i*3+2]=T.dp[2];sh[i]=1}
 }
 deco=[];
 if(LV.deco)for(let k=0;k<420;k++){const i=Math.random()*W*H|0;if(own[i]===0&&own[i-1]!==WATER&&own[i+1]!==WATER&&own[i-W]!==WATER&&own[i+W]!==WATER)deco.push({x:i%W,y:i/W|0,c:['🌴','🌴','🌺','🌸','🦋','🐚','🌴','🦜','🍃','🌷'][Math.random()*10|0]})}
}
function spawn(p,cx,cy){
 for(let y=cy-5;y<=cy+5;y++)for(let x=cx-5;x<=cx+5;x++){
  if(x<0||y<0||x>=W||y>=H||(x-cx)**2+(y-cy)**2>24)continue;
  const i=y*W+x;if(own[i]===0){own[i]=p;terr[p]++;bb(p,i)}
 }
 troops[p]=p>1?(LV.bs||200):150;
}
function newGame(){
 setupLevel();pickNames();gen();terr=new Array(P).fill(0);troops=new Array(P).fill(0);bx0.fill(W);bx1.fill(-1);by0.fill(H);by1.fill(-1);bx0[0]=0;bx1[0]=W-1;by0[0]=0;by1[0]=H-1;ships=[];rev.fill(0);abUses=0;AL=0;unlocked=false;startIsle=-1;flash=0;attacks=[];adj=new Uint8Array(P*P);tick=0;earned=0;phase='pick';
 $('ov').style.display='none';$('pct').value=sv.set.pct;$('stats').textContent='';$('lb').textContent='';$('tr').textContent='0';resize(true);draw();toast('Нажми на сушу — выбери старт');
}
function startBots(x0,y0){
 const pts=[[x0,y0]];
 for(let p=2;p<=1+LV.bots;p++)for(let t=0;t<400;t++){
  const ii=LV.init?LV.init[(p-2)%LV.init.length]:(p-2)%Math.max(1,isl.length),q0=LV.isl&&isl[ii];
  let x,y;
  if(q0&&q0.spots){const sp=q0.spots[Math.random()*q0.spots.length|0];x=sp%W;y=sp/W|0}
  else{const an=Math.random()*6.28,dd=q0?q0.r*(LV.lagoon?.5+Math.random()*.4:Math.random()*.7):0;x=q0?Math.round(q0.x+Math.cos(an)*dd):4+Math.random()*(W-8)|0;y=q0?Math.round(q0.y+Math.sin(an)*dd):4+Math.random()*(H-8)|0}
  if(own[y*W+x]!==0||pts.some(q=>(q[0]-x)**2+(q[1]-y)**2<(LV.sp||585)))continue;
  pts.push([x,y]);spawn(p,x,y);break;
 }
}
function calcAdj(){
 adj.fill(0);
 for(let y=0;y<H-1;y++)for(let x=0;x<W-1;x++){
  const i=y*W+x,a=own[i];if(a===WATER)continue;
  for(const b of[own[i+1],own[i+W]])if(b!==WATER&&b!==a){adj[a*P+b]=1;adj[b*P+a]=1}
 }
}
function launch(a,t,amt){
 troops[a]-=amt;const ex=attacks.find(k=>k.a===a&&k.t===t);
 if(ex)ex.tr+=amt;else attacks.push({a,t,tr:amt});
}
function runAttack(k){
 const{a,t}=k;
 if(terr[a]===0)return false;
 if(t===1&&inf>0)return true;
 if(t>0&&terr[t]===0){troops[a]+=k.tr;return false}
 const fr=[];
 const x0=Math.max(1,bx0[t],bx0[a]-1),x1=Math.min(W-2,bx1[t],bx1[a]+1),y0=Math.max(1,by0[t],by0[a]-1),y1=Math.min(H-2,by1[t],by1[a]+1);
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
  const i=y*W+x;if(own[i]!==t)continue;
  if(own[i-1]===a||own[i+1]===a||own[i-W]===a||own[i+W]===a)fr.push(i);
 }
 if(!fr.length||k.tr<1){troops[a]+=k.tr;return false}
 const dens=t>0?troops[t]/Math.max(1,terr[t]):0;if(t>0)rev[t]=a;
 let n=Math.max(2,Math.ceil(fr.length*.2))*(a===1&&blz>0?2.5:1)*(a===1?1+.1*sv.up.c:1)*(a>1?(LV.bsp||1):1)|0;
 while(n-->0&&fr.length){
  const j=Math.random()*fr.length|0,i=fr[j],cost=(.45+dens*2)*(1+hh[i]*.8)*(a===1?1-.07*sv.up.a:1)*(a===1&&blz>0?.7:1)*(a===1&&bls>0?.4:1)*(t===1?(1+.1*sv.up.f)*(adp>0?8:1):1)*(a>1?(LV.bc||1)/(1+AL*.5):1);
  if(k.tr<cost){troops[a]+=k.tr;k.tr=0;return false}
  fr[j]=fr[fr.length-1];fr.pop();
  own[i]=a;terr[a]++;bb(a,i);k.tr-=cost;
  if(t>0){terr[t]--;troops[t]=Math.max(0,troops[t]-dens*.5)}
 }
 return true;
}
function launchShip(a,tx,ty,amt){
 let best=-1,bd=1e9;
 for(let y=Math.max(1,by0[a]);y<=Math.min(H-2,by1[a]);y++)for(let x=Math.max(1,bx0[a]);x<=Math.min(W-2,bx1[a]);x++){
  const i=y*W+x;if(own[i]!==a)continue;
  if(own[i-1]===WATER||own[i+1]===WATER||own[i-W]===WATER||own[i+W]===WATER){const d=(x-tx)**2+(y-ty)**2;if(d<bd){bd=d;best=i}}
 }
 if(best<0)return false;
 const ox=best%W,oy=best/W|0,dx=tx-ox,dy=ty-oy,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
 let lx=-1,ly=-1;
 for(let q=1;q<=len+1;q+=.5){const x=Math.round(ox+ux*q),y=Math.round(oy+uy*q);if(x<0||y<0||x>=W||y>=H)break;const o=own[y*W+x];if(o!==WATER&&o!==a){lx=x;ly=y;break}}
 const L=Math.hypot(lx-ox,ly-oy);
 if(lx<0||L>(LV.sr||130))return false;
 troops[a]-=amt;ships.push({a,x:ox,y:oy,lx,ly,ux,uy,left:L,tr:amt});return true;
}
function landShip(s){
 const{a,lx,ly}=s;let tr=s.tr;const cells=[];
 for(let y=ly-4;y<=ly+4;y++)for(let x=lx-4;x<=lx+4;x++){
  if(x<1||y<1||x>=W-1||y>=H-1)continue;const d=(x-lx)**2+(y-ly)**2;if(d>20)continue;
  const o=own[y*W+x];if(o===WATER||o===a)continue;cells.push([d,y*W+x]);
 }
 cells.sort((p,q)=>p[0]-q[0]);let got=0;
 for(const[,i] of cells){
  const o=own[i];if(o===a||(o===1&&inf>0))continue;const dens=o>0?troops[o]/Math.max(1,terr[o]):0;
  const cost=(.45+dens*2)*(1+hh[i]*.8)*(a===1?1-.07*sv.up.a:1)*(o===1?(1+.1*sv.up.f)*(adp>0?8:1):1);
  if(tr<cost)break;tr-=cost;own[i]=a;terr[a]++;bb(a,i);if(o>0){terr[o]--;troops[o]=Math.max(0,troops[o]-dens*.5)}got++;
 }
 troops[a]+=tr;
 if(a===1){toast(got?`⛵ Высадка: +${got} клеток`:'⛵ Высадка отбита');hap(got?'heavy':'rigid')}
}
function unlockIslands(){
 unlocked=true;
 for(let j=0;j<pend.length;j++){const i=pend[j];own[i]=0;baseC[i*3]=pendC[j*3];baseC[i*3+1]=pendC[j*3+1];baseC[i*3+2]=pendC[j*3+2]}
 let p=2+LV.bots;
 for(const k of LV.hid)for(let b=0;b<2&&p<=N;b++){
  const q=isl[k];
  for(let t=0;t<300;t++){const an=Math.random()*6.28,d=Math.random()*q.r*.6,x=Math.round(q.x+Math.cos(an)*d),y=Math.round(q.y+Math.sin(an)*d);if(own[y*W+x]===0){spawn(p,x,y);troops[p]=LV.bs2||4000;break}}
  p++;
 }
 calcAdj();flash=performance.now();draw();toast('🔥 Из лавы поднялись новые острова!');hap('heavy');
}
function botShip(p){
 let bx=-1,by=0,bsc=-1e9;
 for(let k=0;k<14;k++){
  const q=isl[Math.random()*isl.length|0];let x,y;
  if(q.spots){const sp=q.spots[Math.random()*q.spots.length|0];x=sp%W;y=sp/W|0}
  else{const an=Math.random()*6.28,d=q.r*(LV.lagoon?.5+Math.random()*.4:Math.random()*.6);x=Math.round(q.x+Math.cos(an)*d);y=Math.round(q.y+Math.sin(an)*d)}
  const o=own[y*W+x];
  if(o===WATER||o===p)continue;
  const sc=LV.smart?(o===0?50:60-troops[o]/Math.max(1,terr[o])*8+(o===1?15:0)):Math.random();
  if(sc>bsc){bsc=sc;bx=x;by=y}
 }
 if(bx>=0)launchShip(p,bx,by,troops[p]*(.3+Math.random()*.2));
}
function botAIs(p){
 if(troops[p]<60)return;
 const opts=[];for(let t=0;t<P;t++)if(t!==p&&adj[p*P+t]&&(t===0||terr[t]>0))opts.push(t);
 if(!opts.length)return;
 let best=-1,bs=-1e9,thr=0;
 for(const t of opts){
  if(t===0){if(60>bs){bs=60;best=0}continue}
  thr=Math.max(thr,troops[t]);
  const ratio=troops[p]*.5/Math.max(1,troops[t]*.8);
  const sc=ratio*50+(t===1?25+(LV.focus?50:0):0)+(t===rev[p]?30:0)+(terr[t]<terr[p]*.3?20:0)-(ratio<.8?80:0);
  if(sc>bs){bs=sc;best=t}
 }
 if(best<0)return;
 const pct=(thr>troops[p]*.8?.3:.5)+(LV.bp||0)+Math.random()*.15;
 launch(p,best,troops[p]*Math.min(.9,pct));
}
function onMass(L){
 for(let y=Math.max(0,by0[1]);y<=Math.min(H-1,by1[1]);y++)for(let x=Math.max(0,bx0[1]);x<=Math.min(W-1,bx1[1]);x++){const i=y*W+x;if(own[i]===1&&comp[i]===L)return true}
 return false;
}
function botAI(p){
 if(troops[p]<40)return;
 const opts=[];for(let t=0;t<P;t++)if(t!==p&&adj[p*P+t]&&(t===0||terr[t]>0))opts.push(t);
 if(!opts.length)return;
 let t=0;
 if(!(opts.includes(0)&&Math.random()<.55)){
  const e=opts.filter(x=>x>0).sort((u,v)=>troops[u]-troops[v]);
  if(e.length&&(troops[e[0]]<troops[p]*.6||Math.random()<LV.ag))t=e[0];else if(!opts.includes(0))return;
 }
 launch(p,t,troops[p]*(.4+(LV.bp||0)+Math.random()*.25));
}
let cds=[0,0,0],blz=0,lastT=-1,frz=0,bls=0,reg=0,adp=0,inf=0,aim=-1,purple=null,clv=null,CDM=1,GCD=0,SL=sv.slots,ABR=sv.ab;
function setupLevel(){
 W=LV.w||240;H=LV.h||360;off.width=W;off.height=H;img=octx.createImageData(W,H);px=new Uint32Array(img.data.buffer);
 document.documentElement.style.setProperty('--acc',LV.th.acc);document.documentElement.style.setProperty('--gl',LV.gl||'rgba(15,23,42,.66)');
 if(LV.free){const f=sv.fp;SL=f.slots;ABR={};for(const id of Object.keys(ABS))ABR[id]=f.rar;CDM=f.cd;GCD=Math.round(f.gcd*10)}else{SL=sv.slots;ABR=sv.ab;CDM=1;GCD=0}
 cds=[0,0,0];blz=0;frz=0;bls=0;reg=0;adp=0;inf=0;aim=-1;purple=null;clv=null;fxs=[];lastT=-1;
 flakes=LV.snow?Array.from({length:70},()=>({x:Math.random(),y:Math.random(),r:1+Math.random()*2.2,v:.0006+Math.random()*.0012,p:Math.random()*6})):[];
 const ab=$('ab');ab.style.display=LV.ab?'flex':'none';
 ab.innerHTML=LV.ab?[0,1,2].map(i=>`<button data-i="${i}"></button>`).join(''):'';
 if(LV.ab)abUI();
}
function abUI(){[...$('ab').children].forEach((b,i)=>{
 const id=SL[i];if(!id){b.disabled=true;b.style.boxShadow='none';b.innerHTML='—';return}
 const c=cds[i],a=ABS[id],act=id==='blitz'||id==='golden'?blz:id==='blessing'?bls:id==='frost'?frz:id==='regen'?reg:id==='adapt'?adp:id==='infinity'?inf:0;b.disabled=c>0;b.style.boxShadow=`inset 0 -3px 0 ${RAR[ABR[id]].c}`;
 b.innerHTML=`${a.ic}<br>${aim===i?'Цель…':act>0?(act/10|0)+'с ✦':c>0?Math.ceil(c/10)+'с':a.n}`})}
function breakthrough(t,n,nd){
 const fr=[];
 const x0=Math.max(1,bx0[t],bx0[1]-1),x1=Math.min(W-2,bx1[t],bx1[1]+1),y0=Math.max(1,by0[t],by0[1]-1),y1=Math.min(H-2,by1[t],by1[1]+1);
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const i=y*W+x;if(own[i]!==t)continue;if(own[i-1]===1||own[i+1]===1||own[i-W]===1||own[i+W]===1)fr.push(i)}
 while(n-->0&&fr.length){const j=Math.random()*fr.length|0,i=fr[j];fr[j]=fr[fr.length-1];fr.pop();own[i]=1;terr[1]++;bb(1,i);if(t>0)terr[t]--}
 if(!nd)draw();
}
function pickTarget(enemyOnly){
 if(lastT>=0&&(lastT===0?!enemyOnly:terr[lastT]>0)&&adj[P+lastT])return lastT;
 if(!enemyOnly&&adj[P])return 0;
 let t=-1,b=1e9;for(let q=2;q<=N;q++)if(terr[q]>0&&adj[P+q]&&troops[q]<b){b=troops[q];t=q}
 return t;
}
function fireAim(x,y){const id=SL[aim];if(id==='purple')firePurple(x,y);else if(id==='cleave')fireCleave(x,y);else aim=-1}
function fireCleave(x,y){
 const i=aim;aim=-1;if(SL[i]!=='cleave')return;
 cds[i]=Math.round(ABS.cleave.cd*CDM);for(let j=0;j<3;j++)if(j!==i&&cds[j]<GCD)cds[j]=GCD;abUses++;
 const R=Math.max(14,Math.min(W,H)*.1),cuts=[];let T=0;
 for(let k=0;k<20;k++){
  const rr=R*Math.sqrt(Math.random()),ra=Math.random()*6.283;
  const cxp=x+Math.cos(ra)*rr,cyp=y+Math.sin(ra)*rr,an=Math.random()*3.1416;
  const len=50+Math.random()*80,dx=Math.cos(an),dy=Math.sin(an),pts=[];
  for(let q=-len/2;q<=len/2;q+=.7){
   const px=cxp+dx*q,py=cyp+dy*q;
   if(px<2||py<2||px>=W-2||py>=H-2)continue;
   pts.push([px,py]);
  }
  if(pts.length<8)continue;
  T+=(k%3===0?110+Math.random()*120:25+Math.random()*50);
  cuts.push({pts,delay:T,done:false,an});
 }
 clv={x,y,t0:performance.now(),cuts,n:0,left:cuts.length};
 fx('cleave',{mx:x,my:y,cuts,d:T+700});
 hap('heavy');abUI();
}
function tickCleave(){
 const c=clv,now=performance.now()-c.t0;
 for(const k of c.cuts)if(!k.done&&now>=k.delay+120){k.done=true;c.left--;applyCut(k)}
 if(c.left<=0){toast(`🗡️ Рассечено ${c.n} клеток`);clv=null}
}
function applyCut(k){
 const rem=new Array(P).fill(0),b4=terr.slice();let n=0;
 for(const[x,y]of k.pts)for(let ox=-1;ox<=1;ox++)for(let oy=-1;oy<=1;oy++){
  const i=((y|0)+oy)*W+(x|0)+ox,o=own[i];
  if(o>1&&o!==WATER){own[i]=0;terr[o]--;rem[o]++;n++}
 }
 for(let q=2;q<=N;q++)if(rem[q])troops[q]*=Math.max(.5,1-rem[q]/Math.max(1,b4[q])*1.5);
 clv.n+=n;if(n){hap('light');shake(180,3)}draw();
}
function firePurple(x,y){
 const i=aim;aim=-1;if(SL[i]!=='purple')return;
 cds[i]=Math.round(ABS.purple.cd*CDM);for(let j=0;j<3;j++)if(j!==i&&cds[j]<GCD)cds[j]=GCD;abUses++;purple={x,y,t0:performance.now(),bh:Math.round(10*PW[4]),done:false};
 hap('heavy');abUI();
}
function applyPurple(){
 const p=purple;p.done=true;let n=0;
 const y0=Math.max(0,p.y-p.bh),y1=Math.min(H-1,p.y+p.bh);
 for(let y=y0;y<=y1;y++)for(let x=0;x<W;x++){const i=y*W+x,o=own[i];if(o>1&&o!==WATER){own[i]=0;terr[o]--;n++}}
 ships=ships.filter(s=>s.a===1||Math.abs(s.y-p.y)>p.bh);
 toast(`🟣 Стёрто ${n} клеток`);hap('heavy');shake(1000,8);draw();
}
function adaptStep(){
 const ts=[];for(let q=0;q<P;q++)if(q!==1&&adj[P+q]&&(q===0||terr[q]>0))ts.push(q);
 for(const q of ts)breakthrough(q,60,true);
}
const mkp=n=>Array.from({length:n},()=>({a:Math.random(),b:Math.random(),c:Math.random(),d:Math.random()}));
const clampS=(x,y)=>[Math.max(40,Math.min(VW-40,x)),Math.max(110,Math.min(VH-150,y))];
function cenS(t){
 const p=(t>0&&cn[t]>0)?t:1;if(!cn[p])return [VW/2,VH/2];
 return clampS(cam.ox+(cx[p]/cn[p]+.5)*cam.s,cam.oy+(cy[p]/cn[p]+.5)*cam.s);
}
function fx(k,o){fxs.push(Object.assign({k,t0:performance.now(),d:1000},o||{}))}
function shake(ms,a){shk=performance.now()+ms;shkAmp=a}
function gl(x,y,r,c,a){const g=vctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${c},${Math.max(0,Math.min(1,a))})`);g.addColorStop(1,`rgba(${c},0)`);vctx.fillStyle=g;vctx.beginPath();vctx.arc(x,y,r,0,6.3);vctx.fill()}
function playFx(id){
 switch(id){
  case 'blitz':fx('bolt',{d:900,bolts:Array.from({length:6},()=>({x:Math.random(),j:Array.from({length:6},()=>Math.random()-.5)}))});break;
  case 'breakthrough':{const t=pickTarget(false);fx('boom',{a:t,d:800});fx('ring',{a:t,col:'255,150,50',R:220,d:900});break}
  case 'mobil':fx('rise',{sym:'🪖',ps:mkp(14),d:1500});fx('ring',{col:'120,230,120',R:170,d:900});break;
  case 'reinforce':fx('rockets',{d:1500});break;
  case 'sabotage':fx('fire',{a:pickTarget(true),d:1400,ps:mkp(34)});break;
  case 'blessing':fx('spark',{col:'120,255,150',d:1800,ps:mkp(50)});break;
  case 'frost':fx('frost',{d:1900,ps:mkp(16)});break;
  case 'meteor':fx('meteor',{d:2000,ps:mkp(7)});shake(1500,6);break;
  case 'whirl':fx('spiral',{a:pickTarget(false),d:1600,ps:mkp(44)});break;
  case 'wedge':fx('wedge',{d:1000});break;
  case 'bombard':for(let q=2;q<=N;q++)if(terr[q]>0&&adj[P+q])fx('boom',{a:q,d:900,t0:performance.now()+Math.random()*500});break;
  case 'regen':fx('rise',{sym:'💚',ps:mkp(16),d:1900});fx('ring',{col:'90,240,150',R:190,d:1100});break;
  case 'eruption':fx('lava',{a:pickTarget(false),d:1800,ps:mkp(46)});shake(1300,7);break;
  case 'steal':fx('stream',{a:pickTarget(true),d:1400,ps:mkp(26)});break;
  case 'golden':fx('spark',{col:'255,215,90',d:2200,ps:mkp(70)});fx('ring',{col:'255,215,90',R:260,d:1300});break;
  case 'adapt':fx('wheel',{d:1600});break;
  case 'infinity':fx('shield',{d:1800});break;
 }
}
function drawFx(now){
 fxs=fxs.filter(f=>now-f.t0<f.d);
 for(const f of fxs){
  const u=(now-f.t0)/f.d;if(u<0)continue;const al=1-u,ps=f.ps||[];
  const [px,py]=cenS(f.a===undefined?1:f.a);
  vctx.save();vctx.textAlign='center';vctx.textBaseline='middle';
  switch(f.k){
   case 'bolt':
    vctx.fillStyle=`rgba(255,240,120,${.3*al*al})`;vctx.fillRect(0,0,VW,VH);
    vctx.lineWidth=3;vctx.shadowColor='#ffe34d';vctx.shadowBlur=14;
    for(const b of f.bolts){vctx.strokeStyle=`rgba(255,250,200,${al*(Math.random()<.75?1:.35)})`;vctx.beginPath();vctx.moveTo(b.x*VW,0);for(let i=1;i<=6;i++){const k=i/6;vctx.lineTo(b.x*VW+(px-b.x*VW)*k+b.j[i-1]*70*(1-k),py*k)}vctx.stroke()}
    break;
   case 'ring':vctx.strokeStyle=`rgba(${f.col},${al})`;vctx.lineWidth=8*al+1;vctx.beginPath();vctx.arc(px,py,u*f.R,0,6.3);vctx.stroke();break;
   case 'boom':gl(px,py,30+u*90,'255,170,60',.9*al);vctx.strokeStyle=`rgba(255,220,150,${al})`;vctx.lineWidth=5*al+1;vctx.beginPath();vctx.arc(px,py,u*110,0,6.3);vctx.stroke();break;
   case 'rise':vctx.globalAlpha=Math.min(1,al*1.5);for(const p of ps){vctx.font=`${16+p.d*12}px serif`;vctx.fillText(f.sym,px+(p.a-.5)*170,py+p.c*30-u*(110+p.b*90))}break;
   case 'rockets':
    for(let i=0;i<5;i++){
     const s=Math.min(1,u/.6),x0=px+(i-2)*45,y=-40+(py+40)*s;
     if(s<1){vctx.strokeStyle='rgba(255,200,100,.7)';vctx.lineWidth=4;vctx.beginPath();vctx.moveTo(x0,y-80*s);vctx.lineTo(x0,y);vctx.stroke();vctx.save();vctx.translate(x0,y);vctx.rotate(Math.PI*.75);vctx.font='28px serif';vctx.fillText('🚀',0,0);vctx.restore()}
     else{const e=(u-.6)/.4;gl(x0,py,20+e*70,'255,160,60',1.2*(1-e));vctx.strokeStyle=`rgba(255,230,170,${1-e})`;vctx.lineWidth=3;vctx.beginPath();vctx.arc(x0,py,e*60,0,6.3);vctx.stroke()}
    }
    break;
   case 'fire':
    gl(px,py,70,'255,100,30',.5*al);vctx.globalCompositeOperation='lighter';
    for(const p of ps){const x=px+(p.a-.5)*120*u+Math.sin(p.b*9+u*8)*8,y=py-u*(80+p.c*90),r=(1-u)*(8+p.d*10);vctx.fillStyle=u<.4?`rgba(255,220,90,${al})`:u<.7?`rgba(255,120,40,${al})`:`rgba(150,50,20,${al})`;vctx.beginPath();vctx.arc(x,y,r,0,6.3);vctx.fill()}
    break;
   case 'spark':
    vctx.strokeStyle=`rgba(${f.col},1)`;vctx.lineWidth=1.5;
    for(const p of ps){const x=p.a*VW,y=((p.b+u*1.2*(.6+p.c))%1)*VH,tw=.5+.5*Math.sin(u*20+p.d*9),l=3+tw*6;vctx.globalAlpha=Math.min(1,al*1.6)*tw;vctx.beginPath();vctx.moveTo(x-l,y);vctx.lineTo(x+l,y);vctx.moveTo(x,y-l);vctx.lineTo(x,y+l);vctx.stroke()}
    break;
   case 'frost':{
    vctx.fillStyle=`rgba(170,225,255,${.22*Math.min(1,al*2)})`;vctx.fillRect(0,0,VW,VH);
    const g=Math.min(1,u/.4);vctx.fillStyle=`rgba(230,246,255,${Math.min(.85,al*1.6)})`;
    ps.forEach((p,i)=>{const L=g*(60+p.b*90),w=12+p.c*10,sd=i%4;let x,y;vctx.beginPath();
     if(sd===0){x=p.a*VW;vctx.moveTo(x-w,0);vctx.lineTo(x+w,0);vctx.lineTo(x,L)}
     else if(sd===1){x=p.a*VW;vctx.moveTo(x-w,VH);vctx.lineTo(x+w,VH);vctx.lineTo(x,VH-L)}
     else if(sd===2){y=p.a*VH;vctx.moveTo(0,y-w);vctx.lineTo(0,y+w);vctx.lineTo(L,y)}
     else{y=p.a*VH;vctx.moveTo(VW,y-w);vctx.lineTo(VW,y+w);vctx.lineTo(VW-L,y)}
     vctx.fill()});
    vctx.strokeStyle=`rgba(255,255,255,${al})`;vctx.lineWidth=3;const r=20+u*60;
    for(let k=0;k<3;k++){const a=k*Math.PI/3;vctx.beginPath();vctx.moveTo(VW/2-Math.cos(a)*r,VH/2-Math.sin(a)*r);vctx.lineTo(VW/2+Math.cos(a)*r,VH/2+Math.sin(a)*r);vctx.stroke()}
    break}
   case 'meteor':
    ps.forEach(p=>{
     const s=(u-p.a*.5)/.35;if(s<0)return;const tx=.1*VW+p.b*.8*VW,ty=.15*VH+p.c*.65*VH;
     if(s<1){const hx=tx-(1-s)*220,hy=ty-(1-s)*330,gr=vctx.createLinearGradient(hx-70,hy-105,hx,hy);gr.addColorStop(0,'rgba(255,140,40,0)');gr.addColorStop(1,'rgba(255,220,120,.9)');vctx.strokeStyle=gr;vctx.lineWidth=7;vctx.beginPath();vctx.moveTo(hx-70,hy-105);vctx.lineTo(hx,hy);vctx.stroke();gl(hx,hy,18,'255,190,70',1)}
     else{const e=Math.min(1,(s-1)*3);if(e<1){gl(tx,ty,20+e*80,'255,140,40',1-e);vctx.strokeStyle=`rgba(255,220,150,${1-e})`;vctx.lineWidth=4;vctx.beginPath();vctx.arc(tx,ty,e*70,0,6.3);vctx.stroke()}}
    });break;
   case 'spiral':
    vctx.strokeStyle=`rgba(230,235,245,${al*.8})`;vctx.lineWidth=3;
    for(let k=0;k<9;k++){const w=12+k*10;vctx.beginPath();vctx.ellipse(px+Math.sin(u*14+k)*6,py-k*14,w,w*.3,0,0,6.3);vctx.stroke()}
    vctx.fillStyle=`rgba(255,255,255,${al})`;
    for(const p of ps){const an=p.a*6.28+u*12,rr=20+p.b*90;vctx.beginPath();vctx.arc(px+Math.cos(an)*rr*(.5+p.c*.7),py-p.c*130+Math.sin(an)*rr*.25,2.5,0,6.3);vctx.fill()}
    break;
   case 'wedge':
    for(const a of[-.7,0,.7]){const an=-Math.PI/2+a,L=Math.min(1,u*2)*200,tx=px+Math.cos(an)*L,ty=py+Math.sin(an)*L,w=14*(1-u*.3);
     vctx.fillStyle=`rgba(255,215,90,${al*.85})`;vctx.beginPath();vctx.moveTo(px-Math.sin(an)*w,py+Math.cos(an)*w);vctx.lineTo(px+Math.sin(an)*w,py-Math.cos(an)*w);vctx.lineTo(tx,ty);vctx.fill();
     vctx.globalAlpha=al;vctx.font='26px serif';vctx.fillText('🔱',tx,ty)}
    break;
   case 'lava':
    gl(px,py,60+30*Math.sin(u*20),'255,90,20',.8*al);vctx.globalCompositeOperation='lighter';
    for(const p of ps){const x=px+(p.a-.5)*140*u,y=py-(220+p.b*220)*u+380*u*u;vctx.fillStyle=u<.5?`rgba(255,220,80,${1-u*.8})`:`rgba(255,110,30,${1-u*.8})`;vctx.beginPath();vctx.arc(x,y,3+p.c*5*(1-u),0,6.3);vctx.fill()}
    break;
   case 'stream':{
    const d=cenS(1);gl(px,py,50,'160,60,220',.5*al);vctx.fillStyle='rgba(200,130,255,1)';
    for(const p of ps){const t=Math.max(0,Math.min(1,u*1.3-p.a*.4));if(t<=0||t>=1)continue;vctx.globalAlpha=1;vctx.beginPath();vctx.arc(px+(d[0]-px)*t+Math.sin(t*6.28+p.b*6)*18,py+(d[1]-py)*t+Math.cos(t*6.28+p.b*6)*18,3+p.c*3,0,6.3);vctx.fill()}
    break}
   case 'cleave':{
    const now2=now-f.t0;vctx.lineCap='butt';
    const sx0=cam.ox+(f.mx+.5)*cam.s,sy0=cam.oy+(f.my+.5)*cam.s;
    if(u<.1)gl(sx0,sy0,18+u*260,'255,255,255',(.1-u)*6);
    for(const k of f.cuts){
     const v=(now2-k.delay)/1000;if(v<0||v>.7)continue;
     const p0=k.pts[0],p1=k.pts[k.pts.length-1];
     const ax=cam.ox+(p0[0]+.5)*cam.s,ay=cam.oy+(p0[1]+.5)*cam.s,bx=cam.ox+(p1[0]+.5)*cam.s,by=cam.oy+(p1[1]+.5)*cam.s;
     const mx=(ax+bx)/2,my=(ay+by)/2,nx=(by-ay)*.5,ny=-(bx-ax)*.5;
     const flash=v<.06?1:Math.max(0,1-(v-.06)/.64),open=Math.min(1,v/.05)*(1-.55*Math.min(1,v/.7));
     // тонкий клинообразный разрез: чёрная щель, белая кромка, красный отсвет
     const w=Math.max(3,cam.s*2.2)*open,wr=w*3;
     const wedge=(ww,col)=>{vctx.beginPath();vctx.moveTo(ax,ay);vctx.lineTo(mx+nx*ww/Math.hypot(nx,ny),my+ny*ww/Math.hypot(nx,ny));vctx.lineTo(bx,by);vctx.lineTo(mx-nx*ww/Math.hypot(nx,ny),my-ny*ww/Math.hypot(nx,ny));vctx.closePath();vctx.fillStyle=col;vctx.fill()};
     wedge(wr,`rgba(255,40,40,${.35*flash})`);
     wedge(w*1.5,`rgba(255,255,255,${.95*flash})`);
     wedge(w*.55,`rgba(8,0,6,${.95*Math.min(1,flash*1.4)})`);
    }
    break}
   case 'wheel':
    vctx.translate(px,py);vctx.rotate(u*Math.PI*2);const sc=.6+u*.6;
    vctx.strokeStyle=`rgba(255,215,90,${al})`;vctx.fillStyle=`rgba(255,215,90,${al})`;vctx.lineWidth=4;
    vctx.beginPath();vctx.arc(0,0,70*sc,0,6.3);vctx.stroke();vctx.beginPath();vctx.arc(0,0,22*sc,0,6.3);vctx.stroke();
    for(let k=0;k<8;k++){const a=k*Math.PI/4,c=Math.cos(a),s2=Math.sin(a);vctx.beginPath();vctx.moveTo(c*22*sc,s2*22*sc);vctx.lineTo(c*92*sc,s2*92*sc);vctx.stroke();vctx.beginPath();vctx.arc(c*92*sc,s2*92*sc,7,0,6.3);vctx.fill()}
    break;
   case 'shield':
    gl(px,py,110,'120,220,255',.3*al);
    for(let k=0;k<3;k++){const r=(u*1.2-k*.18)*200+30;if(r<=30)continue;vctx.strokeStyle=`rgba(140,230,255,${al*(1-k*.2)})`;vctx.lineWidth=4;vctx.beginPath();vctx.arc(px,py,r,0,6.3);vctx.stroke()}
    vctx.globalAlpha=al;vctx.font=`${60+u*20}px serif`;vctx.fillText('♾️',px,py);
    break;
  }
  vctx.restore();
 }
}
function useAb(i){
 const id=SL[i];if(!id||cds[i]>0)return;
 const was=aim;aim=-1;
 const pw=PW[ABR[id]];
 if(id==='purple'||id==='cleave'){if(was===i){toast('Отмена');abUI();return}aim=i;toast(id==='purple'?'🟣 Нажми на карту — Фиолетовый':'🗡️ Нажми на карту — центр разрезов');abUI();return}
 if(id==='blitz'){blz=Math.round(80*pw);toast(`⚡ Блиц · ${blz/10|0} с`)}
 else if(id==='breakthrough'){
  let t=-1;
  if(lastT>=0&&(lastT===0||terr[lastT]>0)&&adj[P+lastT])t=lastT;
  else if(adj[P])t=0;
  else{let b=1e9;for(let q=2;q<=N;q++)if(terr[q]>0&&adj[P+q]&&troops[q]<b){b=troops[q];t=q}}
  if(t<0)return toast('Нет цели рядом');
  breakthrough(t,Math.round(70*pw));toast('💥 Прорыв!');
 }else if(id==='mobil'){troops[1]*=1+.3*pw;toast(`🪖 +${Math.round(30*pw)}% войск`)}
 else if(id==='reinforce'){troops[1]+=120*pw+troops[1]*.15;toast('🚀 Подкрепление прибыло')}
 else if(id==='sabotage'){const t=pickTarget(true);if(t<1)return toast('Нет врага рядом');troops[t]*=Math.max(.2,1-.35*pw);toast(`🔥 ${NAMES[t-1]} теряет войска`)}
 else if(id==='blessing'){bls=Math.round(80*pw);toast('🍀 Удача: захват дешевле')}
 else if(id==='frost'){frz=Math.round(80*pw);toast('🧊 Враги заморожены')}
 else if(id==='meteor'){for(let q=2;q<=N;q++)troops[q]*=1-.25*pw;toast('☄️ Метеорит!')}
 else if(id==='whirl'){const t=pickTarget(false);if(t<0)return toast('Нет цели рядом');breakthrough(t,Math.round(250*pw));toast('🌪️ Вихрь!')}
 else if(id==='wedge'){
  const ts=[];for(let q=0;q<P;q++)if(q!==1&&adj[P+q]&&(q===0||terr[q]>0))ts.push(q);
  if(!ts.length)return toast('Нет целей рядом');
  ts.sort((a,b)=>(a?troops[a]:0)-(b?troops[b]:0));
  for(const q of ts.slice(0,3))breakthrough(q,Math.round(60*pw));toast('🔱 Клин!');
 }
 else if(id==='bombard'){
  let c=0;for(let q=2;q<=N;q++)if(terr[q]>0&&adj[P+q]){troops[q]*=1-Math.min(.7,.28*pw);c++}
  if(!c)return toast('Нет врагов рядом');toast('💣 Бомбёжка!');
 }
 else if(id==='regen'){reg=Math.round(100*pw);toast('💚 Рост войск ×3')}
 else if(id==='eruption'){const t=pickTarget(false);if(t<0)return toast('Нет цели рядом');breakthrough(t,Math.round(250*pw));if(t>0)troops[t]*=.7;toast('🌋 Извержение!')}
 else if(id==='steal'){const t=pickTarget(true);if(t<1)return toast('Нет врага рядом');const a=troops[t]*Math.min(.6,.25*pw);troops[t]-=a;troops[1]+=a;toast(`🕵️ Украдено ${a|0} войск`)}
 else if(id==='golden'){blz=bls=Math.round(100*pw);toast('👑 Золотой век')}
 else if(id==='adapt'){adp=30;toast('☸️ Адаптация!')}
 else if(id==='infinity'){inf=150;toast('♾️ Бесконечность: тебя не атакуют 15 с')}
 playFx(id);cds[i]=Math.round(ABS[id].cd*CDM);for(let j=0;j<3;j++)if(j!==i&&cds[j]<GCD)cds[j]=GCD;abUses++;hap('heavy');abUI();
}
$('ab').onclick=e=>{const b=e.target.closest('button');if(b&&phase==='play')useAb(+b.dataset.i)};
function step(){
 tick++;
 AL=LV.adapt?Math.min(2.5,tick/6000+abUses*.05):0;
 if(LV.hell&&!unlocked&&tick%20===0&&startIsle>=0){let c=0;for(let i=0;i<W*H;i++)if(own[i]===1&&isle[i]===startIsle)c++;if(c>=islSize[startIsle]*.9)unlockIslands()}
 if(tick%10===0){incAcc+=LV.free?0:(1+.15*sv.up.i)*(LV.cm||1);const w=incAcc|0;incAcc-=w;sv.coins+=w;earned+=w;if(tick%100===0)persist()}
 for(let i=0;i<3;i++)if(cds[i]>0)cds[i]--;
 if(blz>0)blz--;if(frz>0)frz--;if(bls>0)bls--;if(reg>0)reg--;if(inf>0)inf--;if(adp>0){adp--;adaptStep()}
 if(purple&&!purple.done&&performance.now()-purple.t0>800)applyPurple();
 if(clv)tickCleave();
 if(LV.ab)abUI();
 for(let p=1;p<=N;p++)if(terr[p]>0){
  const g=(terr[p]*.0055+troops[p]*.002)*(p===1?(1+.12*sv.up.g)*(reg>0?3:1):LV.bg*(1+AL));troops[p]+=g*Math.max(0,1-troops[p]/(terr[p]*18*(p===1?1+.08*sv.up.m:1)));
 }
 if(tick%5===1)calcAdj();
 if(frz<=0)for(let p=2;p<=N;p++)if(terr[p]>0&&(tick+p*3)%(LV.bf||12)===0)(LV.smart?botAIs:botAI)(p);
 attacks=attacks.filter(k=>(k.a!==1&&frz>0)?true:runAttack(k));
 if(LV.isl){
  for(let p=2;p<=N;p++)if(terr[p]>0&&(tick+p*7)%(LV.sf||45)===0&&troops[p]>100&&frz<=0&&(!LV.hell||unlocked)&&Math.random()<.7)botShip(p);
  ships=ships.filter(s=>{if(terr[s.a]===0)return false;s.x+=s.ux*1.6;s.y+=s.uy*1.6;s.left-=1.6;if(s.left<=0){landShip(s);return false}return true});
 }
 if(W*H<1.2e5||tick%(W*H>5e5?5:W*H>2.5e5?3:2)===0)draw();hud();
 if(terr[1]===0)end(false);else if(terr[1]>=land*LV.goal)end(true);
}
const cx=new Float32Array(P),cy=new Float32Array(P),cn=new Float32Array(P);
function draw(){
 cx.fill(0);cy.fill(0);cn.fill(0);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const i=y*W+x,o=own[i];let r=baseC[i*3],g=baseC[i*3+1],b=baseC[i*3+2];
  if(o!==WATER){
   const s=sh[i];
   if(o>0){
    const c=col[o];r=r*.18+c[0]*.82;g=g*.18+c[1]*.82;b=b*.18+c[2]*.82;
    const q=(x>0&&own[i-1]!==o)||(x<W-1&&own[i+1]!==o)||(y>0&&own[i-W]!==o)||(y<H-1&&own[i+W]!==o);
    const m=q?.68:1;r*=s*m;g*=s*m;b*=s*m;if(q&&o===1&&(inf>0||adp>0)){const f=inf>0?[170,245,255]:[255,150,60];r=f[0];g=f[1];b=f[2]}cx[o]+=x;cy[o]+=y;cn[o]++;
   }else{r*=s;g*=s;b*=s}
  }
  px[i]=(255<<24)|(Math.min(255,b)<<16)|(Math.min(255,g)<<8)|Math.min(255,r)|0;
 }
 octx.putImageData(img,0,0);
}
let cam={s:1,ox:0,oy:0,fit:1},VW=1,VH=1,dpr=1;
function resize(fit){
 dpr=window.devicePixelRatio||1;VW=innerWidth;VH=innerHeight;
 view.width=VW*dpr;view.height=VH*dpr;
 const top=64,bot=($('bot').offsetHeight||120)+10,f=Math.min(VW/W,(VH-top-bot)/H);cam.fit=f;
 if(fit){cam.s=f;cam.ox=(VW-W*f)/2;cam.oy=top+(VH-top-bot-H*f)/2}
}
addEventListener('resize',()=>resize(false));
function render(){
 const nw=performance.now();if(nw<shk)view.style.transform=`translate(${(Math.random()-.5)*shkAmp}px,${(Math.random()-.5)*shkAmp}px)`;else if(view.style.transform)view.style.transform='';
 vctx.setTransform(dpr,0,0,dpr,0,0);vctx.fillStyle=`rgb(${LV.th.dp})`;vctx.fillRect(0,0,VW,VH);
 if(!own)return;
 vctx.imageSmoothingEnabled=cam.s*dpr<2.5;vctx.imageSmoothingQuality='high';vctx.drawImage(off,cam.ox,cam.oy,W*cam.s,H*cam.s);
 if(deco.length&&cam.s>=1.6){const fs=Math.min(30,cam.s*6);vctx.font=`${fs}px serif`;vctx.textAlign='center';vctx.textBaseline='middle';for(const d of deco){const x=cam.ox+(d.x+.5)*cam.s,y=cam.oy+(d.y+.5)*cam.s;if(x<-20||y<-20||x>VW+20||y>VH+20)continue;vctx.fillText(d.c,x,y)}}
 vctx.textAlign='center';vctx.textBaseline='middle';vctx.lineJoin='round';
 for(let p=1;p<=N;p++){
  if(!cn[p]||!sv.set.names)continue;
  const fs=Math.min(30,Math.sqrt(cn[p])*cam.s*.5);if(fs<8)continue;
  const x=cam.ox+cx[p]/cn[p]*cam.s+cam.s/2,y=cam.oy+cy[p]/cn[p]*cam.s+cam.s/2;
  vctx.font=`700 ${fs}px system-ui,sans-serif`;vctx.lineWidth=fs/5;vctx.strokeStyle='rgba(0,0,0,.65)';
  vctx.strokeText(NAMES[p-1],x,y);vctx.fillStyle='#fff';vctx.fillText(NAMES[p-1],x,y);
 }
 for(const s of ships){
  const x=cam.ox+(s.x+.5)*cam.s,y=cam.oy+(s.y+.5)*cam.s,fs=Math.max(15,Math.min(34,cam.s*7));
  vctx.fillStyle=`rgb(${col[s.a]})`;vctx.beginPath();vctx.arc(x,y,fs*.58,0,6.3);vctx.fill();
  vctx.font=`${fs}px serif`;vctx.fillStyle='#fff';vctx.fillText('⛵',x,y);
 }
 if(LV.para){
  const t=performance.now()/1000;
  const g=vctx.createRadialGradient(VW*.85,-20,10,VW*.85,-20,VW*1.1);g.addColorStop(0,'rgba(255,236,170,.34)');g.addColorStop(1,'rgba(255,236,170,0)');vctx.fillStyle=g;vctx.fillRect(0,0,VW,VH);
  const rc=['#ff6b8b','#ffb36b','#ffe66b','#8be58b','#6bc8ff','#b58bff'],R0=Math.min(VW,VH)*.95;
  vctx.lineWidth=7;for(let k=0;k<6;k++){vctx.strokeStyle=rc[k];vctx.globalAlpha=.14;vctx.beginPath();vctx.arc(VW*.5,VH*1.02,R0*.9-k*7,Math.PI*1.1,Math.PI*1.9);vctx.stroke()}
  vctx.fillStyle='#fff';vctx.globalAlpha=.3;
  for(let k=0;k<6;k++){const x=((t*(5+k*2)+k*170)%(VW+260))-130,y=VH*(.08+.16*k);for(const[dx,dy,r]of[[0,0,22],[24,-9,28],[52,0,22],[26,7,24]]){vctx.beginPath();vctx.arc(x+dx,y+dy,r,0,6.3);vctx.fill()}}
  vctx.strokeStyle='#fff';vctx.lineWidth=1.5;
  for(let k=0;k<16;k++){const px=Math.abs(Math.sin(k*12.9898)*43758.5453)%1*VW,py=Math.abs(Math.sin(k*78.233)*43758.5453)%1*VH,tw=.5+.5*Math.sin(t*2.2+k*1.7),l=3+tw*5;vctx.globalAlpha=tw*.85;vctx.beginPath();vctx.moveTo(px-l,py);vctx.lineTo(px+l,py);vctx.moveTo(px,py-l);vctx.lineTo(px,py+l);vctx.stroke()}
  vctx.globalAlpha=1;
 }
 if(flakes.length){
  const t=performance.now()/1000;vctx.fillStyle=LV.fc||'rgba(255,255,255,.85)';
  for(const f of flakes){f.y+=LV.rise?-f.v:f.v;if(f.y>1||f.y<0){f.y=LV.rise?1:0;f.x=Math.random()}vctx.beginPath();vctx.arc((f.x+Math.sin(t+f.p)*.02)*VW,f.y*VH,f.r,0,6.3);vctx.fill()}
 }
 if(LV.hellfx){const g=vctx.createRadialGradient(VW/2,VH/2,Math.min(VW,VH)*.3,VW/2,VH/2,Math.max(VW,VH)*.8);g.addColorStop(0,'rgba(120,10,0,0)');g.addColorStop(1,`rgba(110,10,0,${.42+.08*Math.sin(performance.now()/300)})`);vctx.fillStyle=g;vctx.fillRect(0,0,VW,VH)}
 if(flash){const dt=performance.now()-flash;if(dt>1600)flash=0;else{vctx.fillStyle=`rgba(255,120,40,${.6*(1-dt/1600)})`;vctx.fillRect(0,0,VW,VH)}}
 if(inf>0||adp>0){
  const c=inf>0?'80,200,255':'255,120,40',g2=vctx.createRadialGradient(VW/2,VH/2,Math.min(VW,VH)*.35,VW/2,VH/2,Math.max(VW,VH)*.75);
  g2.addColorStop(0,`rgba(${c},0)`);g2.addColorStop(1,`rgba(${c},${.3+.1*Math.sin(performance.now()/200)})`);vctx.fillStyle=g2;vctx.fillRect(0,0,VW,VH);
 }

 {const vg=(c,a)=>{const g=vctx.createRadialGradient(VW/2,VH/2,Math.min(VW,VH)*.4,VW/2,VH/2,Math.max(VW,VH)*.75);g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(1,`rgba(${c},${a+.05*Math.sin(nw/220)})`);vctx.fillStyle=g;vctx.fillRect(0,0,VW,VH)};
  if(blz>0)vg('255,225,80',.2);if(bls>0)vg('110,230,130',.2);if(reg>0)vg('80,240,150',.2);
  if(frz>0){vg('150,215,255',.3);vctx.fillStyle='rgba(160,220,255,.1)';vctx.fillRect(0,0,VW,VH)}}
 drawFx(nw);
 if(purple){
  const dt=(performance.now()-purple.t0)/1000;
  if(dt>2.2)purple=null;else{
   const px=cam.ox+(purple.x+.5)*cam.s,py=cam.oy+(purple.y+.5)*cam.s,bh=Math.max(14,purple.bh*cam.s);
   if(dt<.8){
    const d=(1-dt/.8)*70+4;
    for(const[o,c]of[[-d,'74,163,255'],[d,'255,59,92']]){const g=vctx.createRadialGradient(px+o,py,0,px+o,py,26);g.addColorStop(0,`rgba(${c},1)`);g.addColorStop(1,`rgba(${c},0)`);vctx.fillStyle=g;vctx.beginPath();vctx.arc(px+o,py,26,0,6.3);vctx.fill()}
   }else{
    const L=Math.min(1,(dt-.8)/.8)*(VW+Math.abs(px)+200),al=dt>1.8?(2.2-dt)/.4:1;
    const g=vctx.createLinearGradient(0,py-bh,0,py+bh);g.addColorStop(0,'rgba(168,85,247,0)');g.addColorStop(.5,`rgba(216,150,255,${.95*al})`);g.addColorStop(1,'rgba(168,85,247,0)');
    vctx.fillStyle=g;vctx.fillRect(px-L,py-bh,2*L,2*bh);
    const g3=vctx.createRadialGradient(px,py,0,px,py,60);g3.addColorStop(0,`rgba(255,255,255,${al})`);g3.addColorStop(.4,`rgba(190,110,255,${.8*al})`);g3.addColorStop(1,'rgba(168,85,247,0)');
    vctx.fillStyle=g3;vctx.beginPath();vctx.arc(px,py,60,0,6.3);vctx.fill();
   }
  }
 }
}
(function loop(){render();requestAnimationFrame(loop)})();
function hud(){
 const fly=attacks.filter(k=>k.a===1).reduce((q,k)=>q+k.tr,0);
 const ps=[];for(let p=1;p<=N;p++)if(terr[p]>0)ps.push(p);
 ps.sort((a,b)=>terr[b]-terr[a]);
 const pc=terr[1]/land*100;
 $('stats').innerHTML=`<div class="r"><b>${pc.toFixed(1)}%</b><small>цель ${Math.round(LV.goal*100)}% · #${ps.indexOf(1)+1} · 💰${sv.coins}${LV.adapt?' · 🔥+'+(AL*100|0)+'%':''}</small></div><div class="bar"><i style="width:${Math.min(100,pc/(LV.goal*100)*100)}%"></i></div>`;
 $('lb').innerHTML=ps.slice(0,4).map(p=>`<div style="${p===1?'font-weight:700':'color:var(--mut)'}"><i style="background:rgb(${col[p]})"></i>${esc(NAMES[p-1].slice(0,7))} ${(terr[p]/land*100).toFixed(0)}%</div>`).join('');
 $('tr').innerHTML=(troops[1]|0)+(fly>=1?` <small>+${fly|0} в бою</small>`:'');
 pv();
}
function pv(){const v=+$('pct').value;$('pv').textContent=phase==='play'?`Отправить ${troops[1]*v/100|0} · ${v}%`:v+'%'}
const scr=h=>{$('ov').innerHTML=`<div id="card">${h}</div>`;$('ov').style.display='flex'};
let lastShop=[],rst=0;
function menu(){
 hub='menu';clearInterval(timer);phase='menu';persist();document.documentElement.style.setProperty('--acc','#3b82f6');document.documentElement.style.setProperty('--gl','rgba(15,23,42,.66)');
 scr(`<h1>🗺️ Territory</h1><p>Захвати весь мир</p><div class="sh"><div>Баланс <b>💰 ${sv.coins}</b></div></div><button data-a="levels">▶ Играть</button><button class="s" data-a="inv">🎒 Инвентарь</button><button class="s" data-a="cases">🎁 Кейсы</button><button class="s" data-a="shop">⚡ Прокачка</button><button class="s" data-a="set">⚙️ Настройки</button><button class="s" data-a="home">← Главное меню</button>`);
}
function levels(){
 scr(`<h1>Выбор уровня</h1><p>Захвати нужную долю суши</p>${LEVELS.map((l,i)=>{const open=l&&i<=sv.done;return`<div class="lv ${open?'':'lock'}" data-a="${open?'play':''}" data-l="${i}"><span class="ic">${i<sv.done?'✅':open?i+1:l?'🔒':'🔜'}</span><div class="tx"><b>Уровень ${i+1}${l?' · '+l.t:''}</b><small>${l?l.bots+' соперников · цель '+Math.round(l.goal*100)+'%'+(l.cm?' · ×'+l.cm+' монет':'')+(l.hid?' · 4+4 острова, корабли после захвата первого':l.isl?' · '+l.isl+(l.isl<5?' острова':' островов')+', корабли':'')+(l.ab?' · способности':'')+(open?'':' · пройди предыдущий'):'Скоро'}</small></div></div>`}).join('')}<button class="s" data-a="menu">← Назад</button>`);
}
const UP={
 g:{ic:'📈',n:'Рост войск',d:'+12% за уровень',e:0},
 a:{ic:'⚔️',n:'Мощь атаки',d:'−7% потерь за уровень',e:0},
 s:{ic:'🛡️',n:'Старт. войска',d:'+40 за уровень',e:0},
 i:{ic:'💰',n:'Доход',d:'+15% монет в секунду',e:1},
 c:{ic:'⚡',n:'Скорость захвата',d:'+10% скорости атак',e:1},
 m:{ic:'📦',n:'Вместимость',d:'+8% лимита войск',e:2},
 f:{ic:'🧱',n:'Укрепления',d:'враги тратят на +10% больше',e:2}};
const EVO=[{cost:300,t:'Лимит улучшений +3. Новые: 💰 Доход, ⚡ Скорость захвата'},{cost:300,t:'Лимит улучшений +3. Новые: 📦 Вместимость, 🧱 Укрепления'}];
const upMax=k=>5+3*(sv.evo-UP[k].e),upCost=k=>(50+40*UP[k].e)*(sv.up[k]+1);
function shop(h='⚡ Прокачка',p,res){
 lastShop=[h,p,res];
 const keys=Object.keys(UP),act=keys.filter(k=>UP[k].e<=sv.evo),done=act.filter(k=>sv.up[k]>=upMax(k)).length,all=done===act.length;
 const E=EVO[sv.evo],nx=res&&res.win&&LEVELS[cur+1];
 const evoCard=E?`<div class="k evo"><span class="at">🧬</span><div class="tx"><b>Эволюция ${sv.evo+1}</b><small>${E.t}</small><small style="color:${all?'#4ade80':'var(--mut)'}">${all?'Условие выполнено':`Нужно: все улучшения на максимуме (${done}/${act.length})`}</small></div><button class="up" data-a="evo" ${all&&sv.coins>=E.cost?'':'disabled'}>🧬 ${E.cost}</button></div>`:`<div class="k evo"><span class="at">🧬</span><div class="tx"><b>Максимальная эволюция</b><small>Все улучшения раскрыты</small></div></div>`;
 scr(`${res?'':tabs('shop')}${hd(h)}<p style="margin:-6px 0 14px;color:var(--mut);font-size:13px;text-align:left">${p||`Эволюция ${sv.evo} из ${EVO.length} · улучшения действуют на всех уровнях`}</p>${evoCard}${keys.map(k=>{
  const u=UP[k];
  if(u.e>sv.evo)return`<div class="k lock"><span class="at">${u.ic}</span><div class="tx"><b>${u.n}</b><small>Откроется после эволюции ${u.e}</small></div><span>🔒</span></div>`;
  const l=sv.up[k],mx=upMax(k),c=upCost(k),max=l>=mx;
  return`<div class="k"><span class="at">${u.ic}</span><div class="tx"><b>${u.n} <span style="color:var(--mut);font-weight:400;font-size:12px">${l}/${mx}</span></b><small>${u.d}</small><div class="sg">${Array.from({length:mx},(_,q)=>`<i class="${q<l?'on':''}"></i>`).join('')}</div></div><button class="up" data-a="up" data-k="${k}" ${max||sv.coins<c?'disabled':''}>${max?'MAX':'💰 '+c}</button></div>`}).join('')}${nx?`<button data-a="play" data-l="${cur+1}">Следующий уровень →</button>`:''}${res?`<button class="${nx?'s':''}" data-a="play" data-l="${cur}">Играть снова</button>`:''}<button class="s" data-a="menu">${res?'В меню':'← Меню'}</button>`);
}
function settings(){
 const t=(k,n)=>`<div class="row"><div class="tx"><b>${n}</b></div><button class="up ${sv.set[k]?'':'off'}" data-a="tog" data-k="${k}">${sv.set[k]?'Вкл':'Выкл'}</button></div>`;
 scr(`<h1>⚙️ Настройки</h1><p>Сохраняются на устройстве</p><div class="sh"><div>Основные</div><div class="row"><div class="tx"><b>Твоё имя</b><input id="nm" class="ti" type="text" maxlength="14" placeholder="${esc(myName)}" value="${esc(sv.set.name||'')}"></div></div>${t('vib','Вибрация')}${t('names','Названия на карте')}<div class="row"><div class="tx"><b>Сила атаки по умолчанию</b><small id="dpv">${sv.set.pct}%</small><input id="dp" type="range" min="1" max="100" value="${sv.set.pct}"></div></div><div class="row"><div class="tx"><b>Сбросить прогресс</b><small>Монеты, улучшения и уровни</small></div><button class="up" data-a="reset" style="background:#dc2626">Сброс</button></div></div><button class="s" data-a="${hub}">← Назад</button>`);
}
const PW=[1,1.2,1.45,1.8,2.5];
const RAR=[{n:'Редкая',c:'#60a5fa'},{n:'Сверхредкая',c:'#34d399'},{n:'Эпическая',c:'#a855f7'},{n:'Легендарная',c:'#f59e0b'},{n:'Мифическая',c:'#ef4444'}];
const CASES=[
 {n:'Обычный кейс',ic:'📦',g:['#64748b','#334155'],pr:300,p:[60,25,10,4,1]},
 {n:'Серебряный кейс',ic:'🥈',g:['#cbd5e1','#64748b'],pr:750,p:[30,38,22,8,2]},
 {n:'Золотой кейс',ic:'🥇',g:['#fbbf24','#b45309'],pr:1800,p:[10,25,38,22,5]},
 {n:'Мифический кейс',ic:'💎',g:['#a855f7','#be123c'],pr:4500,p:[0,10,35,40,15]}];
const ABS={
 blitz:{ic:'⚡',n:'Блиц',cd:400,d:r=>`Атаки в 2,5× быстрее и на 30% дешевле · ${Math.round(8*PW[r])} с`},
 breakthrough:{ic:'💥',n:'Прорыв',cd:300,d:r=>`Бесплатно захватывает до ${Math.round(70*PW[r])} клеток`},
 mobil:{ic:'🪖',n:'Мобилиз.',cd:450,d:r=>`+${Math.round(30*PW[r])}% к войскам`},
 reinforce:{ic:'🚀',n:'Подкрепл.',cd:250,fix:0,d:r=>`+${Math.round(120*PW[r])} войск и +15%`},
 sabotage:{ic:'🔥',n:'Диверсия',cd:300,fix:0,d:r=>`Враг-цель теряет ${Math.round(35*PW[r])}% войск`},
 blessing:{ic:'🍀',n:'Удача',cd:400,fix:0,d:r=>`Захват на 60% дешевле · ${Math.round(8*PW[r])} с`},
 frost:{ic:'🧊',n:'Заморозка',cd:500,fix:1,d:r=>`Враги замирают на ${Math.round(8*PW[r])} с`},
 meteor:{ic:'☄️',n:'Метеорит',cd:600,fix:1,d:r=>`Все враги теряют ${Math.round(25*PW[r])}% войск`},
 whirl:{ic:'🌪️',n:'Вихрь',cd:600,fix:1,d:r=>`Бесплатно берёт до ${Math.round(250*PW[r])} клеток`},
 wedge:{ic:'🔱',n:'Клин',cd:600,fix:2,d:r=>`Бесплатно берёт ${Math.round(60*PW[r])} клеток у каждого из 3 соседей`},
 bombard:{ic:'💣',n:'Бомбёжка',cd:500,fix:2,d:r=>`Все соседние враги теряют ${Math.min(70,Math.round(28*PW[r]))}% войск`},
 regen:{ic:'💚',n:'Регенер.',cd:450,fix:2,d:r=>`Рост войск ×3 на ${Math.round(10*PW[r])} с`},
 eruption:{ic:'🌋',n:'Извержение',cd:900,fix:3,d:r=>`Берёт до ${Math.round(250*PW[r])} клеток, враг теряет 30% войск`},
 steal:{ic:'🕵️',n:'Кража',cd:700,fix:3,d:r=>`Крадёт ${Math.round(Math.min(60,25*PW[r]))}% войск у соседа себе`},
 golden:{ic:'👑',n:'Зол. век',cd:1000,fix:3,d:r=>`Захват дешевле на 60% и в 2,5× быстрее · ${Math.round(10*PW[r])} с`},
 purple:{ic:'🟣',n:'Фиолетовый',cd:1500,fix:4,d:r=>`Тап по карте: стирает всех врагов в полосе из ${2*Math.round(10*PW[r])+1} рядов по всей ширине`},
 adapt:{ic:'☸️',n:'Адаптация',cd:1800,fix:4,d:r=>`3 с: урон по тебе почти не проходит, а ты без остановки захватываешь всех соседей`},
 infinity:{ic:'♾️',n:'Бесконечность',cd:2000,fix:4,d:r=>`15 с: тебя никто не может атаковать`},
 cleave:{ic:'🗡️',n:'Рассечение',cd:1200,fix:4,d:r=>`Тап по карте: 20 тонких прямых рассечений сериями рядом с точкой, стирая клетки врагов и часть войск`}};
function openCase(ci){
 const c=CASES[ci];sv.coins-=c.pr;
 const r=rollR(c.p),ids=Object.keys(ABS),pool=ids.filter(k=>ABS[k].fix===undefined||ABS[k].fix===r),id=pool[Math.random()*pool.length|0],old=sv.ab[id];let note;
 if(old===undefined){sv.ab[id]=r;note='Новая способность!';const k=sv.slots.indexOf(null);if(k>=0)sv.slots[k]=id}
 else if(r>old){sv.ab[id]=r;note='Улучшено!'}
 else{const b=Math.round(c.pr*.4);sv.coins+=b;note=`Дубликат · +${b} 💰`}
 persist();hap(r>=3?'heavy':'medium');return{id,r,note};
}
const tabs=a=>`<div class="tabs">${[['inv','🎒 Инвентарь'],['cases','🎁 Кейсы'],['shop','⚡ Прокачка']].map(([k,n])=>`<button data-a="${k}" class="${k===a?'on':''}">${n}</button>`).join('')}</div>`;
const hd=t=>`<div class="hd"><h1>${t}</h1><div class="coin">💰 ${sv.coins}</div></div>`;
function inv(){
 const slots=[0,1,2].map(i=>{const id=sv.slots[i],c=id&&RAR[sv.ab[id]].c;return`<div class="slot ${id?'':'e'}" ${id?`data-a="unq" data-i="${i}" style="border-color:${c};box-shadow:0 0 16px ${c}55;background:radial-gradient(circle at 50% 30%,${c}33,transparent 75%)"`:''}>${id?ABS[id].ic+'<small>'+ABS[id].n+'</small>':'+'}</div>`}).join('');
 const list=Object.keys(ABS).map(id=>{
  const r=sv.ab[id],a=ABS[id],c=r!==undefined&&RAR[r].c;
  const pp=`<div class="pp">${[0,1,2,3,4].map(k=>`<i style="background:${r!==undefined&&k<=r?RAR[k].c:'rgba(255,255,255,.15)'}"></i>`).join('')}</div>`;
  if(r===undefined)return`<div class="k lock"><span class="at">${a.ic}</span><div class="tx"><b>${a.n}</b><small>${a.fix!==undefined?'Не получена · редкость «'+RAR[a.fix].n+'»':'Не получена · выпадает из кейсов'}</small>${pp}</div><span style="font-size:18px">🔒</span></div>`;
  const eq=sv.slots.includes(id);
  return`<div class="k" style="border-color:${c}88;background:linear-gradient(135deg,${c}26,rgba(255,255,255,.03))"><span class="at" style="border-color:${c};box-shadow:0 0 14px ${c}66;background:radial-gradient(circle,${c}44,transparent 75%)">${a.ic}</span><div class="tx"><div><b>${a.n}</b><span class="bd" style="background:${c}">${RAR[r].n}</span></div><small>${a.d(r)}</small>${pp}</div><button class="up ${eq?'off':''}" data-a="eq" data-id="${id}">${eq?'Снять':'В слот'}</button></div>`}).join('');
 scr(`${tabs('inv')}${hd('🎒 Инвентарь')}<div class="sec">Слоты<small>работают на уровне 2</small></div><div class="slots">${slots}</div><div class="sec">Способности</div>${list}<button class="s" data-a="menu">← Меню</button>`);
}
function cases(drop){
 const dc=drop&&RAR[drop.r].c;
 scr(`${tabs('cases')}${hd('🎁 Кейсы')}${drop?`<div class="drop" style="border-color:${dc};box-shadow:0 0 28px ${dc}66;background:radial-gradient(circle at 50% 0,${dc}33,transparent 75%)"><div style="font-size:38px">${ABS[drop.id].ic}</div><b style="color:${dc}">${RAR[drop.r].n}</b><div>${ABS[drop.id].n}</div><small style="color:var(--mut)">${drop.note}</small></div>`:''}
 ${CASES.map((c,i)=>`<div class="cs" style="border-color:${c.g[0]}55;background:linear-gradient(135deg,${c.g[0]}22,rgba(255,255,255,.03))"><div class="ch"><span class="ct" style="background:linear-gradient(145deg,${c.g[0]},${c.g[1]});box-shadow:0 6px 18px ${c.g[0]}66">${c.ic}</span><div class="tx"><b style="font-size:16px">${c.n}</b><small>1 способность</small></div><button class="up" data-a="case" data-c="${i}" ${sv.coins<c.pr?'disabled':''}>💰 ${c.pr}</button></div><div class="ob">${RAR.map((r,k)=>c.p[k]?`<i style="flex:${c.p[k]};background:${r.c}"></i>`:'').join('')}</div><div class="lg">${RAR.map((r,k)=>`<div style="opacity:${c.p[k]?1:.3}"><small style="color:${r.c}">${r.n}</small><b>${c.p[k]}%</b></div>`).join('')}</div></div>`).join('')}
 <button class="s" data-a="menu">← Меню</button>`);
}
let ct1,ct2,ci,animDrop;
function rollR(p){let x=Math.random()*100,r=0;for(;r<4;r++){if(x<p[r])break;x-=p[r]}return r}
function skipCase(){clearTimeout(ct1);clearTimeout(ct2);clearInterval(ci);cases(animDrop)}
function caseAnim(drop,cw){
 animDrop=drop;
 const ids=Object.keys(ABS),n=44,win=38,items=[];
 for(let i=0;i<n;i++)items.push(i===win?drop:{id:ids[Math.random()*ids.length|0],r:rollR(cw)});
 scr(`<h1 id="ct">🎁 Открываем кейс…</h1><div id="rl"><div id="rs">${items.map((it,i)=>`<div class="ri" id="ri${i}" style="border-color:${RAR[it.r].c};background:${RAR[it.r].c}22;color:${RAR[it.r].c}"><span style="filter:none">${ABS[it.id].ic}</span></div>`).join('')}</div><div id="rm"></div></div><button class="s" data-a="skip">Пропустить</button>`);
 const rs=$('rs'),w=$('rl').offsetWidth,el=$('ri'+win),c=el.offsetLeft+el.offsetWidth/2+(Math.random()*40-20);
 rs.style.transform='translateX(0)';rs.getBoundingClientRect();
 rs.style.transition='transform 4.6s cubic-bezier(.1,.72,.1,1)';
 rs.style.transform=`translateX(${w/2-c}px)`;
 let t=0;ci=setInterval(()=>{t+=110;if(t<3600)hap('light');else clearInterval(ci)},110);
 ct1=setTimeout(()=>{
  $('ri'+win).classList.add('win');$('ct').innerHTML=`<span style="color:${RAR[drop.r].c}">${RAR[drop.r].n}!</span>`;hap(drop.r>=3?'heavy':'medium');
  ct2=setTimeout(()=>cases(drop),1100);
 },4800);
}
let hub='home',cust=null,custMask=null,custPrev='';
const SIZES={S:[200,300],M:[300,450],L:[460,690],XL:[650,975]};
const FPS={
 bots:['Противников',1,22,1,v=>v],bg:['Рост врагов',.3,8,.1,v=>'×'+(+v).toFixed(1)],bs:['Старт. войска врагов',100,6000,100,v=>v],
 ag:['Агрессия',0,100,5,v=>v+'%'],bf:['Реакция врагов',2,24,1,v=>(v/10).toFixed(1)+' с'],goal:['Цель захвата',30,100,5,v=>v+'%'],
 cd:['Перезарядка способностей',0,3,.25,v=>'×'+(+v)],gcd:['Общий таймаут между способностями',0,30,1,v=>v+' с'],
 isl:['Островов',2,10,1,v=>v],th:['Порог яркости',0,255,5,v=>v]};
const FPP=[{bots:4,bg:.6,bs:150,ag:20,bf:16,smart:0,adapt:0,focus:0},{bots:8,bg:1.2,bs:300,ag:50,bf:12,smart:0,adapt:0,focus:0},{bots:14,bg:2.5,bs:1000,ag:80,bf:5,smart:1,adapt:0,focus:1},{bots:22,bg:5,bs:3000,ag:100,bf:3,smart:1,adapt:1,focus:1}];
function home(){
 hub='home';clearInterval(timer);phase='menu';persist();
 document.documentElement.style.setProperty('--acc','#3b82f6');document.documentElement.style.setProperty('--gl','rgba(15,23,42,.66)');
 scr(`<h1>🗺️ Territory</h1><p>Выбери режим игры</p><button data-a="menu">🏆 Карьера<br><small style="font-weight:400;opacity:.8">5 уровней, прокачка, кейсы, способности</small></button><button class="s" data-a="fp">🎮 Свободная игра<br><small style="font-weight:400;opacity:.8">свои карты, настройка врагов и способностей</small></button><button class="s" data-a="set">⚙️ Настройки</button>`);
}
function freePlay(note){
 const f=sv.fp;
 const sel=(k,opts,v)=>`<select class="ti" data-fp="${k}">${opts.map(([val,n])=>`<option value="${val}" ${val==v?'selected':''}>${n}</option>`).join('')}</select>`;
 const sl=k=>{const a=FPS[k];return`<div class="fr"><div class="t"><span>${a[0]}</span><b id="l_${k}">${a[4](f[k])}</b></div><input type="range" data-fp="${k}" min="${a[1]}" max="${a[2]}" step="${a[3]}" value="${f[k]}"></div>`};
 const tg=(k,n)=>`<button class="${f[k]?'on':''}" data-a="fpt" data-k="${k}">${n}: ${f[k]?'вкл':'выкл'}</button>`;
 const abo=[['','— пусто —'],...Object.keys(ABS).map(id=>[id,ABS[id].ic+' '+ABS[id].n])];
 const cu=f.map==='custom'?`<div class="fr"><div class="t"><span>Картинка карты</span></div><input id="cf" type="file" accept="image/*" class="ti"></div>${cust?`<img id="cp" src="${custPrev}" style="width:100%;border-radius:12px;margin:6px 0">`:'<p style="font-size:12px;color:var(--mut);text-align:left;margin:6px 0">Светлое — суша, тёмное — вода (или прозрачность у PNG). Отдельные острова связываются кораблями.</p>'}${sl('th')}<div class="ag">${tg('inv','Инвертировать')}</div>`:'';
 scr(`<h1>🎮 Свободная игра</h1><p>${note||'Настрой партию как хочешь'}</p>
 <div class="sec">Пресеты врагов</div><div class="ag"><button data-a="fppre" data-p="0">Лёгкий</button><button data-a="fppre" data-p="1">Обычный</button><button data-a="fppre" data-p="2">Сложный</button><button data-a="fppre" data-p="3">Кошмар</button></div>
 <div class="sec">Карта</div>${sel('map',[['cont','Материк'],['arch','Архипелаг (корабли)'],['atoll','Два атолла'],['custom','Своя картинка']],f.map)}${sel('theme',[[0,'Стиль: Остров'],[1,'Стиль: Пустыня'],[2,'Стиль: Снег'],[3,'Стиль: Рай'],[4,'Стиль: Ад']],f.theme)}${sel('size',[['S','Малая 200×300'],['M','Средняя 300×450'],['L','Большая 460×690'],['XL','Огромная 650×975 (тяжело)']],f.size)}
 ${f.map==='arch'?sl('isl'):''}${cu}
 <div class="sec">Противники</div>${sl('bots')}${sl('bg')}${sl('bs')}${sl('ag')}${sl('bf')}<div class="ag">${tg('smart','Умные')}${tg('adapt','Адаптация')}${tg('focus','Бьют игрока')}</div>
 <div class="sec">Победа</div>${sl('goal')}
 <div class="sec">Способности (все доступны)</div>${[0,1,2].map(k=>sel('slot'+k,abo,f.slots[k]||'')).join('')}${sel('rar',RAR.map((r,i)=>[i,'Сила: '+r.n]),f.rar)}${sl('cd')}${sl('gcd')}
 <button data-a="fpplay">▶ Начать игру</button><button class="s" data-a="home">← Назад</button>`);
}
function fpLevel(){
 const f=sv.fp,src=LEVELS[+f.theme],[w,h]=SIZES[f.size]||SIZES.M;
 const L={t:'Свободная игра',free:1,w,h,goal:f.goal/100,bots:f.bots,bg:+f.bg,ag:f.ag/100,bs:+f.bs,bf:+f.bf,bp:.1+f.ag/500,bc:f.bg>=3?.5:1,bsp:f.bg>=3?1.6:1,sf:f.bf*5,sp:Math.max(150,Math.min(585,w*h/400|0)),smart:f.smart,adapt:f.adapt,focus:f.focus,ab:1,sr:230,
  snow:src.snow,rise:src.rise,fc:src.fc,hellfx:src.hellfx,para:src.para,gl:src.gl,flat:src.flat,th:src.th};
 if(f.map==='arch'){L.isl=+f.isl;L.isc=w/460*1.2}
 else if(f.map==='atoll'){L.isl=2;L.fixed=1;L.ir=w*.3;L.lagoon=1;L.deco=1}
 else if(f.map==='custom'){L.custom=1;L.isl=1;L.w=cust.w;L.h=cust.h}
 return L;
}
function startFree(){
 if(sv.fp.map==='custom'){if(!cust)return freePlay('Сначала загрузи картинку');buildMask();let c=0;for(const v of custMask)c+=v;if(c<500)return freePlay('Слишком мало суши — поправь порог')}
 LV=fpLevel();newGame();
}
function buildMask(){
 if(!cust)return;const f=sv.fp,{w,h,lum,al}=cust,m=new Uint8Array(w*h);
 for(let y=3;y<h-3;y++)for(let x=3;x<w-3;x++){const i=y*w+x;m[i]=al[i]>40&&(f.inv?lum[i]<=f.th:lum[i]>f.th)?1:0}
 custMask=m;
 const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d'),im=g.createImageData(w,h),p=new Uint32Array(im.data.buffer);
 for(let i=0;i<w*h;i++)p[i]=m[i]?0xff5ac86e:0xff7a4a1c;
 g.putImageData(im,0,0);custPrev=c.toDataURL();
}
function loadCust(file){
 const img=new Image();
 img.onload=()=>{
  const m=Math.min(1,600/Math.max(img.width,img.height)),w=Math.max(60,Math.round(img.width*m)),h=Math.max(60,Math.round(img.height*m));
  const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(img,0,0,w,h);
  const d=g.getImageData(0,0,w,h).data,lum=new Uint8Array(w*h),al=new Uint8Array(w*h);
  for(let i=0;i<w*h;i++){lum[i]=.3*d[i*4]+.59*d[i*4+1]+.11*d[i*4+2];al[i]=d[i*4+3]}
  cust={w,h,lum,al};buildMask();freePlay('Карта загружена ✓');
 };
 img.onerror=()=>freePlay('Не удалось открыть картинку');
 img.src=URL.createObjectURL(file);
}
function customMap(e){
 const m=custMask,n=W*H,d=new Float32Array(n);
 for(let i=0;i<n;i++)d[i]=m[i]?1e4:0;
 for(let y=1;y<H;y++)for(let x=1;x<W;x++){const i=y*W+x;if(d[i])d[i]=Math.min(d[i],d[i-1]+1,d[i-W]+1)}
 for(let y=H-2;y>=0;y--)for(let x=W-2;x>=0;x--){const i=y*W+x;if(d[i])d[i]=Math.min(d[i],d[i+1]+1,d[i+W]+1)}
 const lab=new Uint8Array(n),st=new Int32Array(n);isl=[];
 for(let i=0;i<n;i++){
  if(!m[i]||lab[i])continue;
  let sp=0,c=0,sx=0,sy=0;const spots=[],cells=[];st[sp++]=i;lab[i]=1;
  while(sp){const j=st[--sp];c++;sx+=j%W;sy+=j/W|0;cells.push(j);if(spots.length<300)spots.push(j);else{const r=Math.random()*c|0;if(r<300)spots[r]=j}
   for(const k of[j-1,j+1,j-W,j+W])if(m[k]&&!lab[k]){lab[k]=1;st[sp++]=k}}
  if(c<150){for(const j of cells)m[j]=0}else isl.push({x:sx/c,y:sy/c,r:Math.sqrt(c/3.14),spots});
 }
 for(let i=0;i<n;i++)e[i]=m[i]?Math.min(d[i],40)/40+.001:-1;
}
function fpInput(e){
 const t=e.target,k=t.dataset&&t.dataset.fp;if(!k)return;
 const f=sv.fp;let v=t.value;
 if(k.startsWith('slot'))f.slots[+k[4]]=v||null;
 else{f[k]=(t.type==='range'||k==='theme'||k==='rar')?+v:v}
 persist();
 if(FPS[k]&&$('l_'+k))$('l_'+k).textContent=FPS[k][4](f[k]);
 if(k==='th'){buildMask();if($('cp'))$('cp').src=custPrev}
 else if(k==='map'||k==='theme'||k==='size')freePlay();
}
$('ov').addEventListener('input',fpInput);
$('ov').addEventListener('change',e=>{if(e.target.id==='cf'&&e.target.files[0])loadCust(e.target.files[0])});
function pause(){clearInterval(timer);phase='paused';scr(`<h1>Пауза</h1><p>${LV.free?'Свободная игра':'Уровень '+(cur+1)+' · '+LV.t}</p><button data-a="resume">▶ Продолжить</button><button class="s" data-a="${LV.free?'home':'menu'}">В меню (раунд будет потерян)</button>`)}
$('mb').onclick=()=>{if(phase==='play')pause();else if(phase==='pick')menu()};
$('ov').addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');if(!b||b.disabled||!b.dataset.a)return;
 const a=b.dataset.a,d=b.dataset;
 if(a==='levels')levels();else if(a==='shop')shop();else if(a==='set')settings();else if(a==='menu')menu();else if(a==='inv')inv();else if(a==='cases')cases();
 else if(a==='case'){const c=CASES[+d.c];if(sv.coins>=c.pr)caseAnim(openCase(+d.c),c.p)}
 else if(a==='skip')skipCase()
 else if(a==='eq'){const k=sv.slots.indexOf(d.id);if(k>=0)sv.slots[k]=null;else{const f=sv.slots.indexOf(null);if(f>=0)sv.slots[f]=d.id}persist();inv()}
 else if(a==='home')home();else if(a==='fp')freePlay();else if(a==='fpplay')startFree();
 else if(a==='fppre'){Object.assign(sv.fp,FPP[+d.p]);persist();freePlay('Пресет применён ✓')}
 else if(a==='fpt'){sv.fp[d.k]=sv.fp[d.k]?0:1;if(d.k==='inv')buildMask();persist();freePlay()}
 else if(a==='unq'){sv.slots[+d.i]=null;persist();inv()}
 else if(a==='play'){cur=+d.l;LV=LEVELS[cur];newGame()}
 else if(a==='resume'){phase='play';$('ov').style.display='none';timer=setInterval(step,100)}
 else if(a==='evo'){const E=EVO[sv.evo];if(E&&sv.coins>=E.cost&&Object.keys(UP).filter(k=>UP[k].e<=sv.evo).every(k=>sv.up[k]>=upMax(k))){sv.coins-=E.cost;sv.evo++;persist();hap('heavy');shop(...lastShop)}}
 else if(a==='up'){const c=upCost(d.k);if(sv.coins>=c&&sv.up[d.k]<upMax(d.k)){sv.coins-=c;sv.up[d.k]++;persist();hap('light');shop(...lastShop)}}
 else if(a==='tog'){sv.set[d.k]=sv.set[d.k]?0:1;persist();hap('light');settings()}
 else if(a==='reset'){
  if(!rst){rst=1;b.textContent='Точно?';setTimeout(()=>rst=0,3000);return}
  sv.coins=0;sv.up={g:0,a:0,s:0,i:0,c:0,m:0,f:0};sv.evo=0;sv.done=0;sv.ab={};sv.slots=[null,null,null];persist();rst=0;settings();
 }
});
$('ov').addEventListener('input',e=>{if(e.target.id==='nm'){sv.set.name=e.target.value.slice(0,14);persist()}
 if(e.target.id==='dp'){sv.set.pct=+e.target.value;$('dpv').textContent=e.target.value+'%';persist()}});
function end(win){
 clearInterval(timer);phase='over';
 if(LV.free){scr(`<h1>${win?'🏆 Победа!':'💀 Поражение'}</h1><p>Свободная игра · монеты не начисляются</p><button data-a="fpplay">Играть снова</button><button class="s" data-a="fp">⚙️ Настройки партии</button><button class="s" data-a="home">Главное меню</button>`);hap(win?'heavy':'rigid');return}
 if(win){sv.coins+=200*(LV.cm||1);sv.done=Math.max(sv.done,cur+1)}persist();
 shop(win?`🏆 Уровень ${cur+1} пройден!`:'💀 Поражение',`За выживание: +${earned} 💰${win?' · бонус за победу +'+200*(LV.cm||1)+' 💰':''}`,{win});hap(win?'heavy':'rigid');
}
let tt;function toast(m){const t=$('toast');t.textContent=m;t.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>t.style.opacity=0,1800)}
function tap(sx,sy){
 const x=Math.floor((sx-cam.ox)/cam.s),y=Math.floor((sy-cam.oy)/cam.s);
 if(x<0||y<0||x>=W||y>=H)return;
 if(aim>=0&&phase==='play'){fireAim(x,y);return}
 const t=own[y*W+x];
 if(phase==='pick'){
  if(t!==0)return toast('Выбери свободную сушу');
  spawn(1,x,y);troops[1]+=40*sv.up.s;if(LV.hell)startIsle=isle[y*W+x];startBots(x,y);calcAdj();phase='play';draw();hud();timer=setInterval(step,100);hap('medium');return;
 }
 if(phase!=='play'||t===1||t===WATER)return;
 const ex=attacks.findIndex(k=>k.a===1&&k.t===t);
 if(ex>=0){const k=attacks.splice(ex,1)[0];troops[1]+=k.tr;hap('rigid');return toast(`Атака отменена · вернулось ${k.tr|0}`)}
 const amt=troops[1]*($('pct').value/100);
 if(amt<5)return toast('Мало войск');
 if(!(adj[P+t]&&(!LV.isl||onMass(comp[y*W+x])))){
  if(!LV.isl)return toast('Нет общей границы');
  if(LV.hell&&!unlocked)return toast('🔒 Другие острова недоступны, пока не захвачен твой');
  if(launchShip(1,x,y,amt)){hap('medium');return toast(`⛵ Корабль отправлен · ${amt|0} войск`)}
  return toast('Корабль не доплывёт');
 }
 lastT=t;launch(1,t,amt);hap('light');toast(`Атака · ${amt|0} войск (тап ещё раз — отмена)`);
}
function zoomAt(x,y,f){
 const ns=Math.max(cam.fit*.9,Math.min(30,cam.s*f)),k=ns/cam.s;
 cam.ox=x-(x-cam.ox)*k;cam.oy=y-(y-cam.oy)*k;cam.s=ns;
}
const ptr=new Map();let multi=false,prev=null;
const rel=e=>{const r=view.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
view.addEventListener('pointerdown',e=>{
 view.setPointerCapture(e.pointerId);const p=rel(e);ptr.set(e.pointerId,{...p,x0:p.x,y0:p.y});
 if(ptr.size>1){multi=true;prev=pinchInfo()}
});
function pinchInfo(){const a=[...ptr.values()];return{d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)||1,mx:(a[0].x+a[1].x)/2,my:(a[0].y+a[1].y)/2}}
view.addEventListener('pointermove',e=>{
 const q=ptr.get(e.pointerId);if(!q)return;const p=rel(e);
 if(ptr.size===1){cam.ox+=p.x-q.x;cam.oy+=p.y-q.y;q.x=p.x;q.y=p.y}
 else{q.x=p.x;q.y=p.y;const c=pinchInfo();zoomAt(c.mx,c.my,c.d/prev.d);cam.ox+=c.mx-prev.mx;cam.oy+=c.my-prev.my;prev=c}
});
const up=e=>{
 const q=ptr.get(e.pointerId);if(!q)return;ptr.delete(e.pointerId);
 if(!multi&&e.type==='pointerup'&&Math.hypot(q.x-q.x0,q.y-q.y0)<8)tap(q.x,q.y);
 if(ptr.size===0)multi=false;
};
view.addEventListener('pointerup',up);view.addEventListener('pointercancel',up);
view.addEventListener('wheel',e=>{e.preventDefault();const p=rel(e);zoomAt(p.x,p.y,e.deltaY<0?1.15:1/1.15)},{passive:false});
document.addEventListener('visibilitychange',()=>{persist();if(document.hidden&&phase==='play')pause()});$('pct').oninput=pv;pv();
home();
