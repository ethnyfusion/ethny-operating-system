export interface EmailTemplate {
  subject: string;
  preview: string;
  html: string;
  text: string;
}

export function emailLayout(title: string, body: string, preview: string) {
  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;background:#f4f0e7;color:#201b18;font-family:Arial,sans-serif">
    <span style="display:none">${preview}</span>
    <main style="max-width:620px;margin:0 auto;padding:36px 20px">
      <p style="letter-spacing:.18em;text-transform:uppercase;color:#722f37;font-size:12px">Vinaria · by Ethny</p>
      <section style="background:#fffdf8;border:1px solid #ded6c6;border-radius:16px;padding:32px">
        <h1 style="font-family:Georgia,serif;font-weight:500;font-size:30px;margin:0 0 20px">${title}</h1>
        ${body}
      </section>
      <p style="font-size:12px;color:#746b62;margin-top:20px">Vinaria sélectionne et coordonne chaque commande. L’abus d’alcool est dangereux pour la santé.</p>
    </main>
  </body>
</html>`;
}
