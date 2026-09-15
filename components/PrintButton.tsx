"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print mt-3 flex items-center justify-center gap-1.5 self-center rounded-full border border-[#E5E8EB] px-4 py-2 text-[13px] font-medium text-[#4E5968] hover:bg-[#F2F4F6]"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      인쇄 / PDF로 저장
    </button>
  );
}