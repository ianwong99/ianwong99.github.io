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
            <span>Atlanta &amp; Vancouver</span>
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
            From pure mathematics and pedagogy at the University of British Columbia (<strong className="num">4.00 / 4.00</strong> GPA)
            to AWS region build pipelines and graduate machine learning research in Atlanta.
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
              <span className="cinema-tag">AWS Cloud Infrastructure · Summer 2025</span>
              <span className="cinema-tag" style={{ color: 'var(--gold)' }}>
                100% CI/CD · Python &amp; Go
              </span>
            </div>
            <div className="cinema-tile__body">
              <h3 className="cinema-tile__title">Region build telemetry &amp; AMI validation</h3>
              <p className="cinema-tile__desc">
                Engineered automated Python availability metric packages and end-to-end Go release
                pipelines validating Ubuntu machine images across AWS regions without manual intervention.
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
                M.S. Computer Science (Machine Learning, May 2026). Head Graduate TA coordinating{' '}
                <strong className="num">30</strong> TAs and autograding systems for{' '}
                <strong className="num">1,500</strong> students.
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
              <span className="cinema-tag">Hardware-Software Co-Design</span>
              <span className="cinema-tag">Scale-SIM · Astra-SIM</span>
            </div>
            <div className="cinema-tile__body">
              <h3 className="cinema-tile__title">Distributed data &amp; accelerator modeling</h3>
              <p className="cinema-tile__desc">
                From multi-node PySpark pipelines over 1M+ US property records to systolic array
                and distributed ML interconnect simulation.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
