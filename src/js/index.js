const Q=s=>Q.d.querySelector(s);Q.d=document;
const M=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const R=(a,f)=>a.reduce((s,x)=>s+f(x),0);
const BR=d=>d.split('-').reverse().join('/');
// Segmento fica no cadastro do ativo, não em cada lançamento
const AS={QQQI11:['ETF','-'],COIN11:['ETF','-'],CASA11:['ETF','-'],KNRI11:['FII','TIJOLO'],XPML11:['FII','TIJOLO'],BTLG11:['FII','TIJOLO'],CPTS11:['FII','PAPEL'],MXRF11:['FII','PAPEL'],BBAS3:['STONK','-'],KLBN3:['STONK','-']};
const opts=Object.keys(AS).map(t=>`<option>${t}</option>`).join('');
Q('#pt').innerHTML=opts;Q('#bt').innerHTML=opts;
const SEED=`QQQI11,250908,7.09
KNRI11,250912,30
MXRF11,250912,0.9
CPTS11,250917,12.83
BTLG11,250925,22.91
XPML11,250925,27.6
QQQI11,251008,6.97
KNRI11,251014,30
MXRF11,251014,0.9
CPTS11,251017,13.59
BTLG11,251024,23.7
XPML11,251024,27.6
QQQI11,251110,7.12
COIN11,251110,1.57
MXRF11,251114,0.9
KNRI11,251114,30
CPTS11,251119,13.59
XPML11,251125,27.6
BTLG11,251125,23.7
QQQI11,251208,6.95
COIN11,251208,1.23
BBAS3,251211,6.68
BBAS3,251212,4.26
KNRI11,251212,30
MXRF11,251212,0.9
CPTS11,251217,13.59
XPML11,251223,27.6
BTLG11,251223,23.7
QQQI11,260109,8.32
COIN11,260109,2.47
MXRF11,260115,0.9
KNRI11,260115,37.5
CPTS11,260120,13.59
BTLG11,260123,23.7
XPML11,260123,27.6
QQQI11,260209,7.96
COIN11,260209,2.5
MXRF11,260213,1
KNRI11,260213,26.4
CPTS11,260220,13.59
XPML11,260225,27.6
BTLG11,260225,24
BBAS3,260305,16.6
BBAS3,260305,0.38
QQQI11,260309,7.46
COIN11,260309,4.42
BBAS3,260311,5.38
KNRI11,260313,33
MXRF11,260313,1
CPTS11,260318,13.59
BTLG11,260325,24
XPML11,260325,27.6
QQQI11,260409,7.38
COIN11,260409,4.52
MXRF11,260415,0.95
KNRI11,260415,33
CPTS11,260420,13.59
BTLG11,260424,24.3
XPML11,260424,27.6
COIN11,260511,4.42
QQQI11,260511,7.3
MXRF11,260515,1
KNRI11,260515,33
CPTS11,260520,13.59
XPML11,260525,27.6
BTLG11,260525,24.3
QQQI11,260608,9.27
COIN11,260608,6.22
BBAS3,260611,12.14
QQQI11,260612,0.4
MXRF11,260615,1
KNRI11,260615,33
CPTS11,260622,13.59
XPML11,260625,27.6
BTLG11,260625,24.3
COIN11,260708,5.14
QQQI11,260708,9.66
MXRF11,260714,1
KNRI11,260714,41.4
CPTS11,260721,13.59
BTLG11,260724,24.3
XPML11,260724,27.6
QQQI11,260810,9.36
COIN11,260810,9.47
MXRF11,260814,1
KNRI11,260814,33
CPTS11,260821,13.59
BTLG11,260825,24.3
XPML11,260825,27.3
CASA11,260909,0.68
COIN11,260909,9.44
QQQI11,260909,9.85
BBAS3,260911,0.2
BBAS3,260911,11.77
MXRF11,260915,1
KNRI11,260915,33
CPTS11,260922,13.59
BTLG11,260925,24.3
XPML11,260925,27.6
CASA11,261008,0.65
QQQI11,261008,9.46
COIN11,261008,10.67
KNRI11,261015,33
MXRF11,261015,1`.split('\n').map(l=>{const[t,d,v]=l.split(',');return{t,d:`20${d.slice(0,2)}-${d.slice(2,4)}-${d.slice(4)}`,v:+v}});

let P=null,B=null,G=150;
try{P=JSON.parse(localStorage.getItem('p'));B=JSON.parse(localStorage.getItem('b'));G=+localStorage.getItem('g')||150}catch(e){}
P=P||SEED;B=B||[{t:'KLBN3',d:'2026-10-09',q:62,p:3.74}];
const save=()=>{try{localStorage.setItem('p',JSON.stringify(P));localStorage.setItem('b',JSON.stringify(B))}catch(e){}};
const today=new Date().toISOString().slice(0,10);

const CH={};
function mk(id,cfg){
  if(typeof Chart==='undefined')return;
  Chart.defaults.color=getComputedStyle(document.body).color;
  Chart.defaults.borderColor='rgba(128,128,128,.25)';
  if(CH[id])CH[id].destroy();
  cfg.options=Object.assign({responsive:true,maintainAspectRatio:false},cfg.options);
  CH[id]=new Chart(Q('#'+id),cfg);
}

function dash(){
  const cm=today.slice(0,7),L=m=>m.slice(5)+'/'+m.slice(2,4);
  const ms=[...new Set(P.map(x=>x.d.slice(0,7)))].sort();
  const inM=m=>P.filter(x=>x.d.slice(0,7)===m);
  const tot=ms.map(m=>R(inM(m),x=>x.v));
  const full=ms.filter(m=>m<cm).slice(-12);
  const avg=full.length?R(full,m=>R(inM(m),x=>x.v))/full.length:0;
  const got=R(P.filter(x=>x.d<=today),x=>x.v),pend=R(P.filter(x=>x.d>today),x=>x.v);
  Q('#cards').innerHTML=`<div class="c h"><small>Média mensal (últimos 12 meses fechados)</small><b>${M(avg)}</b></div>
  <div class="c"><small>Recebido até hoje</small><b>${M(got)}</b></div>
  <div class="c"><small>A receber (datas futuras)</small><b>${M(pend)}</b></div>
  <div class="c"><small>Meta mensal (R$) <input id="meta" type="number" value="${G}" style="width:80px"></small><b>${(avg/G*100).toFixed(0)}%</b><div class="bar"><i style="width:${Math.min(100,avg/G*100)}%"></i></div></div>`;
  Q('#meta').onchange=e=>{G=+e.target.value||150;try{localStorage.setItem('g',G)}catch(_){}dash()};

  const ty=['FII','ETF','STONK'],col=['#0f766e','#d97706','#64748b'];
  mk('c1',{type:'bar',data:{labels:ms.map(L),datasets:[
    ...ty.map((t,i)=>({label:t,data:ms.map(m=>R(inM(m).filter(x=>AS[x.t][0]===t),x=>x.v)),backgroundColor:col[i],stack:'s'})),
    {type:'line',label:'Média 3 meses',data:tot.map((_,i)=>R(tot.slice(Math.max(0,i-2),i+1),v=>v)/Math.min(3,i+1)),borderColor:'#ef4444',tension:.3,pointRadius:2}
  ]},options:{scales:{x:{stacked:true},y:{stacked:true}}}});

  let a=0;
  mk('c2',{type:'line',data:{labels:ms.map(L),datasets:[{label:'Acumulado',data:tot.map(v=>(a+=v)),borderColor:col[0],backgroundColor:'rgba(15,118,110,.15)',fill:true,tension:.3}]},options:{plugins:{legend:{display:false}}}});

  const tk={};P.forEach(x=>tk[x.t]=(tk[x.t]||0)+x.v);
  const rank=Object.entries(tk).sort((x,y)=>y[1]-x[1]),all=R(rank,r=>r[1]);
  mk('c3',{type:'bar',data:{labels:rank.map(r=>r[0]),datasets:[{data:rank.map(r=>r[1]),backgroundColor:col[0]}]},options:{indexAxis:'y',plugins:{legend:{display:false}}}});
  const top=rank[0],sh=top?top[1]/all*100:0;
  Q('#al').textContent=sh>25?`Atenção: ${top[0]} concentra ${sh.toFixed(0)}% dos proventos.`:'';

  const mx=Math.max(...P.map(x=>x.v),1);
  const cell=(t,m)=>{const v=R(inM(m).filter(x=>x.t===t),x=>x.v);return v?`<td style="background:rgba(15,118,110,${(.15+.7*v/ (mx*1.3)).toFixed(2)});text-align:right">${v.toFixed(0)}</td>`:'<td style="text-align:center;color:var(--mut)">·</td>'};
  Q('#hm').innerHTML='<table><tr><th></th>'+ms.map(m=>`<th>${L(m)}</th>`).join('')+'</tr>'+rank.map(r=>`<tr><th>${r[0]}</th>${ms.map(m=>cell(r[0],m)).join('')}</tr>`).join('')+'</table>';
}

function prov(){
  const f=Q('#ft').value;
  Q('#tp').innerHTML='<tr><th>Data</th><th>Ativo</th><th>Tipo</th><th>Segmento</th><th>Valor</th><th>Status</th><th></th></tr>'+
    P.map((x,i)=>({x,i})).filter(o=>!f||AS[o.x.t][0]===f).sort((a,b)=>b.x.d.localeCompare(a.x.d)).map(({x,i})=>
    `<tr><td>${BR(x.d)}</td><td>${x.t}</td><td>${AS[x.t][0]}</td><td>${AS[x.t][1]}</td><td>${M(x.v)}</td><td>${x.d>today?'A receber':'Recebido'}</td><td><button class="b" data-i="${i}" aria-label="Excluir">×</button></td></tr>`).join('');
}

function buy(){
  Q('#tb').innerHTML='<tr><th>Data</th><th>Ativo</th><th>Qtd</th><th>Preço</th><th>Total</th><th></th></tr>'+
    B.map((x,i)=>`<tr><td>${BR(x.d)}</td><td>${x.t}</td><td>${x.q}</td><td>${M(x.p)}</td><td>${M(x.q*x.p)}</td><td><button class="b" data-i="${i}" aria-label="Excluir">×</button></td></tr>`).join('');
  const pos={};
  B.forEach(x=>{const o=pos[x.t]||(pos[x.t]={q:0,c:0});o.q+=x.q;o.c+=x.q*x.p});
  const y=new Date(today);y.setFullYear(y.getFullYear()-1);const cut=y.toISOString().slice(0,10);
  Q('#tpos').innerHTML='<tr><th>Ativo</th><th>Qtd</th><th>Preço médio</th><th>Custo</th><th>Proventos 12m</th><th>Yield on cost</th></tr>'+
    Object.entries(pos).map(([t,o])=>{const r=R(P.filter(x=>x.t===t&&x.d>cut&&x.d<=today),x=>x.v);
    return `<tr><td>${t}</td><td>${o.q}</td><td>${M(o.c/o.q)}</td><td>${M(o.c)}</td><td>${M(r)}</td><td>${(r/o.c*100).toFixed(1)}%</td></tr>`}).join('');
}

let off=0;
const ymd=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
const minOff=()=>{const f=P.map(x=>x.d).sort()[0]||today,n=new Date(today+'T00:00');return(+f.slice(0,4)-n.getFullYear())*12+(+f.slice(5,7)-1-n.getMonth())};
// Estimativa: ativos que pagaram em 3 dos últimos 4 meses repetem o último valor, no mesmo dia
function est(){
  const ms=[...new Set(P.map(x=>x.d.slice(0,7)))].sort().slice(-4),out=[],now=new Date(today+'T00:00');
  [...new Set(P.map(x=>x.t))].forEach(t=>{
    const mine=P.filter(x=>x.t===t).sort((a,b)=>a.d.localeCompare(b.d));
    if(ms.filter(m=>mine.some(x=>x.d.slice(0,7)===m)).length<3)return;
    const last=mine[mine.length-1],day=Math.min(+last.d.slice(8),28);
    for(let k=0;k<6;k++){
      const dt=new Date(now.getFullYear(),now.getMonth()+k,1),d=ymd(dt.getFullYear(),dt.getMonth(),day);
      if(d>today&&!mine.some(x=>x.d.slice(0,7)===d.slice(0,7)))out.push({t,d,v:last.v,e:1});
    }
  });
  return out;
}
function cal(){
  const now=new Date(today+'T00:00'),dt=new Date(now.getFullYear(),now.getMonth()+off,1),y=dt.getFullYear(),m=dt.getMonth(),ym=ymd(y,m,1).slice(0,7);
  const ev=P.concat(est()).filter(x=>x.d.slice(0,7)===ym),n=new Date(y,m+1,0).getDate(),lead=dt.getDay();
  const conf=R(ev.filter(x=>!x.e),x=>x.v),es=R(ev.filter(x=>x.e),x=>x.v);
  Q('#cm').textContent=dt.toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  Q('#ct').textContent=`Lançado: ${M(conf)}`+(es?` · Estimado: ${M(es)}`:'');
  let h='<table class="cg"><tr>'+['D','S','T','Q','Q','S','S'].map(d=>`<th>${d}</th>`).join('')+'</tr><tr>'+'<td></td>'.repeat(lead);
  for(let d=1;d<=n;d++){
    if(d>1&&(lead+d-1)%7===0)h+='</tr><tr>';
    const dd=ymd(y,m,d);
    h+=`<td class="${dd===today?'td':''}"><span>${d}</span>`+ev.filter(x=>x.d===dd).map(x=>`<i class="${x.e?'es':x.d>today?'fu':'ok'}" title="${x.t} ${M(x.v)}">${x.t.replace(/11$/,'')} ${x.v.toFixed(2).replace('.',',')}</i>`).join('')+'</td>';
  }
  Q('#cgw').innerHTML=h+'</tr></table>';
  Q('#cp').disabled=off<=minOff();Q('#cx').disabled=off>=6;
}
const all=()=>{dash();prov();buy();cal()};
Q('#cp').onclick=()=>{off--;cal()};Q('#cx').onclick=()=>{off++;cal()};
Q('#fp').onsubmit=e=>{e.preventDefault();P.push({t:Q('#pt').value,d:Q('#pd').value,v:+Q('#pv').value});save();all();e.target.reset()};
Q('#fb').onsubmit=e=>{e.preventDefault();B.push({t:Q('#bt').value,d:Q('#bd').value,q:+Q('#bq').value,p:+Q('#bp').value});save();all();e.target.reset()};
Q('#tp').onclick=e=>{const i=e.target.dataset.i;if(i!=null){P.splice(+i,1);save();all()}};
Q('#tb').onclick=e=>{const i=e.target.dataset.i;if(i!=null){B.splice(+i,1);save();all()}};
Q('#ft').onchange=prov;
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('section').forEach(s=>s.classList.toggle('hide',s.id!==b.dataset.t));
  if(b.dataset.t==='s0')dash();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',all);
all();
