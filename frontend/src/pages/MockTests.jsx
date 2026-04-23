import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { T, Spin, Card, Btn, Badge, EmptyState } from '../components/UI';
import api from '../utils/api';
import { generateQuestions } from '../utils/questions';

const MockTests = ({onStartTest}) => {
  const [exams,setExams]=useState([]);const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState('');const [diffF,setDiffF]=useState('All');
  useEffect(()=>{api.get('/exams').then(r=>{setExams(r.data.exams||[]);setLoading(false);}).catch(()=>setLoading(false));},[]);
  const filtered=useMemo(()=>exams.filter(e=>{
    if(diffF!=='All'&&e.difficulty!==diffF)return false;
    if(search&&!e.title.toLowerCase().includes(search.toLowerCase())&&!e.subject.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  }),[exams,diffF,search]);
  const dc=d=>d==='Easy'?T.accent:d==='Medium'?T.warn:T.danger;
  if(loading)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:300,gap:12,color:T.textMuted}}><Spin/>Loading...</div>;
  return (
    <div className='fu'>
      <div style={{marginBottom:22}}>
        <h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:600}}>Mock Tests</h1>
        <p style={{color:T.textMuted,fontSize:13,marginTop:4}}>{exams.length} exams · 23 subjects</p>
      </div>
      <div style={{display:'flex',gap:10,marginBottom:18,flexWrap:'wrap'}}>
        <div style={{position:'relative'}}><Search size={13} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:T.textDim}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder='Search...' style={{background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:8,padding:'7px 12px 7px 30px',color:T.textPrimary,fontSize:13,width:220,outline:'none'}}/></div>
        <div style={{display:'flex',gap:6}}>{['All','Easy','Medium','Hard'].map(d=><Btn key={d} variant={diffF===d?'primary':'surface'} size='sm' onClick={()=>setDiffF(d)}>{d}</Btn>)}</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:14}}>
        {filtered.map(exam=>(
          <Card key={exam._id||exam.id} className='hover-card'>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
              <Badge color={dc(exam.difficulty)}>{exam.difficulty}</Badge>
              {exam.isCustom&&<Badge color={T.purple}>Custom</Badge>}
            </div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:600,marginBottom:6,lineHeight:1.4}}>{exam.title}</div>
            <div style={{fontSize:12,color:T.textMuted,marginBottom:12,fontFamily:"'IBM Plex Mono',monospace"}}>{exam.subject}</div>
            <div style={{display:'flex',gap:14,marginBottom:14,fontSize:12,color:T.textMuted}}>
              <span><span style={{color:T.textPrimary,fontWeight:600}}>{exam.questions}</span> questions</span>
              <span><span style={{color:T.textPrimary,fontWeight:600}}>{exam.time}min</span></span>
            </div>
            <Btn variant='outline' full onClick={()=>onStartTest({...exam,qData:generateQuestions(exam.subject,exam.difficulty,exam.questions,exam.type||'MCQ')})}>Start Test</Btn>
          </Card>
        ))}
      </div>
      {filtered.length===0&&<Card><EmptyState icon={Search} title='No exams found' sub='Try adjusting your search or filter criteria.'/></Card>}
    </div>
  );
};
export default MockTests;
