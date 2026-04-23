import { useState, useEffect } from 'react';
import { Fonts } from './components/UI';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Chatbot from './components/Chatbot';
import AuthScreen from './pages/AuthScreen';
import Dashboard from './pages/Dashboard';
import MockTests from './pages/MockTests';
import CreateExam from './pages/CreateExam';
import TakeTest from './pages/TakeTest';
import PastAttempts from './pages/PastAttempts';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import { T } from './components/UI';

const App = () => {
  const [user,setUser]=useState(null);
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [page,setPage]=useState('dashboard');
  const [activeExam,setActiveExam]=useState(null);

  useEffect(()=>{
    const token=localStorage.getItem('ef_token');
    const u=localStorage.getItem('ef_user');
    if(token&&u){try{setUser(JSON.parse(u));}catch(e){localStorage.clear();}}
  },[]);

  const handleLogin=(u)=>{setUser(u);setPage('dashboard');};
  const handleLogout=()=>{localStorage.removeItem('ef_token');localStorage.removeItem('ef_user');setUser(null);setPage('dashboard');setActiveExam(null);};
  const handleNav=(p)=>{if(p==='__logout__'){handleLogout();return;}if(p!=='take-test')setActiveExam(null);setPage(p);};
  const handleStartTest=(exam)=>{setActiveExam(exam);setPage('take-test');};

  if(!user)return<><Fonts/><AuthScreen onLogin={handleLogin}/></>;

  const sw=sidebarOpen?230:60;
  const renderPage=()=>{
    switch(page){
      case 'dashboard':return<Dashboard user={user} onNav={handleNav} onStartTest={handleStartTest}/>;
      case 'create':return<CreateExam onNav={handleNav} onStartTest={handleStartTest}/>;
      case 'tests':return<MockTests onStartTest={e=>{handleStartTest(e);setPage('take-test');}}/>;
      case 'take-test':return activeExam?<TakeTest exam={activeExam} onBack={()=>handleNav('tests')}/>:<Dashboard user={user} onNav={handleNav} onStartTest={handleStartTest}/>;
      case 'attempts':return<PastAttempts onNav={handleNav}/>;
      case 'analytics':return<Analytics/>;
      case 'reports':return<Reports user={user}/>;
      default:return<Dashboard user={user} onNav={handleNav} onStartTest={handleStartTest}/>;
    }
  };

  return (
    <>
      <Fonts/>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} active={page} onNav={handleNav} user={user}/>
      <TopBar user={user} sw={sw} onNav={handleNav}/>
      <main style={{marginLeft:sw,marginTop:54,minHeight:'calc(100vh - 54px)',background:T.bg,padding:'28px 28px 60px',transition:'margin-left .26s cubic-bezier(.4,0,.2,1)'}}>
        {renderPage()}
      </main>
      <Chatbot user={user}/>
    </>
  );
};
export default App;
