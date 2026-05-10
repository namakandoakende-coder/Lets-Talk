import { useState } from "react";
import { BUNDLE_PLANS } from "../data/constants";

export default function BundleScreen({ user, onSelect }) {
  const [chosen, setChosen] = useState(null);

  const handlePick = (plan) => {
    setChosen(plan);
    setTimeout(() => onSelect(plan), 500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 48 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #111118 0%, #0A0A0F 100%)",
        padding: "44px 24px 30px", textAlign: "center",
      }}>
        <p style={{ color: "#00C9A7", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: 0, fontWeight: 600 }}>
          Welcome, {user?.name}!
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          color: "#fff", fontSize: 30, margin: "10px 0 6px", letterSpacing: "-0.5px",
        }}>Choose Your Bundle</h2>
        <p style={{ color: "#484855", fontSize: 14, margin: 0 }}>
          Charged to your mobile carrier · No card needed
        </p>
      </div>

      {/* Plans */}
      <div style={{ padding: "0 18px", maxWidth: 480, margin: "0 auto" }}>
        {BUNDLE_PLANS.map((plan, i) => (
          <div
            key={plan.id}
            className="bundle-card"
            onClick={() => handlePick(plan)}
            style={{
              background: chosen?.id === plan.id
                ? `linear-gradient(135deg, ${plan.color}20, ${plan.color}0A)`
                : "#111118",
              border: `1.5px solid ${chosen?.id === plan.id ? plan.color : "#1C1C2A"}`,
              borderRadius: 20, padding: "20px 22px", marginBottom: 14,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
              animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              transition: "all 0.25s ease",
            }}>
            <div style={{
              width: 58, height: 58, borderRadius: 18,
              background: `${plan.color}1A`, fontSize: 28,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, border: `1px solid ${plan.color}30`,
            }}>{plan.emoji}</div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>{plan.name}</span>
                {plan.id === "standard" && (
                  <span style={{
                    background: plan.color, color: "#000",
                    fontSize: 10, fontWeight: 800,
                    padding: "3px 9px", borderRadius: 20, letterSpacing: 0.5,
                  }}>POPULAR</span>
                )}
              </div>
              <p style={{ color: "#484855", fontSize: 13, margin: "5px 0 0" }}>
                {plan.data} data · {plan.messages.toLocaleString()} messages/mo
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ color: plan.color, fontWeight: 800, fontSize: 22 }}>${plan.price}</div>
              <div style={{ color: "#30303A", fontSize: 11 }}>/ month</div>
            </div>
          </div>
        ))}

        <div style={{
          background: "#0D0D14", border: "1px dashed #1C1C2A",
          borderRadius: 16, padding: "16px 20px", textAlign: "center", marginTop: 6,
        }}>
          <p style={{ color: "#38383F", fontSize: 13, margin: 0 }}>
            💡 Bundles auto-renew monthly. Cancel anytime from settings.
          </p>
        </div>
      </div>
    </div>
  );
}
