import Link from "next/link";
import { useRouter } from "next/router";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/today", label: "Today" },
  { href: "/caregiver", label: "🌿 Caregiver" },
];

export default function Layout({ children }) {
  const router = useRouter();
  const today = new Date().toLocaleDateString("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="shell">
      <header className="topbar">
        <div className="wordmark">
          Kris Pierce<span>.</span>
        </div>
        <nav className="nav">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={router.pathname === l.href ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="spacer" />
        <div className="datebadge">{today} · Brisbane</div>
      </header>
      {children}
      <div className="footer">Kris Pierce Command Centre · data lives in your own n8n · updated live</div>
    </div>
  );
}
