import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ClipboardList, Target, Clock, Flame, Star, AlertTriangle, Check, BookMarked, BookOpen, Activity, BarChart2, Cpu } from 'lucide-react';
import { T, Spin, Card, Btn, Badge } from '../components/UI';
import api from '../utils/api';
import { generateQuestions } from '../utils/questions';

const dayLabel = () => new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
const EMPTY_TREND = [{month:'Aug',score:0},{month:'Sep',score:0},{month:'Oct',score:0},{month:'Nov',score:0},{month:'Dec',score:0},{month:'Jan',score:0}];

const StatCard = ({label,value,delta,deltaUp,sub,subColor,icon:Icon,topColor}) => {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:T.surface,border:`1px solid ${hov?topColor:T.border}`,borderRadius:12,padding:'18px 20px',position:'relative',overflow:'hidden',transition:'all .22s',transform:hov?'translateY(-2px)':'none',boxShadow:hov?`0 8px 28px ${topColor}22`:'none',flex:1,minWidth:0}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:topColor,borderRadius:'12px 12px 0 0'}}/>
      <div style={{width:34,height:34,borderRadius:9,background:topColor+'18',border:`1px solid ${topColor}30`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}><Icon size={16} color={topColor}/></div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:30,fontWeight:700,color:T.textPrimary,lineHeight:1,marginBottom:4}}>{value}</div>
      <div style={{fontSize:12,color:T.textMuted,marginBottom:6}}>{label}</div>
      {delta&&<div style={{fontSize:11,color:deltaUp!==false?T.accent:T.danger,fontFamily:"'IBM Plex Mono',monospace"}}>{deltaUp!==false?'↑':'↓'}{delta}</div>}
      {sub&&!delta&&<div style={{fontSize:12,color:subColor||T.textDim,fontFamily:"'Fraunces',serif",fontWeight:600}}>{sub}</div>}
    </div>
  );
};

const ExamRow = ({icon:Icon,iconBg,title,meta,difficulty,onStart}) => {
  const dc=d=>d==='Hard'?T.danger:d==='Medium'?T.warn:T.accent;
  return (
    <div style={{display:'flex',alignItems:'center',gap:14,padding:'13px 0',borderBottom:`1px solid ${T.border}22`}}>
      <div style={{width:38,height:38,borderRadius:9,background:iconBg||T.accentDim,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={16} color={T.accent}/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:T.textPrimary}}>{title}</div>
        <div style={{fontSize:11,color:T.textDim,marginTop:2,fontFamily:"'IBM Plex Mono',monospace"}}>{meta}</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
        <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:dc(difficulty)+'22',color:dc(difficulty),border:`1px solid ${dc(difficulty)}44`,fontFamily:"'IBM Plex Mono',monospace"}}>{difficulty}</span>
        <button onClick={onStart} style={{background:T.purple,color:'#fff',border:'none',borderRadius:8,padding:'6px 16px',fontSize:12,fontWeight:700,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.15)'} onMouseLeave={e=>e.currentTarget.style.filter='none'}>Start</button>
      </div>
    </div>
  );
};

const ActivityItem = ({icon:Icon,iconBg,text,time,score}) => (
  <div style={{display:'flex',alignItems:'flex-start',gap:12,padding:'11px 0',borderBottom:`1px solid ${T.border}22`}}>
    <div style={{width:32,height:32,borderRadius:8,background:iconBg||T.accentDim,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}><Icon size={14} color={T.accent}/></div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontSize:13,fontWeight:500,color:T.textPrimary,lineHeight:1.4}}>{text}</div>
      <div style={{fontSize:11,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",marginTop:3,display:'flex',alignItems:'center',gap:6}}>{time}{score&&<span style={{color:T.accent,fontWeight:700}}>{score}</span>}</div>
    </div>
  </div>
);

const Dashboard = ({user,onNav,onStartTest}) => {
  const [dash,setDash]=useState(null);const [loading,setLoading]=useState(true);
  useEffect(()=>{
    Promise.all([api.get('/attempts'),api.get('/attempts/analytics')]).then(([att,ana])=>{
      setDash({attempts:att.data.attempts?.slice(0,5)||[],analytics:ana.data.analytics,hasData:att.data.attempts?.length>0});
      setLoading(false);
    }).catch(()=>setLoading(false));
  },[]);

  if(loading)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:300,gap:12,color:T.textMuted}}><Spin/>Loading...</div>;

  const A=dash?.analytics;const hasData=dash?.hasData;
  const STATS=hasData?[
    {label:'Total Tests',value:String(A.totalAttempts),delta:`+${Math.max(1,Math.round(A.totalAttempts*.1))} this week`,deltaUp:true,I:ClipboardList,c:T.accent},
    {label:'Avg Score',value:A.avgScore+'%',delta:`+${Math.max(1,A.improvement)}% this week`,deltaUp:A.improvement>=0,I:Target,c:T.purple},
    {label:'Study Time',value:A.studyTime,delta:`+${Math.max(1,Math.round(A.totalAttempts*.8))}h this week`,deltaUp:true,I:Clock,c:T.warn},
    {label:'Streak',value:A.streak+'d',delta:'+1d this week',deltaUp:true,I:Flame,c:'#F5A623'},
    {label:'Best Subject',value:A.bestSubject,sub:'Strong performance',subColor:T.accent,I:Star,c:T.accent},
    {label:'Needs Work',value:A.weakSubject,sub:'Focus here',subColor:T.danger,I:AlertTriangle,c:T.danger},
  ]:[
    {label:'Total Tests',value:'0',delta:'+0 this week',deltaUp:true,I:ClipboardList,c:T.accent},
    {label:'Avg Score',value:'0%',delta:'+0% this week',deltaUp:true,I:Target,c:T.purple},
    {label:'Study Time',value:'0h',delta:'+0h this week',deltaUp:true,I:Clock,c:T.warn},
    {label:'Streak',value:'0d',delta:'+0d this week',deltaUp:true,I:Flame,c:'#F5A623'},
    {label:'Best Subject',value:'—',sub:'No data yet',subColor:T.textDim,I:Star,c:T.accent},
    {label:'Needs Work',value:'—',sub:'No data yet',subColor:T.textDim,I:AlertTriangle,c:T.danger},
  ];
  const trendData=(hasData&&A.scoreTrend?.length)?A.scoreTrend:EMPTY_TREND;
  const accData=hasData?A.accuracy:[{name:'Correct',value:0,color:T.accent},{name:'Wrong',value:0,color:T.danger},{name:'Skipped',value:0,color:T.textDim}];
  const RECENT_EXAMS=[
    {id:'r1',title:'Data Structures & Algorithms',meta:'25 questions · 45 min',difficulty:'Medium',I:BookMarked,bg:T.accentDim,subject:'DSA'},
    {id:'r2',title:'Python Programming',meta:'20 questions · 30 min',difficulty:'Easy',I:BookOpen,bg:T.purpleDim,subject:'Python'},
    {id:'r3',title:'SQL & Databases',meta:'30 questions · 60 min',difficulty:'Hard',I:Activity,bg:T.warnDim,subject:'SQL'},
  ];

  return (
    <div className='fu'>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:700,lineHeight:1.2}}>Welcome back, {user?.name?.split(' ')[0]||'there'} 👋</h1>
          <p style={{color:T.textMuted,fontSize:13,marginTop:5}}>{dayLabel()} · {hasData?`${A.totalAttempts} exam${A.totalAttempts!==1?'s':''} completed`:'No exams completed yet'}</p>
        </div>
        <button onClick={()=>onNav('create')} style={{background:'linear-gradient(135deg,#7C6BF5,#5B4ED4)',color:'#fff',border:'none',borderRadius:10,padding:'11px 22px',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:8,boxShadow:'0 4px 16px #7C6BF544'}} onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'} onMouseLeave={e=>e.currentTarget.style.filter='none'}>
          <Cpu size={15}/>Create AI Exam
        </button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:12,marginBottom:22}}>
        {STATS.map(s=><StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} deltaUp={s.deltaUp} sub={s.sub} subColor={s.subColor} icon={s.I} topColor={s.c}/>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:16,marginBottom:18,alignItems:'stretch'}}>
        <Card style={{minHeight:240}}>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:3}}>Score Trend</div>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:14}}>Performance over last 6 months</div>
          {!hasData&&<div style={{fontSize:11,color:T.textDim,marginBottom:10,fontFamily:"'IBM Plex Mono',monospace",display:'flex',alignItems:'center',gap:6}}><AlertTriangle size={11} color={T.textDim}/>Complete tests to see your trend</div>}
          <ResponsiveContainer width='100%' height={190}>
            <LineChart data={trendData}><CartesianGrid strokeDasharray='3 3' stroke={T.border}/><XAxis dataKey='month' stroke={T.textDim} tick={{fontSize:10,fontFamily:"'IBM Plex Mono',monospace"}}/><YAxis stroke={T.textDim} tick={{fontSize:10}} domain={[40,100]}/><Tooltip contentStyle={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12}}/><Line type='monotone' dataKey='score' stroke={T.purple} strokeWidth={2.5} dot={{fill:T.purple,r:4,strokeWidth:0}} activeDot={{r:6}}/></LineChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{width:280,flexShrink:0}}>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:3}}>Accuracy</div>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:10}}>All-time breakdown</div>
          <div style={{display:'flex',justifyContent:'center'}}>
            <ResponsiveContainer width={160} height={160}><PieChart><Pie data={accData} cx='50%' cy='50%' innerRadius={52} outerRadius={74} paddingAngle={3} dataKey='value' startAngle={90} endAngle={-270}>{accData.map((e,i)=><Cell key={i} fill={e.value>0?e.color:T.border}/>)}</Pie></PieChart></ResponsiveContainer>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:7,marginTop:10}}>
            {accData.map(a=><div key={a.name} style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:'50%',background:a.color,flexShrink:0}}/><span style={{fontSize:12,color:T.textMuted,flex:1}}>{a.name}:</span><span style={{fontSize:13,fontWeight:700,color:a.color,fontFamily:"'IBM Plex Mono',monospace"}}>{a.value}%</span></div>)}
          </div>
        </Card>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600}}>Recent Exams</div>
            <button onClick={()=>onNav('tests')} style={{background:'none',border:'none',color:T.accent,fontSize:12,cursor:'pointer',fontWeight:600}}>View all →</button>
          </div>
          {RECENT_EXAMS.map(e=><ExamRow key={e.id} icon={e.I} iconBg={e.bg} title={e.title} meta={e.meta} difficulty={e.difficulty} onStart={()=>onStartTest({...e,qData:generateQuestions(e.subject,e.difficulty,25,'MCQ')})}/>)}
        </Card>
        <Card>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,marginBottom:4}}>Recent Activity</div>
          {hasData&&dash.attempts.length>0?dash.attempts.map((a,i)=><ActivityItem key={i} icon={Check} iconBg={T.accentDim} text={`Completed ${a.exam}`} time={a.date} score={a.score+'%'}/>):(
            [{I:Check,text:'Complete a mock test to see activity'},{I:Cpu,text:'Generate AI questions from Create Exam'},{I:BarChart2,text:'Analytics will update after your first test'},{I:Star,text:'Achieve 90%+ on any subject to see highlights'}].map((a,i)=><ActivityItem key={i} icon={a.I} iconBg={T.accentDim} text={a.text} time='—'/>)
          )}
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
