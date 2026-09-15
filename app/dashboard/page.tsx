"use client";
import Link from "next/link";
import { DashboardShell, TrendIcon } from "@/components/DashboardShell";
const ArrowRightIcon = () => <span aria-hidden="true">→</span>;
const SparkIcon = () => <span aria-hidden="true">✦</span>;

const recent = [
  { title: "개인화기 손질 및 점검", type: "장비·점검", date: "오늘, 14:32", progress: 100, color: "blue" },
  { title: "신병 교육 인수인계", type: "교육·안내", date: "어제, 17:08", progress: 82, color: "purple" },
  { title: "월말 재고 정리", type: "정기 업무", date: "9월 12일", progress: 64, color: "green" },
];

export default function DashboardPage() {
  return <DashboardShell title="좋은 오후예요, Joon" description="오늘도 경험을 다음 사람의 자신감으로 바꿔볼까요?" action={<Link href="/interview" className="button button--primary">새 문서 만들기 <ArrowRightIcon /></Link>}>
    <section className="dashboard-welcome"><div><span className="welcome-label"><SparkIcon/> THIS WEEK</span><h2>이번 주, <strong>3개의 업무</strong>가<br/>더 명확해졌어요.</h2><p>작은 기록이 팀의 시간을 아껴줍니다.</p></div><div className="welcome-orbit"><span>3</span><small>문서 생성</small></div></section>
    <section className="metric-grid"><div className="metric-card"><span>전체 문서</span><b>12</b><small><TrendIcon/> 지난주보다 3개 더</small></div><div className="metric-card"><span>이번 달 정리 시간</span><b>2.4h</b><small><TrendIcon/> 약 38% 절약</small></div><div className="metric-card metric-card--soft"><span>가장 많이 다룬 주제</span><b>정기 업무</b><small>전체의 42%</small></div></section>
    <div className="dashboard-section-heading"><div><h2>최근 작업</h2><p>최근에 만들거나 수정한 문서예요.</p></div><Link href="/dashboard/documents">전체 보기 <ArrowRightIcon/></Link></div>
    <section className="recent-table"><div className="recent-table__head"><span>문서</span><span>상태</span><span>최근 수정</span><span /></div>{recent.map(doc => <Link href="/dashboard/documents" className="recent-row" key={doc.title}><div className="recent-doc"><span className={`recent-doc__icon ${doc.color}`}>▤</span><span><b>{doc.title}</b><small>{doc.type}</small></span></div><span className="status-pill"><i/>완료</span><time>{doc.date}</time><ArrowRightIcon/></Link>)}</section>
    <section className="dashboard-bottom-grid"><div className="dashboard-cta"><div><span className="welcome-label">START A NEW FLOW</span><h3>머릿속에 있는 일을<br/><strong>지금 꺼내놓으세요.</strong></h3><Link href="/interview" className="button button--primary button--small">인터뷰 시작하기 <ArrowRightIcon/></Link></div><div className="cta-spark"><SparkIcon/></div></div><div className="activity-card"><h3>최근 활동</h3><div><span className="activity-dot blue"/><p><b>신병 교육 인수인계</b>를 수정했어요.<small>어제 17:08</small></p></div><div><span className="activity-dot green"/><p><b>개인화기 손질 및 점검</b>을 공유했어요.<small>오늘 14:32</small></p></div></div></section>
  </DashboardShell>;
}
