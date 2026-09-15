"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BrandMark, ArrowRightIcon } from "@/components/AppShell";

export default function LoginPage() {
  const router = useRouter(); const [checking,setChecking]=useState(true);
  useEffect(()=>{supabase.auth.getUser().then(({data})=>data.user?router.replace("/home"):setChecking(false));},[router]);
  const handleGoogleLogin=async()=>{await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${window.location.origin}/home`}})};
  if(checking) return <div className="min-h-screen bg-white"/>;
  return <div className="auth-page">
    <section className="auth-visual"><BrandMark /><div className="auth-copy"><p className="eyebrow" style={{color:"#cce3ff"}}>ISIG WORKSPACE</p><h1>경험은<br />사라지지 않게,<br /><span>일의 언어로.</span></h1><p>잘하는 사람의 머릿속에만 있던 업무 노하우를<br />누구나 이해할 수 있는 문서로 바꿔보세요.</p></div><div className="auth-steps"><span><i>1</i> 대화</span><span><i>2</i> 정리</span><span><i>3</i> 공유</span></div></section>
    <section className="auth-panel"><div className="auth-box"><BrandMark compact /><h2>반가워요</h2><p className="auth-box__desc">ISIG와 함께 첫 인수인계 문서를<br />만들어볼까요?</p><button onClick={handleGoogleLogin} className="google-button"><svg width="19" height="19" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0012 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.05H2.18a11 11 0 000 9.9l3.66-2.85z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 00-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"/></svg>Google로 계속하기 <ArrowRightIcon /></button><p className="auth-note">로그인하면 서비스 이용약관 및 개인정보처리방침에<br />동의하는 것으로 간주됩니다.</p></div></section>
  </div>;
}
