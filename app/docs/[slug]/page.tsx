"use client";
import { useEffect,useState } from "react";
import { useParams,notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import MarkdownDoc from "@/components/MarkdownDoc";
import PrintButton from "@/components/PrintButton";
import { BrandMark } from "@/components/AppShell";
export default function DocPage(){const params=useParams<{slug:string}>();const [content,setContent]=useState<string|null>(null);const [missing,setMissing]=useState(false);useEffect(()=>{(async()=>{const {data,error}=await supabase.rpc("get_document_by_slug",{slug_input:params.slug});if(error||!data?.[0])setMissing(true);else setContent(data[0].content)})()},[params.slug]);if(missing)notFound();if(!content)return <div className="min-h-screen bg-white"/>;return <div className="shared-page"><header><BrandMark/><span>공유된 문서</span></header><main className="doc-result"><div className="shared-intro"><p className="eyebrow">ISIG DOCUMENT</p><h1>업무를 이어가는<br/>가장 명확한 방법</h1><p>이 문서는 ISIG와의 대화를 통해 만들어졌습니다.</p></div><div className="doc-paper"><div className="doc-paper__label">공유된 인수인계 문서</div><MarkdownDoc content={content}/><p className="doc-paper__meta">문서 ID: {params.slug} · 열람일: {new Date().toLocaleString("ko-KR")}</p></div><div className="doc-actions"><PrintButton/></div></main></div>}
