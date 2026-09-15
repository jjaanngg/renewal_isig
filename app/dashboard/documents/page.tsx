"use client";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
const ArrowRightIcon = () => <span aria-hidden="true">→</span>;

const docs = ["개인화기 손질 및 점검", "신병 교육 인수인계", "월말 재고 정리", "당직 교대 절차", "탄약고 일일 점검"];
export default function DocumentsPage() { return <DashboardShell title="내 문서" description="만들어둔 업무 문서를 한곳에서 관리하세요." action={<Link href="/interview" className="button button--primary">새 문서 만들기 <ArrowRightIcon /></Link>}><div className="documents-toolbar"><div className="documents-search">⌕<input placeholder="문서 검색" /></div><div className="document-filters"><button className="is-active">전체</button><button>최근 수정</button><button>주제별</button></div></div><div className="document-grid">{docs.map((title,index)=><Link className="document-tile" href="/dashboard" key={title}><div className="document-tile__top"><span className={`recent-doc__icon ${index%2?"purple":"blue"}`}>▤</span><span>···</span></div><h3>{title}</h3><p>{index===0?"오늘, 14:32":`9월 ${15-index}일`}</p><div className="tile-footer"><span>완료</span><ArrowRightIcon/></div></Link>)}</div></DashboardShell>; }
