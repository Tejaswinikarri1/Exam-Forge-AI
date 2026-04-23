import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Cpu, Upload, FilePlus, Check, AlertTriangle, BookOpen } from 'lucide-react';
import { T, Spin, Card, Btn, Badge, Field, Sel } from '../components/UI';
import { ALL_SUBJECTS, generateMockTest } from '../utils/questions';
import api from '../utils/api';

const CreateExam = ({onNav,onStartTest}) => {
  const [step,setStep]=useState(1);
  const [cfg,setCfg]=useState({title:'',subject:'Python',topic:'',difficulty:'Medium',count:'10',time:'45',type:'MCQ'});
  const [mode,setMode]=useState('ai');
  const [aiStep,setAiStep]=useState(0);const [aiRunning,setAiRunning]=useState(false);
  const [generated,setGenerated]=useState(null);
  const [pdfFile,setPdfFile]=useState(null);const [pdfErr,setPdfErr]=useState('');const [pdfParsing,setPdfParsing]=useState(false);
  const [saved,setSaved]=useState(false);
  const fileRef=useRef(null);
  const f=k=>v=>setCfg(p=>({...p,[k]:v}));
  const dc=d=>d==='Easy'?T.accent:d==='Medium'?T.warn:T.danger;

  const getQuestionCount = () => {
    const parsed = parseInt(cfg.count, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
  };
  const questionCount = getQuestionCount();
  const AI_STEPS=['Analyzing subject: '+cfg.subject,'Applying difficulty: '+cfg.difficulty,`Generating ${questionCount} ${cfg.type} questions...`,'Removing duplicates...','Formatting exam structure...'];

  const runAI=async()=>{
    setAiRunning(true);setAiStep(0);setGenerated(null);
    for(let i=0;i<AI_STEPS.length;i++){await new Promise(r=>setTimeout(r,450+Math.random()*300));setAiStep(i+1);}
    const generatedMock = generateMockTest({ subject: cfg.subject, topic: cfg.topic, difficulty: cfg.difficulty, type: cfg.type, count: questionCount });
    setGenerated({ title: cfg.title || (cfg.subject + ' ' + cfg.difficulty + ' Test'), subject: cfg.subject, difficulty: cfg.difficulty, type: cfg.type, questions: generatedMock.questions, time: parseInt(cfg.time) || 45 });
    setAiRunning(false);setStep(3);
  };

  const doPDF=()=>{
    if(!pdfFile){setPdfErr('Please upload a PDF file first.');return;}
    setPdfErr('');setPdfParsing(true);
    setTimeout(()=>{
      const generatedMock = generateMockTest({ subject: cfg.subject, topic: cfg.topic, difficulty: 'Medium', type: 'MCQ', count: questionCount });
      setGenerated({ title: 'PDF Extract — ' + cfg.subject, subject: cfg.subject, difficulty: 'Medium', type: 'MCQ', questions: generatedMock.questions, time: parseInt(cfg.time) || 45 });
      setPdfParsing(false);setStep(3);
    },2500);
  };

  const saveExam=async()=>{
    try{
      await api.post('/exams',{title:cfg.title||generated.title,subject:generated.subject,topic:cfg.topic,difficulty:generated.difficulty,questions:generated.questions.length,time:generated.time,type:generated.type});
      setSaved(true);
    }catch(e){console.error(e);}
  };

  const startNow=()=>{onStartTest({...generated,title:cfg.title||generated.title,qData:generated.questions});onNav('take-test');};

  return (
    <div className='fu'>
      <h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:600,marginBottom:4}}>Create New Exam</h1>
      <p style={{color:T.textMuted,fontSize:13,marginBottom:22}}>Configure and generate AI-powered questions</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:24}}>
        {['Configure','Generate','Review & Launch'].map((s,i)=>{const n=i+1,act=step===n,done=step>n;return(
          <div key={s} onClick={()=>done&&setStep(n)} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 16px',borderRadius:10,background:act?T.accentDim:T.surface,border:`1px solid ${act?T.accent:done?T.accent+'33':T.border}`,cursor:done?'pointer':'default'}}>
            <div style={{width:24,height:24,borderRadius:'50%',background:act?T.accent:done?T.accent+'33':T.border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:act?'#080C10':done?T.accent:T.textDim,flexShrink:0}}>{done?<Check size={12}/>:n}</div>
            <span style={{fontWeight:act?700:500,color:act?T.accent:done?T.textMuted:T.textDim,fontSize:13}}>{s}</span>
          </div>
        );})}
      </div>

      {step===1&&(
        <Card className='fi' style={{maxWidth:600}}>
          <h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,marginBottom:18}}>Exam Configuration</h3>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <Field label='EXAM TITLE' value={cfg.title} onChange={f('title')} placeholder='e.g. Python Medium Mock Test'/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Sel label='SUBJECT' value={cfg.subject} onChange={f('subject')} options={ALL_SUBJECTS}/>
              <Sel label='DIFFICULTY' value={cfg.difficulty} onChange={f('difficulty')} options={['Easy','Medium','Hard']}/>
            </div>
            <Field label='TOPIC (OPTIONAL)' value={cfg.topic} onChange={f('topic')} placeholder='e.g. Decorators, OOP'/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label='NUMBER OF QUESTIONS' type='number' value={cfg.count} onChange={f('count')} placeholder='e.g. 20' />
              <Field label='TIME LIMIT (MINUTES)' type='number' value={cfg.time} onChange={f('time')} placeholder='e.g. 45'/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:600,letterSpacing:'.06em',color:T.textMuted,display:'block',marginBottom:8}}>QUESTION TYPE</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                {['MCQ','True/False','Short Answer'].map(t=>(
                  <div key={t} onClick={()=>f('type')(t)} style={{padding:'10px',textAlign:'center',borderRadius:8,cursor:'pointer',border:`1px solid ${cfg.type===t?T.accent:T.border}`,background:cfg.type===t?T.accentDim:T.surfaceAlt,color:cfg.type===t?T.accent:T.textMuted,fontSize:13,fontWeight:cfg.type===t?600:400}}>{t}</div>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:10,marginTop:4}}>
              <Btn variant='surface' onClick={()=>onNav('dashboard')}>Cancel</Btn>
              <Btn variant='primary' onClick={()=>setStep(2)}>Continue <ChevronRight size={14}/></Btn>
            </div>
          </div>
        </Card>
      )}

      {step===2&&(
        <div className='fi'>
          <div style={{display:'flex',gap:8,marginBottom:18}}>
            {[{id:'ai',label:'AI Generate',I:Cpu},{id:'pdf',label:'Upload PDF',I:Upload},{id:'manual',label:'Manual',I:FilePlus}].map(m=>(
              <Btn key={m.id} variant={mode===m.id?'primary':'surface'} size='sm' onClick={()=>setMode(m.id)}><m.I size={13}/>{m.label}</Btn>
            ))}
          </div>
          {mode==='ai'&&(
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
              <Card>
                <h3 style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:16}}>AI Generation</h3>
                <div style={{background:T.accentDim,border:`1px solid ${T.accent}22`,borderRadius:8,padding:'11px 14px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textMuted,lineHeight:1.8,marginBottom:14}}>
                  Generate <span style={{color:T.accent}}>{questionCount}</span> <span style={{color:dc(cfg.difficulty)}}>{cfg.difficulty.toLowerCase()}</span> {cfg.type} questions for <span style={{color:T.accent}}>{cfg.subject}</span>.
                </div>
                <Btn variant='primary' full onClick={runAI} disabled={aiRunning}>
                  {aiRunning?<><Spin size={14} color='#080C10'/>Generating...</>:<><Cpu size={14}/>Generate {questionCount} Questions</>}
                </Btn>
              </Card>
              <Card>
                <h3 style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:14}}>Pipeline</h3>
                {AI_STEPS.map((s,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:`1px solid ${T.border}22`}}>
                    <div style={{width:22,height:22,borderRadius:'50%',border:`2px solid ${i<aiStep?T.accent:T.border}`,background:i<aiStep?T.accentDim:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,flexShrink:0}}>
                      {i<aiStep?<Check size={10} color={T.accent}/>:<span style={{color:T.textDim}}>{i+1}</span>}
                    </div>
                    <span style={{fontSize:12,color:i<aiStep?T.textPrimary:T.textDim}}>{s}</span>
                    {aiRunning&&i===aiStep-1&&<Spin size={12}/>}
                  </div>
                ))}
              </Card>
            </div>
          )}
          {mode==='pdf'&&(
            <Card style={{maxWidth:540}}>
              <h3 style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:16}}>PDF Question Extraction</h3>
              <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${pdfFile?T.accent:T.border}`,borderRadius:10,padding:36,textAlign:'center',cursor:'pointer',marginBottom:12,background:pdfFile?T.accentDim:'transparent'}}>
                {pdfParsing?<div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}><Spin size={28}/><span style={{color:T.textMuted,fontSize:13}}>Extracting...</span></div>:pdfFile?<div style={{color:T.accent}}><Check size={24} style={{marginBottom:6}}/><div style={{fontSize:14,fontWeight:600}}>{pdfFile.name}</div></div>:<><Upload size={32} style={{color:T.textDim,marginBottom:10}}/><div style={{color:T.textMuted}}>Click to select PDF</div></>}
              </div>
              <input ref={fileRef} type='file' accept='.pdf' onChange={e=>{const f=e.target.files[0];if(f&&f.type==='application/pdf'){setPdfFile(f);setPdfErr('');}else{setPdfFile(null);setPdfErr('Only PDF files accepted.');}}} style={{display:'none'}}/>
              {pdfErr&&<div style={{padding:'8px 12px',background:T.dangerDim,border:`1px solid ${T.danger}44`,borderRadius:7,fontSize:12,color:T.danger,marginBottom:12}}>{pdfErr}</div>}
              {!pdfFile&&<div style={{fontSize:11,color:T.warn,marginBottom:12,fontFamily:"'IBM Plex Mono',monospace",display:'flex',gap:6,alignItems:'center'}}><AlertTriangle size={12}/>A PDF must be uploaded before processing.</div>}
              <Btn variant='primary' full onClick={doPDF} disabled={!pdfFile||pdfParsing}>{pdfParsing?<><Spin size={14} color='#080C10'/>Parsing...</>:<><Upload size={14}/>Extract & Generate</>}</Btn>
            </Card>
          )}
          {mode==='manual'&&(
            <Card style={{maxWidth:480}}>
              <h3 style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:12}}>Manual Entry</h3>
              <p style={{color:T.textMuted,fontSize:13,marginBottom:16}}>Questions will be generated from the subject bank per your configuration.</p>
              <Btn variant='primary' onClick={()=>{const generatedMock = generateMockTest({ subject: cfg.subject, topic: cfg.topic, difficulty: cfg.difficulty, type: cfg.type, count: questionCount });setGenerated({title:cfg.title||cfg.subject+' Manual Exam',subject:cfg.subject,difficulty:cfg.difficulty,type:cfg.type,questions:generatedMock.questions,time:parseInt(cfg.time)||45});setStep(3);}}>Continue to Review</Btn>
            </Card>
          )}
        </div>
      )}

      {step===3&&generated&&(
        <Card className='fi'>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
            <div>
              <h3 style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:600}}>{cfg.title||generated.title}</h3>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <Badge color={dc(generated.difficulty)}>{generated.difficulty}</Badge>
                <Badge color={T.accent}>{generated.questions.length} questions</Badge>
                <Badge color={T.textDim}>{generated.type}</Badge>
              </div>
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'flex-end'}}>
              <Btn variant='outline' onClick={()=>{setGenerated(null);setStep(2);}}>Regenerate</Btn>
              {!saved?<Btn variant='surface' onClick={saveExam}><Check size={14}/>Save Exam</Btn>:<Badge color={T.accent}>Saved!</Badge>}
              <Btn variant='primary' size='lg' onClick={startNow}><BookOpen size={14}/>Start Exam Now</Btn>
            </div>
          </div>
          <div style={{padding:'10px 14px',background:T.warnDim,border:`1px solid ${T.warn}33`,borderRadius:8,fontSize:12,color:T.warn,marginBottom:16,display:'flex',gap:8,alignItems:'center'}}>
            <AlertTriangle size={13}/>Answers are hidden until you submit.
          </div>
          <div style={{maxHeight:380,overflowY:'auto'}}>
            {generated.questions.map((q,i)=>(
              <div key={i} style={{padding:'13px 0',borderBottom:`1px solid ${T.border}33`}}>
                <div style={{display:'flex',gap:10,marginBottom:q.opts?10:4}}>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:T.accent,flexShrink:0,minWidth:28}}>Q{i+1}</span>
                  <span style={{fontSize:13,lineHeight:1.55,fontWeight:500}}>{q.q}</span>
                </div>
                {q.opts&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginLeft:28}}>{q.opts.map((o,j)=><div key={j} style={{padding:'6px 10px',borderRadius:6,fontSize:12,background:T.surfaceAlt,border:`1px solid ${T.border}`,color:T.textMuted}}>{['A','B','C','D'][j]}. {o}</div>)}</div>}
                {!q.opts&&<div style={{marginLeft:28,padding:'8px 12px',background:T.surfaceAlt,borderRadius:6,fontSize:12,color:T.textDim,fontStyle:'italic'}}>Short answer — type response during exam</div>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
export default CreateExam;
