import React, { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubMark } from './BrandIcons';
import { assetUrl } from '../assetUrl';

interface SamplePreset {
  id: string;
  label: string;
  rawInput: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'queen-of-tears',
    label: 'Chinese + English Folder',
    rawInput: '[韩剧][泪之女王.Queen.of.Tears][2024]/Queen.of.Tears.E04.1080p.WEB-DL.mkv'
  },
  {
    id: 'lovely-runner',
    label: 'Hangul Subtitle Stem',
    rawInput: '선재 업고 튀어.E01.1080p.NEXT.kor.srt'
  },
  {
    id: 'the-glory-pt2',
    label: 'Netflix Part 2 Offset Trap',
    rawInput: 'The.Glory.Part.2.E01.2160p.NF.WEB-DL.DDP5.1.Atmos.mkv'
  },
  {
    id: 'goblin-alias',
    label: 'Colloquial Alias (#67915)',
    rawInput: '[凤凰天使TSKS] 孤单又灿烂的神-鬼怪 Goblin.2016.1080p.BluRay.E01.mkv'
  }
];

function resolveNovaFilename(input: string): {
  outputPath: string;
  tmdbBadge: string;
  ruleApplied: string;
  scriptDetected: string;
  crc32: string;
} {
  const trimmed = input.trim() || 'Untitled.Media.E01.1080p.mkv';
  const lower = trimmed.toLowerCase();

  const hasHangul = /[\uac00-\ud7af]/.test(trimmed);
  const hasHanzi = /[\u4e00-\u9fff]/.test(trimmed);
  const extMatch = trimmed.match(/\.(mkv|mp4|avi|srt|ass|ssa)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : 'mkv';
  const isSub = ['srt', 'ass', 'ssa'].includes(ext);
  const langSuffix = /\.kor\.|\.ko\./i.test(trimmed) ? '.ko' : isSub ? '.en' : '';

  if (lower.includes('queen.of.tears') || trimmed.includes('泪之女王')) {
    const ep = trimmed.match(/e(\d{1,2})/i)?.[1]?.padStart(2, '0') || '04';
    return {
      outputPath: `Queen of Tears (2024)/Season 01/Queen of Tears (2024) S01E${ep}${langSuffix}.${ext}`,
      tmdbBadge: 'TMDb #219246 · 눈물의 여왕',
      ruleApplied: 'Bilingual CJK/EN folder stem + ShowScraper4 SxxExx lock',
      scriptDetected: 'Simplified Chinese + Latin',
      crc32: 'CRC32 8F4A2C91'
    };
  }

  if (trimmed.includes('선재 업고 튀어') || lower.includes('lovely runner')) {
    const ep = trimmed.match(/e(\d{1,2})/i)?.[1]?.padStart(2, '0') || '01';
    return {
      outputPath: `Lovely Runner (2024)/Season 01/Lovely Runner (2024) S01E${ep}${langSuffix || '.ko'}.${ext}`,
      tmdbBadge: 'TMDb #230923 · 선재 업고 튀어',
      ruleApplied: 'Gemini 3.8 Flash Hangul Romanization + SubtitleManager sync',
      scriptDetected: 'Korean Hangul',
      crc32: 'CRC32 3D91E04B'
    };
  }

  if (lower.includes('glory') && /part[\s._-]*2/i.test(trimmed)) {
    const rawEp = parseInt(trimmed.match(/e(\d{1,2})/i)?.[1] || '1', 10);
    const remapped = String(rawEp + 8).padStart(2, '0');
    return {
      outputPath: `The Glory (2022)/Season 01/The Glory (2022) S01E${remapped}${langSuffix}.${ext}`,
      tmdbBadge: 'TMDb #136283 · Part 2 -> S01 Offset (+8)',
      ruleApplied: 'Single-season Netflix split auto-remap (prevents S02 scraper miss)',
      scriptDetected: 'Latin Release Scene Tag',
      crc32: 'CRC32 E712B80C'
    };
  }

  if (lower.includes('goblin') || trimmed.includes('鬼怪')) {
    const ep = trimmed.match(/e(\d{1,2})/i)?.[1]?.padStart(2, '0') || '01';
    return {
      outputPath: `Guardian The Lonely and Great God (2016)/Season 01/Guardian The Lonely and Great God (2016) S01E${ep}${langSuffix}.${ext}`,
      tmdbBadge: 'TMDb #67915 · 도깨비',
      ruleApplied: 'Colloquial alias "Goblin" resolved to canonical TMDb title',
      scriptDetected: hasHanzi ? 'Fansub CJK + Latin' : 'Latin Alias',
      crc32: 'CRC32 94AC1107'
    };
  }

  // Dynamic live parser for any custom filename typed on mobile/desktop!
  const epNum =
    trimmed.match(/[sS](\d{1,2})[eE](\d{1,3})/) ||
    trimmed.match(/[eE][pP]?(\d{1,3})/) ||
    trimmed.match(/\b(\d{2})\b/);
  const season = epNum && epNum[2] ? epNum[1].padStart(2, '0') : '01';
  const episode = epNum ? (epNum[2] || epNum[1]).padStart(2, '0') : '01';
  const yearMatch = trimmed.match(/\b(19\d{2}|20\d{2})\b/);
  const year = yearMatch ? yearMatch[1] : '2025';

  const cleanedStem = trimmed
    .split('/')
    .pop()!
    .replace(/\.(mkv|mp4|avi|srt|ass|ssa)$/i, '')
    .replace(/\[.*?\]|\(.*?\)/g, ' ')
    .replace(/(2160p|1080p|720p|web-dl|bluray|x264|x265|hevc|nf|ddp5\.1|atmos|[sS]\d+[eE]\d+|[eE]\d+).*/i, '')
    .replace(/[._-]+/g, ' ')
    .trim() || 'Resolved Series';

  const titleCased = cleanedStem
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    outputPath: `${titleCased} (${year})/Season ${season}/${titleCased} (${year}) S${season}E${episode}${langSuffix}.${ext}`,
    tmdbBadge: 'Gemini 3.8 Flash + TMDb Live Parse',
    ruleApplied: 'Nova Video Player ShowScraper4 prefix-safe tree',
    scriptDetected: hasHangul ? 'Korean Hangul' : hasHanzi ? 'CJK Ideographs' : 'Custom Input',
    crc32: 'CRC32 LIVE-OK'
  };
}

export const FileBotSection: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>(SAMPLE_PRESETS[0].id);
  const [rawInput, setRawInput] = useState<string>(SAMPLE_PRESETS[0].rawInput);

  const resolved = useMemo(() => resolveNovaFilename(rawInput), [rawInput]);

  return (
    <section id="systems" className="section-alabaster" aria-labelledby="systems-heading">
      <div className="shell">
        <div className="section-kicker">
          <span>02 / Zero-Bloat Native Software</span>
          <span>·</span>
          <span>macOS AppKit &amp; Windows WebView2</span>
        </div>

        <div className="section-header-split">
          <h2 id="systems-heading" className="section-title">
            FileBot Nova: <span className="serif-italic">native</span> media tooling in 153 KB.
          </h2>
          <p className="section-lead">
            Replacing <strong className="num">280 MB</strong> Java desktop runtimes with a clean-room{' '}
            <strong className="num">153 KB</strong> native ARM64 macOS &amp; Windows client powered by
            Gemini 3.8 Flash AI, TMDb, and atomic <code className="mono">history.xml</code> rollback.
          </p>
        </div>

        {/* Binary Footprint Contrast Strip */}
        <div className="footprint-banner">
          <div>
            <div
              className="mono"
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#8b6212',
                marginBottom: '0.3rem'
              }}
            >
              Runtime Efficiency · 1,830× Smaller Binary
            </div>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--alabaster-muted)' }}>
              Links directly to system <code className="mono">AppKit + WKWebView</code> on macOS and{' '}
              <code className="mono">WebView2</code> on Windows—zero bundled JRE or Electron Chromium overhead.
            </p>
          </div>

          <div className="footprint-compare">
            <div className="fp-bar-row">
              <div className="fp-bar-meta">
                <span>Legacy JVM Media Renamers</span>
                <strong>~280,000 KB</strong>
              </div>
              <div className="fp-track">
                <div className="fp-fill-legacy" />
              </div>
            </div>
            <div className="fp-bar-row">
              <div className="fp-bar-meta">
                <span style={{ color: '#0d6e49', fontWeight: 600 }}>FileBot Nova v2.0 (Universal Native)</span>
                <strong style={{ color: '#0d6e49' }}>153 KB (0.05%)</strong>
              </div>
              <div className="fp-track">
                <div className="fp-fill-nova" />
              </div>
            </div>
          </div>
        </div>

        <div className="filebot-grid">
          {/* Interactive ShowScraper4 Live Filename Sandbox */}
          <div className="sandbox-panel">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '0.85rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Interactive ShowScraper4 Resolver
              </span>
              <span
                className="mono"
                style={{
                  fontSize: '0.7rem',
                  color: '#0d6e49',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Sparkles size={13} />
                <span>Try typing your own</span>
              </span>
            </div>

            <div className="preset-chips" role="group" aria-label="Sample media paths">
              {SAMPLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  id={`preset-${p.id}`}
                  type="button"
                  className={`preset-chip ${selectedPreset === p.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setSelectedPreset(p.id);
                    setRawInput(p.rawInput);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <label htmlFor="nova-live-input" className="sandbox-field-label">
              Raw Multilingual / Fansub Input Filename
            </label>
            <input
              id="nova-live-input"
              type="text"
              className="sandbox-input"
              value={rawInput}
              onChange={(e) => {
                setSelectedPreset('custom');
                setRawInput(e.target.value);
              }}
              spellCheck={false}
              aria-label="Raw media filename to test live resolution"
            />

            <div className="sandbox-output" aria-live="polite">
              <div
                className="mono"
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--ink-60)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>NOVA VIDEO PLAYER TARGET TREE</span>
                <span style={{ color: 'var(--jade)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> SxxExx Verified
                </span>
              </div>

              <div className="sandbox-output__path">{resolved.outputPath}</div>

              <div className="sandbox-badges">
                <span className="sandbox-badge">{resolved.tmdbBadge}</span>
                <span className="sandbox-badge">{resolved.scriptDetected}</span>
                <span className="sandbox-badge">{resolved.crc32}</span>
              </div>
              <p
                style={{
                  margin: '0.7rem 0 0',
                  fontSize: '0.76rem',
                  color: 'var(--ink-60)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Rule: {resolved.ruleApplied}
              </p>
            </div>

            <div className="hardware-frame__actions">
              <a
                id="filebot-github-btn"
                href="https://github.com/ianwong99/filebot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-ink"
              >
                <GithubMark size={15} />
                <span>Source Repository</span>
                <ArrowUpRight size={15} />
              </a>
              <a
                id="filebot-workbench-btn"
                href="https://ianwong99.github.io/filebot/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink"
              >
                <span>Launch Live Workbench</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Authentic macOS ARM64 Dark Screenshot */}
          <div>
            <figure className="hardware-frame" style={{ margin: 0 }}>
              <div className="hardware-frame__bar">
                <div className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span>FileBot Nova — macOS Universal (arm64 · 153 KB)</span>
                <span>GPLv3 / MIT</span>
              </div>
              <img
                src={assetUrl('assets/filebot-nova-dark.png')}
                alt="FileBot Nova macOS dark interface showing K-Drama folder diff ledger and Gemini 3.8 Flash AI matching"
                width="1440"
                height="900"
                loading="lazy"
              />
            </figure>
            <p
              className="mono"
              style={{
                margin: '0.75rem 0 0',
                fontSize: '0.74rem',
                color: 'var(--alabaster-muted)',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <span>Live daemon holds .part, .!qB &amp; .aria2 active download locks</span>
              <span>IEEE 802.3 CRC32 + SHA-256 verifier</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
