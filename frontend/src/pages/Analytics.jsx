import { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { BarChart2, TrendingUp, Target, Zap, Download, Share2, TriangleAlert } from 'lucide-react';
import { T, Spin, Card, Badge, EmptyState } from '../components/UI';
import api from '../utils/api';
import { computeAnalytics, exportCSV, exportPDF } from '../utils/analytics';

const AnimatedScoreCard = ({label,value,color,icon:Icon,sub}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding:'20px',
        borderRadius:12,
        background:T.surface,
        border:`1px solid ${T.border}`,
        position:'relative',
        overflow:'hidden',
        cursor:'pointer',
        transition:'all 0.3s ease',
        transform:isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:isHovered ? `0 12px 24px ${color}20` : 'none'
      }}
    >
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:color}}></div>
      <div style={{width:32,height:32,borderRadius:8,background:`rgba(${color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.094)`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}>
        <Icon size={14} color={color}/>
      </div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:700,color,lineHeight:1}}>{value}</div>
      <div style={{fontSize:11,color:T.textMuted,marginTop:4}}>{label}</div>
    </div>
  );
};

const SkillMeter = ({label,value,color}) => (
  <div style={{marginBottom:14}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
      <span style={{fontSize:13,color:T.textMuted,fontWeight:500}}>{label}</span>
      <span style={{fontSize:13,fontWeight:700,color,fontFamily:"'IBM Plex Mono',monospace"}}>{value}%</span>
    </div>
    <div style={{height:6,background:T.border,borderRadius:3,overflow:'hidden'}}><div style={{width:`${value}%`,height:'100%',background:`linear-gradient(90deg,${color}88,${color})`,borderRadius:3,transition:'width 1s ease'}}/></div>
  </div>
);

const Analytics = ({user}) => {
  const [data,setData]=useState(null);const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const isTeacher = user?.role === 'Teacher';
    if(isTeacher) {
      api.get('/attempts/all-students').then(res=>{
        const attempts=res.data.attempts||[];
        const A=computeAnalytics(attempts);
        setData({...A,attempts});
        setLoading(false);
      }).catch(()=>setLoading(false));
    } else {
      Promise.all([api.get('/attempts'),api.get('/attempts/analytics')]).then(([att,ana])=>{
        const attempts=att.data.attempts||[];
        const A=computeAnalytics(attempts);
        setData({...A,...(ana.data.analytics||{}),attempts});setLoading(false);
      }).catch(()=>setLoading(false));
    }
  },[user]);
  if(loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:300,gap:12,color:T.textMuted}}><Spin/>Loading analytics...</div>;

  const noData = !data?.hasData;
  const subjectData = (data?.subjects || []).map(s=>({...s,fill:T.accent}));
  const accData = data?.accuracy || [{name:'Correct',value:0,color:'#00D4AA'},{name:'Wrong',value:0,color:'#E85D5D'},{name:'Skipped',value:0,color:'#3D5464'}];
  const radarData = data?.radar || [{topic:'Arrays',score:0},{topic:'Graphs',score:0},{topic:'Trees',score:0},{topic:'DP',score:0},{topic:'Sorting',score:0},{topic:'Hashing',score:0}];

  return (
    <div className='fu'>
      {noData && (
        <div style={{marginBottom:16,padding:'10px 14px',background:'rgba(245,166,35,0.094)',border:'1px solid rgba(245,166,35,0.2)',borderRadius:8,fontSize:12,color:'#F5A623',display:'flex',gap:8,alignItems:'center'}}>
          <TriangleAlert size={14}/>
          Complete mock tests to populate analytics — all metrics start at 0.
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:600}}>All Students Exam Analytics</h1>
          <p style={{color:T.textMuted,fontSize:13,marginTop:4}}>Comprehensive insights into all student performance</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end'}}>
          <button onClick={()=>exportCSV(data.attempts || [], 'analytics')} title="Download CSV spreadsheet" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:'8px 15px',fontSize:12,fontWeight:600,color:T.textPrimary,cursor:'pointer',display:'flex',alignItems:'center',gap:6,transition:'0.18s'}}>
            <Download size={13}/>
            CSV Export
          </button>
          <button onClick={()=>exportPDF(data, data.attempts || [], 'Student')} title="Generate PDF report" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:'8px 15px',fontSize:12,fontWeight:600,color:T.textPrimary,cursor:'pointer',display:'flex',alignItems:'center',gap:6,transition:'0.18s'}}>
            <Download size={13}/>
            PDF Report
          </button>
          <button onClick={()=>{navigator.clipboard.writeText(window.location.href + '?share=true').then(()=>alert('Shareable link copied to clipboard!'));}} title="Copy shareable analytics link" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:'8px 15px',fontSize:12,fontWeight:600,color:T.textPrimary,cursor:'pointer',display:'flex',alignItems:'center',gap:6,transition:'0.18s'}}>
            <Share2 size={13}/>
            Share Link
          </button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
        <AnimatedScoreCard label='Avg Score' value={data.avgScore+'%'} color='#7C6BF5' icon={Target}/>
        <AnimatedScoreCard label='Avg/Question' value={data.avgPerQuestion||'0s'} color='#F5A623' icon={TrendingUp}/>
        <AnimatedScoreCard label='Streak' value={data.streak||'0d'} color='#F5A623' icon={Zap}/>
        <AnimatedScoreCard label='Improvement' value={data.improvement||'+0%'} color='#00D4AA' icon={BarChart2}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <Card>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:3}}>Score Trend</div>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:14}}>Monthly performance</div>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={data.scoreTrend||[]}><CartesianGrid strokeDasharray='3 3' stroke={T.border}/><XAxis dataKey='month' tick={{fontSize:10,fill:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}/><YAxis tick={{fontSize:10,fill:T.textDim}} domain={[0,100]}/><Tooltip contentStyle={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12}}/><Line type='monotone' dataKey='score' stroke='#7C6BF5' strokeWidth={2.5} dot={{fill:'#7C6BF5',r:4,strokeWidth:0}}/></LineChart>
          </ResponsiveContainer>
        </Card>
        {subjectData.length>0&&(
          <Card>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:3}}>Subject Performance</div>
            <div style={{fontSize:11,color:T.textMuted,marginBottom:14}}>Score by subject</div>
            <ResponsiveContainer width='100%' height={200}>
              <BarChart data={subjectData}><CartesianGrid strokeDasharray='3 3' stroke={T.border}/><XAxis dataKey='subject' tick={{fontSize:9,fill:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}/><YAxis tick={{fontSize:10,fill:T.textDim}} domain={[0,100]}/><Tooltip contentStyle={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12}} formatter={v=>[`${v}%`,'Score']}/><Bar dataKey='score' radius={[4,4,0,0]}>{subjectData.map((e,i)=><Cell key={i} fill='#E85D5D'/>)}</Bar></BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <Card>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:3}}>Answer Accuracy</div>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:14}}>Overall question performance</div>
          <div style={{display:'flex',alignItems:'center',gap:24}}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={accData} cx='50%' cy='50%' innerRadius={0} outerRadius={72} paddingAngle={3} dataKey='value' nameKey='name'>
                  {accData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {accData.map((item,i)=>(
                <div key={i}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:item.color}}></div>
                    <span style={{fontSize:12,color:T.textMuted,fontWeight:600}}>{item.name}</span>
                  </div>
                  <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:item.color,marginLeft:16}}>{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:3}}>Topic Mastery Radar</div>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Skill coverage across topics</div>
          <ResponsiveContainer width='100%' height={200}>
            <RadarChart data={radarData} cx='50%' cy='50%' outerRadius={80}>
              <PolarGrid stroke={T.border}/>
              <PolarAngleAxis dataKey='topic' tick={{fontSize:10,fill:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}/>
              <Radar name='Score' dataKey='score' stroke='#7C6BF5' fill='#7C6BF5' fillOpacity={0.22} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span>Attempt History</span>
          <span style={{fontSize:11,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}>{(data.attempts||[]).length} total · CSV export for full data</span>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{borderBottom:`1px solid ${T.border}`}}>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Exam</th>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Subject</th>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Type</th>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Score</th>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Correct</th>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Time</th>
                <th style={{padding:'7px 10px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,letterSpacing:'.06em'}}>Date</th>
              </tr>
            </thead>
            <tbody>
              {(data.attempts||[]).slice(0,10).map((attempt,i)=>(
                <tr key={i} style={{borderBottom:`1px solid ${T.border}33`,transition:'background 0.14s',background:'transparent'}}>
                  <td style={{padding:'9px 10px',maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{attempt.examName||'Unknown'}</td>
                  <td style={{padding:'9px 10px'}}>
                    <span style={{display:'inline-flex',alignItems:'center',padding:'2px 9px',borderRadius:20,fontSize:11,fontWeight:600,letterSpacing:'.04em',background:`rgba(61,84,100,0.125)`,color:T.textDim,border:`1px solid rgba(61,84,100,0.25)`,fontFamily:"'IBM Plex Mono',monospace"}}>{attempt.subject||'N/A'}</span>
                  </td>
                  <td style={{padding:'9px 10px'}}>
                    <span style={{display:'inline-flex',alignItems:'center',padding:'2px 9px',borderRadius:20,fontSize:11,fontWeight:600,letterSpacing:'.04em',background:`rgba(0,212,170,0.125)`,color:'#00D4AA',border:`1px solid rgba(0,212,170,0.25)`,fontFamily:"'IBM Plex Mono',monospace"}}>{attempt.type||'MCQ'}</span>
                  </td>
                  <td style={{padding:'9px 10px',fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:700,color:attempt.score>=75?'#00D4AA':attempt.score>=55?'#F5A623':'#E85D5D'}}>{attempt.score}%</td>
                  <td style={{padding:'9px 10px',fontSize:11,color:T.textMuted,fontFamily:"'IBM Plex Mono',monospace"}}>{attempt.correct||0}/{attempt.total||0}</td>
                  <td style={{padding:'9px 10px',fontSize:11,color:T.textMuted,fontFamily:"'IBM Plex Mono',monospace"}}>{attempt.time||'00:00'}</td>
                  <td style={{padding:'9px 10px',fontSize:11,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}>{new Date(attempt.date).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default Analytics;
