import { useState } from 'react';
import { Check } from 'lucide-react';

export const T = {
  bg:"#080C10",surface:"#0F151B",surfaceAlt:"#111820",surfaceHover:"#161F2A",
  border:"#1C2A33",borderFocus:"#00D4AA55",
  accent:"#00D4AA",accentDim:"#00D4AA14",accentGlow:"#00D4AA30",
  purple:"#7C6BF5",purpleDim:"#7C6BF518",
  warn:"#F5A623",warnDim:"#F5A62318",
  danger:"#E85D5D",dangerDim:"#E85D5D18",
  blue:"#4D9EF5",blueDim:"#4D9EF518",
  textPrimary:"#E6F1F5",textMuted:"#7C96A5",textDim:"#3D5464",
};

export const Spin = ({size=18,color=T.accent}) => (
  <div style={{width:size,height:size,borderRadius:'50%',border:`2px solid ${color}22`,borderTopColor:color,flexShrink:0,animation:'spin .8s linear infinite'}}/>
);

export const Badge = ({children,color=T.accent}) => (
  <span style={{display:'inline-flex',alignItems:'center',padding:'2px 9px',borderRadius:20,fontSize:11,fontWeight:600,letterSpacing:'.04em',background:color+'20',color,border:`1px solid ${color}40`,fontFamily:"'IBM Plex Mono',monospace"}}>{children}</span>
);

export const Card = ({children,style={},className=''}) => (
  <div className={className} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:20,...style}}>{children}</div>
);

export const Btn = ({children,onClick,variant='primary',size='md',disabled=false,style={},full=false}) => {
  const sz={sm:{p:'5px 12px',fs:12},md:{p:'8px 18px',fs:13},lg:{p:'11px 26px',fs:14}}[size];
  const v={primary:{bg:T.accent,color:'#080C10',border:'none'},outline:{bg:'transparent',color:T.accent,border:`1px solid ${T.accent}55`},ghost:{bg:'transparent',color:T.textMuted,border:'none'},danger:{bg:T.dangerDim,color:T.danger,border:`1px solid ${T.danger}44`},surface:{bg:T.surfaceAlt,color:T.textPrimary,border:`1px solid ${T.border}`}}[variant]||{};
  return (
    <button onClick={disabled?undefined:onClick} disabled={disabled}
      style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:8,fontWeight:600,transition:'all .18s',opacity:disabled?.5:1,cursor:disabled?'not-allowed':'pointer',padding:sz.p,fontSize:sz.fs,background:v.bg,color:v.color,border:v.border,width:full?'100%':undefined,justifyContent:full?'center':'flex-start',fontFamily:"'Plus Jakarta Sans',sans-serif",...style}}
      onMouseEnter={e=>{if(!disabled)e.currentTarget.style.filter='brightness(1.12)';}}
      onMouseLeave={e=>{e.currentTarget.style.filter='none';}}>
      {children}
    </button>
  );
};

export const Field = ({label,value,onChange,type='text',placeholder,error,hint,suffix,disabled=false}) => {
  const [foc,setFoc]=useState(false);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      {label&&<label style={{fontSize:11,fontWeight:600,letterSpacing:'.07em',color:T.textMuted}}>{label}</label>}
      <div style={{position:'relative'}}>
        <input value={value} onChange={e=>onChange&&onChange(e.target.value)} type={type} placeholder={placeholder} disabled={disabled}
          onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
          style={{width:'100%',background:T.surfaceAlt,border:`1px solid ${error?T.danger:foc?T.accent:T.border}`,borderRadius:9,padding:suffix?'9px 42px 9px 14px':'9px 14px',color:disabled?T.textDim:T.textPrimary,fontSize:13,transition:'border-color .18s',fontFamily:"'Plus Jakarta Sans',sans-serif",outline:'none'}}/>
        {suffix&&<div style={{position:'absolute',right:13,top:'50%',transform:'translateY(-50%)',cursor:'pointer',color:T.textMuted,display:'flex'}}>{suffix}</div>}
      </div>
      {error&&<span style={{fontSize:11,color:T.danger,fontFamily:"'IBM Plex Mono',monospace"}}>{error}</span>}
      {hint&&!error&&<span style={{fontSize:11,color:T.accent,fontFamily:"'IBM Plex Mono',monospace",display:'flex',alignItems:'center',gap:4}}><Check size={10}/>{hint}</span>}
    </div>
  );
};

export const Sel = ({label,value,onChange,options}) => {
  const [foc,setFoc]=useState(false);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      {label&&<label style={{fontSize:11,fontWeight:600,letterSpacing:'.07em',color:T.textMuted}}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        style={{background:T.surfaceAlt,border:`1px solid ${foc?T.accent:T.border}`,borderRadius:9,padding:'9px 14px',color:T.textPrimary,fontSize:13,transition:'border-color .18s',outline:'none',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        {options.map(o=><option key={o.value??o} value={o.value??o} style={{background:T.surface}}>{o.label??o}</option>)}
      </select>
    </div>
  );
};

export const EmptyState = ({icon:Icon,title,sub,action,label}) => (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'56px 20px',textAlign:'center'}}>
    <div style={{width:60,height:60,borderRadius:14,background:T.accentDim,border:`1px solid ${T.accent}22`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}><Icon size={26} color={T.accent} strokeWidth={1.5}/></div>
    <div style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:600,marginBottom:7,color:T.textMuted}}>{title}</div>
    <p style={{fontSize:13,color:T.textDim,maxWidth:280,lineHeight:1.6,marginBottom:action?18:0}}>{sub}</p>
    {action&&<Btn variant='primary' onClick={action}>{label}</Btn>}
  </div>
);

export const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body{height:100%;background:#080C10;color:#E6F1F5;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;}
    ::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:#1C2A33;border-radius:4px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes glowA{0%,100%{box-shadow:0 0 8px #00D4AA44}50%{box-shadow:0 0 22px #00D4AA88}}
    @keyframes timerW{0%,100%{color:#E85D5D}50%{color:#FF9090}}
    .fu{animation:fadeUp .3s ease both}.fi{animation:fadeIn .22s ease both}
    .glow-btn{animation:glowA 2.5s ease infinite}.tw{animation:timerW .9s ease infinite}
    input,select,textarea{outline:none;font-family:'Plus Jakarta Sans',sans-serif;}
    button{font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;}
    .hover-card{transition:all .25s ease;}.hover-card:hover{transform:translateY(-3px);box-shadow:0 8px 30px #00000055;}
  `}</style>
);
