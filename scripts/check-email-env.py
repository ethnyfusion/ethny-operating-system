from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".env.local"
REQUIRED = [
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
    "RESEND_TEST_EMAIL",
    "ADMIN_SECRET",
    "NEXT_PUBLIC_SITE_URL",
]


def parse_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values

    for raw_line in path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


if __name__ == "__main__":
    env = parse_env(ENV_PATH)

    if not ENV_PATH.exists():
        print(".env.local missing")
        raise SystemExit(1)

    missing = [key for key in REQUIRED if not env.get(key)]
    for key in REQUIRED:
        print(f"{key}: {'set' if env.get(key) else 'missing'}")

    from_email = env.get("RESEND_FROM_EMAIL", "")
    if from_email and "@ethny.be" not in from_email:
        print("warning: RESEND_FROM_EMAIL does not appear to use @ethny.be")

    if missing:
        print("missing required vars: " + ", ".join(missing))
        raise SystemExit(1)

    print("email env looks ready")
