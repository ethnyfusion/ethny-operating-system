export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark" aria-label="Vinaria by Ethny">
      <span className="brand-vine-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img">
          <path className="brand-v-stem" d="M13 10 L31 54 L51 10" />
          <path className="brand-vine-shoot" d="M32 51 C34 39 34 30 30 22 C28 18 27 14 30 10" />
          <path className="brand-vine-curl" d="M32 28 C42 25 43 13 35 13 C29 13 28 22 36 22" />
          <path className="brand-vine-leaf left" d="M29 25 C19 18 14 22 14 31 C23 32 28 30 29 25Z" />
          <path className="brand-vine-leaf right" d="M36 36 C47 30 52 35 51 44 C42 44 37 41 36 36Z" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-wordmark">
          <strong>VINARIA</strong>
          <small>La cave par Ethny</small>
        </span>
      )}
      {compact && <strong>VINARIA</strong>}
    </span>
  );
}
