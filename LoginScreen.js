import { useState } from "react";

export default function LoginScreen({ onLogin, onAdmin }) {
  const [form, setForm] = useState({ name: "", phone: "" });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    onLogin(form);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0F",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: 390, animation: "fadeUp 0.6s ease" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 76, height: 76, borderRadius: 22,
            background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, margin: "0 auto 18px",
            boxShadow: "0 12px 36px rgba(0,201,167,0.25)",
          }}>💬</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34, color: "#fff", margin: 0, letterSpacing: "-0.5px",
          }}>Let's Talk</h1>
          <p style={{ color: "#50505A", fontSize: 14, margin: "8px 0 0", fontWeight: 400 }}>
            Sign in to start chatting
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: "#111118", borderRadius: 24,
          padding: "28px 26px", border: "1px solid #1C1C2A",
        }}>
          <label style={{ color: "#666", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>
            Your Name
          </label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Amara Kone"
            style={{
              width: "100%", marginTop: 8, marginBottom: 20,
              padding: "14px 16px", background: "#0A0A0F",
              border: "1.5px solid #1C1C2A", borderRadius: 14,
              color: "#fff", fontSize: 15, transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <label style={{ color: "#666", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>
            Phone Number
          </label>
          <input
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+1 234 567 8900"
            type="tel"
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              width: "100%", marginTop: 8, marginBottom: 28,
              padding: "14px 16px", background: "#0A0A0F",
              border: "1.5px solid #1C1C2A", borderRadius: 14,
              color: "#fff", fontSize: 15, transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            onClick={handleSubmit}
            className="btn-main"
            style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
              border: "none", borderRadius: 14, color: "#fff",
              fontSize: 16, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              boxShadow: "0 8px 24px rgba(0,201,167,0.25)",
            }}>
            Continue →
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#2E2E3A", fontSize: 12, marginTop: 14 }}>
          By continuing you agree to our Terms &amp; Privacy Policy
        </p>
        <button
          onClick={onAdmin}
          style={{
            display: "block", margin: "6px auto 0",
            background: "none", border: "none", color: "#2E2E3A",
            fontSize: 12, cursor: "pointer", textDecoration: "underline",
            fontFamily: "'DM Sans', sans-serif",
          }}>
          Owner Dashboard
        </button>
      </div>
    </div>
  );
}
