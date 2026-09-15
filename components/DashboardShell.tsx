"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
function BrandMark() {
  return <Link href="/dashboard" className="brand-mark" aria-label="ISIG 대시보드"><span className="brand-mark__symbol">i</span><span className="brand-mark__word">ISIG</span></Link>;
}

function SparkIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" fill="currentColor" /></svg>;
}

const nav = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/dashboard/documents", label: "내 문서", icon: "▤" },
  { href: "/dashboard/settings", label: "설정", icon: "⚙" },
];

export function DashboardShell({ children, title, description, action }: { children: React.ReactNode; title: string; description: string; action?: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="dashboard-app">
    <aside className="dashboard-sidebar">
      <BrandMark />
      <div className="sidebar-workspace"><span className="workspace-avatar">J</span><span><b>Joon&apos;s workspace</b><small>Personal workspace</small></span><i>⌄</i></div>
      <nav className="dashboard-nav">{nav.map(item => <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""}><span>{item.icon}</span>{item.label}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-tip"><SparkIcon/><p><b>오늘의 팁</b><br/>좋은 문서는 다음 행동을 알려줘요.</p></div><div className="sidebar-user"><span className="user-avatar">J</span><span><b>Joon Kim</b><small>Free plan</small></span><button aria-label="더 보기">···</button></div></div>
    </aside>
    <main className="dashboard-content"><header className="dashboard-mobile-header"><BrandMark/><button className="mobile-menu">☰</button></header><div className="dashboard-heading"><div><span className="eyebrow">MY WORKSPACE</span><h1>{title}</h1><p>{description}</p></div>{action}</div>{children}</main>
  </div>;
}

export function TrendIcon({ up = true }: { up?: boolean }) { return <span className={`trend-icon ${up ? "is-up" : "is-down"}`}>{up ? "↗" : "↘"}</span>; }
