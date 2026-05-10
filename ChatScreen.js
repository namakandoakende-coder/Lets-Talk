import { useState, useRef, useEffect } from "react";
import { DEMO_CONTACTS, DEMO_MESSAGES, AUTO_REPLIES } from "../data/constants";

export default function ChatScreen({ user, bundle, onAdmin, onUpgrade }) {
  const [activeChat, setActiveChat]   = useState(null);
  const [messages, setMessages]       = useState(DEMO_MESSAGES);
  const [inputMsg, setInputMsg]       = useState("");
  const [msgCount, setMsgCount]       = useState(0);
  const [showAlert, setShowAlert]     = useState(false);
  const [tab, setTab]                 = useState("chats");
  const msgEndRef                     = useRef(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    if (msgCount >= bundle.messages) { setShowAlert(true); return; }

    const newMsg = {
      id: Date.now(), from: "me", text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputMsg("");
    setMsgCount(c => c + 1);

    // Simulated reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1, from: "them",
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, reply]);
    }, 1200);
  };

  const usagePct = Math.min((msgCount / bundle.messages) * 100, 100);
  const usageColor = usagePct > 80 ? "#EF4444" : bundle.color;

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0F",
      display: "flex", flexDirection: "column",
      maxWidth: 520, margin: "0 auto",
    }}>

      {/* Bundle-exhausted modal */}
      {showAlert && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
          zIndex: 200, display: "flex", alignItems: "center",
          justifyContent: "center", padding: 24,
        }}>
          <div style={{
            background: "#111118", border: "1.5px solid #F59E0B",
            borderRadius: 24, padding: 30, textAlign: "center",
            maxWidth: 320, width: "100%", animation: "fadeUp 0.3s ease",
          }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>📦</div>
            <h3 style={{ color: "#fff", fontFamily: "'Playfair Display', serif", margin: "0 0 10px", fontSize: 22 }}>
              Bundle Limit Reached
            </h3>
            <p style={{ color: "#666", fontSize: 14, margin: "0 0 22px", lineHeight: 1.6 }}>
              You've used all <strong style={{ color: "#F59E0B" }}>{bundle.messages.toLocaleString()}</strong> messages
              in your <strong style={{ color: "#F59E0B" }}>{bundle.name}</strong> plan.
            </p>
            <button
              onClick={() => { setShowAlert(false); onUpgrade(); }}
              style={{
                width: "100%", padding: 14,
                background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
                border: "none", borderRadius: 14, color: "#fff",
                fontWeight: 700, cursor: "pointer", marginBottom: 10,
                fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              }}>Upgrade Bundle</button>
            <button
              onClick={() => setShowAlert(false)}
              style={{ background: "none", border: "none", color: "#3A3A45", cursor: "pointer", fontSize: 14 }}>
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{
        background: "#111118", borderBottom: "1px solid #18182A",
        padding: "16px 20px 14px", position: "sticky", top: 0, zIndex: 10,
      }}>
        {activeChat ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setActiveChat(null)}
              style={{ background: "none", border: "none", color: "#00C9A7", cursor: "pointer", fontSize: 22, padding: 0 }}>←</button>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: `linear-gradient(135deg, ${activeChat.color}, ${activeChat.color}66)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 13, fontWeight: 700,
            }}>{activeChat.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{activeChat.name}</div>
              <div style={{ color: activeChat.status === "online" ? "#00C9A7" : "#3A3A45", fontSize: 12, fontWeight: 500 }}>
                {activeChat.status}
              </div>
            </div>
            <div style={{ display: "flex", gap: 18, fontSize: 22 }}>
              <span style={{ cursor: "pointer" }}>📞</span>
              <span style={{ cursor: "pointer" }}>📹</span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", margin: 0, fontSize: 26, fontWeight: 900 }}>
              Let's Talk
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                background: `${bundle.color}18`, border: `1px solid ${bundle.color}55`,
                borderRadius: 20, padding: "5px 13px", fontSize: 12,
                color: bundle.color, fontWeight: 600,
              }}>{bundle.emoji} {bundle.name}</div>
              <div onClick={onAdmin} style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer",
              }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Active Chat ── */}
      {activeChat ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start", animation: "fadeUp 0.2s ease" }}>
                <div style={{
                  maxWidth: "76%",
                  background: msg.from === "me" ? "linear-gradient(135deg, #00C9A7, #4F8EF7)" : "#16161F",
                  borderRadius: msg.from === "me" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                  padding: "11px 15px",
                  boxShadow: msg.from === "me" ? "0 4px 16px rgba(0,201,167,0.2)" : "none",
                }}>
                  <p style={{ margin: 0, color: "#fff", fontSize: 15, lineHeight: 1.55 }}>{msg.text}</p>
                  <p style={{ margin: "5px 0 0", color: msg.from === "me" ? "rgba(255,255,255,0.55)" : "#3A3A45", fontSize: 11, textAlign: "right" }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={msgEndRef} />
          </div>

          {/* Usage bar */}
          <div style={{ padding: "8px 18px 6px", background: "#0D0D14", borderTop: "1px solid #14141D" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "#333", fontSize: 11 }}>Bundle usage</span>
              <span style={{ color: usagePct > 80 ? "#EF4444" : "#333", fontSize: 11, fontWeight: 600 }}>
                {msgCount} / {bundle.messages.toLocaleString()} msgs
              </span>
            </div>
            <div style={{ height: 4, background: "#1A1A24", borderRadius: 4 }}>
              <div style={{ height: "100%", width: `${usagePct}%`, background: usageColor, borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px 16px", background: "#111118", borderTop: "1px solid #18182A", display: "flex", gap: 10, alignItems: "center" }}>
            <input
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1, background: "#0A0A0F", border: "1.5px solid #1C1C2A",
                borderRadius: 24, padding: "12px 18px", color: "#fff",
                fontSize: 15, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              }}
            />
            <button onClick={sendMessage} style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0, boxShadow: "0 6px 20px rgba(0,201,167,0.3)",
            }}>➤</button>
          </div>
        </div>
      ) : (
        /* ── Contact List ── */
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", padding: "12px 20px 0", gap: 28, borderBottom: "1px solid #18182A" }}>
            {["chats", "calls", "status"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: "none", border: "none",
                color: tab === t ? "#00C9A7" : "#3A3A45",
                fontSize: 14, fontWeight: tab === t ? 700 : 500,
                cursor: "pointer", paddingBottom: 12,
                borderBottom: tab === t ? "2.5px solid #00C9A7" : "2.5px solid transparent",
                textTransform: "capitalize", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s",
              }}>{t}</button>
            ))}
          </div>

          {tab === "chats" && (
            <>
              <div style={{ padding: "14px 18px" }}>
                <div style={{ background: "#111118", border: "1px solid #18182A", borderRadius: 14, padding: "11px 16px", display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ color: "#3A3A45" }}>🔍</span>
                  <input placeholder="Search chats..." style={{ flex: 1, background: "none", border: "none", color: "#fff", outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                </div>
              </div>
              {DEMO_CONTACTS.map((c, i) => (
                <div key={c.id} className="contact-row" onClick={() => setActiveChat(c)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 20px", cursor: "pointer", transition: "background 0.15s",
                    animation: `fadeUp 0.35s ease ${i * 0.07}s both`,
                  }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${c.color}, ${c.color}66)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 14,
                    }}>{c.avatar}</div>
                    {c.status === "online" && (
                      <div style={{ position: "absolute", bottom: 2, right: 1, width: 12, height: 12, borderRadius: "50%", background: "#00C9A7", border: "2.5px solid #0A0A0F" }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                      <span style={{ color: "#2E2E3A", fontSize: 12 }}>{c.time}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                      <span style={{ color: "#3A3A45", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "82%" }}>{c.lastMsg}</span>
                      {c.unread > 0 && (
                        <span style={{
                          background: "#00C9A7", color: "#000", fontSize: 11, fontWeight: 800,
                          minWidth: 21, height: 21, borderRadius: 11,
                          display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
                        }}>{c.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {tab !== "chats" && (
            <div style={{ textAlign: "center", padding: "70px 24px", color: "#28282F" }}>
              <div style={{ fontSize: 54, marginBottom: 14 }}>{tab === "calls" ? "📞" : "🔵"}</div>
              <p style={{ fontSize: 15, margin: 0 }}>No {tab} yet</p>
            </div>
          )}
        </div>
      )}

      {!activeChat && (
        <div style={{
          position: "fixed", bottom: 28,
          right: "max(24px, calc(50vw - 236px))",
          width: 58, height: 58, borderRadius: "50%",
          background: "linear-gradient(135deg, #00C9A7, #4F8EF7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,201,167,0.35)", transition: "transform 0.2s",
        }}>✏️</div>
      )}
    </div>
  );
}
