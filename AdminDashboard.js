import { BUNDLE_PLANS, OWNER_STATS } from "../data/constants";

export default function AdminDashboard({ onBack }) {
  const { totalRevenue, totalUsers, activeToday, bundlesSold, topBundle, growth, bundleUserCounts } = OWNER_STATS;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", maxWidth: 520, margin: "0 auto", paddingBottom: 48 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0E1520 0%, #111118 100%)",
        padding: "44px 24px 30px", borderBottom: "1px solid #18182A",
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", color: "#00C9A7",
          cursor: "pointer", fontSize: 14, marginBottom: 20,
          padding: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
        }}>← Back</button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, boxShadow: "0 8px 24px rgba(0,201,167,0.25)",
          }}>👑</div>
          <div>
            <h2 style={{ color: "#fff", fontFamily: "'Playfair Display', serif", margin: 0, fontSize: 24, fontWeight: 900 }}>
              Owner Dashboard
            </h2>
            <p style={{ color: "#3A3A45", fontSize: 13, margin: 0 }}>Let's Talk · Revenue Overview</p>
          </div>
        </div>

        {/* Revenue hero */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,201,167,0.12), rgba(79,142,247,0.08))",
          border: "1px solid rgba(0,201,167,0.25)", borderRadius: 22, padding: "26px", textAlign: "center",
        }}>
          <p style={{ color: "#00C9A7", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 700 }}>
            Total Revenue Earned
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 46, margin: 0, fontWeight: 900, letterSpacing: "-1px" }}>
            ${totalRevenue.toLocaleString()}
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
            <span style={{ background: "rgba(0,201,167,0.15)", color: "#00C9A7", fontSize: 13, fontWeight: 700, padding: "4px 14px", borderRadius: 20 }}>
              ↑ {growth} this month
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Total Users",   value: totalUsers.toLocaleString(),   icon: "👥", color: "#4F8EF7" },
            { label: "Active Today",  value: activeToday.toLocaleString(),  icon: "🟢", color: "#00C9A7" },
            { label: "Bundles Sold",  value: bundlesSold.toLocaleString(),  icon: "📦", color: "#A855F7" },
            { label: "Top Bundle",    value: topBundle,                      icon: "🔥", color: "#F59E0B" },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              background: "#111118", border: "1px solid #1C1C2A",
              borderRadius: 18, padding: "20px 18px",
              animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{stat.icon}</div>
              <div style={{ color: stat.color, fontWeight: 800, fontSize: 24, fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div style={{ color: "#3A3A45", fontSize: 12, marginTop: 5, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bundle breakdown */}
        <div style={{ background: "#111118", border: "1px solid #1C1C2A", borderRadius: 22, padding: "22px 20px", marginBottom: 16 }}>
          <h3 style={{ color: "#fff", margin: "0 0 18px", fontSize: 16, fontWeight: 700 }}>Revenue by Bundle</h3>
          {BUNDLE_PLANS.map((plan, i) => {
            const users = bundleUserCounts[i];
            const rev   = (users * plan.price).toFixed(2);
            const pct   = Math.round((users / Math.max(...bundleUserCounts)) * 100);
            return (
              <div key={plan.id} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, alignItems: "center" }}>
                  <span style={{ color: "#ccc", fontSize: 14, fontWeight: 600 }}>{plan.emoji} {plan.name}</span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: plan.color, fontWeight: 800, fontSize: 15 }}>${rev}</span>
                    <span style={{ color: "#2E2E3A", fontSize: 11, marginLeft: 6 }}>{users} users</span>
                  </div>
                </div>
                <div style={{ height: 7, background: "#18182A", borderRadius: 6 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${plan.color}, ${plan.color}99)`, borderRadius: 6 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* How you earn */}
        <div style={{ background: "#111118", border: "1px solid #1C1C2A", borderRadius: 22, padding: "22px 20px" }}>
          <h3 style={{ color: "#fff", margin: "0 0 18px", fontSize: 16, fontWeight: 700 }}>💡 How You Earn</h3>
          {[
            { step: "1", text: "User opens Let's Talk",          detail: "Login screen loads instantly",                  color: "#00C9A7" },
            { step: "2", text: "User picks a bundle",             detail: "4 tiers — all priced by you",                  color: "#4F8EF7" },
            { step: "3", text: "Mobile carrier charges them",     detail: "Deducted from their airtime / data wallet",     color: "#A855F7" },
            { step: "4", text: "Revenue lands in your account",   detail: "You earn per bundle sold, recurring monthly",   color: "#F59E0B" },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: `${s.color}22`, border: `1.5px solid ${s.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color, fontWeight: 800, fontSize: 13, flexShrink: 0,
              }}>{s.step}</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{s.text}</div>
                <div style={{ color: "#3A3A45", fontSize: 13, marginTop: 3 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
