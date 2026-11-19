import React, { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { assetUrl } from '../assetUrl';

export const CinemaDossierSection: React.FC = () => {
  const orbitalVideoRef = useRef<HTMLVideoElement | null>(null);
  const cloudsVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videosPlaying, setVideosPlaying] = useState(true);

  const toggleVideos = () => {
    const next = !videosPlaying;
    setVideosPlaying(next);
    [orbitalVideoRef.current, cloudsVideoRef.current].forEach((v) => {
      if (!v) return;
      if (next) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  };

  return (
    <section id="dossier" className="section-carbon" aria-labelledby="dossier-heading">
      <div className="shell">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.85rem'
          }}
        >
          <div className="section-kicker" style={{ marginBottom: 0 }}>
            <span>03 / Field Notes &amp; Operating Context</span>
            <span>·</span>
            <span>Seattle · Atlanta · Vancouver</span>
          </div>

          <button
            id="cinema-playback-toggle"
            type="button"
            className="video-toggle-btn"
            onClick={toggleVideos}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {videosPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{videosPlaying ? 'Pause Ambient Reels' : 'Play Ambient Reels'}</span>
          </button>
        </div>

        <div className="section-header-split">
          <h2 id="dossier-heading" className="section-title">
            Trained in <span className="serif-italic">proof</span>, shipped at cloud scale.
          </h2>
          <p className="section-lead">
            From pure mathematics at the University of British Columbia (<strong className="num">4.00 / 4.00</strong> GPA)
            and graduate machine learning research at Georgia Tech to production software engineering in Seattle.
          </p>
        </div>

        <div className="cinema-bento">
          {/* Tile 1: Real Looping NASA Orbital Night Cinema Video */}
          <article className="cinema-tile cinema-tile--tall cinema-Span-7">
            <video
              ref={orbitalVideoRef}
              className="cinema-tile__media"
              src={assetUrl('assets/cinema-orbital.mp4')}
              poster={assetUrl('assets/nasa-orbital-night.jpg')}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className="cinema-tile__scrim" aria-hidden="true" />
            <div className="cinema-tile__top">
              <span className="cinema-tag">47.6062° N, 122.3321° W · Seattle, WA</span>
              <span className="cinema-tag" style={{ color: 'var(--gold)' }}>
                Google · AWS
              </span>
            </div>
            <div className="cinema-tile__body">
              <h3 className="cinema-tile__title">Production cloud &amp; release engineering</h3>
              <p className="cinema-tile__desc">
                Software Engineer (L3) at Google in Seattle. Previously automated AWS region build
                telemetry in Python with full CI/CD coverage and built end-to-end Go pipelines for Ubuntu AMI validation.
              </p>
            </div>
          </article>

          {/* Tile 2: Georgia Tech Campus Photography */}
          <article className="cinema-tile cinema-tile--tall cinema-Span-5">
            <img
              className="cinema-tile__media"
              src={assetUrl('assets/gatech-tower.jpg')}
              alt="Tech Tower at Georgia Institute of Technology in Atlanta"
              loading="lazy"
              width="1280"
              height="960"
            />
            <div className="cinema-tile__scrim" aria-hidden="true" />
            <div className="cinema-tile__top">
              <span className="cinema-tag">33.7756° N, 84.3963° W · Atlanta</span>
              <img
                src={assetUrl('assets/gatech-dark.svg')}
                alt="Georgia Tech"
                style={{ height: '20px', width: 'auto' }}
              />
            </div>
            <div className="cinema-tile__body">
              <h3 className="cinema-tile__title">Georgia Institute of Technology</h3>
              <p className="cinema-tile__desc">
                M.S. Computer Science (Machine Learning). Graduate Teaching Assistant for CS 3600
                Intro to AI &amp; CSE 6242 Data Visualization, coordinating{' '}
                <strong className="num">30</strong> TAs across <strong className="num">1,500</strong> students.
              </p>
            </div>
          </article>

          {/* Tile 3: UBC / Vancouver Golden Hour Photography */}
          <article className="cinema-tile cinema-Span-6">
            <img
              className="cinema-tile__media"
              src={assetUrl('assets/vancouver-coast.jpg')}
              alt="Golden hour reflection over Vancouver harbor near the University of British Columbia"
              loading="lazy"
              width="1400"
              height="933"
            />
            <div className="cinema-tile__scrim" aria-hidden="true" />
            <div className="cinema-tile__top">
              <span className="cinema-tag">49.2606° N, 123.2460° W · Vancouver</span>
              <span className="cinema-tag" style={{ color: 'var(--jade)' }}>
                GPA 4.00 / 4.00
              </span>
            </div>
            <div className="cinema-tile__body">
              <h3 className="cinema-tile__title">University of British Columbia</h3>
              <p className="cinema-tile__desc">
                B.Sc. Mathematics &amp; B.Ed. Trek Excellence Scholar (Top 5% faculty), Banks &amp;
                Palliser-Wilson Math Scholar, and 7-semester Algorithms &amp; Data Structures TA.
              </p>
            </div>
          </article>

          {/* Tile 4: Real 4K Clouds Timelapse Video Loop */}
          <article className="cinema-tile cinema-Span-6">
            <video
              ref={cloudsVideoRef}
              className="cinema-tile__media"
              src={assetUrl('assets/cinema-clouds.mp4')}
              poster={assetUrl('assets/cinema-clouds-poster.jpg')}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className="cinema-tile__scrim" aria-hidden="true" />
            <div className="cinema-tile__top">
              <span className="cinema-tag">Systems &amp; ML Infrastructure</span>
              <span className="cinema-tag">Python · Go · C++</span>
            </div>
            <div className="cinema-tile__body">
              <h3 className="cinema-tile__title">Reliability from bare metal to agents</h3>
              <p className="cinema-tile__desc">
                Focused on deterministic release automation, zero-bloat native desktop tooling,
                and executable reinforcement learning sandboxes.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
