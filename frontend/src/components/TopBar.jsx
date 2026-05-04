import { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { T } from './UI';

const TopBar = ({user,sw,onNav}) => {
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);
  },[]);
  return (
    <header style={{height:54,background:T.surface,borderBottom:`1px solid ${T.border}`,position:'fixed',top:0,left:sw,right:0,zIndex:150,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',transition:'left .26s cubic-bezier(.4,0,.2,1)'}}>
      <div style={{position:'relative'}}>
        <Search size={13} style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:T.textDim}}/>
        <input placeholder='Search exams, subjects...' style={{background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:8,padding:'7px 12px 7px 32px',color:T.textPrimary,fontSize:12,width:240,outline:'none'}}/>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button style={{background:'none',border:'none',color:T.textMuted,padding:7,borderRadius:8,cursor:'pointer'}}><Bell size={17}/></button>
        <div ref={ref} style={{position:'relative'}}>
          <div onClick={()=>setOpen(p=>!p)} style={{width:34,height:34,borderRadius:'50%',background:T.accent+'22',border:`2px solid ${open?T.accent:T.accent+'44'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:T.accent,cursor:'pointer',userSelect:'none'}}>{user?.avatar||'?'}</div>
          {open&&(
            <div className='fi' style={{position:'absolute',right:0,top:44,width:220,background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,boxShadow:'0 20px 50px #00000099',zIndex:300,overflow:'hidden'}}>
              <div style={{padding:'16px 16px 12px',borderBottom:`1px solid ${T.border}`}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:T.accent+'22',border:`2px solid ${T.accent}55`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:T.accent,marginBottom:8}}>{user?.avatar}</div>
                <div style={{fontWeight:700,fontSize:14}}>{user?.name}</div>
                <div style={{fontSize:11,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",marginTop:3}}>{user?.email}</div>
              </div>
              {/* <div onClick={()=>setOpen(false)} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 16px',cursor:'pointer',color:T.textMuted,fontSize:13}} onMouseEnter={e=>e.currentTarget.style.background=T.surfaceAlt} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><User size={14} color={T.accent}/>View Profile</div> */}
              <div onClick={()=>{setOpen(false);onNav('__logout__');}} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 16px',cursor:'pointer',color:T.danger,fontSize:13,borderTop:`1px solid ${T.border}`}} onMouseEnter={e=>e.currentTarget.style.background=T.dangerDim} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><LogOut size={14}/>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default TopBar;
