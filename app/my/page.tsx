import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { AppShell, ArrowRightIcon, SparkIcon } from "@/components/AppShell";

type Doc = { share_slug: string; content: string; created_at: string };
const previewDocs: Doc[] = [
  { share_slug: "preview-1", content: "# 개인화기 손질 및 점검", created_at: new Date().toISOString() },
  { share_slug: "preview-2", content: "# 신병 교육 인수인계", created_at: new Date(Date.now() - 86400000).toISOString() },
  { share_slug: "preview-3", content: "# 월말 재고 정리", created_at: new Date(Date.now() - 172800000).toISOString() },
];

export default async function MyPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const params = await searchParams;
  const preview = params.preview === "1";
  let docs: Doc[] | null = preview ? previewDocs : null;
  let error = false;
  if (!preview) {
    const result = await supabase.from("documents").select("share_slug, content, created_at").order("created_at", { ascending: false });
    docs = result.data;
    error = !!result.error;
  }
  return <AppShell eyebrow="DOCUMENT LIBRARY" title="내 문서" description="쌓인 경험을 다시 꺼내보고, 필요한 사람에게 건네보세요." action={<Link href="/interview" className="button button--primary">새 문서 만들기 <ArrowRightIcon /></Link>}>
    <div className="my-page__intro"><div className="my-page__count"><span>ALL DOCUMENTS</span><b>{docs?.length ?? 0}</b><small>개의 업무가 정리되어 있어요</small></div><div className="my-page__tip"><SparkIcon/><p><b>문서는 공유할 때 더 강해져요.</b><br/>다음 사람의 첫날을 가볍게 만들어주세요.</p></div></div>
    {error && <div className="my-empty"><h2>문서를 불러오는 중 문제가 생겼어요.</h2><p>잠시 후 다시 시도해주세요.</p></div>}
    {!error && docs?.length === 0 && <div className="my-empty"><div className="my-empty__icon"><SparkIcon/></div><h2>아직 만든 문서가 없어요.</h2><p>첫 업무를 대화로 정리해보세요.<br/>복잡했던 인수인계가 한 장의 문서가 됩니다.</p><Link href="/interview" className="button button--primary">첫 문서 만들기 <ArrowRightIcon/></Link></div>}
    {!error && !!docs?.length && <div className="my-doc-grid">{docs.map((doc,index)=>{const title=doc.content.split("\n").find(line=>line.trim())??"제목 없음";return <Link className="my-doc-card" href={`/docs/${doc.share_slug}`} key={doc.share_slug}><div className="my-doc-card__top"><span className={`my-doc-card__icon icon-${index%3}`}>▤</span><span className="my-doc-card__menu">···</span></div><h3>{title.replace(/^#+\s*/,"")}</h3><div className="my-doc-card__bottom"><time>{new Date(doc.created_at).toLocaleDateString("ko-KR",{month:"long",day:"numeric"})}</time><span>열어보기 <ArrowRightIcon/></span></div></Link>})}</div>}
  </AppShell>;
}
