import { useState, useEffect } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--bg:#0f1114;--surface:#1a1d23;--card:#22262f;--border:#2e3340;--accent:#f97316;--accent2:#fb923c;--text:#e8eaf0;--muted:#6b7280;--green:#22c55e;--red:#ef4444;--blue:#3b82f6;--gold:#eab308;}
  body{background:var(--bg);color:var(--text);font-family:'Barlow',sans-serif;min-height:100vh}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
  .wrap{max-width:480px;margin:0 auto;min-height:100vh;background:var(--bg)}
  .login-bg{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;background:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(249,115,22,.03) 40px,rgba(249,115,22,.03) 41px),var(--bg)}
  .login-logo{font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:900;color:var(--accent);line-height:1;margin-bottom:4px}
  .login-sub{color:var(--muted);font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:36px}
  .login-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:28px;width:100%;max-width:340px}
  .lbl{display:block;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
  .inp{width:100%;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:11px 14px;color:var(--text);font-family:'Barlow',sans-serif;font-size:14px;outline:none;transition:border-color .2s;margin-bottom:16px}
  .inp:focus{border-color:var(--accent)}
  .sel{width:100%;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:11px 14px;color:var(--text);font-family:'Barlow',sans-serif;font-size:14px;outline:none;appearance:none}
  .btn{width:100%;background:var(--accent);color:#000;border:none;border-radius:8px;padding:13px;font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:background .2s}
  .btn:hover{background:var(--accent2)}
  .btn:disabled{background:var(--border);color:var(--muted);cursor:not-allowed}
  .btn-g{background:transparent;border:1px solid var(--border);color:var(--text);border-radius:8px;padding:9px 16px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:border-color .2s,color .2s}
  .btn-g:hover{border-color:var(--accent);color:var(--accent)}
  .btn-r{background:transparent;border:1px solid var(--red);color:var(--red);border-radius:8px;padding:7px 12px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;cursor:pointer}
  .btn-r:hover{background:rgba(239,68,68,.1)}
  .btn-green{width:100%;background:var(--green);color:#000;border:none;border-radius:8px;padding:13px;font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:opacity .2s}
  .btn-green:hover{opacity:.85}
  .btn-undo{width:100%;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:10px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;cursor:pointer;margin-top:8px}
  .btn-undo:hover{border-color:var(--red);color:var(--red)}
  .err{color:var(--red);font-size:12px;margin-top:-8px;margin-bottom:12px}
  .topbar{position:sticky;top:0;z-index:50;background:rgba(15,17,20,.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:11px 15px}
  .topbar-title{font-family:'Barlow Condensed',sans-serif;font-size:19px;font-weight:900;color:var(--accent)}
  .tabs{display:flex;border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none}
  .tabs::-webkit-scrollbar{display:none}
  .tab{flex-shrink:0;padding:10px 13px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;background:none;border-top:none;border-left:none;border-right:none;transition:color .2s,border-color .2s}
  .tab.active{color:var(--accent);border-bottom-color:var(--accent)}
  .mbar{padding:8px 14px;border-bottom:1px solid var(--border);display:flex;gap:7px;align-items:center;background:var(--surface)}
  .page{padding:14px;padding-bottom:48px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:17px;margin-bottom:13px}
  .ctitle{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:13px}
  .brow{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px}
  .brow:last-child{border-bottom:none}
  .blv{color:var(--muted);flex:1;font-size:12px}
  .brv{font-weight:600}
  .brac{color:var(--accent)}
  .badge{padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
  .badge-sa{background:rgba(234,179,8,.2);color:var(--gold)}
  .badge-u{background:rgba(107,114,128,.2);color:var(--muted)}
  .pill{display:inline-flex;align-items:center;padding:2px 6px;border-radius:5px;font-size:10px;font-weight:600;margin:2px}
  .pill-x{background:rgba(234,179,8,.15);color:#fde68a}
  .ei{display:flex;align-items:flex-start;gap:10px;padding:11px 0;border-bottom:1px solid var(--border)}
  .ei:last-child{border-bottom:none}
  .eico{width:32px;height:32px;background:rgba(249,115,22,.15);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
  .urow{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid var(--border)}
  .urow:last-child{border-bottom:none}
  .uav{width:36px;height:36px;background:linear-gradient(135deg,var(--accent),#c2410c);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:900;color:#000;flex-shrink:0}
  .trow{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:11px 13px;margin-bottom:8px}
  .stbtn{width:28px;height:28px;border:none;border-radius:6px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--accent);color:var(--text);padding:9px 20px;border-radius:10px;font-size:13px;z-index:999;animation:fu .3s ease;white-space:nowrap}
  @keyframes fu{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  .fgrid{display:flex;flex-direction:column;gap:12px}
  .frow{display:flex;gap:9px}
  .frow .fw{flex:1}
  .fw{display:flex;flex-direction:column}
  .empty{text-align:center;padding:36px 20px;color:var(--muted);font-size:14px}
  .empty .ico{font-size:36px;margin-bottom:10px}
  .hm{background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:10px;overflow:hidden}
  .hh{display:flex;justify-content:space-between;align-items:center;padding:12px 15px;cursor:pointer}
  .hh:hover{background:rgba(255,255,255,.02)}
  .hb{padding:0 15px 15px;border-top:1px solid var(--border)}
  .ci{display:flex;align-items:center;gap:9px;padding:11px 0;border-bottom:1px solid var(--border)}
  .ci:last-child{border-bottom:none}
  .cdot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
  .ctr{display:flex;align-items:center;gap:9px;padding:10px 0;border-bottom:1px solid var(--border)}
  .ctr:last-child{border-bottom:none}
  .pay-paid{background:linear-gradient(135deg,#0d1a0d,#22262f);border:1px solid rgba(34,197,94,.4)!important}
  .pay-unpaid{background:linear-gradient(135deg,#1a0d08,#22262f);border:1px solid rgba(249,115,22,.25)!important}
  .pbadge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:20px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
  .pb-paid{background:rgba(34,197,94,.15);color:var(--green);border:1px solid rgba(34,197,94,.3)}
  .pb-unpaid{background:rgba(249,115,22,.12);color:var(--accent);border:1px solid rgba(249,115,22,.25)}
  .meth-btn{flex:1;padding:9px 4px;border-radius:8px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;cursor:pointer;border:2px solid var(--border);background:var(--surface);color:var(--muted);text-align:center;transition:all .15s}
  .meth-btn.on{border-color:var(--accent);background:rgba(249,115,22,.12);color:var(--accent)}
  .prow{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid var(--border)}
  .prow:last-child{border-bottom:none}
`;

const MONTHS = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const PAY_METHODS = ["Contanti","Bonifico","Satispay","PayPal","Altro"];
const DEFAULT_CTS = [
  {id:"posto",   label:"Posto capannone", price:50, icon:"🏠", unit:"posto"},
  {id:"auto_in", label:"Auto interna",   price:25, icon:"🚗", unit:"veicolo"},
  {id:"auto_out",label:"Auto esterna",   price:10, icon:"🚙", unit:"veicolo"},
  {id:"bancale", label:"Bancale",        price:15, icon:"📦", unit:"bancale"},
];

const uid = () => Math.random().toString(36).slice(2,9);
const pkey = (id,m,y) => `${id}|${m}|${y}`;

function initData(){
  return {
    users:[{id:"sa",name:"Admin",password:"admin123",role:"superadmin",extras:{}}],
    expenses:[],electricity:[],cassa:[],payments:{},
    costTypes:DEFAULT_CTS,settings:{affitto:650}
  };
}

const SK="capannone-v3";
async function loadData(){
  try{const r=await window.storage.get(SK);if(r?.value)return JSON.parse(r.value);}catch(_){}
  return initData();
}
async function saveData(d){try{await window.storage.set(SK,JSON.stringify(d));}catch(_){}}

function calcQuote(data,month,year){
  const active=data.users.filter(u=>u.role!=="superadmin");
  const affitto=data.settings?.affitto??650;
  const cts=data.costTypes||DEFAULT_CTS;
  const n=active.length;
  const rows=active.map(u=>{
    let fixed=0;const bd=[];
    cts.forEach(ct=>{const qty=(u.extras||{})[ct.id]||0;if(qty>0){fixed+=qty*ct.price;bd.push({label:`${ct.icon} ${ct.label} x${qty}`,cost:qty*ct.price});}});
    return {id:u.id,name:u.name,fixed,bd};
  });
  const totFixed=rows.reduce((s,r)=>s+r.fixed,0);
  const quota=n>0?(affitto-totFixed)/n:0;
  const exps=(data.expenses||[]).filter(e=>e.month===month&&e.year===year);
  const elecs=(data.electricity||[]).filter(e=>e.month===month&&e.year===year);
  const expS=n>0?exps.reduce((s,e)=>s+e.amount,0)/n:0;
  const elecS=n>0?elecs.reduce((s,e)=>s+e.amount,0)/n:0;
  return rows.map(r=>({...r,quota:+quota.toFixed(2),expShare:+expS.toFixed(2),elecShare:+elecS.toFixed(2),total:+(r.fixed+quota+expS+elecS).toFixed(2)}));
}

export default function App(){
  const [data,setData]=useState(null);
  const [me,setMe]=useState(null);
  const [tab,setTab]=useState("quota");
  const [toast,setToast]=useState(null);
  const now=new Date();
  const [selM,setSelM]=useState(now.getMonth());
  const [selY,setSelY]=useState(now.getFullYear());
  useEffect(()=>{loadData().then(d=>setData(d));},[]);
  const persist=async nd=>{setData(nd);await saveData(nd);};
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2500);};
  if(!data)return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0f1114"}}><div style={{color:"#f97316",fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900}}>CAPANNONE...</div></div>);
  if(!me)return <Login data={data} onLogin={u=>{setMe(u);setTab(u.role==="superadmin"?"admin":"quota");}}/>;
  const isSA=me.role==="superadmin";
  const tabs=isSA
    ?[{id:"admin",l:"Admin"},{id:"riepilogo",l:"Riepilogo"},{id:"storico",l:"Storico"},{id:"cassa",l:"Cassa"},{id:"profilo",l:"Profilo"}]
    :[{id:"quota",l:"Quota"},{id:"spese",l:"Spese"},{id:"corrente",l:"Corrente"},{id:"storico",l:"Storico"},{id:"cassa",l:"Cassa"},{id:"profilo",l:"Profilo"}];
  const showMB=["quota","spese","corrente","riepilogo"].includes(tab);
  return(
    <><style>{STYLE}</style>
    <div className="wrap">
      <div className="topbar">
        <div className="topbar-title">CAPANNONE</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:"var(--muted)"}}>{me.name}</span>
          {isSA&&<span className="badge badge-sa">ADMIN</span>}
          <button className="btn-g" style={{padding:"4px 10px",fontSize:12}} onClick={()=>setMe(null)}>Esci</button>
        </div>
      </div>
      <div className="tabs">{tabs.map(t=><button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>)}</div>
      {showMB&&(
        <div className="mbar">
          <span style={{fontSize:10,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",flexShrink:0}}>Mese</span>
          <select className="sel" style={{flex:1,padding:"7px 10px",fontSize:13}} value={selM} onChange={e=>setSelM(+e.target.value)}>{MONTHS.map((m,i)=><option key={i} value={i}>{m}</option>)}</select>
          <select className="sel" style={{width:80,padding:"7px 10px",fontSize:13}} value={selY} onChange={e=>setSelY(+e.target.value)}>{[2024,2025,2026,2027].map(y=><option key={y} value={y}>{y}</option>)}</select>
        </div>
      )}
      {tab==="quota"    &&!isSA&&<TabQuota    data={data} me={me} month={selM} year={selY} persist={persist} showToast={showToast}/>}
      {tab==="spese"    &&!isSA&&<TabSpese    data={data} me={me} month={selM} year={selY} persist={persist} showToast={showToast}/>}
      {tab==="corrente" &&!isSA&&<TabCorrente data={data} me={me} month={selM} year={selY} persist={persist} showToast={showToast}/>}
      {tab==="riepilogo"&&isSA &&<TabRiepilogo data={data} month={selM} year={selY}/>}
      {tab==="storico"         &&<TabStorico  data={data} me={me} isSA={isSA}/>}
      {tab==="cassa"           &&<TabCassa    data={data} me={me} persist={persist} showToast={showToast}/>}
      {tab==="profilo"         &&<TabProfilo  data={data} me={me} setMe={setMe} persist={persist} showToast={showToast} isSA={isSA}/>}
      {tab==="admin"   &&isSA  &&<TabAdmin    data={data} me={me} persist={persist} showToast={showToast}/>}
      {toast&&<div className="toast">{toast}</div>}
    </div></>
  );
}

function Login({data,onLogin}){
  const [name,setName]=useState("");const [pass,setPass]=useState("");const [err,setErr]=useState("");
  const go=()=>{
    const u=data.users.find(u=>u.name.toLowerCase()===name.trim().toLowerCase()&&u.password===pass);
    if(u){setErr("");onLogin(u);}else setErr("Nome o password errati");
  };
  return(<><style>{STYLE}</style><div className="login-bg"><div className="login-logo">CAPANNONE</div><div className="login-sub">gestione costi condivisi</div><div className="login-box"><label className="lbl">Nome utente</label><input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Il tuo nome" onKeyDown={e=>e.key==="Enter"&&go()}/><label className="lbl">Password</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="..." onKeyDown={e=>e.key==="Enter"&&go()}/>{err&&<div className="err">Errore: {err}</div>}<button className="btn" onClick={go}>Accedi</button></div></div></>);
}

function TabQuota({data,me,month,year,persist,showToast}){
  const quotes=calcQuote(data,month,year);
  const myQ=quotes.find(q=>q.id===me.id);
  const payments=data.payments||{};
  const pk=pkey(me.id,month,year);
  const myPay=payments[pk];
  const isPaid=!!myPay?.paid;
  const [showForm,setShowForm]=useState(false);
  const [method,setMethod]=useState(PAY_METHODS[0]);
  const [note,setNote]=useState("");
  if(!myQ)return<div className="empty"><div className="ico">?</div>Dati non trovati</div>;
  const handlePay=async()=>{
    const rec={paid:true,amount:myQ.total,method,note:note.trim(),date:new Date().toISOString().slice(0,10),paidByName:me.name};
    await persist({...data,payments:{...payments,[pk]:rec}});
    setShowForm(false);setNote("");showToast("Pagamento registrato!");
  };
  const handleUndo=async()=>{
    const np={...payments};delete np[pk];
    await persist({...data,payments:np});showToast("Pagamento annullato");
  };
  return(
    <div className="page">
      <div className={`card ${isPaid?"pay-paid":"pay-unpaid"}`}>
        <div className="ctitle">{MONTHS[month]} {year}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:48,fontWeight:900,lineHeight:1,color:isPaid?"var(--green)":"var(--accent)"}}>
              {myQ.total.toFixed(2)} EUR
            </div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:6}}>totale mensile</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div className={`pbadge ${isPaid?"pb-paid":"pb-unpaid"}`}>{isPaid?"PAGATO":"DA PAGARE"}</div>
            {isPaid&&myPay.method&&<div style={{fontSize:12,color:"var(--muted)",marginTop:6}}>{myPay.method}</div>}
            {isPaid&&myPay.date&&<div style={{fontSize:11,color:"var(--muted)"}}>{myPay.date}</div>}
          </div>
        </div>
        {isPaid&&myPay.note&&<div style={{marginTop:10,fontSize:13,color:"var(--muted)",fontStyle:"italic"}}>"{myPay.note}"</div>}
      </div>
      {!isPaid&&!showForm&&<button className="btn-green" style={{marginBottom:14}} onClick={()=>setShowForm(true)}>Segna come Pagato</button>}
      {!isPaid&&showForm&&(
        <div className="card" style={{border:"1px solid rgba(34,197,94,.35)"}}>
          <div className="ctitle">Conferma Pagamento</div>
          <div style={{marginBottom:12}}>
            <label className="lbl">Metodo di pagamento</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {PAY_METHODS.map(m=><button key={m} className={`meth-btn ${method===m?"on":""}`} style={{flex:"1 1 calc(33% - 6px)",minWidth:76}} onClick={()=>setMethod(m)}>{m}</button>)}
            </div>
          </div>
          <div className="fw" style={{marginBottom:12}}>
            <label className="lbl">Nota (opzionale)</label>
            <input className="inp" style={{marginBottom:0}} value={note} onChange={e=>setNote(e.target.value)} placeholder="es. Pagato sabato mattina"/>
          </div>
          <button className="btn-green" onClick={handlePay}>Conferma {myQ.total.toFixed(2)} EUR</button>
          <button className="btn-undo" onClick={()=>setShowForm(false)}>Annulla</button>
        </div>
      )}
      {isPaid&&<button className="btn-undo" style={{marginBottom:14}} onClick={handleUndo}>Annulla pagamento</button>}
      <div className="card">
        <div className="ctitle">Dettaglio</div>
        <div className="brow"><span className="blv">Quota base affitto</span><span className="brv brac">{myQ.quota.toFixed(2)} EUR</span></div>
        {myQ.bd.map((b,i)=><div key={i} className="brow"><span className="blv">{b.label}</span><span className="brv">{b.cost.toFixed(2)} EUR</span></div>)}
        <div className="brow"><span className="blv">Quota spese condivise</span><span className="brv">{myQ.expShare>0?myQ.expShare.toFixed(2)+" EUR":"—"}</span></div>
        <div className="brow"><span className="blv">Quota corrente</span><span className="brv">{myQ.elecShare>0?myQ.elecShare.toFixed(2)+" EUR":"—"}</span></div>
        <div style={{height:1,background:isPaid?"var(--green)":"var(--accent)",opacity:.2,margin:"8px 0"}}/>
        <div className="brow" style={{paddingTop:8}}><span style={{fontWeight:600}}>TOTALE</span><span className="brv brac" style={{fontSize:18}}>{myQ.total.toFixed(2)} EUR</span></div>
      </div>
    </div>
  );
}

function TabSpese({data,me,month,year,persist,showToast}){
  const [desc,setDesc]=useState("");const [amount,setAmount]=useState("");const [adding,setAdding]=useState(false);
  const monthExp=(data.expenses||[]).filter(e=>e.month===month&&e.year===year);
  const total=monthExp.reduce((s,e)=>s+e.amount,0);
  const n=data.users.filter(u=>u.role!=="superadmin").length;
  const share=n>0?total/n:0;
  const handleAdd=async()=>{
    if(!desc.trim()||!amount)return;
    const exp={id:uid(),desc:desc.trim(),amount:parseFloat(amount),paidBy:me.id,paidByName:me.name,month,year};
    await persist({...data,expenses:[...(data.expenses||[]),exp]});
    setDesc("");setAmount("");setAdding(false);showToast("Spesa aggiunta");
  };
  const handleDel=async id=>{
    const exp=(data.expenses||[]).find(e=>e.id===id);
    if(!exp||exp.paidBy!==me.id){showToast("Non puoi eliminare spese altrui");return;}
    await persist({...data,expenses:data.expenses.filter(e=>e.id!==id)});showToast("Rimossa");
  };
  return(
    <div className="page">
      {!adding?<button className="btn" style={{marginBottom:14}} onClick={()=>setAdding(true)}>+ Aggiungi Spesa</button>:(
        <div className="card">
          <div className="ctitle">Nuova Spesa</div>
          <div className="fgrid">
            <div className="fw"><label className="lbl">Descrizione</label><input className="inp" style={{marginBottom:0}} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="es. Compressore aria"/></div>
            <div className="fw"><label className="lbl">Importo EUR</label><input className="inp" style={{marginBottom:0}} type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01"/></div>
            <div style={{display:"flex",gap:9}}><button className="btn" style={{flex:1}} onClick={handleAdd}>Salva</button><button className="btn-g" onClick={()=>setAdding(false)}>Annulla</button></div>
          </div>
        </div>
      )}
      {total>0&&<div style={{background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:10,padding:"9px 13px",marginBottom:13,fontSize:13,color:"#93c5fd",display:"flex",justifyContent:"space-between"}}><span>Totale spese</span><span>{total.toFixed(2)} EUR — {share.toFixed(2)} a testa</span></div>}
      {monthExp.length>0&&(
        <div className="card">
          {monthExp.map(e=>(
            <div key={e.id} className="ei">
              <div className="eico">🧾</div>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.desc}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>da {e.paidByName}</div></div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"var(--green)"}}>{e.amount.toFixed(2)} EUR</div>
                {e.paidBy===me.id&&<button className="btn-r" style={{padding:"3px 7px",fontSize:11}} onClick={()=>handleDel(e.id)}>Elimina</button>}
              </div>
            </div>
          ))}
        </div>
      )}
      {monthExp.length===0&&!adding&&<div className="empty"><div className="ico">📋</div>Nessuna spesa per {MONTHS[month]} {year}</div>}
    </div>
  );
}

function TabCorrente({data,me,month,year,persist,showToast}){
  const [amount,setAmount]=useState("");const [note,setNote]=useState("");const [adding,setAdding]=useState(false);
  const monthElec=(data.electricity||[]).filter(e=>e.month===month&&e.year===year);
  const total=monthElec.reduce((s,e)=>s+e.amount,0);
  const n=data.users.filter(u=>u.role!=="superadmin").length;
  const share=n>0?total/n:0;
  const handleAdd=async()=>{
    if(!amount)return;
    const rec={id:uid(),amount:parseFloat(amount),note:note.trim(),addedBy:me.id,addedByName:me.name,month,year};
    await persist({...data,electricity:[...(data.electricity||[]),rec]});
    setAmount("");setNote("");setAdding(false);showToast("Bolletta aggiunta");
  };
  const handleDel=async id=>{
    await persist({...data,electricity:data.electricity.filter(e=>e.id!==id)});showToast("Rimosso");
  };
  return(
    <div className="page">
      {!adding?<button className="btn" style={{marginBottom:14}} onClick={()=>setAdding(true)}>+ Aggiungi Bolletta</button>:(
        <div className="card">
          <div className="ctitle">Nuova Bolletta</div>
          <div className="fgrid">
            <div className="fw"><label className="lbl">Importo EUR</label><input className="inp" style={{marginBottom:0}} type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01"/></div>
            <div className="fw"><label className="lbl">Note</label><input className="inp" style={{marginBottom:0}} value={note} onChange={e=>setNote(e.target.value)} placeholder="es. Bolletta gen-feb"/></div>
            <div style={{display:"flex",gap:9}}><button className="btn" style={{flex:1}} onClick={handleAdd}>Salva</button><button className="btn-g" onClick={()=>setAdding(false)}>Annulla</button></div>
          </div>
        </div>
      )}
      {total>0&&(
        <div className="card" style={{background:"linear-gradient(135deg,#0a1020,#22262f)",border:"1px solid rgba(59,130,246,.3)"}}>
          <div className="ctitle">Corrente {MONTHS[month]} {year}</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:40,fontWeight:900,color:"#60a5fa"}}>{total.toFixed(2)} EUR</div>
          <div style={{fontSize:13,color:"#93c5fd",marginTop:6}}>Quota: {share.toFixed(2)} EUR a testa</div>
        </div>
      )}
      {monthElec.map(e=>(
        <div key={e.id} className="ei" style={{paddingBottom:11,marginBottom:3}}>
          <div className="eico" style={{background:"rgba(59,130,246,.15)"}}>⚡</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:500}}>{e.note||"Bolletta elettrica"}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>da {e.addedByName}</div></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"#60a5fa"}}>{e.amount.toFixed(2)} EUR</div>
            <button className="btn-r" style={{padding:"3px 7px",fontSize:11}} onClick={()=>handleDel(e.id)}>Elimina</button>
          </div>
        </div>
      ))}
      {monthElec.length===0&&!adding&&<div className="empty"><div className="ico">⚡</div>Nessuna bolletta per {MONTHS[month]} {year}</div>}
    </div>
  );
}

function TabRiepilogo({data,month,year}){
  const quotes=calcQuote(data,month,year);
  const grand=quotes.reduce((s,q)=>s+q.total,0);
  const payments=data.payments||{};
  const totalExp=(data.expenses||[]).filter(e=>e.month===month&&e.year===year).reduce((s,e)=>s+e.amount,0);
  const totalElec=(data.electricity||[]).filter(e=>e.month===month&&e.year===year).reduce((s,e)=>s+e.amount,0);
  const paidList=quotes.filter(q=>payments[pkey(q.id,month,year)]?.paid);
  const totalPaid=paidList.reduce((s,q)=>s+q.total,0);
  const nPaid=paidList.length;
  const pct=grand>0?totalPaid/grand*100:0;
  return(
    <div className="page">
      <div className="card" style={{background:"linear-gradient(135deg,#0d1505,#22262f)",border:"1px solid rgba(34,197,94,.25)"}}>
        <div className="ctitle">Stato Pagamenti — {MONTHS[month]} {year}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <div><div style={{fontSize:10,color:"var(--muted)"}}>PAGATO</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,color:"var(--green)"}}>{totalPaid.toFixed(2)} EUR</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"var(--muted)"}}>MANCANTE</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,color:"var(--red)"}}>{(grand-totalPaid).toFixed(2)} EUR</div></div>
        </div>
        <div style={{background:"var(--border)",borderRadius:4,height:7,overflow:"hidden"}}><div style={{height:"100%",background:"var(--green)",width:`${pct}%`,transition:"width .5s",borderRadius:4}}/></div>
        <div style={{fontSize:12,color:"var(--muted)",marginTop:8,textAlign:"center"}}>{nPaid} di {quotes.length} ha pagato</div>
      </div>
      <div className="card">
        <div className="ctitle">Costi del mese</div>
        <div className="brow"><span className="blv">Affitto</span><span className="brv">{(data.settings?.affitto??650).toFixed(2)} EUR</span></div>
        <div className="brow"><span className="blv">Spese condivise</span><span className="brv">{totalExp.toFixed(2)} EUR</span></div>
        <div className="brow"><span className="blv">Corrente</span><span className="brv">{totalElec.toFixed(2)} EUR</span></div>
      </div>
      <div className="card">
        <div className="ctitle">Quote e pagamenti</div>
        {quotes.map(q=>{
          const pay=payments[pkey(q.id,month,year)];
          const isPaid=!!pay?.paid;
          return(
            <div key={q.id} className="prow">
              <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,background:isPaid?"var(--green)":"var(--border)"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:500,fontSize:14}}>{q.name}</div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>
                  {q.bd.map((b,i)=><span key={i} className="pill pill-x" style={{fontSize:10}}>{b.label}</span>)}
                  {isPaid&&<span style={{color:"var(--green)"}}> · {pay.method}{pay.date?" · "+pay.date:""}</span>}
                  {isPaid&&pay.note&&<span style={{fontStyle:"italic",color:"var(--muted)"}}> · "{pay.note}"</span>}
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:isPaid?"var(--green)":"var(--accent)"}}>{q.total.toFixed(2)} EUR</div>
                <div className={`pbadge ${isPaid?"pb-paid":"pb-unpaid"}`} style={{fontSize:10,padding:"2px 7px",marginTop:4}}>{isPaid?"✓ PAGATO":"✗ NON PAGATO"}</div>
              </div>
            </div>
          );
        })}
        <div style={{height:1,background:"var(--accent)",opacity:.2,margin:"10px 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,letterSpacing:1}}>TOTALE DA INCASSARE</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:"var(--green)"}}>{grand.toFixed(2)} EUR</span>
        </div>
      </div>
    </div>
  );
}

function TabStorico({data,me,isSA}){
  const [open,setOpen]=useState(null);
  const now=new Date();
  const ms=new Set();
  for(let i=0;i<12;i++){const d=new Date(now.getFullYear(),now.getMonth()-i,1);ms.add(`${d.getFullYear()}-${d.getMonth()}`);}
  [...(data.expenses||[]),...(data.electricity||[])].forEach(e=>ms.add(`${e.year}-${e.month}`));
  const months=Array.from(ms).map(k=>{const[y,m]=k.split("-").map(Number);return{year:y,month:m};}).sort((a,b)=>b.year!==a.year?b.year-a.year:b.month-a.month);
  return(
    <div className="page">
      {months.map(({year,month})=>{
        const key=`${year}-${month}`;
        const quotes=calcQuote(data,month,year);
        const myQ=quotes.find(q=>q.id===me.id);
        const exp=(data.expenses||[]).filter(e=>e.month===month&&e.year===year);
        const elec=(data.electricity||[]).filter(e=>e.month===month&&e.year===year);
        const isOpen=open===key;
        const disp=isSA?quotes.reduce((s,q)=>s+q.total,0):(myQ?.total??0);
        const pay=!isSA?(data.payments||{})[pkey(me.id,month,year)]:null;
        const isPaid=!!pay?.paid;
        return(
          <div key={key} className="hm">
            <div className="hh" onClick={()=>setOpen(isOpen?null:key)}>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{MONTHS[month]} {year}</div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>Spese: {exp.reduce((s,e)=>s+e.amount,0).toFixed(0)} EUR · Corrente: {elec.reduce((s,e)=>s+e.amount,0).toFixed(0)} EUR</div>
              </div>
              <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:isSA?"var(--green)":isPaid?"var(--green)":"var(--accent)"}}>{disp.toFixed(2)} EUR</div>
                {!isSA&&<div className={`pbadge ${isPaid?"pb-paid":"pb-unpaid"}`} style={{fontSize:10,padding:"2px 7px"}}>{isPaid?"PAGATO":"DA PAGARE"}</div>}
                <div style={{fontSize:11,color:"var(--muted)"}}>{isOpen?"▲":"▼"}</div>
              </div>
            </div>
            {isOpen&&(
              <div className="hb">
                {isSA?(
                  <>
                    <div style={{fontSize:10,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",margin:"12px 0 8px"}}>Quote</div>
                    {quotes.map(q=>{
                      const qp=(data.payments||{})[pkey(q.id,month,year)];
                      return(<div key={q.id} className="brow">
                        <span className="blv" style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{width:8,height:8,borderRadius:"50%",background:qp?.paid?"var(--green)":"var(--border)",display:"inline-block",flexShrink:0}}/>
                          {q.name}{qp?.paid&&qp.method?` · ${qp.method}`:""}
                        </span>
                        <span className="brv brac">{q.total.toFixed(2)} EUR</span>
                      </div>);
                    })}
                  </>
                ):myQ?(
                  <>
                    <div style={{fontSize:10,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",margin:"12px 0 8px"}}>La tua quota</div>
                    <div className="brow"><span className="blv">Base affitto</span><span className="brv">{myQ.quota.toFixed(2)} EUR</span></div>
                    {myQ.bd.map((b,i)=><div key={i} className="brow"><span className="blv">{b.label}</span><span className="brv">{b.cost.toFixed(2)} EUR</span></div>)}
                    <div className="brow"><span className="blv">Spese</span><span className="brv">{myQ.expShare.toFixed(2)} EUR</span></div>
                    <div className="brow"><span className="blv">Corrente</span><span className="brv">{myQ.elecShare.toFixed(2)} EUR</span></div>
                    <div className="brow"><span style={{fontWeight:600}}>TOTALE</span><span className="brv brac">{myQ.total.toFixed(2)} EUR</span></div>
                    {pay?.paid?(
                      <div style={{marginTop:10,background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.25)",borderRadius:8,padding:"9px 12px"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,color:"var(--green)",fontWeight:600}}>Pagato</span><span style={{fontSize:13,color:"var(--green)"}}>{pay.amount?.toFixed(2)} EUR</span></div>
                        <div style={{fontSize:12,color:"var(--muted)",marginTop:3}}>{pay.method}{pay.date?" · "+pay.date:""}{pay.note?` · "${pay.note}"`:""}</div>
                      </div>
                    ):(
                      <div style={{marginTop:10,background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.2)",borderRadius:8,padding:"8px 12px",fontSize:13,color:"var(--accent)"}}>Non ancora pagato</div>
                    )}
                  </>
                ):null}
                {exp.length>0&&(<>
                  <div style={{fontSize:10,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",margin:"12px 0 8px"}}>Spese</div>
                  {exp.map(e=><div key={e.id} className="brow"><span className="blv">{e.desc} ({e.paidByName})</span><span className="brv">{e.amount.toFixed(2)} EUR</span></div>)}
                </>)}
                {elec.length>0&&(<>
                  <div style={{fontSize:10,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",margin:"12px 0 8px"}}>Bollette</div>
                  {elec.map(e=><div key={e.id} className="brow"><span className="blv">{e.note||"Bolletta"}</span><span className="brv" style={{color:"#60a5fa"}}>{e.amount.toFixed(2)} EUR</span></div>)}
                </>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TabCassa({data,me,persist,showToast}){
  const [adding,setAdding]=useState(false);
  const [form,setForm]=useState({desc:"",amount:"",type:"entrata",category:""});
  const cassa=data.cassa||[];
  const entrate=cassa.filter(c=>c.type==="entrata").reduce((s,c)=>s+c.amount,0);
  const uscite=cassa.filter(c=>c.type==="uscita").reduce((s,c)=>s+c.amount,0);
  const saldo=entrate-uscite;
  const handleAdd=async()=>{
    if(!form.desc.trim()||!form.amount)return;
    const rec={id:uid(),desc:form.desc.trim(),amount:parseFloat(form.amount),type:form.type,category:form.category,date:new Date().toISOString().slice(0,10),addedBy:me.id,addedByName:me.name};
    await persist({...data,cassa:[...cassa,rec]});
    setForm({desc:"",amount:"",type:"entrata",category:""});setAdding(false);showToast("Registrato in cassa");
  };
  const handleDel=async id=>{
    const item=cassa.find(c=>c.id===id);
    if(!item)return;
    if(item.addedBy!==me.id&&me.role!=="superadmin"){showToast("Non puoi eliminare voci altrui");return;}
    await persist({...data,cassa:cassa.filter(c=>c.id!==id)});showToast("Rimosso");
  };
  const sorted=[...cassa].sort((a,b)=>b.date.localeCompare(a.date));
  return(
    <div className="page">
      <div className="card" style={{background:`linear-gradient(135deg,${saldo>=0?"#0d1a0d":"#1a0d0d"},#22262f)`,border:`1px solid ${saldo>=0?"rgba(34,197,94,.3)":"rgba(239,68,68,.3)"}`}}>
        <div className="ctitle">Saldo Cassa Comune</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:48,fontWeight:900,lineHeight:1,color:saldo>=0?"var(--green)":"var(--red)"}}>{saldo.toFixed(2)} EUR</div>
        <div style={{display:"flex",gap:20,marginTop:12}}>
          <div><div style={{fontSize:10,color:"var(--muted)"}}>ENTRATE</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"var(--green)"}}>{entrate.toFixed(2)} EUR</div></div>
          <div><div style={{fontSize:10,color:"var(--muted)"}}>USCITE</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"var(--red)"}}>{uscite.toFixed(2)} EUR</div></div>
        </div>
      </div>
      {!adding?<button className="btn" style={{marginBottom:14}} onClick={()=>setAdding(true)}>+ Aggiungi Movimento</button>:(
        <div className="card">
          <div className="ctitle">Nuovo Movimento</div>
          <div className="fgrid">
            <div className="frow">
              <div className="fw"><label className="lbl">Tipo</label><select className="sel" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option value="entrata">Entrata</option><option value="uscita">Uscita</option></select></div>
              <div className="fw"><label className="lbl">Importo EUR</label><input className="inp" style={{marginBottom:0}} type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} placeholder="0.00" min="0" step="0.01"/></div>
            </div>
            <div className="fw"><label className="lbl">Descrizione</label><input className="inp" style={{marginBottom:0}} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="es. Lavoro saldatura"/></div>
            <div className="fw"><label className="lbl">Categoria (opzionale)</label><input className="inp" style={{marginBottom:0}} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} placeholder="es. Lavoro, Macchinario"/></div>
            <div style={{display:"flex",gap:9}}><button className="btn" style={{flex:1}} onClick={handleAdd}>Salva</button><button className="btn-g" onClick={()=>setAdding(false)}>Annulla</button></div>
          </div>
        </div>
      )}
      {sorted.length>0?(
        <div className="card">
          <div className="ctitle">Movimenti</div>
          {sorted.map(c=>(
            <div key={c.id} className="ci">
              <div className="cdot" style={{background:c.type==="entrata"?"var(--green)":"var(--red)"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.desc}</div>
                <div style={{fontSize:12,color:"var(--muted)"}}>{c.date} · {c.addedByName}{c.category&&<span className="pill pill-x" style={{marginLeft:5,fontSize:10}}>{c.category}</span>}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:c.type==="entrata"?"var(--green)":"var(--red)"}}>{c.type==="entrata"?"+":"-"}{c.amount.toFixed(2)} EUR</div>
                {(c.addedBy===me.id||me.role==="superadmin")&&<button className="btn-r" style={{padding:"2px 7px",fontSize:10}} onClick={()=>handleDel(c.id)}>X</button>}
              </div>
            </div>
          ))}
        </div>
      ):<div className="empty"><div className="ico">💰</div>Nessun movimento in cassa</div>}
    </div>
  );
}

function TabProfilo({data,me,setMe,persist,showToast,isSA}){
  const u=data.users.find(u=>u.id===me.id);
  const [name,setName]=useState(u?.name||"");
  const [pass,setPass]=useState("");const [pass2,setPass2]=useState("");
  const [extras,setExtras]=useState(u?.extras||{});
  const cts=data.costTypes||DEFAULT_CTS;
  const handleSave=async()=>{
    if(!name.trim()){showToast("Il nome non puo essere vuoto");return;}
    if(pass&&pass!==pass2){showToast("Le password non coincidono");return;}
    if(name.toLowerCase()!==u.name.toLowerCase()&&data.users.find(x=>x.id!==me.id&&x.name.toLowerCase()===name.trim().toLowerCase())){showToast("Nome gia in uso");return;}
    const patch={name:name.trim(),extras};
    if(pass)patch.password=pass;
    const users=data.users.map(x=>x.id===me.id?{...x,...patch}:x);
    await persist({...data,users});setMe({...me,...patch});setPass("");setPass2("");showToast("Profilo aggiornato");
  };
  return(
    <div className="page">
      <div className="card">
        <div className="ctitle">Il mio profilo</div>
        <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:18}}>
          <div style={{width:50,height:50,background:"linear-gradient(135deg,var(--accent),#c2410c)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:900,color:"#000"}}>{(name[0]||"?").toUpperCase()}</div>
          <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700}}>{u?.name}</div><span className={`badge ${isSA?"badge-sa":"badge-u"}`}>{isSA?"Super Admin":"Partecipante"}</span></div>
        </div>
        <div className="fw" style={{marginBottom:13}}><label className="lbl">Nome visualizzato</label><input className="inp" style={{marginBottom:0}} value={name} onChange={e=>setName(e.target.value)}/></div>
        <div className="frow">
          <div className="fw"><label className="lbl">Nuova Password</label><input className="inp" style={{marginBottom:0}} type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Lascia vuoto per non cambiare"/></div>
          <div className="fw"><label className="lbl">Conferma</label><input className="inp" style={{marginBottom:0}} type="password" value={pass2} onChange={e=>setPass2(e.target.value)} placeholder="Ripeti"/></div>
        </div>
      </div>
      {!isSA&&(
        <div className="card">
          <div className="ctitle">Le mie dotazioni</div>
          {cts.map(ct=>(
            <div key={ct.id} className="trow">
              <div><div style={{fontSize:14}}>{ct.icon} {ct.label}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{ct.price} EUR / {ct.unit} / mese</div></div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button className="stbtn" style={{background:"var(--border)",color:"var(--text)"}} onClick={()=>setExtras(ex=>({...ex,[ct.id]:Math.max(0,(ex[ct.id]||0)-1)}))}>-</button>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700,minWidth:22,textAlign:"center"}}>{extras[ct.id]||0}</span>
                <button className="stbtn" style={{background:"var(--accent)",color:"#000"}} onClick={()=>setExtras(ex=>({...ex,[ct.id]:(ex[ct.id]||0)+1}))}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn" onClick={handleSave}>Salva Modifiche</button>
    </div>
  );
}

function TabAdmin({data,me,persist,showToast}){
  const [sec,setSec]=useState("users");
  const [affitto,setAffitto]=useState(data.settings?.affitto??650);
  const [newName,setNewName]=useState("");const [newPass,setNewPass]=useState("");
  const [editing,setEditing]=useState(null);
  const [cts,setCts]=useState(data.costTypes||DEFAULT_CTS);
  const [editCT,setEditCT]=useState(null);
  const [addingCT,setAddingCT]=useState(false);
  const [nct,setNct]=useState({label:"",price:"",icon:"📦",unit:""});
  const regular=data.users.filter(u=>u.role!=="superadmin");
  const addUser=async()=>{
    if(!newName.trim()||!newPass.trim())return;
    if(data.users.find(u=>u.name.toLowerCase()===newName.trim().toLowerCase())){showToast("Utente gia esistente");return;}
    const u={id:uid(),name:newName.trim(),password:newPass.trim(),role:"user",extras:{}};
    await persist({...data,users:[...data.users,u]});setNewName("");setNewPass("");showToast("Aggiunto");
  };
  const delUser=async id=>{
    if(id===me.id){showToast("Non puoi eliminare te stesso");return;}
    await persist({...data,users:data.users.filter(u=>u.id!==id)});showToast("Rimosso");
  };
  const saveUser=async(id,patch)=>{await persist({...data,users:data.users.map(u=>u.id===id?{...u,...patch}:u)});setEditing(null);showToast("Salvato");};
  const saveAff=async()=>{await persist({...data,settings:{...data.settings,affitto:parseFloat(affitto)||650}});showToast("Aggiornato");};
  const addCT=async()=>{
    if(!nct.label.trim()||!nct.price||!nct.unit.trim())return;
    const ct={id:uid(),label:nct.label.trim(),price:parseFloat(nct.price),icon:nct.icon,unit:nct.unit.trim()};
    const upd=[...cts,ct];setCts(upd);await persist({...data,costTypes:upd});setNct({label:"",price:"",icon:"📦",unit:""});setAddingCT(false);showToast("Aggiunta");
  };
  const delCT=async id=>{const upd=cts.filter(c=>c.id!==id);setCts(upd);await persist({...data,costTypes:upd});showToast("Rimossa");};
  const saveCT=async(id,patch)=>{const upd=cts.map(c=>c.id===id?{...c,...patch}:c);setCts(upd);await persist({...data,costTypes:upd});setEditCT(null);showToast("Aggiornata");};
  return(
    <div className="page">
      <div style={{display:"flex",gap:7,marginBottom:16}}>
        {[["users","Utenti"],["costs","Costi"],["settings","Config"]].map(([k,l])=>(
          <button key={k} className={sec===k?"btn":"btn-g"} style={{flex:1,width:"auto",padding:"9px",fontSize:13}} onClick={()=>setSec(k)}>{l}</button>
        ))}
      </div>
      {sec==="users"&&(
        <>
          <div className="card">
            <div className="ctitle">Partecipanti ({regular.length})</div>
            {regular.length===0&&<div style={{color:"var(--muted)",fontSize:13}}>Nessun partecipante ancora</div>}
            {regular.map(u=>(
              <div key={u.id}>
                {editing===u.id?(
                  <AdminEditUser user={u} cts={data.costTypes||DEFAULT_CTS} onSave={p=>saveUser(u.id,p)} onCancel={()=>setEditing(null)}/>
                ):(
                  <div className="urow">
                    <div className="uav">{u.name[0].toUpperCase()}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:500,fontSize:14}}>{u.name}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:3}}>
                        {Object.entries(u.extras||{}).filter(([,v])=>v>0).map(([cid,qty])=>{const ct=(data.costTypes||DEFAULT_CTS).find(c=>c.id===cid);return ct?<span key={cid} className="pill pill-x" style={{fontSize:10}}>{ct.icon}x{qty}</span>:null;})}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn-g" style={{padding:"4px 9px",fontSize:12}} onClick={()=>setEditing(u.id)}>Modifica</button>
                      <button className="btn-r" style={{padding:"4px 9px",fontSize:12}} onClick={()=>delUser(u.id)}>X</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ctitle">Aggiungi Partecipante</div>
            <div className="frow">
              <div className="fw"><label className="lbl">Nome</label><input className="inp" style={{marginBottom:0}} value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Nome"/></div>
              <div className="fw"><label className="lbl">Password</label><input className="inp" style={{marginBottom:0}} value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="Password"/></div>
            </div>
            <button className="btn" style={{marginTop:11}} onClick={addUser}>+ Aggiungi</button>
          </div>
        </>
      )}
      {sec==="costs"&&(
        <>
          <div style={{background:"rgba(234,179,8,.08)",border:"1px solid rgba(234,179,8,.2)",borderRadius:10,padding:"9px 13px",marginBottom:13,fontSize:13,color:"#fde68a"}}>Gestisci le tipologie di dotazione. Ogni utente imposta le proprie quantita dal Profilo.</div>
          <div className="card">
            <div className="ctitle">Tipologie</div>
            {cts.map(ct=>(
              <div key={ct.id}>
                {editCT===ct.id?(
                  <EditCT ct={ct} onSave={p=>saveCT(ct.id,p)} onCancel={()=>setEditCT(null)}/>
                ):(
                  <div className="ctr">
                    <div style={{fontSize:18}}>{ct.icon}</div>
                    <div style={{flex:1}}><div style={{fontWeight:500,fontSize:13}}>{ct.label}</div><div style={{fontSize:11,color:"var(--muted)"}}>{ct.price} EUR/{ct.unit}/mese</div></div>
                    <button className="btn-g" style={{padding:"4px 8px",fontSize:12}} onClick={()=>setEditCT(ct.id)}>Modifica</button>
                    <button className="btn-r" style={{padding:"4px 8px",fontSize:12}} onClick={()=>delCT(ct.id)}>X</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {!addingCT?<button className="btn" onClick={()=>setAddingCT(true)}>+ Nuova Tipologia</button>:(
            <div className="card">
              <div className="ctitle">Nuova Tipologia</div>
              <div className="fgrid">
                <div className="frow">
                  <div className="fw" style={{flex:"0 0 55px"}}><label className="lbl">Icona</label><input className="inp" style={{marginBottom:0,textAlign:"center",fontSize:18}} value={nct.icon} onChange={e=>setNct(f=>({...f,icon:e.target.value}))}/></div>
                  <div className="fw"><label className="lbl">Nome</label><input className="inp" style={{marginBottom:0}} value={nct.label} onChange={e=>setNct(f=>({...f,label:e.target.value}))} placeholder="es. Mezzo posto"/></div>
                </div>
                <div className="frow">
                  <div className="fw"><label className="lbl">EUR/mese</label><input className="inp" style={{marginBottom:0}} type="number" value={nct.price} onChange={e=>setNct(f=>({...f,price:e.target.value}))} placeholder="0"/></div>
                  <div className="fw"><label className="lbl">Unita</label><input className="inp" style={{marginBottom:0}} value={nct.unit} onChange={e=>setNct(f=>({...f,unit:e.target.value}))} placeholder="posto"/></div>
                </div>
                <div style={{display:"flex",gap:9}}><button className="btn" style={{flex:1}} onClick={addCT}>Aggiungi</button><button className="btn-g" onClick={()=>setAddingCT(false)}>Annulla</button></div>
              </div>
            </div>
          )}
        </>
      )}
      {sec==="settings"&&(
        <div className="card">
          <div className="ctitle">Affitto Mensile Totale</div>
          <div style={{fontSize:13,color:"var(--muted)",marginBottom:13}}>Il costo fisso mensile del capannone ripartito tra i partecipanti.</div>
          <div style={{display:"flex",gap:9,alignItems:"center"}}>
            <input className="inp" style={{marginBottom:0,flex:1}} type="number" value={affitto} onChange={e=>setAffitto(e.target.value)}/>
            <button className="btn" style={{width:"auto",padding:"11px 16px"}} onClick={saveAff}>Salva</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminEditUser({user,cts,onSave,onCancel}){
  const [extras,setExtras]=useState(user.extras||{});
  const [pass,setPass]=useState("");
  return(
    <div className="card" style={{border:"1px solid var(--accent)",margin:"8px 0"}}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,marginBottom:11}}>Modifica: {user.name}</div>
      {cts.map(ct=>(
        <div key={ct.id} className="trow">
          <div><div style={{fontSize:13}}>{ct.icon} {ct.label}</div><div style={{fontSize:11,color:"var(--muted)"}}>{ct.price} EUR/{ct.unit}</div></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button className="stbtn" style={{background:"var(--border)",color:"var(--text)"}} onClick={()=>setExtras(ex=>({...ex,[ct.id]:Math.max(0,(ex[ct.id]||0)-1)}))}>-</button>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:19,fontWeight:700,minWidth:20,textAlign:"center"}}>{extras[ct.id]||0}</span>
            <button className="stbtn" style={{background:"var(--accent)",color:"#000"}} onClick={()=>setExtras(ex=>({...ex,[ct.id]:(ex[ct.id]||0)+1}))}>+</button>
          </div>
        </div>
      ))}
      <div className="fw" style={{margin:"11px 0"}}>
        <label className="lbl">Nuova Password (vuoto = non cambiare)</label>
        <input className="inp" style={{marginBottom:0}} value={pass} onChange={e=>setPass(e.target.value)} placeholder="......"/>
      </div>
      <div style={{display:"flex",gap:9}}>
        <button className="btn" style={{flex:1}} onClick={()=>onSave({extras,...(pass?{password:pass}:{})})}>Salva</button>
        <button className="btn-g" onClick={onCancel}>Annulla</button>
      </div>
    </div>
  );
}

function EditCT({ct,onSave,onCancel}){
  const [label,setLabel]=useState(ct.label);const [price,setPrice]=useState(ct.price);
  const [icon,setIcon]=useState(ct.icon);const [unit,setUnit]=useState(ct.unit);
  return(
    <div className="card" style={{border:"1px solid var(--accent)",margin:"6px 0"}}>
      <div className="fgrid">
        <div className="frow">
          <div className="fw" style={{flex:"0 0 55px"}}><label className="lbl">Icona</label><input className="inp" style={{marginBottom:0,textAlign:"center",fontSize:18}} value={icon} onChange={e=>setIcon(e.target.value)}/></div>
          <div className="fw"><label className="lbl">Nome</label><input className="inp" style={{marginBottom:0}} value={label} onChange={e=>setLabel(e.target.value)}/></div>
        </div>
        <div className="frow">
          <div className="fw"><label className="lbl">EUR/mese</label><input className="inp" style={{marginBottom:0}} type="number" value={price} onChange={e=>setPrice(+e.target.value)}/></div>
          <div className="fw"><label className="lbl">Unita</label><input className="inp" style={{marginBottom:0}} value={unit} onChange={e=>setUnit(e.target.value)}/></div>
        </div>
        <div style={{display:"flex",gap:9}}><button className="btn" style={{flex:1}} onClick={()=>onSave({label,price,icon,unit})}>Salva</button><button className="btn-g" onClick={onCancel}>Annulla</button></div>
      </div>
    </div>
  );
}
