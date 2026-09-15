"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { AppShell, ArrowRightIcon, EmptyState } from "@/components/AppShell";
import LogoutButton from "@/components/LogoutButton";

type Doc={share_slug:string;content:string;created_at:string;topic:string|null};
export default function HomePage(){
 const router=useRouter(); const [docs,setDocs]=useState<Doc[]|null>(null); const [checking,setChecking]=useState(true); const [search,setSearch]=useState(""); const [filter,setFilter]=useState<string|null>(null); const [confirm,setConfirm]=useState<string|null>(null);
 useEffect(()=>{supabase.auth.getUser().then(async({data})=>{if(!data.user){router.replace("/login");return;} setChecking(false); const {data:rows}=await supabase.from("documents").select("share_slug, content, created_at, topic").eq("user_id",data.user.id).order("created_at",{ascending:false}); setDocs(rows??[]);});},[router]);
 const remove=async()=>{if(!confirm)return; await supabase.from("documents").delete().eq("share_slug",confirm);setDocs(prev=>prev?.filter(d=>d.share_slug!==confirm)??null);setConfirm(null)};
 if(checking)return <div className="min-h-screen bg-white"/>;
 const topics=Array.from(new Set(docs?.map(d=>d.topic).filter(Boolean)??[])) as string[]; const filtered=docs?.filter(d=>!filter||d.topic===filter).filter(d=>d.content.toLowerCase().includes(search.toLowerCase()));
 return <AppShell eyebrow="MY WORKSPACE" title="안녕하세요, 오늘도 정리해볼까요?" description="머릿속에 있는 업무를 꺼내놓으면, 다음 사람이 바로 쓸 수 있게 다듬어드려요." action={<Link href="/interview" className="button button--primary">새 문서 만들기 <ArrowRightIcon/></Link>}>
   <div className="dashboard-grid"><div className="hero-card"><div className="hero-card__content"><p className="hero-card__kicker">새로운 인수인계</p><h2>설명할 준비만 하세요.<br/>정리는 ISIG가 할게요.</h2><p>AI와 편하게 대화하면서 업무의 흐름, 노하우, 예외 상황을 하나씩 기록해보세요.</p><Link href="/interview" className="button">대화 시작하기 <ArrowRightIcon/></Link></div></div><div className="insight-card"><span className="insight-card__label">TIP OF THE DAY</span><h3>좋은 인수인계는<br/>‘순서’에서 시작해요.</h3><p>처음 하는 사람이 어디서 막힐지 생각하며 설명하면 문서의 완성도가 높아져요.</p></div></div>
   <div className="section-head"><h2>최근 문서</h2><span>{docs?.length??0}개의 문서</span></div>
   <div className="workspace-toolbar"><div className="search-wrap"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="문서 제목이나 내용 검색"/></div>{topics.length>0&&<div className="filter-pills"><button onClick={()=>setFilter(null)} className={!filter?"is-selected":""}>전체</button>{topics.map(t=><button key={t} onClick={()=>setFilter(t)} className={filter===t?"is-selected":""}>{t}</button>)}</div>}</div>
   {filtered?.length===0?<EmptyState onStart={()=>router.push("/interview")}/>:<div className="doc-list">{filtered?.map(doc=>{const title=doc.content.split("\n").find(line=>line.trim())??"제목 없음";return <div className="doc-card" key={doc.share_slug}><Link href={`/docs/${doc.share_slug}`}><div className="doc-card__top"><div className="doc-card__icon"><ArrowRightIcon/></div><span className="doc-card__more">···</span></div><h3>{title.replace(/^#+\s*/,"")}</h3><time>{new Date(doc.created_at).toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric"})}</time></Link><div className="doc-card__actions"><Link href={`/docs/${doc.share_slug}/edit`}>수정</Link><button onClick={()=>setConfirm(doc.share_slug)}>삭제</button></div></div>})}</div>}
   <div className="mobile-logout"><LogoutButton/></div>
   {confirm&&<div className="modal-backdrop"><div className="confirm-modal"><div className="modal-icon">!</div><h2>문서를 삭제할까요?</h2><p>삭제한 문서는 다시 복구할 수 없어요.</p><div><button className="button button--ghost" onClick={()=>setConfirm(null)}>취소</button><button className="button button--danger" onClick={remove}>삭제하기</button></div></div></div>}
 </AppShell>;
}
