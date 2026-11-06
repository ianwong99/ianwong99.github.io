import React, { useState, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';

interface LedgerEntry {
  id: string;
  initial: string;
  name: string;
  meta: string;
  status: string;
  signal: 'periwinkle' | 'apricot';
  metricValue: string;
  metricUnit: string;
  summary: string;
  actionLabel: string;
  actionHref: string;
}

interface TourStep {
  id: string;
  title: string;
  desc: string;
  paneTitle: string;
  paneCount: string;
  columns: [string, string, string];
  rows: Array<{
    item: string;
    detail: string;
    outcome: string;
    flagged?: boolean;
  }>;
  linkLabel: string;
  linkHref: string;
}

const LEDGER_ENTRIES: LedgerEntry[] = [
  {
    id: 'mle-dojo',
    initial: 'M',
    name: 'MLE-Dojo (NeurIPS 2025)',
    meta: 'Georgia Tech & Stanford benchmark',
    status: 'Published',
    signal: 'periwinkle',
    metricValue: '200+',
    metricUnit: 'tasks',
    summary: 'arXiv:2505.07782: Interactive POMDP environments across 200+ Kaggle challenges for SFT and RL LLM agents.',
    actionLabel: 'Read paper',
    actionHref: 'https://arxiv.org/abs/2505.07782'
  },
  {
    id: 'filebot-nova',
    initial: 'F',
    name: 'FileBot Nova',
    meta: 'Native macOS AppKit & Windows WebView2',
    status: 'Open source',
    signal: 'periwinkle',
    metricValue: '153',
    metricUnit: 'KB',
    summary: 'Zero-dependency K-Drama and TV renamer powered by Gemini 3.8 Flash AI and Nova Video Player ShowScraper4 rules.',
    actionLabel: 'View repository',
    actionHref: 'https://github.com/ianwong99/filebot'
  },
  {
    id: 'aws-sde',
    initial: 'A',
    name: 'Amazon Web Services',
    meta: 'Software Development Engineer Intern',
    status: 'Shipped',
    signal: 'periwinkle',
    metricValue: '100%',
    metricUnit: 'CI/CD',
    summary: 'Automated AWS region build metrics in Python and eliminated manual Ubuntu image validation via Go pipelines.',
    actionLabel: 'See experience',
    actionHref: '#experience'
  },
  {
    id: 'gatech-ta',
    initial: 'G',
    name: 'Georgia Institute of Technology',
    meta: 'Head Graduate Teaching Assistant',
    status: 'Active',
    signal: 'apricot',
    metricValue: '1,500',
    metricUnit: 'students',
    summary: 'Coordinating 30 teaching assistants across all sections while maintaining automated grading infrastructure.',
    actionLabel: 'Get in touch',
    actionHref: 'mailto:ianwong.gatech@gmail.com'
  }
];

const TOUR_STEPS: TourStep[] = [
  {
    id: 'mledojo-pomdp',
    title: 'MLE-Dojo POMDP environment',
    desc: 'Gym-style loop over 200+ real Kaggle competitions.',
    paneTitle: 'MLE-Dojo episode loop',
    paneCount: '200+ tasks',
    columns: ['Phase', 'Interface', 'Scale'],
    rows: [
      { item: 'Task corpus', detail: 'Tabular, vision, NLP, time-series tasks', outcome: '200+ tasks' },
      { item: 'Observation', detail: 'Sandbox logs and validation delta', outcome: 'POMDP state' },
      { item: 'Action space', detail: 'Data cleaning, search, and tuning', outcome: 'Multi-turn' },
      { item: 'Training', detail: 'Supervised fine-tuning and RL runs', outcome: '8 LLMs', flagged: true },
      { item: 'Venue', detail: 'Georgia Tech & Stanford benchmark', outcome: 'NeurIPS 2025' }
    ],
    linkLabel: 'Read arXiv:2505.07782',
    linkHref: 'https://arxiv.org/abs/2505.07782'
  },
  {
    id: 'filebot-nova-engine',
    title: 'FileBot Nova ShowScraper4',
    desc: 'Resolves CJK, Hangul, and fansub folders with Gemini 3.8 Flash AI and TMDb.',
    paneTitle: 'FileBot Nova batch resolution',
    paneCount: '6 of 6 files verified',
    columns: ['Source media path', 'Resolution rule', 'Target output'],
    rows: [
      { item: '[韩剧][泪之女王.Queen.of.Tears][2024]', detail: 'Chinese & English folder extraction via TMDb', outcome: 'Queen of Tears (2024)' },
      { item: '선재 업고 튀어.E01.1080p.kor.srt', detail: 'Hangul title + SubtitleManager stem match', outcome: 'S01E01.ko.srt' },
      { item: 'The.Glory.Part.2.E01.1080p.mkv', detail: 'Single-season Part 2 offset auto-remap', outcome: 'S01E09.mkv', flagged: true },
      { item: 'Goblin.2016.1080p.BluRay.E01.mkv', detail: 'Colloquial alias matched to TMDb #67915', outcome: 'S01E01.mkv' },
      { item: '~/.filebot-nova/history.xml', detail: 'Atomic MOVE, COPY, HARDLINK rollback ledger', outcome: '1-click undo' }
    ],
    linkLabel: 'Open FileBot Nova repository',
    linkHref: 'https://github.com/ianwong99/filebot'
  },
  {
    id: 'filebot-native-footprint',
    title: 'Native desktop runtime',
    desc: 'Replaces 280 MB Java runtimes with a 153 KB macOS AppKit and Windows WebView2 client.',
    paneTitle: 'FileBot Nova native architecture',
    paneCount: '153 KB native binary',
    columns: ['Subsystem', 'Implementation', 'Footprint'],
    rows: [
      { item: 'macOS client', detail: 'Universal ARM64 AppKit + WKWebView bundle', outcome: '153 KB' },
      { item: 'Windows client', detail: 'Native C# WinForms + WebView2 wrapper', outcome: '0 dependencies' },
      { item: 'Folder watcher', detail: 'Holds active .part, .!qB, and .aria2 locks', outcome: 'Live daemon' },
      { item: 'Integrity check', detail: 'Built-in IEEE 802.3 CRC32 and SHA-256 verifier', outcome: 'Verified' },
      { item: 'License', detail: 'Clean-room open-source replacement', outcome: 'GPLv3 / MIT' }
    ],
    linkLabel: 'Launch FileBot Nova showcase',
    linkHref: 'https://ianwong99.github.io/filebot/'
  }
];

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [selectedLedgerId, setSelectedLedgerId] = useState<string>('mle-dojo');
  const [selectedTourId, setSelectedTourId] = useState<string>('mledojo-pomdp');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
      const sections = ['home', 'projects', 'experience', 'about', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'Research & Systems' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'Background' },
    { id: 'contact', label: 'Contact' }
  ];

  const activeLedger = LEDGER_ENTRIES.find((item) => item.id === selectedLedgerId) || LEDGER_ENTRIES[0];
  const activeTour = TOUR_STEPS.find((step) => step.id === selectedTourId) || TOUR_STEPS[0];

  return (
    <div>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="container site-nav" aria-label="Primary">
          <a className="site-nav__brand" href="#home" aria-label="Ian Wong home">
            Ian Wong
          </a>
          <div className="site-nav__links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`site-nav__link ${activeSection === item.id ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="site-nav__actions">
            <a className="btn btn--nav" href="mailto:ianwong.gatech@gmail.com">
              Write to Ian
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Section 1: Stage Hero */}
        <section id="home" className="hero">
          <figure
            className="hero__media"
            data-slot="hero-photo"
            data-alt="Sea of fog filling a valley below dark hills at sunset"
          >
            <img
              src="/assets/vallee-brouillard.jpg"
              width="1920"
              height="1254"
              alt=""
              fetchPriority="high"
            />
          </figure>
          <div className="hero__scrim" aria-hidden="true" />

          <div className="container hero__container">
            <div className="hero__grid">
              <div className="hero__copy">
                <h1 className="hero__title">ML environments and native tools.</h1>
                <p className="lead hero__lead">
                  Georgia Tech machine learning researcher building NeurIPS benchmarks and native media software.
                </p>
                <div className="hero__actions">
                  <a className="btn" href="https://arxiv.org/abs/2505.07782" target="_blank" rel="noopener noreferrer">
                    Read NeurIPS 2025 paper
                  </a>
                  <a className="btn btn--hero-quiet" href="https://github.com/ianwong99/filebot" target="_blank" rel="noopener noreferrer">
                    Explore FileBot Nova
                  </a>
                </div>
              </div>

              <div
                className="glass ledger"
                data-slot="hero-ledger"
                data-kind="product"
                data-alt="Interactive ledger of Ian Wong's NeurIPS 2025 MLE-Dojo research and FileBot Nova system"
              >
                <div className="ledger__head" data-keep>
                  <div>
                    <div className="ledger__title">Research &amp; systems ledger</div>
                    <p className="ledger__sub">Georgia Tech MS CS, Machine Learning (May 2026)</p>
                  </div>
                  <span className="ledger__badge" role="status">
                    <span className="signal-dot" aria-hidden="true" />
                    <span>NeurIPS 2025 + v2.0 live</span>
                  </span>
                </div>

                <ul className="ledger__list" data-keep>
                  {LEDGER_ENTRIES.map((entry) => {
                    const isSelected = entry.id === activeLedger.id;
                    return (
                      <li key={entry.id} className="ledger__item">
                        <button
                          type="button"
                          className={`ledger__row-btn ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => setSelectedLedgerId(entry.id)}
                          aria-pressed={isSelected}
                        >
                          <span className="ledger__initial" aria-hidden="true">
                            {entry.initial}
                          </span>
                          <span className="ledger__row-main">
                            <span className="ledger__row-name">{entry.name}</span>
                            <span className="ledger__row-meta">{entry.meta}</span>
                          </span>
                          <span className="ledger__status">
                            {entry.signal === 'periwinkle' ? (
                              <Check size={16} className="ledger__status-icon" aria-hidden="true" />
                            ) : (
                              <Circle size={12} className="ledger__status-icon ledger__status-icon--apricot" aria-hidden="true" />
                            )}
                            <span>{entry.status}</span>
                          </span>
                          <span className="ledger__metric num">
                            {entry.metricValue}
                            <span className="ledger__metric-unit">{entry.metricUnit}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="ledger__strip" data-keep>
                  <div className="ledger__strip-text">
                    <span className="signal-dot signal-dot--apricot" aria-hidden="true" />
                    <span>{activeLedger.summary}</span>
                  </div>
                  <a
                    className="ledger__strip-link"
                    href={activeLedger.actionHref}
                    target={activeLedger.actionHref.startsWith('http') ? '_blank' : undefined}
                    rel={activeLedger.actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {activeLedger.actionLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Featured Research & Systems (Dusk Tour + Smoked Glass Pane) */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-head--split">
              <h2>Two systems built end to end.</h2>
              <p className="lead section-head__lead">
                MLE-Dojo at NeurIPS 2025 and FileBot Nova on macOS and Windows.
              </p>
            </div>

            <div className="tour-grid">
              <div className="tour-side">
                <div className="tour-list" role="tablist" aria-label="System architecture views">
                  {TOUR_STEPS.map((step) => {
                    const isActive = step.id === activeTour.id;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        role="tab"
                        id={`tab-${step.id}`}
                        aria-selected={isActive}
                        aria-controls={`panel-${step.id}`}
                        className={`tour-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedTourId(step.id)}
                      >
                        <span className="tour-btn__top">
                          <span className="tour-btn__dot" aria-hidden="true" />
                          <span>{step.title}</span>
                        </span>
                        {isActive && <span className="tour-btn__desc">{step.desc}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="glass tour-pane"
                role="tabpanel"
                id={`panel-${activeTour.id}`}
                aria-labelledby={`tab-${activeTour.id}`}
              >
                <div>
                  <div className="tour-pane__head">
                    <h3 className="tour-pane__title">{activeTour.paneTitle}</h3>
                    <span className="tour-pane__count">{activeTour.paneCount}</span>
                  </div>

                  <table className="pane-table">
                    <thead>
                      <tr>
                        <th>{activeTour.columns[0]}</th>
                        <th>{activeTour.columns[1]}</th>
                        <th className="num">{activeTour.columns[2]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeTour.rows.map((row) => (
                        <tr key={row.item} className={row.flagged ? 'is-flagged' : ''}>
                          <td>{row.item}</td>
                          <td>{row.detail}</td>
                          <td className="num">{row.outcome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="tour-pane__foot">
                  <a
                    className="btn btn--quiet"
                    href={activeTour.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeTour.linkLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Two Dusk Bone Wells (MLE-Dojo NeurIPS 2025 & FileBot Nova) */}
        <section className="section--large" aria-label="Published artifacts">
          <div className="container">
            <div className="section-head">
              <h2>Published benchmark and shipping client.</h2>
            </div>

            <div className="wells-grid">
              <article className="well-item">
                <div className="bone-well">
                  <div>
                    <p className="bone-well__title">
                      MLE-Dojo: Interactive Environments for LLM Agents
                    </p>
                    <p className="bone-well__meta">
                      Qiang, Zhuang, Li, Sagar V K, Zhang, Li, Ian Shu-Hei Wong, Yang, Liang, Zhang, Dai (Georgia Tech &amp; Stanford, NeurIPS 2025).
                    </p>
                  </div>
                  <dl className="bone-well__list">
                    <div>
                      <dt>Real-world benchmark</dt>
                      <dd>200+ Kaggle challenges</dd>
                    </div>
                    <div>
                      <dt>Formulation</dt>
                      <dd>Interactive POMDP</dd>
                    </div>
                    <div>
                      <dt>Training modes</dt>
                      <dd>SFT and RL trajectories</dd>
                    </div>
                    <div>
                      <dt>Frontier evaluation</dt>
                      <dd>8 LLMs benchmarked</dd>
                    </div>
                  </dl>
                  <div className="bone-well__actions">
                    <a
                      className="btn btn--well-quiet"
                      href="https://arxiv.org/abs/2505.07782"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      arXiv:2505.07782
                    </a>
                  </div>
                </div>
                <div className="well-caption">
                  <h3 className="well-caption__title">MLE-Dojo at NeurIPS 2025</h3>
                  <p className="well-caption__line">
                    Executable environment for iterative data exploration, model search, debugging, and RL agent training.
                  </p>
                </div>
              </article>

              <article className="well-item">
                <div className="bone-well">
                  <figure
                    className="bone-well__screen"
                    data-slot="filebot-screen"
                    data-kind="product"
                    data-alt="FileBot Nova macOS workbench showing K-Drama folder diff ledger and Gemini 3.8 Flash AI matching"
                  >
                    <img
                      src="/assets/filebot-nova-dark.png"
                      width="1440"
                      height="900"
                      loading="lazy"
                      alt="FileBot Nova interface resolving multilingual K-Drama folders for Nova Video Player"
                    />
                  </figure>
                  <div className="bone-well__actions">
                    <a
                      className="btn btn--well-quiet"
                      href="https://github.com/ianwong99/filebot"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub repository
                    </a>
                    <a
                      className="btn btn--well-quiet"
                      href="https://ianwong99.github.io/filebot/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live workbench
                    </a>
                  </div>
                </div>
                <div className="well-caption">
                  <h3 className="well-caption__title">FileBot Nova v2.0</h3>
                  <p className="well-caption__line">
                    Open-source 153 KB native macOS and Windows media renamer powered by Gemini 3.8 Flash AI and TMDb.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Section 4: Experience Ruled Rows */}
        <section id="experience" className="section--large">
          <div className="container">
            <div className="section-head">
              <h2>Four years in cloud and classrooms.</h2>
            </div>

            <div className="exp-list">
              <article className="exp-row">
                <div className="exp-row__role">
                  <h3 className="exp-row__title">SDE Intern</h3>
                  <span className="exp-row__org">Amazon Web Services</span>
                </div>
                <p className="exp-row__summary">
                  Automated region build metrics in Python and Ubuntu image validation in Go.
                </p>
                <span className="exp-row__date">Summer 2025</span>
              </article>

              <article className="exp-row">
                <div className="exp-row__role">
                  <h3 className="exp-row__title">Head Graduate TA</h3>
                  <span className="exp-row__org">Georgia Tech</span>
                </div>
                <p className="exp-row__summary">
                  Coordinate 30 teaching assistants for 1,500 students and automated grading.
                </p>
                <span className="exp-row__date">2024 to Present</span>
              </article>

              <article className="exp-row">
                <div className="exp-row__role">
                  <h3 className="exp-row__title">Mathematics Teacher</h3>
                  <span className="exp-row__org">Richmond School District</span>
                </div>
                <p className="exp-row__summary">
                  Taught Math 8 to Calculus 12 and built district grading tools.
                </p>
                <span className="exp-row__date">2022 to 2024</span>
              </article>

              <article className="exp-row">
                <div className="exp-row__role">
                  <h3 className="exp-row__title">Undergraduate TA</h3>
                  <span className="exp-row__org">University of British Columbia</span>
                </div>
                <p className="exp-row__summary">
                  Taught Algorithms and Data Structures across 7 terms for 300 students.
                </p>
                <span className="exp-row__date">2019 to 2021</span>
              </article>
            </div>
          </div>
        </section>

        {/* Section 5: Background, Education & Technical Stack */}
        <section id="about" className="section--large">
          <div className="container">
            <div className="section-head">
              <h2>Trained in proof and machine learning.</h2>
            </div>

            <div className="about-grid">
              <div className="glass edu-card">
                <div className="edu-item">
                  <h3 className="edu-item__title">Georgia Institute of Technology</h3>
                  <p className="edu-item__degree">
                    M.S. Computer Science, Machine Learning
                  </p>
                  <p className="edu-item__meta">Atlanta, Expected May 2026</p>
                </div>

                <div className="edu-item">
                  <h3 className="edu-item__title">University of British Columbia</h3>
                  <p className="edu-item__degree">
                    B.Sc. Mathematics &amp; B.Ed.
                  </p>
                  <p className="edu-item__meta">
                    GPA 4.00/4.00, Trek Excellence (top 5%), Banks &amp; Palliser-Wilson Scholarships
                  </p>
                </div>
              </div>

              <dl className="stack-dl">
                <div className="stack-dl__row">
                  <dt>Languages &amp; ML</dt>
                  <dd>Python, Go, C++, C, Java, PyTorch, TensorFlow, NumPy, R</dd>
                </div>
                <div className="stack-dl__row">
                  <dt>Cloud &amp; data</dt>
                  <dd>AWS, Azure, Spark, Hadoop, Hive, HBase, SQL</dd>
                </div>
                <div className="stack-dl__row">
                  <dt>Web &amp; simulation</dt>
                  <dd>TypeScript, React, Next.js, D3.js, Scale-SIM, Astra-SIM</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Section 6: Contact Band */}
        <section id="contact" className="section--band">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-copy">
                <h2>Open to 2026 ML and systems roles.</h2>
                <p className="lead section-head__lead">
                  Based in Atlanta. Reach out for research collaborations, engineering roles, or my CV.
                </p>
              </div>
              <div className="contact-actions">
                <a className="btn" href="mailto:ianwong.gatech@gmail.com">
                  ianwong.gatech@gmail.com
                </a>
                <a
                  className="btn btn--quiet"
                  href="https://www.linkedin.com/in/ian-wong-gt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="btn btn--quiet"
                  href="https://github.com/ianwong99"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="btn btn--quiet"
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Curriculum Vitae
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mast Footer */}
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__mast">Ian Wong</div>
          <div className="site-footer__row">
            <ul className="site-footer__links">
              <li>
                <a className="site-footer__link" href="#projects">
                  Research &amp; Systems
                </a>
              </li>
              <li>
                <a className="site-footer__link" href="#experience">
                  Experience
                </a>
              </li>
              <li>
                <a className="site-footer__link" href="#about">
                  Background
                </a>
              </li>
              <li>
                <a
                  className="site-footer__link"
                  href="https://arxiv.org/abs/2505.07782"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NeurIPS 2025 Paper
                </a>
              </li>
              <li>
                <a
                  className="site-footer__link"
                  href="https://github.com/ianwong99/filebot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FileBot Nova
                </a>
              </li>
              <li>
                <a
                  className="site-footer__link"
                  href="https://www.linkedin.com/in/ian-wong-gt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="site-footer__link"
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CV (PDF)
                </a>
              </li>
            </ul>
            <p className="site-footer__credits" data-credits>Photographs: <a href="https://commons.wikimedia.org/wiki/File:Vallee-brouillard.jpg">Thomas Bresson</a> (CC BY 3.0, Wikimedia Commons)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
