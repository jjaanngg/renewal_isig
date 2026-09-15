import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/home" className="brand-mark" aria-label="ISIG 홈">
      <span className="brand-mark__symbol">i</span>
      {!compact && <span className="brand-mark__word">ISIG</span>}
    </Link>
  );
}

export function AppShell({
  children,
  eyebrow,
  title,
  description,
  action,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <BrandMark />
        <div className="app-header__right">
          <Link href="/home" className="app-header__link">내 문서</Link>
          <LogoutButton />
        </div>
      </header>
      <main className="app-main">
        {(eyebrow || title || description || action) && (
          <div className="page-heading">
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h1>{title}</h1>}
              {description && <p className="page-heading__desc">{description}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export function StepRail({ active = 1 }: { active?: number }) {
  const steps = ["업무 주제", "대화하기", "문서 완성"];
  return (
    <div className="step-rail" aria-label="진행 단계">
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <div className={`step-rail__item ${number <= active ? "is-active" : ""}`} key={step}>
            <span>{number}</span>
            <b>{step}</b>
          </div>
        );
      })}
    </div>
  );
}

export function ArrowUpIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M12 5l-7 7M12 5l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ArrowRightIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SparkIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" fill="currentColor" /></svg>;
}

export function EmptyState({ onStart }: { onStart?: () => void }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon"><SparkIcon /></div>
      <h2>아직 만든 문서가 없어요</h2>
      <p>첫 업무를 대화로 정리해보세요.<br />복잡했던 인수인계가 한 장의 문서가 됩니다.</p>
      {onStart && <button className="button button--primary" onClick={onStart}>첫 문서 만들기 <ArrowRightIcon /></button>}
    </div>
  );
}
