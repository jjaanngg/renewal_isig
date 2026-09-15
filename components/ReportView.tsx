"use client";
import { useMemo, useState } from "react";
import MarkdownDoc from "@/components/MarkdownDoc";

function tap() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(8);
}

type Section = { title: string; body: string; kind: "summary" | "steps" | "note" };

function parseSections(content: string): { title: string; intro: string; sections: Section[] } {
  const lines = content.split("\n");
  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line));
  const title = (titleIndex >= 0 ? lines[titleIndex] : "# 인수인계 리포트").replace(/^#\s+/, "").trim();
  const rest = lines.slice(titleIndex >= 0 ? titleIndex + 1 : 0);
  const introLines: string[] = [];
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of rest) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      if (current) sections.push(current);
      const headingTitle = heading[1].trim();
      const lower = headingTitle.toLowerCase();
      current = { title: headingTitle, body: "", kind: lower.includes("주의") || lower.includes("예외") || lower.includes("참고") ? "note" : lower.includes("순서") || lower.includes("단계") || lower.includes("방법") ? "steps" : "summary" };
    } else if (current) current.body += `${line}\n`;
    else if (line.trim()) introLines.push(line);
  }
  if (current) sections.push(current);
  return { title, intro: introLines.join("\n"), sections: sections.length ? sections : [{ title: "업무 내용", body: content, kind: "summary" }] };
}

export default function ReportView({ content }: { content: string }) {
  const parsed = useMemo(() => parseSections(content), [content]);
  const [open, setOpen] = useState<Record<number, boolean>>(() => Object.fromEntries(parsed.sections.map((_, i) => [i, i === 0])));
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (index: number) => { tap(); setOpen((prev) => ({ ...prev, [index]: !prev[index] })); };
  const toggleCheck = (key: string) => { tap(); setChecked((prev) => ({ ...prev, [key]: !prev[key] })); };
  return <div className="report-view">
    <div className="report-hero"><div className="report-hero__badge">ISIG REPORT</div><h1>{parsed.title}</h1><p>{parsed.intro || "대화를 바탕으로 정리된 업무 인수인계 리포트입니다."}</p><div className="report-hero__meta"><span><i /> 대화로 생성됨</span><span>{parsed.sections.length}개 섹션</span></div></div>
    <div className="report-summary-strip"><div><b>한눈에 보는 업무</b><span>필요한 내용만 열어서 확인하세요.</span></div><button onClick={() => { tap(); setOpen(Object.fromEntries(parsed.sections.map((_, i) => [i, true]))); }}>모두 펼치기</button></div>
    <div className="report-sections">{parsed.sections.map((section, index) => <section className={`report-section report-section--${section.kind} ${open[index] ? "is-open" : ""}`} key={`${section.title}-${index}`}><button className="report-section__toggle" onClick={() => toggle(index)} aria-expanded={!!open[index]}><span className="report-section__number">{String(index + 1).padStart(2, "0")}</span><span className="report-section__title">{section.title}</span><span className="report-section__chevron">⌄</span></button><div className="report-section__body"><ReportMarkdown content={section.body} sectionIndex={index} checked={checked} onCheck={toggleCheck} /></div></section>)}</div>
  </div>;
}

function ReportMarkdown({ content, sectionIndex, checked, onCheck }: { content: string; sectionIndex: number; checked: Record<string, boolean>; onCheck: (key: string) => void }) {
  const lines = content.split("\n");
  return <div className="report-markdown">{lines.map((line, index) => { const match = line.match(/^\s*-\s+\[([ xX])\]\s+(.+)/); if (match) { const key = `${sectionIndex}-${index}`; return <button className={`report-check ${checked[key] || match[1].toLowerCase() === "x" ? "is-done" : ""}`} key={key} onClick={() => onCheck(key)}><span>{checked[key] || match[1].toLowerCase() === "x" ? "✓" : ""}</span><strong>{match[2]}</strong></button>; } return <MarkdownDoc key={index} content={line || "\n"} />; })}</div>;
}
