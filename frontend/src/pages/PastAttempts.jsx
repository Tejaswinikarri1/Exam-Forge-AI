import { useState, useEffect } from 'react';
import { RefreshCw, ClipboardList } from 'lucide-react';
import { T, Spin, Card, Btn, Badge, EmptyState } from '../components/UI';
import api from '../utils/api';

const PastAttempts = ({onNav}) => {
  const [attempts,setAttempts]=useState([]);const [loading,setLoading]=useState(true);const [del,setDel]=useState(null);
  const load=()=>{setLoading(true);api.get('/attempts').then(r=>{setAttempts(r.data.attempts||[]);setLoading(false);}).catch(()=>setLoading(false));};
  useEffect(load,[]);
  const doDelete=async id=>{setDel(id);try{await api.delete(`/attempts/${id}`);setAttempts(p=>p.filter(a=>(a._id||a.id)!==id));}catch(e){}setDel(null);};
  if(loading)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:300,gap:12,color:T.textMuted}}><Spin/>Loading...</div>;
  return (
    <div className='fu'>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:22}}>
        <div><h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:600}}>Past Attempts</h1><p style={{color:T.textMuted,fontSize:13,marginTop:4}}>{attempts.length} completed tests</p></div>
        <Btn variant='surface' size='sm' onClick={load}><RefreshCw size={13}/>Refresh</Btn>
      </div>
      {attempts.length===0?<Card><EmptyState icon={ClipboardList} title='No attempts yet' sub='Complete a mock test to see your history here.' action={()=>onNav('tests')} label='Browse Tests'/></Card>:(
        <Card>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr style={{borderBottom:`1px solid ${T.border}`}}>{['Exam','Subject','Score','Correct','Time','Date','Status',''].map(h=><th key={h} style={{padding:'8px 12px',textAlign:'left',fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:'.06em',fontWeight:600}}>{h}</th>)}</tr></thead>
              <tbody>{attempts.map(a=>{const id=a._id||a.id;return(
                <tr key={id} style={{borderBottom:`1px solid ${T.border}22`,transition:'background .14s'}} onMouseEnter={e=>e.currentTarget.style.background=T.surfaceAlt} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{padding:'12px',fontSize:13,fontWeight:500,maxWidth:220,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.exam}</td>
                  <td style={{padding:'12px'}}><Badge color={T.textDim}>{(a.subject||'—').slice(0,10)}</Badge></td>
                  <td style={{padding:'12px'}}><span style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:a.score>=60?T.accent:T.danger}}>{a.score}%</span></td>
                  <td style={{padding:'12px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textMuted}}>{a.correct||'—'}/{a.totalQ||'—'}</td>
                  <td style={{padding:'12px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textMuted}}>{a.time}</td>
                  <td style={{padding:'12px',fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:T.textDim}}>{a.date}</td>
                  <td style={{padding:'12px'}}><Badge color={a.status==='passed'?T.accent:T.danger}>{a.status}</Badge></td>
                  <td style={{padding:'12px'}}>{del===id?<Spin size={14}/>:<Btn variant='danger' size='sm' onClick={()=>doDelete(id)}>Delete</Btn>}</td>
                </tr>
              );})}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
export default PastAttempts;
