"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BrandMark, ArrowRightIcon, SparkIcon } from "@/components/AppShell";

const features = [
  ["01", "말하듯 시작해요", "업무를 잘 설명하려고 애쓰지 않아도 돼요. AI가 필요한 것부터 물어봅니다."],
  ["02", "빠진 내용을 찾아요", "경험 속에 숨어 있던 예외와 주의사항까지 자연스럽게 끌어냅니다."],
  ["03", "바로 공유할 수 있어요", "대화가 끝나면 다음 사람이 바로 이해할 수 있는 문서가 완성됩니다."],
];

export default function LandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => data.user ? router.replace("/home") : setChecking(false)); }, [router]);
  if (checking) return <div className="min-h-screen bg-white" />;
  return (
    <div className="landing-page">
      <header className="landing-header"><BrandMark /><Link href="/login" className="landing-login">로그인 <ArrowRightIcon /></Link></header>
      <main>
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <p className="eyebrow"><span className="landing-pulse" /> 인수인계를 다시 설계하다</p>
            <h1>몸으로 익힌 일을<br /><span>말로 남기는</span> 가장 쉬운 방법</h1>
            <p className="landing-hero__desc">ISIG는 대화를 통해 당신의 경험을<br className="mobile-break" /> 다음 사람을 위한 명확한 업무 문서로 바꿔줍니다.</p>
            <Link href="/login" className="button button--primary landing-cta">무료로 시작하기 <ArrowRightIcon /></Link>
            <p className="landing-trust"><SparkIcon /> 복잡한 서식 없이, 대화만으로 완성돼요</p>
          </div>
          <div className="landing-visual" aria-hidden="true">
            <div className="landing-orbit landing-orbit--one" /><div className="landing-orbit landing-orbit--two" />
            <div className="floating-card floating-card--question"><span className="floating-card__avatar">i</span><div><b>어떤 업무인가요?</b><small>AI가 먼저 물어볼게요</small></div><span className="floating-card__dot" /></div>
            <div className="floating-card floating-card--answer"><span className="floating-card__check">✓</span><div><b>문서가 완성됐어요</b><small>다음 사람도 바로 이해할 수 있어요</small></div></div>
            <div className="landing-core"><SparkIcon /><strong>업무를<br />구조화하는<br /><em>대화</em></strong><span>ISIG</span></div>
          </div>
        </section>
        <section className="landing-proof"><p>이런 순간에 특히 잘 쓰여요</p><div><span>처음 맡은 업무를 설명할 때</span><span>교대·전역 전 인수인계할 때</span><span>팀의 노하우를 기록할 때</span></div></section>
        <section className="landing-features"><div className="landing-section-title"><p className="eyebrow">HOW IT WORKS</p><h2>설명하는 데 드는<br />에너지를 줄여보세요.</h2></div><div className="feature-list">{features.map(([num,title,desc]) => <div className="feature-item" key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></section>
        <section className="landing-final"><p className="eyebrow">READY WHEN YOU ARE</p><h2>당신의 경험을<br />다음 사람에게 건네세요.</h2><Link href="/login" className="button button--primary">첫 문서 만들기 <ArrowRightIcon /></Link></section>
      </main>
      <footer className="landing-footer"><BrandMark /><span>Make work understandable.</span></footer>
    </div>
  );
}
