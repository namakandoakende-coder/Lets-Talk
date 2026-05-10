export default function SplashScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 60% 40%, #0D1A2A 0%, #0A0A0F 70%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ animation: "pulse 2.2s infinite ease-in-out", marginBottom: 28 }}>
        <div style={{
          width: 108, height: 108, borderRadius: "32px",
          background: "linear-gradient(135deg, #00C9A7 0%, #4F8EF7 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 52, animation: "ripple 2.2s infinite",
          boxShadow: "0 20px 60px rgba(0,201,167,0.3)",
        }}>💬</div>
      </div>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 46, fontWeight: 900, color: "#ffffff",
        margin: 0, animation: "fadeUp 0.9s ease 0.2s both",
        letterSpacing: "-1.5px",
      }}>Let's Talk</h1>
      <p style={{
        color: "#00C9A7", fontWeight: 500,
        fontSize: 13, letterSpacing: 4,
        marginTop: 10, animation: "fadeUp 0.9s ease 0.45s both",
        textTransform: "uppercase",
      }}>Connect. Chat. Thrive.</p>
    </div>
  );
}
