import { useMemo, useState } from "react";
import {
  hydrateDemoVariables,
  useLocalPreviewAssets,
} from "./demoVariables";
import { emailPreviewRegistry } from "./emailRegistry";

type EmailPreviewAppProps = {
  renderEmail: (node: JSX.Element) => string;
};

export function EmailPreviewApp({ renderEmail }: EmailPreviewAppProps) {
  const [selectedId, setSelectedId] = useState(emailPreviewRegistry[0].id);
  const [showDemoData, setShowDemoData] = useState(true);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  const selected = emailPreviewRegistry.find((item) => item.id === selectedId)
    ?? emailPreviewRegistry[0];

  const html = useMemo(() => {
    const rawMarkup = renderEmail(<selected.Component />);
    const withLocalAssets = useLocalPreviewAssets(rawMarkup);
    return showDemoData ? hydrateDemoVariables(withLocalAssets) : withLocalAssets;
  }, [renderEmail, selected, showDemoData]);

  const srcDoc = `<!doctype html>${html}`;

  return (
    <div className="preview-shell">
      <aside className="preview-sidebar">
        <div className="brand-block">
          <img
            src="/email-assets/logo/ethny-logo-cercle-brise-horizontal.svg"
            alt="Ethny Nomad Cuisine"
          />
          <p>Email Design System</p>
        </div>

        <div className="toolbar">
          <button
            type="button"
            className={showDemoData ? "active" : ""}
            onClick={() => setShowDemoData((value) => !value)}
          >
            Donnees exemple
          </button>
          <button
            type="button"
            className={viewport === "desktop" ? "active" : ""}
            onClick={() => setViewport("desktop")}
          >
            Desktop
          </button>
          <button
            type="button"
            className={viewport === "mobile" ? "active" : ""}
            onClick={() => setViewport("mobile")}
          >
            Mobile
          </button>
        </div>

        <nav className="template-list" aria-label="Templates email">
          {emailPreviewRegistry.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === selected.id ? "selected" : ""}
              onClick={() => setSelectedId(item.id)}
            >
              <span>{item.label}</span>
              <small>{item.category}</small>
            </button>
          ))}
        </nav>
      </aside>

      <main className="preview-main">
        <header className="preview-header">
          <div>
            <p>{selected.category}</p>
            <h1>{selected.label}</h1>
            <span>{selected.subject}</span>
          </div>
          <div className="objective">{selected.objective}</div>
        </header>

        <section className={`frame-wrap ${viewport}`}>
          <iframe
            title={`Apercu ${selected.label}`}
            srcDoc={srcDoc}
            sandbox=""
          />
        </section>
      </main>
    </div>
  );
}
