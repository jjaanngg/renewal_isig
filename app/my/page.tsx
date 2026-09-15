import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function MyPage() {
  const { data: docs, error } = await supabase
    .from("documents")
    .select("share_slug, content, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-50 dark:bg-black px-4 py-10">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center">내 문서 목록</h1>

        {error && (
          <p className="text-sm text-red-500 text-center">
            문서를 불러오는 중 오류가 발생했어요.
          </p>
        )}

        {!error && (!docs || docs.length === 0) && (
          <p className="text-sm text-zinc-400 text-center">
            아직 만든 문서가 없습니다.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {docs?.map((doc) => {
            const firstLine =
              doc.content.split("\n").find((line: string) => line.trim()) ??
              "제목 없음";
            return (
              <Link
                key={doc.share_slug}
                href={`/docs/${doc.share_slug}`}
                className="bg-white dark:bg-zinc-900 rounded-xl p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="font-medium text-sm">
                  {firstLine.replace(/^#+\s*/, "")}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {new Date(doc.created_at).toLocaleString("ko-KR")}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}