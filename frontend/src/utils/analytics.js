export const computeAnalytics = (attempts) => {
  const zero = {
    avgScore:0,avgPerQuestion:0,streak:0,improvement:0,totalAttempts:0,
    bestSubject:'—',weakSubject:'—',studyTime:'0h',
    scoreTrend:[],subjects:[],
    accuracy:[{name:'Correct',value:0,color:'#00D4AA'},{name:'Wrong',value:0,color:'#E85D5D'},{name:'Skipped',value:0,color:'#3D5464'}],
    radar:[{topic:'Arrays',score:0},{topic:'Graphs',score:0},{topic:'Trees',score:0},{topic:'DP',score:0},{topic:'Sorting',score:0},{topic:'Hashing',score:0}],
    productivityScore:0,learningConsistency:0,conceptMastery:0,examEfficiency:0,hasData:false,
  };
  if (!attempts || !attempts.length) return zero;
  const scores = attempts.map(a=>a.score);
  const avgScore = Math.round(scores.reduce((s,n)=>s+n,0)/scores.length);
  const correct = attempts.reduce((s,a)=>s+(a.correct||0),0);
  const totalQ = attempts.reduce((s,a)=>s+(a.totalQ||0),0);
  const cPct = totalQ>0?Math.round(correct/totalQ*100):0;
  const wPct = totalQ>0?Math.round((totalQ-correct)/totalQ*100):0;
  const subMap={};
  attempts.forEach(a=>{const k=(a.subject||'Other').split(' ')[0];if(!subMap[k])subMap[k]={total:0,count:0};subMap[k].total+=a.score;subMap[k].count++;});
  const subjects=Object.entries(subMap).map(([k,v])=>({subject:k,score:Math.round(v.total/v.count)}));
  const sortedSubj=[...subjects].sort((a,b)=>b.score-a.score);
  const scoreTrend=attempts.slice(0,8).reverse().map((a,i)=>({month:a.date?a.date.slice(5,10):`T${i+1}`,score:a.score}));
  let improvement=0;
  if(attempts.length>=2){const half=Math.floor(attempts.length/2);const recent=attempts.slice(0,half).reduce((s,a)=>s+a.score,0)/half;const older=attempts.slice(half).reduce((s,a)=>s+a.score,0)/(attempts.length-half);improvement=Math.round(recent-older);}
  const studyMins=attempts.reduce((s,a)=>{const t=a.time||'00:00';const[m,sc]=t.split(':').map(Number);return s+m+(sc||0)/60;},0);
  const studyTime=studyMins>=60?`${Math.floor(studyMins/60)}h ${Math.round(studyMins%60)}m`:`${Math.round(studyMins)}m`;
  const dates=[...new Set(attempts.map(a=>a.date))].sort().reverse();
  let streak=0;const now=new Date();
  for(let i=0;i<dates.length;i++){const diff=Math.floor((now-new Date(dates[i]))/86400000);if(diff<=i+1)streak++;else break;}
  const radar=[{topic:'Arrays'},{topic:'Graphs'},{topic:'Trees'},{topic:'DP'},{topic:'Sorting'},{topic:'Hashing'}].map((r,i)=>({...r,score:Math.min(100,Math.max(0,avgScore+(i%2===0?10:-15)))}));
  const consistency=Math.min(100,attempts.length*8);
  const avgPerQ=Math.max(10,Math.round(90-(avgScore*0.4)));
  const productivityScore=Math.round(avgScore*0.4+cPct*0.3+consistency*0.2+(attempts.length>5?10:attempts.length*2));
  const learningConsistency=Math.min(100,consistency+streak*3);
  const conceptMastery=Math.min(100,Math.round(avgScore*0.6+cPct*0.4));
  const examEfficiency=Math.min(100,Math.round(cPct*0.7+(100-avgPerQ)*0.3));
  return {avgScore,avgPerQuestion:avgPerQ,streak,improvement,totalAttempts:attempts.length,bestSubject:sortedSubj[0]?.subject||'—',weakSubject:sortedSubj[sortedSubj.length-1]?.subject||'—',studyTime,scoreTrend,subjects,accuracy:[{name:'Correct',value:cPct,color:'#00D4AA'},{name:'Wrong',value:wPct,color:'#E85D5D'},{name:'Skipped',value:Math.max(0,100-cPct-wPct),color:'#3D5464'}],radar,productivityScore,learningConsistency,conceptMastery,examEfficiency,hasData:true};
};

export const exportCSV = (attempts, userName) => {
  if (!attempts.length) { alert('No attempts to export yet.'); return; }
  const headers = ['Exam Name','Subject','Difficulty','Type','Score (%)','Correct','Total Questions','Time','Date','Status'];
  const rows = attempts.map(a=>[`"${(a.exam||'').replace(/"/g,'""')}"`,`"${a.subject||''}"`,`"${a.difficulty||'Medium'}"`,`"${a.qType||'MCQ'}"`,a.score||0,a.correct||0,a.totalQ||0,`"${a.time||''}"`,`"${a.date||''}"`,`"${a.status||''}"`]);
  const csv=[headers.join(','),...rows.map(r=>r.join(','))].join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const el=document.createElement('a');el.href=url;el.download=`examforge_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(el);el.click();document.body.removeChild(el);setTimeout(()=>URL.revokeObjectURL(url),1000);
};

export const exportPDF = (A, attempts, userName) => {
  if (!A?.hasData) { alert('Complete some tests first to generate a PDF report.'); return; }
  const attemptRows=attempts.slice(0,15).map(a=>`<tr><td>${(a.exam||'').slice(0,30)}</td><td>${a.subject||'—'}</td><td>${a.qType||'MCQ'}</td><td style="font-weight:bold;color:${a.score>=60?'#00D4AA':'#E85D5D'}">${a.score}%</td><td>${a.correct||'—'}/${a.totalQ||'—'}</td><td>${a.time||'—'}</td><td>${a.date||'—'}</td></tr>`).join('');
  const html=`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>ExamForge Report</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;color:#111;padding:36px;}.header{margin-bottom:24px;border-bottom:2px solid #00D4AA;padding-bottom:12px;}h1{color:#00D4AA;font-size:24px;}h2{font-size:13px;font-weight:700;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.07em;color:#444;}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}.card{background:#f7fafb;border-radius:8px;padding:14px;text-align:center;border:1px solid #e5e7eb;}.card .val{font-size:24px;font-weight:700;color:#00D4AA;}.card .lbl{font-size:10px;color:#888;margin-top:3px;text-transform:uppercase;}table{width:100%;border-collapse:collapse;font-size:11px;}th{background:#00D4AA;color:#fff;padding:7px 8px;text-align:left;font-size:10px;text-transform:uppercase;font-weight:700;}td{padding:7px 8px;border-bottom:1px solid #f0f0f0;}tr:nth-child(even){background:#fafafa;}.footer{margin-top:28px;font-size:10px;color:#aaa;text-align:center;border-top:1px solid #eee;padding-top:10px;}@media print{body{padding:20px;}}</style></head><body>
  <div class="header"><h1>ExamForge — Performance Report</h1><div style="font-size:12px;color:#888;margin-top:4px;">Student: <strong>${userName||'Student'}</strong> &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString()} &nbsp;|&nbsp; Total Exams: ${attempts.length}</div></div>
  <div class="grid"><div class="card"><div class="val">${A.avgScore}%</div><div class="lbl">Avg Score</div></div><div class="card"><div class="val">${attempts.length}</div><div class="lbl">Tests</div></div><div class="card"><div class="val">${A.streak}d</div><div class="lbl">Streak</div></div><div class="card"><div class="val">${A.accuracy[0].value}%</div><div class="lbl">Accuracy</div></div></div>
  <h2>Exam Attempts (Latest ${Math.min(15,attempts.length)})</h2>
  <table><tr><th>Exam</th><th>Subject</th><th>Type</th><th>Score</th><th>Correct</th><th>Time</th><th>Date</th></tr>${attemptRows}</table>
  <div class="footer">ExamForge — AI Mock Test Platform &nbsp;·&nbsp; Auto-generated report</div>
  </body></html>`;
  const w=window.open('','_blank','width=900,height=700,scrollbars=yes');
  if(!w){alert('Popup blocked — allow popups for this site.');return;}
  w.document.write(html);w.document.close();
  setTimeout(()=>{try{w.print();}catch(e){}},500);
};
