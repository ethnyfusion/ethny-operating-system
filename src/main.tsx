import React from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { EmailPreviewApp } from "./preview/EmailPreviewApp";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EmailPreviewApp renderEmail={renderToStaticMarkup} />
  </React.StrictMode>,
);
