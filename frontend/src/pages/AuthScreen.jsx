import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { T, Spin, Field, Sel } from '../components/UI';
import api from '../utils/api';

const AuthScreen = ({onLogin}) => {
  const [mode,setMode]=useState('login');
  const [name,setName]=useState('');const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');const [cpw,setCpw]=useState('');
  const [role,setRole]=useState('Student');
  const [showPw,setShowPw]=useState(false);const [showCpw,setShowCpw]=useState(false);
  const [loading,setLoading]=useState(false);const [err,setErr]=useState('');
  const [successMsg,setSuccessMsg]=useState('');
  const pwMatch = cpw.length > 0 ? pw === cpw : null;
  // Password strength validation
  const pwValid =
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw);
  const pwWarn =
    cpw.length > 0 && !pwValid
      ? 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
      : '';

  const submit=async()=>{
    setErr('');setLoading(true);
    try{
      if(mode==='register'){
        if(!name.trim()){setErr('Please enter your name.');setLoading(false);return;}
        if(!pw){setErr('Please enter a password.');setLoading(false);return;}
        if(!pwValid){setErr('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.');setLoading(false);return;}
        if(pw!==cpw){setErr('Passwords do not match.');setLoading(false);return;}
        await api.post('/auth/register',{name:name.trim(),email:email.trim(),password:pw,role});
        setSuccessMsg('Account created! Please sign in.');
        setMode('login');setPw('');setCpw('');setName('');
      }else{
        const res=await api.post('/auth/login',{email:email.trim(),password:pw});
        localStorage.setItem('ef_token',res.data.token);
        localStorage.setItem('ef_user',JSON.stringify(res.data.user));
        onLogin(res.data.user,res.data.token);
      }
    }catch(e){setErr(e.response?.data?.message||'Something went wrong.');}
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh',background:T.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{width:'100%',maxWidth:420}} className='fu'>
        <div style={{background:T.surface,borderRadius:18,padding:'36px 36px 32px',boxShadow:'0 24px 60px #00000077'}}>
          <div style={{textAlign:'center',marginBottom:28}}>
            <h1 style={{fontFamily:"'Fraunces',serif",fontSize:32,fontWeight:700,color:T.accent}}>ExamForge</h1>
            <p style={{color:T.textMuted,fontSize:13,marginTop:6}}>AI-powered mock test platform</p>
          </div>
          {successMsg&&<div className='fi' style={{marginBottom:16,padding:'10px 14px',background:T.accent+'14',border:`1px solid ${T.accent}44`,borderRadius:9,fontSize:13,color:T.accent,display:'flex',alignItems:'center',gap:8}}><Check size={14}/>{successMsg}</div>}
          {mode==='login'?(
            <>
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                <Field label='EMAIL' value={email} onChange={setEmail} type='email' placeholder='you@gmail.com'/>
                <Field label='PASSWORD' value={pw} onChange={setPw} type={showPw?'text':'password'} placeholder='Enter Password' suffix={showPw?<EyeOff size={16} onClick={()=>setShowPw(false)}/>:<Eye size={16} onClick={()=>setShowPw(true)}/>}/>
                {err&&<div style={{fontSize:12,color:T.danger,padding:'8px 12px',background:T.dangerDim,borderRadius:7,border:`1px solid ${T.danger}33`}}>{err}</div>}
                <button onClick={submit} disabled={loading} style={{background:T.accent,color:'#080C10',border:'none',borderRadius:10,padding:'13px',fontSize:14,fontWeight:700,cursor:loading?'not-allowed':'pointer'}}>
                  {loading?<div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}><Spin size={16} color='#080C10'/>Signing in...</div>:'Sign In'}
                </button>
              </div>
              <p style={{textAlign:'center',marginTop:20,fontSize:13,color:T.textMuted}}>No account? <span onClick={()=>{setMode('register');setErr('');setSuccessMsg('');}} style={{color:T.accent,cursor:'pointer',fontWeight:600}}>Create one</span></p>
            </>
          ):(
            <>
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <Field label='FULL NAME' value={name} onChange={setName} placeholder='Your full name'/>
                <Field label='EMAIL' value={email} onChange={setEmail} type='email' placeholder='you@gmail.com'/>
                <Sel label='ROLE' value={role} onChange={setRole} options={['Student','Teacher']}/>
                <Field label='PASSWORD' value={pw} onChange={setPw} type={showPw?'text':'password'} placeholder='Create a password' suffix={showPw?<EyeOff size={16} onClick={()=>setShowPw(false)}/>:<Eye size={16} onClick={()=>setShowPw(true)}/>}/>
                <Field label='CONFIRM PASSWORD' value={cpw} onChange={setCpw} type={showCpw?'text':'password'} placeholder='Repeat your password'
                  error={pwMatch===false?'Passwords do not match':''}
                  hint={pwMatch===true?'Passwords matched':''}
                  suffix={showCpw?<EyeOff size={16} onClick={()=>setShowCpw(false)}/>:<Eye size={16} onClick={()=>setShowCpw(true)}/>}/>
                {pwWarn && (
                  <div style={{fontSize:12,color:T.danger,padding:'6px 12px',background:T.dangerDim,borderRadius:7,border:`1px solid ${T.danger}33`,marginTop:-8,marginBottom:2}}>{pwWarn}</div>
                )}
                {err&&<div style={{fontSize:12,color:T.danger,padding:'8px 12px',background:T.dangerDim,borderRadius:7,border:`1px solid ${T.danger}33`}}>{err}</div>}
                <button onClick={submit} disabled={loading} style={{background:T.accent,color:'#080C10',border:'none',borderRadius:10,padding:'13px',fontSize:14,fontWeight:700,cursor:loading?'not-allowed':'pointer'}}>
                  {loading?<div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}><Spin size={16} color='#080C10'/>Creating account...</div>:'Create Account'}
                </button>
              </div>
              <p style={{textAlign:'center',marginTop:20,fontSize:13,color:T.textMuted}}>Have an account? <span onClick={()=>{setMode('login');setErr('');setSuccessMsg('');}} style={{color:T.accent,cursor:'pointer',fontWeight:600}}>Sign in</span></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthScreen;
