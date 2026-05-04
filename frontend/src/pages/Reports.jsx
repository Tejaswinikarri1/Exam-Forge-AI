import { useState, useEffect } from 'react';
import { Download, FileText, Share2, FileSpreadsheet, RefreshCw, RotateCcw, Calendar, Brain, Clock, Gauge, Timer, Award, TriangleAlert, Target, Zap, Check, Cpu } from 'lucide-react';
import { T, Spin, Card, Btn, Badge, EmptyState } from '../components/UI';
import api from '../utils/api';
import { computeAnalytics, exportCSV, exportPDF } from '../utils/analytics';

const ExpandableMetricCard = ({label,value,color,icon:Icon,subtitle,details,tip}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const percentage = Math.min(100, Math.max(0, value));
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        background: T.surface,
        border: `1.5px solid ${isExpanded ? color : T.border}`,
        borderRadius: 14,
        padding: 20,
        transition: 'box-shadow 0.25s, border 0.25s, background 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'none',
        boxShadow: isExpanded ? `0 0 0 2px ${color}55, 0 0 16px 0 ${color}55` : 'none',
        cursor: 'default',
        overflow: 'hidden',
        position: 'relative',
        zIndex: isExpanded ? 2 : 1,
        outline: isExpanded ? `0.5px solid ${color}` : 'none',
        backgroundColor: isExpanded ? `${color}0F` : T.surface
      }}
    >
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg, ${color}, ${color}88)`,borderRadius:'14px 14px 0px 0px',opacity:0.6,transition:'opacity 0.3s'}}></div>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div style={{width:38,height:38,borderRadius:10,background:`rgba(${color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.094)`,border:`1px solid rgba(${color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.19)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Icon size={18} color={color}/>
        </div>
        <div style={{position:'relative',width:56,height:56}}>
          <svg viewBox="0 0 48 48" style={{width:56,height:56,transform:'rotate(-90deg)'}}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="#1C2A33" strokeWidth="4"></circle>
            <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="4" strokeDasharray={strokeDasharray} strokeLinecap="round" style={{transition:'stroke-dasharray 0.7s'}}></circle>
          </svg>
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <span style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color,lineHeight:1}}>{value}</span>
          </div>
        </div>
      </div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,marginBottom:5,color:T.text}}>{label}</div>
      <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5,marginBottom:0,transition:'margin 0.25s'}}>{subtitle}</div>
      <div style={{maxHeight:isExpanded?'500px':'0px',overflow:'hidden',transition:'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'}}>
        <div style={{height:1,background:`rgba(${color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.2)`,marginBottom:12}}></div>
        <div style={{fontSize:10,color:T.textDim,fontWeight:700,letterSpacing:'0.08em',marginBottom:8,fontFamily:"'IBM Plex Mono',monospace"}}>BASED ON</div>
        {details&&details.map((d,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0px',borderBottom:`1px solid rgba(28,42,51,0.133)`,fontSize:12}}>
            <span style={{color:T.textMuted}}>{d.label}</span>
            <span style={{color:d.color||color,fontWeight:700,fontFamily:"'IBM Plex Mono',monospace"}}>{d.value}</span>
          </div>
        ))}
        {tip&&(
          <div style={{marginTop:12,padding:'9px 12px',background:`rgba(${color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.063)`,border:`1px solid rgba(${color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.19)`,borderRadius:8}}>
            <div style={{fontSize:10,color,fontWeight:700,letterSpacing:'0.06em',marginBottom:4,fontFamily:"'IBM Plex Mono',monospace"}}>IMPROVEMENT TIP</div>
            <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>{tip}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Reports = ({user}) => {
  const [attempts,setAttempts]=useState([]);const [analytics,setAnalytics]=useState(null);const [loading,setLoading]=useState(true);const [activeTab,setActiveTab]=useState('recommendations');
  // Always fetch fresh data from backend API on mount and when switching tabs
  const fetchReportsData = () => {
    setLoading(true);
    const isTeacher = user?.role === 'Teacher';
    if(isTeacher) {
      api.get('/attempts/all-students')
        .then(res => {
          const allAttempts = res.data.attempts || [];
          setAttempts(allAttempts);
          setAnalytics(computeAnalytics(allAttempts));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      Promise.all([api.get('/attempts'), api.get('/attempts/analytics')])
        .then(([att, ana]) => {
          const a = att.data.attempts || [];
          setAttempts(a);
          setAnalytics(computeAnalytics(a));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchReportsData();
    // eslint-disable-next-line
  }, [activeTab]);
  if(loading)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:300,gap:12,color:T.textMuted}}><Spin/>Loading reports...</div>;
  const A=analytics;

  // Refresh only the reports data and keep user on Reports section
  const handleRefresh = () => {
    fetchReportsData();
  };

  return (
    <div className='fu'>
      <div style={{marginBottom:22,display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:600}}>All Students Exam Analytics</h1>
          <p style={{color:T.textMuted,fontSize:13,marginTop:4}}>Powered by Groq AI · Based on {attempts.length} test{attempts.length!==1?'s':''}</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:'8px 15px',fontSize:12,fontWeight:600,color:T.textPrimary,cursor:'pointer',display:'flex',alignItems:'center',gap:6,transition:'0.18s'}}>
            <Download size={13}/>
            Export PDF
          </button>
          <button style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:8,fontWeight:600,transition:'0.18s',opacity:1,cursor:'pointer',padding:'8px 18px',fontSize:13,background:'#00D4AA',color:'#080C10',border:'none',justifyContent:'flex-start'}} onClick={handleRefresh}>
            <RefreshCw size={14}/>
            Refresh
          </button>
        </div>
      </div>
      <div style={{display:'flex',gap:12,marginBottom:24,borderBottom:`1px solid ${T.border}`}}>
        <button onClick={()=>setActiveTab('recommendations')} style={{padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontWeight:600,fontSize:14,color:activeTab==='recommendations'?T.accent:T.textMuted,borderBottom:activeTab==='recommendations'?`2px solid ${T.accent}`:'',transition:'all 0.2s'}} >AI Recommendations</button>
        <button onClick={()=>setActiveTab('reports')} style={{padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontWeight:600,fontSize:14,color:activeTab==='reports'?T.accent:T.textMuted,borderBottom:activeTab==='reports'?`2px solid ${T.accent}`:'',transition:'all 0.2s'}}>Reports & Exports</button>
      </div>
      {activeTab==='recommendations'&&(
        <>
          {!A?.hasData?(
            <div className='fu' style={{textAlign:'center',padding:'40px 20px'}}>
              <div style={{marginBottom:16}}>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,marginBottom:4,color:T.textMuted}}>No performance data yet</div>
                <div style={{fontSize:12,color:T.textDim,marginBottom:20}}>Complete at least one mock test to unlock AI-powered insights, recommendations, strength analysis, and a personalized study plan.</div>
              </div>
              <div style={{display:'flex',gap:12,justifyContent:'center'}}><Btn variant='primary' onClick={()=>window.location.href='/dashboard'}>Browse Mock Tests</Btn><Btn variant='outline'>Create AI Exam</Btn></div>
            </div>
          ):(
            <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:22}}>
                <ExpandableMetricCard
                  label='Productivity Score'                  icon={Gauge}                  value={A.productivityScore||0}
                  color='#10b981'
                  subtitle='Overall performance: needs improvement.'
                  details={[
                    {label:'Accuracy',value:`${A.accuracy?.[0]?.value||0}%`,color:T.accent},
                    {label:'Consistency',value:`${A.learningConsistency||0}%`,color:'#8b5cf6'},
                    {label:'Completed Exams',value:A.totalAttempts||0},
                    {label:'Time Spent',value:A.studyTime||'0m'}
                  ]}
                  tip='Focus on consistency — take at least one exam per day this week.'
                />
                <ExpandableMetricCard
                  label='Learning Consistency'                  icon={Calendar}                  value={A.learningConsistency||0}
                  color='#7C6BF5'
                  subtitle={`1d streak · ${A.totalAttempts||0} total exams.`}
                  details={[
                    {label:'Study Streak',value:`${A.streak||0}d`},
                    {label:'Total Attempts',value:A.totalAttempts||0},
                    {label:'Avg per Week',value:Math.max(0,Math.round((A.totalAttempts||0)/4))},
                    {label:'Last Active',value:A.totalAttempts?new Date().toLocaleDateString():'—'}
                  ]}
                  tip='Build the habit — even one short test per day dramatically improves this score.'
                />
                <ExpandableMetricCard
                  label='Concept Mastery'                  icon={Brain}                  value={A.conceptMastery||0}
                  color='#4D9EF5'
                  subtitle='Strong in Python, needs work in Python.'
                  details={[
                    {label:'Best Subject',value:A.bestSubject||'—'},
                    {label:'Avg Score',value:`${A.avgScore||0}%`},
                    {label:'Correct Answers',value:`${A.accuracy?.[0]?.value||0}%`,color:T.accent},
                    {label:'Hard Exams Done',value:Math.floor((A.totalAttempts||0)/3)}
                  ]}
                  tip='Review fundamentals for your weakest subject before attempting higher difficulty.'
                />
                <ExpandableMetricCard
                  label='Exam Efficiency'                  icon={Timer}                  value={A.examEfficiency||0}
                  color='#F5A623'
                  subtitle={`82s avg per question · ${A.accuracy?.[0]?.value||0}% accuracy.`}
                  details={[
                    {label:'Avg per Question',value:`${A.avgPerQuestion||0}s`},
                    {label:'Answer Accuracy',value:`${A.accuracy?.[0]?.value||0}%`},
                    {label:'Study Time',value:A.studyTime||'0m'},
                    {label:'Completion Rate',value:`${Math.min(100,Math.round((A.totalAttempts||0)/10*100))}%`}
                  ]}
                  tip='Focus on reducing time per question through daily timed practice drills.'
                />
              </div>

              <div className='fi' style={{background:`linear-gradient(135deg, rgba(0,212,170,0.08), ${T.surface})`,border:`1px solid rgba(0,212,170,0.133)`,borderRadius:12,padding:20,marginBottom:18}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                  <div style={{padding:'4px 10px',background:'rgba(0,212,170,0.08)',border:`1px solid rgba(0,212,170,0.267)`,borderRadius:20,fontSize:11,color:'#00D4AA',display:'flex',alignItems:'center',gap:6,fontFamily:"'IBM Plex Mono',monospace"}}>
                    <Cpu size={11}/>
                    Groq AI · Just now
                  </div>
                </div>
                <h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,marginBottom:10}}>Overall Summary</h3>
                <p style={{fontSize:14,color:T.textMuted,lineHeight:1.8}}>
                  Building fundamentals across {attempts.length} test{attempts.length!==1?'s':''}. Daily practice will rapidly improve all four performance metrics.
                </p>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginBottom:18}}>
                <div style={{background:T.surface,border:`1px solid rgba(0,212,170,0.133)`,borderRadius:12,padding:20}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600}}>
                    <Award size={16} color='#00D4AA'/>
                    Strengths
                  </div>
                  <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
                    <div style={{width:22,height:22,borderRadius:6,background:'rgba(0,212,170,0.08)',border:`1px solid rgba(0,212,170,0.267)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                      <Check size={11} color='#00D4AA'/>
                    </div>
                    <span style={{fontSize:13,color:T.textMuted,lineHeight:1.5}}>Building consistent study habits</span>
                  </div>
                  <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
                    <div style={{width:22,height:22,borderRadius:6,background:'rgba(0,212,170,0.08)',border:`1px solid rgba(0,212,170,0.267)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                      <Check size={11} color='#00D4AA'/>
                    </div>
                    <span style={{fontSize:13,color:T.textMuted,lineHeight:1.5}}>Completing exams regularly</span>
                  </div>
                  <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
                    <div style={{width:22,height:22,borderRadius:6,background:'rgba(0,212,170,0.08)',border:`1px solid rgba(0,212,170,0.267)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                      <Check size={11} color='#00D4AA'/>
                    </div>
                    <span style={{fontSize:13,color:T.textMuted,lineHeight:1.5}}>Identifying improvement areas</span>
                  </div>
                </div>
                <div style={{background:T.surface,border:`1px solid rgba(245,166,35,0.133)`,borderRadius:12,padding:20}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600}}>
                    <TriangleAlert size={16} color='#F5A623'/>
                    Areas to Improve
                  </div>
                  <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
                    <div style={{width:22,height:22,borderRadius:6,background:'rgba(245,166,35,0.094)',border:`1px solid rgba(245,166,35,0.267)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                      <Zap size={11} color='#F5A623'/>
                    </div>
                    <span style={{fontSize:13,color:T.textMuted,lineHeight:1.5}}>Python: {A.accuracy?.[0]?.value||0}% — needs focused practice</span>
                  </div>
                </div>
              </div>
              <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:20}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600}}>
                  <Target size={16} color='#00D4AA'/>
                  Recommended Practice
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',gap:12}}>
                  {[
                    'Practice 10 problems daily on Python',
                    'Review all incorrect answers and understand each explanation thoroughly',
                    'Target under 82s per question through timed practice drills',
                    'Attempt Easy difficulty exams daily this week',
                    'Maintain your 1-day streak — consistency is the #1 predictor of improvement',
                    'Deep-dive into Python this weekend'
                  ].map((item,i)=>(
                    <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:'#111820',border:`1px solid ${T.border}`,borderRadius:10,alignItems:'flex-start'}}>
                      <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(0,212,170,0.08)',border:`1px solid rgba(0,212,170,0.267)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#00D4AA',fontFamily:"'IBM Plex Mono',monospace",flexShrink:0}}>
                        {i+1}
                      </div>
                      <span style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {activeTab==='reports'&&(
        <>
          {!A?.hasData?(
            <div className='fu'><Card><EmptyState icon={FileText} title='No data yet' sub='Complete some mock tests to generate performance reports.'/></Card></div>
          ):(
            <>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                <Card className='hover-card'>
                  <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:18}}>
                    <div style={{width:46,height:46,borderRadius:12,background:T.accentDim,border:`1px solid ${T.accent}44`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><FileText size={20} color={T.accent}/></div>
                    <div><div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,marginBottom:4}}>PDF Report</div><div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>A comprehensive PDF performance report with score trends, subject breakdown, and attempt history. Opens print dialog for download.</div></div>
                  </div>
                  <Btn variant='primary' full onClick={()=>exportPDF(A,attempts,user?.name)}><Download size={14}/>Download PDF Report</Btn>
                </Card>
                <Card className='hover-card'>
                  <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:18}}>
                    <div style={{width:46,height:46,borderRadius:12,background:T.accent+'15',border:`1px solid ${T.accent}44`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><FileSpreadsheet size={20} color={T.accent}/></div>
                    <div><div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,marginBottom:4}}>CSV Export</div><div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>Export all attempt data as a CSV spreadsheet. Compatible with Excel, Google Sheets, and any data analysis tool.</div></div>
                  </div>
                  <Btn variant='outline' full onClick={()=>exportCSV(attempts,user?.name)}><Download size={14}/>Download CSV Data</Btn>
                </Card>
              </div>
              <Card style={{marginBottom:14}}>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:16}}>Performance Summary</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:20}}>
                  {[{l:'Tests Taken',v:A.totalAttempts,c:T.accent},{l:'Avg Score',v:A.avgScore+'%',c:T.purple},{l:'Accuracy',v:A.accuracy[0]?.value+'%',c:T.warn},{l:'Best Subject',v:A.bestSubject,c:T.blue}].map(m=>(
                    <div key={m.l} style={{background:T.surfaceAlt,borderRadius:10,padding:'14px',textAlign:'center',border:`1px solid ${T.border}`}}>
                      <div style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:700,color:m.c,lineHeight:1,marginBottom:4}}>{m.v}</div>
                      <div style={{fontSize:11,color:T.textMuted,textTransform:'uppercase',letterSpacing:'.06em'}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {[{l:'Productivity Score',v:A.productivityScore,c:T.accent},{l:'Learning Consistency',v:A.learningConsistency,c:T.purple},{l:'Concept Mastery',v:A.conceptMastery,c:T.warn},{l:'Exam Efficiency',v:A.examEfficiency,c:T.blue}].map(m=>(
                    <div key={m.l}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                        <span style={{fontSize:12,color:T.textMuted}}>{m.l}</span>
                        <span style={{fontSize:12,fontWeight:700,color:m.c,fontFamily:"'IBM Plex Mono',monospace"}}>{m.v}%</span>
                      </div>
                      <div style={{height:5,background:T.border,borderRadius:3,overflow:'hidden'}}><div style={{width:`${m.v}%`,height:'100%',background:m.c,borderRadius:3}}/></div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                  <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600}}>Recent Attempts</div>
                  <Badge color={T.textDim}>Last {Math.min(10,attempts.length)}</Badge>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['Exam','Subject','Score','Correct','Time','Date'].map(h=><th key={h} style={{padding:'8px 12px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:'.06em',fontWeight:600,borderBottom:`1px solid ${T.border}`}}>{h}</th>)}</tr></thead>
                    <tbody>{attempts.slice(0,10).map((a,i)=>(
                      <tr key={i} style={{borderBottom:`1px solid ${T.border}22`}}>
                        <td style={{padding:'10px 12px',fontSize:12,fontWeight:500,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.exam}</td>
                        <td style={{padding:'10px 12px'}}><Badge color={T.textDim}>{(a.subject||'—').slice(0,10)}</Badge></td>
                        <td style={{padding:'10px 12px'}}><span style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:a.score>=60?T.accent:T.danger}}>{a.score}%</span></td>
                        <td style={{padding:'10px 12px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textMuted}}>{a.correct||'—'}/{a.totalQ||'—'}</td>
                        <td style={{padding:'10px 12px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textMuted}}>{a.time}</td>
                        <td style={{padding:'10px 12px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textDim}}>{a.date}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Reports;
