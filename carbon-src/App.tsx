import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  Command,
  Copy,
  Cpu,
  FileText,
  FlaskConical,
  Home,
  Mail
} from 'lucide-react';
import { CarbonManifoldCanvas, ManifoldMode } from './components/CarbonManifoldCanvas';
import {
  ArxivMark,
  GithubMark,
  NeuripsMark,
  SimpleSvgIcon,
  TECH_STACK_ICONS
} from './components/BrandIcons';
import { MleDojoSection } from './components/MleDojoSection';
import { FileBotSection } from './components/FileBotSection';
import { CinemaDossierSection } from './components/CinemaDossierSection';
import { CommandPalette } from './components/CommandPalette';
import { assetUrl } from './assetUrl';

const CAREER_ENTRIES = [
  {
    period: 'May 2025 — Aug 2025',
    org: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer Intern',
    summary:
      'Automated AWS region build processes with a Python telemetry package backed by 100% CI/CD test coverage, and eliminated manual Ubuntu AMI validation via end-to-end Go release pipelines and AWS CLI verification.',
    metric: 'Python · Go · CI/CD'
  },
  {
    period: 'Aug 2024 — Present',
    org: 'Georgia Institute of Technology',
    role: 'Head Graduate Teaching Assistant',
    summary:
      'Directing 30 graduate teaching assistants across all course sections serving 1,500 students while maintaining automated grading pipelines and online instructional infrastructure.',
    metric: '30 TAs · 1,500 Students'
  },
  {
    period: 'Sept 2022 — June 2024',
    org: 'Richmond School District',
    role: 'Secondary Mathematics Educator',
    summary:
      'Led mathematics curriculum architecture from Math 8 through Calculus 12 and engineered district-aligned proficiency assessment tooling.',
    metric: 'Math 8 — Calculus 12'
  },
  {
    period: 'Sept 2019 — Dec 2021',
    org: 'University of British Columbia',
    role: 'Undergraduate Teaching Assistant',
    summary:
      'Taught Algorithms and Data Structures laboratories and office hours across 7 consecutive academic terms for cohorts of 300+ undergraduates.',
    metric: '7 Semesters · 300+ Cohort'
  }
];

const ADDITIONAL_ARTIFACTS = [
  {
    year: '2024 · Distributed Systems & ML',
    title: 'US Property Price Distributed Visual Analytics',
    desc: 'Consolidated and cleaned 1,000,000+ property records across multi-node Apache Spark DataFrames, coupling Random Forest, SVM, and Deep Neural Network price predictors to a live interactive D3.js + Django interface.',
    tags: ['PySpark (1M+ Rows)', 'D3.js', 'Deep Neural Networks', 'Django']
  },
  {
    year: '2024 · Natural Language Processing',
    title: 'Neural Misinformation Inference Engine',
    desc: 'Engineered Word2Vec semantic embeddings paired with Random Forest and Neural Network classifiers exceeding 90% validation accuracy, deployed as a real-time article verification web app.',
    tags: ['Word2Vec NLP', '>90% Accuracy', 'Neural Networks', 'Python']
  }
];

function formatAtlantaTime(): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());
  } catch {
    return 'EST';
  }
}

export const App: React.FC = () => {
  const [manifoldMode, setManifoldMode] = useState<ManifoldMode>('pomdp');
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [atlTime, setAtlTime] = useState<string>(() => formatAtlantaTime());

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 2600);
  }, []);

  const handleCopyEmail = useCallback(() => {
    const email = 'ianwong.gatech@gmail.com';
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => showToast('Copied ianwong.gatech@gmail.com'))
        .catch(() => showToast(email));
    } else {
      showToast(email);
    }
  }, [showToast]);

  // Live Atlanta Clock
  useEffect(() => {
    const id = window.setInterval(() => setAtlTime(formatAtlantaTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Scroll Spy + Header Blur
  useEffect(() => {
    const sections = ['home', 'research', 'systems', 'dossier', 'experience', 'contact'];
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ⌘K / Ctrl+K Shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'research', label: 'MLE-Dojo' },
    { id: 'systems', label: 'FileBot Nova' },
    { id: 'dossier', label: 'Dossier' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const marqueeItems = [...TECH_STACK_ICONS, ...TECH_STACK_ICONS];

  return (
    <>
      {toastMsg && (
        <div className="carbon-toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}

      {/* Top Instrument Navigation Bar */}
      <header className={`top-bar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="shell top-bar__inner">
          <a href="#home" className="brand-mark" aria-label="Ian Wong home">
            <span className="brand-mark__monogram" aria-hidden="true">
              IW
            </span>
            <span className="brand-mark__text">
              <span className="brand-mark__name">Ian Wong</span>
              <span className="brand-mark__role">ML Research · Native Systems</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary sections">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`desktop-nav__link ${activeNav === item.id ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="top-bar__telemetry">
            <div className="telemetry-clock" aria-label="Current time in Atlanta, Georgia">
              <span className="live-dot" aria-hidden="true" />
              <span>ATL {atlTime}</span>
            </div>

            <button
              id="top-command-trigger"
              type="button"
              className="cmd-trigger"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open quick actions menu"
            >
              <Command size={14} />
              <span>Actions</span>
              <span className="cmd-trigger__kbd">⌘K</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* ================================================================
            HERO STAGE: THREE.JS LIQUID CARBON MANIFOLD + EDITORIAL DISPLAY
            ================================================================ */}
        <section id="home" className="hero-stage">
          <CarbonManifoldCanvas mode={manifoldMode} />
          <div className="hero-vignette" aria-hidden="true" />

          <div className="shell hero-content">
            <div>
              <div className="hero-index-line">
                <span>Ian Shu-Hei Wong</span>
                <span className="hero-index-line__sep">/</span>
                <span>Georgia Tech MS CS (ML)</span>
                <span className="hero-index-line__sep">/</span>
                <span>NeurIPS 2025</span>
              </div>

              <h1 className="hero-headline">
                <span className="serif-italic">Autonomous</span> environments &amp;{' '}
                <span className="serif-italic">native</span> tools.
              </h1>

              <p className="hero-subcopy">
                Machine learning researcher and systems engineer building executable POMDP
                benchmarks for LLM agents (<strong>MLE-Dojo, NeurIPS 2025</strong>), zero-dependency{' '}
                <strong className="num">153 KB</strong> native desktop software (<strong>FileBot Nova</strong>),
                and automated cloud release infrastructure at <strong>AWS</strong>.
              </p>

              <div className="hero-cta-row">
                <a
                  id="hero-paper-cta"
                  href="https://arxiv.org/abs/2505.07782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ArxivMark size={16} />
                  <span>NeurIPS 2025 Paper</span>
                  <ArrowUpRight size={16} />
                </a>

                <a id="hero-systems-cta" href="#systems" className="btn-carbon">
                  <span>Try Live FileBot Sandbox</span>
                </a>

                <a
                  id="hero-cv-cta"
                  href={assetUrl('cv.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-carbon"
                >
                  <FileText size={16} />
                  <span>CV (PDF)</span>
                </a>
              </div>
            </div>

            {/* Interactive Three.js Shader Telemetry Controller */}
            <aside className="manifold-panel" aria-label="Interactive WebGL manifold telemetry">
              <div className="manifold-panel__header">
                <span className="manifold-panel__eyebrow">Latent Manifold · Three.js GLSL</span>
                <span className="manifold-panel__fps">200 Nodes · Interactive</span>
              </div>

              <div className="manifold-modes" role="group" aria-label="Shader topology mode">
                <button
                  id="mode-pomdp"
                  type="button"
                  className={`manifold-mode-btn ${manifoldMode === 'pomdp' ? 'is-active' : ''}`}
                  onClick={() => setManifoldMode('pomdp')}
                >
                  01 · POMDP
                </button>
                <button
                  id="mode-rollout"
                  type="button"
                  className={`manifold-mode-btn ${manifoldMode === 'rollout' ? 'is-active' : ''}`}
                  onClick={() => setManifoldMode('rollout')}
                >
                  02 · RL Wave
                </button>
                <button
                  id="mode-equilibrium"
                  type="button"
                  className={`manifold-mode-btn ${manifoldMode === 'equilibrium' ? 'is-active' : ''}`}
                  onClick={() => setManifoldMode('equilibrium')}
                >
                  03 · Geodesic
                </button>
              </div>

              <div className="manifold-stats">
                <div className="manifold-stat">
                  <span className="manifold-stat__val num">200+</span>
                  <span className="manifold-stat__lbl">Kaggle POMDP Tasks</span>
                </div>
                <div className="manifold-stat">
                  <span className="manifold-stat__val num">153 KB</span>
                  <span className="manifold-stat__lbl">macOS Native Client</span>
                </div>
                <div className="manifold-stat">
                  <span className="manifold-stat__val num">1,500</span>
                  <span className="manifold-stat__lbl">Students Led (Head TA)</span>
                </div>
                <div className="manifold-stat">
                  <span className="manifold-stat__val num">4.00</span>
                  <span className="manifold-stat__lbl">UBC Math &amp; Ed GPA</span>
                </div>
              </div>

              <p className="manifold-hint">
                <span>Touch or move pointer to perturb field</span>
                <span style={{ color: 'var(--jade)' }}>● 60fps GPU</span>
              </p>
            </aside>
          </div>

          {/* Authentic Institutional & Research Venue Vector Marks */}
          <div className="shell affiliation-strip">
            <div className="affiliation-strip__grid">
              <span className="affiliation-strip__label">
                Research, Industry &amp; Academic Lineage
              </span>

              <div className="affiliation-logos">
                <div className="affiliation-item" title="Georgia Institute of Technology">
                  <img src={assetUrl('assets/gatech-dark.svg')} alt="Georgia Tech" width="38" height="24" />
                  <span className="affiliation-item__caption">Georgia Tech</span>
                </div>

                <div className="affiliation-item" title="NeurIPS 2025 Main Track / Datasets & Benchmarks">
                  <NeuripsMark size={22} />
                  <span className="affiliation-item__caption">NeurIPS 2025</span>
                </div>

                <div className="affiliation-item" title="Amazon Web Services (SDE Intern)">
                  <img src={assetUrl('assets/aws-dark.svg')} alt="Amazon Web Services" width="42" height="25" />
                </div>

                <div className="affiliation-item" title="Stanford University (MLE-Dojo Co-Authors)">
                  <img src={assetUrl('assets/stanford-dark.svg')} alt="Stanford University" width="16" height="24" />
                  <span className="affiliation-item__caption">Stanford Co-Authored</span>
                </div>

                <div className="affiliation-item affiliation-item--ubc" title="University of British Columbia">
                  <img src={assetUrl('assets/ubc-dark.svg')} alt="University of British Columbia" width="96" height="22" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Authentic Technology Vector Marquee */}
        <div className="tech-marquee" aria-label="Technical stack">
          <div className="tech-marquee__track">
            {marqueeItems.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="tech-chip">
                <SimpleSvgIcon icon={item.icon} size={16} />
                <strong style={{ color: 'var(--ink-80)', fontWeight: 500 }}>{item.label}</strong>
                <span style={{ color: 'var(--ink-40)' }}>· {item.domain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Anchor alias for legacy #projects links */}
        <div id="projects" />

        {/* Section 01: NeurIPS 2025 MLE-Dojo Interactive Rollout */}
        <MleDojoSection />

        {/* Section 02: Alabaster Contrast — FileBot Nova Live Sandbox */}
        <FileBotSection />

        {/* Section 03: Atmospheric Dual-Video & Campus Dossier */}
        <CinemaDossierSection />

        {/* ================================================================
            SECTION 04: EXPERIENCE LEDGER & ADDITIONAL ENGINEERING ARTIFACTS
            ================================================================ */}
        <section id="experience" className="section-carbon" aria-labelledby="experience-heading">
          <div className="shell">
            <div className="section-kicker">
              <span>04 / Engineering &amp; Teaching Record</span>
              <span>·</span>
              <span>2019 — 2026</span>
            </div>

            <div className="section-header-split">
              <h2 id="experience-heading" className="section-title">
                Cloud pipelines and <span className="serif-italic">rigorous</span> classrooms.
              </h2>
              <p className="section-lead">
                Four institutions spanning cloud infrastructure engineering at AWS, graduate-scale
                autograding systems at Georgia Tech, and mathematics education.
              </p>
            </div>

            <div className="career-list">
              {CAREER_ENTRIES.map((row) => (
                <article key={`${row.org}-${row.period}`} className="career-row">
                  <div className="career-row__period num">{row.period}</div>
                  <div>
                    <div className="career-row__org">{row.org}</div>
                    <span className="career-row__role">{row.role}</span>
                  </div>
                  <p className="career-row__summary">{row.summary}</p>
                  <div className="career-row__metric num">{row.metric}</div>
                </article>
              ))}
            </div>

            <div className="lab-projects-grid">
              {ADDITIONAL_ARTIFACTS.map((proj) => (
                <article key={proj.title} className="lab-card">
                  <div>
                    <div className="lab-card__meta">
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="lab-card__title">{proj.title}</h3>
                    <p className="lab-card__desc">{proj.desc}</p>
                  </div>
                  <div className="lab-card__tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="lab-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 05: SCHOLASTIC DISTINCTIONS & CONTACT MONOLITH
            ================================================================ */}
        <section id="contact" className="section-carbon" aria-labelledby="contact-heading">
          <div className="shell">
            <div id="about" className="section-kicker">
              <span>05 / Honors &amp; Direct Dispatch</span>
              <span>·</span>
              <span>Atlanta, GA</span>
            </div>

            <div className="honors-grid" aria-label="Academic honors">
              <div className="honor-card">
                <div className="honor-card__num num">4.00 / 4.00</div>
                <h3 className="honor-card__title">Unblemished Undergraduate GPA</h3>
                <p className="honor-card__sub">
                  B.Sc. in Mathematics &amp; Bachelor of Education at the University of British Columbia.
                </p>
              </div>

              <div className="honor-card">
                <div className="honor-card__num num">Top 5%</div>
                <h3 className="honor-card__title">Trek Excellence Scholarship (2018, 2020)</h3>
                <p className="honor-card__sub">
                  Awarded twice by UBC for placing in the top 5% of undergraduate faculty standing.
                </p>
              </div>

              <div className="honor-card">
                <div className="honor-card__num">Math Faculty</div>
                <h3 className="honor-card__title">Banks &amp; Palliser-Wilson Scholar</h3>
                <p className="honor-card__sub">
                  Conferred by UBC’s Department of Mathematics (Charles &amp; Jane Banks 2018; Reginald Palliser-Wilson 2020).
                </p>
              </div>
            </div>

            <div className="contact-monolith">
              <div className="contact-monolith__grid">
                <div>
                  <div className="section-kicker">Available May 2026 · ML &amp; Systems Engineering</div>
                  <h2 id="contact-heading" className="section-title" style={{ marginBottom: '1rem' }}>
                    Let’s build something <span className="serif-italic">enduring</span>.
                  </h2>
                  <p className="section-lead" style={{ maxWidth: '48ch' }}>
                    Based in Atlanta, GA. Reach out directly for machine learning research
                    collaborations, systems engineering roles, or technical inquiries.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.65rem' }}>
                    <a id="contact-mailto-btn" href="mailto:ianwong.gatech@gmail.com" className="btn-primary">
                      <Mail size={16} />
                      <span>Write to Ian</span>
                    </a>
                    <button
                      id="contact-copy-email-btn"
                      type="button"
                      className="btn-carbon"
                      onClick={handleCopyEmail}
                    >
                      <Copy size={15} />
                      <span>Copy Email</span>
                    </button>
                  </div>
                </div>

                <div className="contact-actions-stack">
                  <a
                    id="footer-linkedin"
                    href="https://www.linkedin.com/in/ian-wong-gt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                  >
                    <span>LinkedIn</span>
                    <span className="contact-link-row__meta">
                      in/ian-wong-gt <ArrowUpRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </span>
                  </a>

                  <a
                    id="footer-github"
                    href="https://github.com/ianwong99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <GithubMark size={16} />
                      <span>GitHub</span>
                    </span>
                    <span className="contact-link-row__meta">
                      @ianwong99 <ArrowUpRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </span>
                  </a>

                  <a
                    id="footer-arxiv"
                    href="https://arxiv.org/abs/2505.07782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ArxivMark size={16} />
                      <span>MLE-Dojo (NeurIPS 2025)</span>
                    </span>
                    <span className="contact-link-row__meta">
                      2505.07782 <ArrowUpRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </span>
                  </a>

                  <a
                    id="footer-cv"
                    href={assetUrl('cv.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={16} />
                      <span>Curriculum Vitae</span>
                    </span>
                    <span className="contact-link-row__meta">
                      PDF · 1 Page <ArrowUpRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Colophon & Media Attribution */}
      <footer className="site-colophon">
        <div className="shell site-colophon__row">
          <div className="mono">
            © {new Date().getFullYear()} Ian Wong (Ian Shu-Hei Wong) · Engineered in Atlanta, GA
          </div>
          <div className="mono" style={{ fontSize: '0.72rem' }}>
            Media: NASA ISS Expedition 69 &amp; ORNL Frontier (Public Domain), Wikimedia Commons (CC BY-SA), Unsplash.
          </div>
        </div>
      </footer>

      {/* Mobile Thumb-Friendly Floating Dock */}
      <nav className="mobile-dock" aria-label="Mobile quick navigation">
        <a
          href="#home"
          className={`mobile-dock__item ${activeNav === 'home' ? 'is-active' : ''}`}
        >
          <Home size={16} />
          <span>Top</span>
        </a>
        <a
          href="#research"
          className={`mobile-dock__item ${activeNav === 'research' ? 'is-active' : ''}`}
        >
          <FlaskConical size={16} />
          <span>Paper</span>
        </a>
        <a
          href="#systems"
          className={`mobile-dock__item ${activeNav === 'systems' ? 'is-active' : ''}`}
        >
          <Cpu size={16} />
          <span>Nova</span>
        </a>
        <a
          href="#experience"
          className={`mobile-dock__item ${activeNav === 'experience' ? 'is-active' : ''}`}
        >
          <Briefcase size={16} />
          <span>Career</span>
        </a>
        <button
          id="mobile-dock-actions"
          type="button"
          className="mobile-dock__item mobile-dock__item--gold"
          onClick={() => setPaletteOpen(true)}
        >
          <Command size={16} />
          <span>Quick</span>
        </button>
      </nav>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectMode={setManifoldMode}
        onCopyEmail={handleCopyEmail}
      />
    </>
  );
};

export default App;
