import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(value) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: value }),
    });
    if (res.ok) {
      router.push("/");
    } else {
      setErr("That's not it — try again.");
      setPin("");
    }
  }

  function onChange(e) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(v);
    setErr("");
    if (v.length === 6) submit(v);
  }

  return (
    <div className="loginwrap">
      <div className="logincard">
        <h1>
          Kris Pierce<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p>Enter your PIN to open the command centre.</p>
        <input
          className="pin"
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={onChange}
          placeholder="••••••"
          aria-label="PIN"
        />
        <div className="loginerr">{err}</div>
      </div>
    </div>
  );
}
