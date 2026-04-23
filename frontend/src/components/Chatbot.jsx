import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { T } from './UI';

const QSAMPLES = ['How can I improve my weak subjects?','Explain my score trend','Give practice questions for DSA','Analyze my performance'];
const BMAP = {
  'weak':'Focus on your lowest-scoring subjects: 15–20 targeted problems daily, review every wrong answer carefully.',
  'trend':'Complete more tests to build a meaningful trend. Consistency is the key metric.',
  'practice':'DSA: 1) Time complexity of heap insert? 2) DFS vs BFS? 3) What is a circular linked list?',
  'analyz':'Check the Analytics section for score trends, subject breakdown, radar chart, and accuracy metrics.'
};

const Chatbot = ({user}) => {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([{role:'bot',text:`Hi ${user?.name?.split(' ')[0]||'there'}! I'm your AI study assistant. How can I help?`}]);
  const [input,setInput]=useState('');
  const [typing,setTyping]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{if(open)bottomRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,open]);
  const send=async text=>{
    const t=text||input.trim();if(!t)return;
    setInput('');setMsgs(p=>[...p,{role:'user',text:t}]);setTyping(true);
    await new Promise(r=>setTimeout(r,700+Math.random()*500));
    const k=Object.keys(BMAP).find(k=>t.toLowerCase().includes(k));
    setMsgs(p=>[...p,{role:'bot',text:k?BMAP[k]:'I can help with exam prep! Ask about weak subjects, practice questions, or score analysis.'}]);
    setTyping(false);
  };
  return (
    <div style={{position:'fixed',bottom:22,right:22,zIndex:500}}>
      {open&&(
        <div className='fu' style={{position:'absolute',bottom:62,right:0,width:345,height:450,background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,boxShadow:'0 20px 60px #00000099',display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{padding:'12px 14px',borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:T.surfaceAlt}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:28,height:28,borderRadius:8,background:T.accentDim,border:`1px solid ${T.accent}44`,display:'flex',alignItems:'center',justifyContent:'center'}}><Bot size={14} color={T.accent}/></div>
              <div><div style={{fontSize:13,fontWeight:600}}>AI Study Assistant</div><div style={{fontSize:10,color:T.accent,fontFamily:"'IBM Plex Mono',monospace"}}>● Powered by Groq</div></div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:'none',border:'none',color:T.textMuted,cursor:'pointer'}}><X size={15}/></button>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'12px 12px 4px'}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{marginBottom:10,display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                {m.role==='bot'&&<div style={{width:24,height:24,borderRadius:6,background:T.accentDim,display:'flex',alignItems:'center',justifyContent:'center',marginRight:7,flexShrink:0,marginTop:2}}><Bot size={11} color={T.accent}/></div>}
                <div style={{maxWidth:'76%',padding:'9px 12px',borderRadius:m.role==='user'?'12px 12px 2px 12px':'2px 12px 12px 12px',background:m.role==='user'?T.accent:T.surfaceAlt,color:m.role==='user'?'#080C10':T.textPrimary,fontSize:13,lineHeight:1.55,whiteSpace:'pre-wrap'}}>{m.text}</div>
              </div>
            ))}
            {typing&&<div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><div style={{width:24,height:24,borderRadius:6,background:T.accentDim,display:'flex',alignItems:'center',justifyContent:'center'}}><Bot size={11} color={T.accent}/></div><div style={{padding:'8px 12px',background:T.surfaceAlt,borderRadius:'2px 12px 12px 12px',display:'flex',gap:4}}>{[0,1,2].map(j=><div key={j} style={{width:6,height:6,borderRadius:'50%',background:T.accent,animation:`pulse 1.5s ease infinite`,animationDelay:`${j*.2}s`}}/>)}</div></div>}
            <div ref={bottomRef}/>
          </div>
          {msgs.length===1&&<div style={{padding:'4px 12px 10px'}}><div style={{fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",marginBottom:6}}>QUICK QUESTIONS</div>{QSAMPLES.map(q=><div key={q} onClick={()=>send(q)} style={{padding:'7px 10px',background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:7,fontSize:12,color:T.textMuted,cursor:'pointer',marginBottom:5,transition:'all .14s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent+'44'} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>{q}</div>)}</div>}
          <div style={{padding:'9px 12px',borderTop:`1px solid ${T.border}`,display:'flex',gap:7}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder='Ask anything...' style={{flex:1,background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:8,padding:'7px 11px',color:T.textPrimary,fontSize:12,outline:'none'}}/>
            <button onClick={()=>send()} style={{width:34,height:34,borderRadius:8,background:T.accent,border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Send size={14} color='#080C10'/></button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(p=>!p)} className={open?'':'glow-btn'} style={{width:50,height:50,borderRadius:'50%',background:open?T.surfaceAlt:T.accent,border:open?`1px solid ${T.border}`:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 24px #00000066',transition:'all .24s'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
        {open?<X size={18} color={T.textMuted}/>:<Bot size={20} color='#080C10'/>}
      </button>
    </div>
  );
};
export default Chatbot;
