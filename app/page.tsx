export default function Page() {
  return (
    <main
      style={{
        background: "#f5efe4",
        color: "#18382c",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        minHeight: "100vh",
        padding: 32,
      }}
    >
      <section
        style={{
          background: "#fffaf2",
          border: "1px solid #ded2bf",
          borderRadius: 12,
          margin: "80px auto 0",
          maxWidth: 760,
          padding: 32,
        }}
      >
        <p
          style={{
            color: "#5E8D7A",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.6,
            margin: "0 0 12px",
            textTransform: "uppercase",
          }}
        >
          Ethny Nomad Cuisine
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 44,
            lineHeight: 1,
            margin: "0 0 14px",
          }}
        >
          Ethny Email Dashboard
        </h1>
        <p style={{ color: "rgba(42,42,42,.74)", fontSize: 17, lineHeight: "26px" }}>
          Module interne pour gerer les campagnes, previews, brouillons HTML et
          tests Resend.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
          <a href="/email" style={primaryLink}>
            Ouvrir le dashboard
          </a>
          <a href="/email/editor" style={secondaryLink}>
            Ouvrir l'editeur
          </a>
        </div>
      </section>
    </main>
  );
}

const primaryLink = {
  background: "#18382c",
  borderRadius: 10,
  color: "#fffaf2",
  display: "inline-flex",
  fontWeight: 800,
  padding: "13px 16px",
  textDecoration: "none",
};

const secondaryLink = {
  border: "1px solid #18382c",
  borderRadius: 10,
  color: "#18382c",
  display: "inline-flex",
  fontWeight: 800,
  padding: "13px 16px",
  textDecoration: "none",
};
