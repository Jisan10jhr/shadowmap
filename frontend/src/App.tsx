
import "./App.css";

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
          <a className="primary-button" href="#how-it-works">
            Explore the experience <span>→</span>
          </a>
        </section>

        <section className="map-preview" aria-label="Illustrative digital footprint">
          <div className="preview-heading">
            <div>
              <p className="eyebrow">CONNECTION PREVIEW</p>
              <h2>A digital footprint</h2>
            </div>
            <span className="demo-label">FICTIONAL DATA</span>
          </div>

          <div className="constellation">
            <span className="orbit orbit-one"></span>
            <span className="orbit orbit-two"></span>
            <div className="map-node center-node">YOU</div>
            <div className="map-node node-one">Social</div>
            <div className="map-node node-two">Interests</div>
            <div className="map-node node-three">Activities</div>
            <div className="map-node node-four">Public info</div>
          </div>

          <p className="preview-note">
            An illustrative example — not a real person's data.
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
        </footer>
      </main>
    </div>
  );
}

export default App;
