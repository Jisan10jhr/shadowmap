
import "./App.css";
import FootprintGraph from "./graph/FootprintGraph";

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">S</span>
          <span>ShadowMap</span>
        </div>

        <nav>
          <a href="#overview">Overview</a>
          <a href="#how-it-works">How it works</a>
          <a href="#privacy">Privacy</a>
        </nav>

        <span className="header-status">EDUCATIONAL DEMO</span>
      </header>

      <main className="dashboard" id="overview">
        <section className="welcome-panel">
          <p className="eyebrow">YOUR DIGITAL WORLD, MADE VISIBLE</p>
          <h1>Every connection tells a story.</h1>
          <p className="welcome-copy">
            Discover how ordinary pieces of online information can connect
            to reveal a bigger picture of your digital footprint.
          </p>
          <a className="primary-button" href="#footprint-graph">
            Explore the experience <span>→</span>
          </a>
        </section>

        <section className="map-preview" id="footprint-graph">
          <div className="preview-heading">
            <div>
              <p className="eyebrow">INTERACTIVE EXPLORATION</p>
              <h2>Explore a digital footprint</h2>
            </div>
            <span className="demo-label">FICTIONAL DATA</span>
          </div>

          <p className="welcome-copy">
            Move the nodes around and explore how different information
            categories connect to a fictional identity.
          </p>

          <FootprintGraph />

          <p className="preview-note">
            Educational demonstration only. No real personal data is used.
          </p>
        </section>

        <section className="info-grid" id="how-it-works">
          <article className="info-card">
            <span className="card-number">01</span>
            <h2>Explore connections</h2>
            <p>
              See how separate information points can relate to one another.
            </p>
          </article>

          <article className="info-card">
            <span className="card-number">02</span>
            <h2>Try what-if scenarios</h2>
            <p>
              Learn how adding or removing information changes a fictional
              digital footprint.
            </p>
          </article>

          <article className="info-card" id="privacy">
            <span className="card-number">03</span>
            <h2>Understand privacy</h2>
            <p>
              Discover practical ways to make informed choices about what
              you share online.
            </p>
          </article>
        </section>

        <footer className="site-footer">
  <p>ShadowMap · Built for digital privacy awareness.</p>
  <p>Fictional examples. Privacy-first learning.</p>

  <p className="creator-credit">
    Created with purpose by{" "}
    <a
      href="https://github.com/Jisan10jhr"
      target="_blank"
      rel="noopener noreferrer"
    >
      MD JISAN HOSSAN RIMON
    </a>
  </p>

  <p className="creator-watermark">
    © 2026 MD JISAN HOSSAN RIMON · ShadowMap
  </p>
</footer>
      </main>
    </div>
  );
}

export default App;

