import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Flag, Check, X, AlertTriangle } from 'lucide-react';
import { T, Spin, Card, Btn, Badge } from '../components/UI';
import { generateQuestions, evaluateShortAnswer } from '../utils/questions';
import api from '../utils/api';

const TakeTest = ({exam,onBack}) => {
  const qs=useMemo(()=>exam.qData||generateQuestions(exam.subject,exam.difficulty||'Medium',exam.questions||10,'MCQ'),[exam]);
  const qType=qs[0]?.type||'MCQ';
  const totalSec=(exam.time||45)*60;
  const [timeLeft,setTimeLeft]=useState(totalSec);
  const [cur,setCur]=useState(0);
  const [answers,setAnswers]=useState({});
  const [saEvals,setSaEvals]=useState({});
  const [flagged,setFlagged]=useState(new Set());
  const [done,setDone]=useState(false);
  const [result,setResult]=useState(null);
  const [showFeedback,setShowFeedback]=useState(false);
  const [saEvaluating,setSaEvaluating]=useState(false);

  useEffect(()=>{
    if(done)return;
    const t=setInterval(()=>setTimeLeft(p=>{if(p<=1){clearInterval(t);doSubmit();return 0;}return p-1;}),1000);
    return()=>clearInterval(t);
  },[done]);

  const doSubmit=useCallback(async()=>{
    if(done)return;setDone(true);
    let correct=0;const saResults={};
    if(qType==='Short Answer'){
      setSaEvaluating(true);
      await new Promise(r=>setTimeout(r,1200));
      let totalPts=0;
      qs.forEach((q,i)=>{const ev=evaluateShortAnswer(answers[i]||'',q);saResults[i]=ev;totalPts+=ev.pct;});
      setSaEvals(saResults);setSaEvaluating(false);
      correct=Math.round(totalPts/qs.length);
    }else if(qType==='True/False'){qs.forEach((q,i)=>{if(answers[i]!==undefined&&answers[i]===q.correctIndex)correct++;});}
    else{qs.forEach((q,i)=>{if(answers[i]!==undefined&&answers[i]===q.ans)correct++;});}
    const score=qType==='Short Answer'?correct:Math.round(correct/qs.length*100);
    const correctCount=qType==='Short Answer'?Math.round(correct*qs.length/100):correct;
    const elapsed=totalSec-timeLeft;const m=Math.floor(elapsed/60),s=elapsed%60;
    const attempt={exam:exam.title,subject:exam.subject||'General',difficulty:exam.difficulty||'Medium',qType,score,total:100,correct:correctCount,totalQ:qs.length,time:`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`,date:new Date().toISOString().slice(0,10),status:score>=60?'passed':'failed'};
    try{await api.post('/attempts',attempt);}catch(e){console.error(e);}
    setResult({...attempt,saEvals:saResults});
    setTimeout(()=>setShowFeedback(true),500);
  },[done,answers,qs,timeLeft,totalSec,exam,qType]);

  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const pct=Math.round(Object.keys(answers).length/qs.length*100);
  const isLow=timeLeft<120;
  const q=qs[cur];

  if(done&&result){
    return (
      <div className='fu'>
        <Card style={{maxWidth:620,margin:'0 auto',textAlign:'center',padding:44,marginBottom:20}}>
          {saEvaluating?(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,padding:'20px 0'}}>
              <Spin size={32}/><div style={{fontFamily:"'Fraunces',serif",fontSize:16,color:T.textMuted}}>AI evaluating your answers...</div>
            </div>
          ):(
            <>
              <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:14}}>
                <Badge color={T.textDim}>{exam.subject}</Badge>
                <Badge color={result.status==='passed'?T.accent:T.danger}>{result.status}</Badge>
              </div>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:76,fontWeight:700,color:result.score>=60?T.accent:T.danger,lineHeight:1}}>{result.score}%</div>
              <div style={{fontSize:14,color:T.textMuted,margin:'10px 0 6px'}}>{qType==='Short Answer'?`Avg semantic score · ${qs.length} questions`:`${result.correct}/${result.totalQ} correct`}</div>
              <div style={{fontSize:12,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",marginBottom:28}}>Time: {result.time} · {result.difficulty}</div>
              <div style={{display:'flex',gap:10,justifyContent:'center'}}>
                <Btn variant='primary' size='lg' onClick={onBack}>Back to Tests</Btn>
                <Btn variant='outline' size='lg' onClick={()=>setShowFeedback(p=>!p)}>{showFeedback?'Hide':'Show'} Review</Btn>
              </div>
            </>
          )}
        </Card>
        {showFeedback&&!saEvaluating&&(
          <Card className='fu' style={{maxWidth:720,margin:'0 auto'}}>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:14}}>Answer Review</div>
            <div style={{maxHeight:600,overflowY:'auto'}}>
              {qs.map((q,i)=>{
                const ua=answers[i];
                if(qType==='True/False'){
                  const ci=q.correctIndex,isCorrect=ua===ci;
                  return(
                    <div key={i} style={{padding:'14px 0',borderBottom:`1px solid ${T.border}22`}}>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:10,color:T.textPrimary}}><span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.accent,marginRight:8}}>#{i+1}</span>{q.q}</div>
                      <div style={{display:'flex',gap:10,marginBottom:8}}>
                        {['True','False'].map((opt,j)=>{
                          const isSel=ua===j,isCorrectOpt=j===ci;
                          return<div key={opt} style={{padding:'6px 14px',borderRadius:20,border:`1px solid ${isSel?(isCorrect?T.accent:T.danger):T.border}`,background:isSel?(isCorrect?T.accentDim:T.dangerDim):'transparent',fontSize:12,fontWeight:isSel?700:400,color:isSel?(isCorrect?T.accent:T.danger):T.textDim}}>{isSel?(isCorrect?'✓ ':'✗ '):''}  {opt}{isCorrectOpt&&!isSel?' (correct)':''}</div>;
                        })}
                      </div>
                      <div style={{fontSize:11,color:T.textDim,padding:'8px 12px',background:T.surfaceAlt,borderRadius:7,borderLeft:`3px solid ${T.accent}44`,fontStyle:'italic'}}>{q.exp}</div>
                    </div>
                  );
                }
                if(qType==='Short Answer'){
                  const ev=result.saEvals?.[i]||{score:0,feedback:'Not evaluated.',keywordsFound:[],keywordScore:0,aiScore:0};
                  const sc=ev.pct||ev.score||0;const scoreColor=sc>=80?T.accent:sc>=50?T.warn:T.danger;
                  return(
                    <div key={i} style={{padding:'16px 0',borderBottom:`1px solid ${T.border}22`}}>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:10}}><span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.accent,marginRight:8}}>#{i+1}</span>{q.q}</div>
                      <div style={{marginBottom:10}}><div style={{fontSize:10,color:T.textDim,fontWeight:700,letterSpacing:'.06em',marginBottom:5,fontFamily:"'IBM Plex Mono',monospace"}}>YOUR ANSWER</div><div style={{padding:'10px 14px',background:T.surfaceAlt,borderRadius:8,fontSize:13,color:ua?T.textPrimary:T.textDim,fontStyle:ua?'normal':'italic',lineHeight:1.6,border:`1px solid ${T.border}`}}>{ua||'(No answer provided)'}</div></div>
                      <div style={{marginBottom:10}}><div style={{fontSize:10,color:T.textDim,fontWeight:700,letterSpacing:'.06em',marginBottom:5,fontFamily:"'IBM Plex Mono',monospace"}}>CORRECT EXPLANATION</div><div style={{padding:'10px 14px',background:T.accentDim,borderRadius:8,fontSize:13,color:T.textMuted,lineHeight:1.6,borderLeft:`3px solid ${T.accent}55`,border:`1px solid ${T.accent}22`}}>{q.exp}</div></div>
                      <div style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:14,alignItems:'center'}}>
                        <div style={{textAlign:'center',minWidth:80}}>
                          <div style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:700,color:scoreColor,lineHeight:1}}>{sc}%</div>
                          <div style={{fontSize:10,color:T.textDim}}>score</div>
                        </div>
                        <div style={{padding:'10px 14px',background:`${scoreColor}10`,border:`1px solid ${scoreColor}33`,borderRadius:8,fontSize:12,color:T.textMuted,lineHeight:1.6}}><span style={{fontSize:10,fontWeight:700,color:scoreColor,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:'.05em',display:'block',marginBottom:4}}>AI FEEDBACK</span>{ev.feedback}</div>
                      </div>
                    </div>
                  );
                }
                const isCorrect=ua===q.ans;
                return(
                  <div key={i} style={{padding:'12px 0',borderBottom:`1px solid ${T.border}22`}}>
                    <div style={{fontSize:12,fontWeight:500,marginBottom:9,color:isCorrect?T.accent:T.danger,display:'flex',gap:8,alignItems:'flex-start'}}><span style={{flexShrink:0,fontFamily:"'IBM Plex Mono',monospace"}}>{isCorrect?'✓':'✗'} Q{i+1}.</span><span style={{lineHeight:1.5}}>{q.q}</span></div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:6,marginLeft:24,marginBottom:6}}>{q.opts?.map((o,j)=><span key={j} style={{fontSize:11,padding:'4px 12px',borderRadius:6,background:j===q.ans?T.accent+'22':j===ua&&!isCorrect?T.dangerDim:'transparent',border:`1px solid ${j===q.ans?T.accent+'55':j===ua&&!isCorrect?T.danger+'44':T.border}`,color:j===q.ans?T.accent:j===ua&&!isCorrect?T.danger:T.textDim,fontWeight:j===q.ans?700:400}}>{['A','B','C','D'][j]}. {o}{j===q.ans?' ✓':''}</span>)}</div>
                    <div style={{fontSize:11,color:T.textDim,marginLeft:24,padding:'7px 12px',background:T.surfaceAlt,borderRadius:6,borderLeft:`3px solid ${T.accent}33`,fontStyle:'italic',lineHeight:1.5}}>{q.exp}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    );
  }

  const isTF=qType==='True/False';const isSA=qType==='Short Answer';
  return (
    <div className='fu'>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:'12px 18px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
        <div><div style={{fontWeight:600,fontSize:14}}>{exam.title}</div><div style={{fontSize:11,color:T.textMuted,fontFamily:"'IBM Plex Mono',monospace",marginTop:1}}>Q{cur+1}/{qs.length} · {pct}% answered · {exam.subject}</div></div>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:26,fontWeight:700,color:isLow?T.danger:T.textPrimary}} className={isLow?'tw':''}>{fmt(timeLeft)}</div>
        <Btn variant='danger' onClick={doSubmit}>Submit Exam</Btn>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 200px',gap:16}}>
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <Badge color={T.textDim}>Q {cur+1}/{qs.length}</Badge>
              {isTF&&<Badge color={T.purple}>True / False</Badge>}
              {isSA&&<Badge color={T.blue}>Short Answer</Badge>}
              {flagged.has(cur)&&<Badge color={T.warn}>FLAGGED</Badge>}
            </div>
            <Btn variant='ghost' size='sm' onClick={()=>setFlagged(p=>{const n=new Set(p);n.has(cur)?n.delete(cur):n.add(cur);return n;})}><Flag size={13}/>{flagged.has(cur)?'Unflag':'Flag'}</Btn>
          </div>
          {isTF?(
            <div>
              <div style={{padding:'14px 18px',background:T.surfaceAlt,borderRadius:10,border:`1px solid ${T.border}`,marginBottom:20}}><div style={{fontSize:11,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",marginBottom:8,fontWeight:700}}>STATEMENT</div><p style={{fontSize:15,fontWeight:500,lineHeight:1.75}}>{q.q}</p></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:8}}>
                {['True','False'].map((opt,i)=>{
                  const sel=answers[cur]===i;const optColor=i===0?T.accent:T.danger;
                  return(
                    <div key={opt} onClick={()=>setAnswers(p=>({...p,[cur]:i}))} style={{padding:'22px',borderRadius:12,cursor:'pointer',border:`2px solid ${sel?optColor:T.border}`,background:sel?optColor+'15':T.surfaceAlt,textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:10}} onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=optColor+'66';}}} onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor=T.border;}}}>
                      <div style={{width:40,height:40,borderRadius:'50%',background:sel?optColor:T.border+'44',display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${sel?optColor:T.border}`}}>{i===0?<Check size={20} color={sel?T.surface:T.textDim} strokeWidth={2.5}/>:<X size={20} color={sel?T.surface:T.textDim} strokeWidth={2.5}/>}</div>
                      <span style={{fontSize:17,fontWeight:700,color:sel?optColor:T.textMuted,fontFamily:"'Fraunces',serif"}}>{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ):isSA?(
            <div>
              <p style={{fontSize:15,fontWeight:500,lineHeight:1.7,marginBottom:16}}>{q.q}</p>
              <div style={{fontSize:11,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",marginBottom:8,fontWeight:700,letterSpacing:'.05em'}}>YOUR ANSWER</div>
              <textarea placeholder='Type your answer here...' onChange={e=>setAnswers(p=>({...p,[cur]:e.target.value}))} value={answers[cur]||''} style={{width:'100%',background:T.surfaceAlt,border:`1px solid ${answers[cur]?T.accent+'55':T.border}`,borderRadius:10,padding:'14px',color:T.textPrimary,fontSize:13,minHeight:150,resize:'vertical',lineHeight:1.6,outline:'none',fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
              <div style={{marginTop:8,padding:'7px 12px',background:T.warnDim,border:`1px solid ${T.warn}33`,borderRadius:7,fontSize:11,color:T.warn,display:'flex',gap:6,alignItems:'center'}}><AlertTriangle size={11}/>Partial credit awarded by keyword matching + AI analysis</div>
            </div>
          ):(
            <div>
              <p style={{fontSize:15,fontWeight:500,lineHeight:1.7,marginBottom:22}}>{q.q}</p>
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
                {q.opts?.map((opt,i)=>{const sel=answers[cur]===i;return(
                  <div key={i} onClick={()=>setAnswers(p=>({...p,[cur]:i}))} style={{padding:'12px 16px',borderRadius:10,cursor:'pointer',border:`2px solid ${sel?T.accent:T.border}`,background:sel?T.accentDim:T.surfaceAlt,display:'flex',gap:12,alignItems:'center'}} onMouseEnter={e=>{if(!sel)e.currentTarget.style.borderColor=T.accent+'44';}} onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor=T.border;}}>
                    <span style={{width:26,height:26,borderRadius:'50%',border:`2px solid ${sel?T.accent:T.border}`,background:sel?T.accent:'transparent',color:sel?'#080C10':T.textDim,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,fontFamily:"'IBM Plex Mono',monospace",flexShrink:0}}>{['A','B','C','D'][i]||String(i+1)}</span>
                    <span style={{fontSize:13,color:sel?T.textPrimary:T.textMuted}}>{opt}</span>
                  </div>
                );})}
              </div>
            </div>
          )}
          <div style={{display:'flex',justifyContent:'space-between',marginTop:22}}>
            <Btn variant='surface' onClick={()=>setCur(p=>Math.max(0,p-1))} disabled={cur===0}><ChevronLeft size={14}/>Prev</Btn>
            {cur<qs.length-1?<Btn variant='primary' onClick={()=>setCur(p=>p+1)}>Next <ChevronRight size={14}/></Btn>:<Btn variant='danger' onClick={doSubmit}>Submit Exam</Btn>}
          </div>
        </Card>
        <div>
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:10,color:T.textMuted,fontWeight:600,letterSpacing:'.07em',marginBottom:10}}>QUESTION MAP</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:4}}>
              {qs.map((_,i)=>{const answered=answers[i]!==undefined&&answers[i]!=='';const fl=flagged.has(i),iC=i===cur;return(
                <div key={i} onClick={()=>setCur(i)} style={{aspectRatio:'1',borderRadius:5,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:600,fontFamily:"'IBM Plex Mono',monospace",border:`2px solid ${iC?T.accent:fl?T.warn:answered?T.accent+'44':T.border}`,background:iC?T.accentDim:fl?T.warnDim:answered?T.accentDim+'88':T.surfaceAlt,color:iC?T.accent:fl?T.warn:answered?T.accent:T.textDim}}>{i+1}</div>
              );})}
            </div>
          </Card>
          <Card>
            <div style={{height:5,background:T.border,borderRadius:3,overflow:'hidden',marginBottom:6}}><div style={{width:`${pct}%`,height:'100%',background:T.accent,borderRadius:3,transition:'width .3s'}}/></div>
            <div style={{fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}>{pct}% answered</div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default TakeTest;
