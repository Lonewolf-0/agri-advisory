function AuthShell({
  eyebrow,
  title,
  subtitle,
  asideTitle,
  asideSubtitle,
  children,
  footer,
}) {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-hero">
          <div className="auth-hero__overlay" />
          <div className="auth-hero__content">
            <p className="auth-hero__eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="auth-hero__subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-card">
            <div className="auth-card__avatar" aria-hidden="true">
              <span>AG</span>
            </div>

            <p className="auth-card__switch">{asideSubtitle}</p>
            <h2>{asideTitle}</h2>

            <div className="auth-form">{children}</div>

            {footer}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthShell;
