import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { ArxivMark } from './BrandIcons';
import { assetUrl } from '../assetUrl';

interface EpisodeStep {
  id: string;
  stepTag: string;
  phase: string;
  observation: string;
  code: string;
  metricLabel: string;
  metricValue: string;
  rewardDelta: string;
}

const EPISODE_STEPS: EpisodeStep[] = [
  {
    id: 'obs',
    stepTag: 't=0 · Reset',
    phase: 'POMDP Sandbox Initialization',
    observation: 'Mounted Kaggle tabular + time-series workspace (train.parquet: 1.42M rows, 118 features).',
    code: `# MLE-Dojo Gym-Style POMDP Reset (arXiv:2505.07782)
obs, info = env.reset(competition="amex-default-prediction")
# Sandbox container isolated · GPU: A100 · Horizon: T=25 turns
print(obs.schema_summary, info["metric"])  # -> "amex_metric (Gini + Recall@4%)"`,
    metricLabel: 'Validation Score',
    metricValue: '0.7410 (Baseline)',
    rewardDelta: '+0.000'
  },
  {
    id: 'eda',
    stepTag: 't=4 · Profile',
    phase: 'Autonomous Schema & Leakage Diagnostics',
    observation: 'Detected temporal customer statement grouping and 14 high-null delinquency columns.',
    code: `# Agent inspects temporal distribution & missingness structure
agg_spec = synthesize_temporal_lags(df, group_key="customer_ID", windows=[3, 6, 13])
# Verified zero future-timestamp leakage across 5-fold StratifiedGroupKFold`,
    metricLabel: 'Validation Score',
    metricValue: '0.7804 (5-Fold CV)',
    rewardDelta: '+0.039'
  },
  {
    id: 'fe',
    stepTag: 't=11 · Synthesize',
    phase: 'Iterative Feature & Residual Engineering',
    observation: 'Constructed last-minus-mean velocity ratios and hull-compressed float16 feature matrix.',
    code: `# Multi-turn action: execute feature synthesis + memory-safe cast
X_train = build_velocity_deltas(agg_spec, precision="float16")
cv_score = evaluate_sandbox(model="LightGBM_DART", folds=5)
# Sandbox execution succeeded in 18.4s · Peak VRAM: 6.2 GB`,
    metricLabel: 'Validation Score',
    metricValue: '0.7958 (Bronze+)',
    rewardDelta: '+0.055'
  },
  {
    id: 'rl',
    stepTag: 't=19 · Policy Ensemble',
    phase: 'RL-Tuned Trajectory & Rank-Averaged Blend',
    observation: 'Combined LightGBM DART + CatBoost + Temporal MLP under POMDP shaped reward.',
    code: `# SFT + RL policy selects rank-calibrated blend over diverse model families
submission = rank_blend([pred_lgbm_dart, pred_catboost, pred_gru], weights=[0.48, 0.32, 0.20])
obs, reward, done, info = env.step(SubmitAction(submission))
# Status: VERIFIED · Leaderboard percentile: Top 4.1%`,
    metricLabel: 'Validation Score',
    metricValue: '0.8012 (Medal Tier)',
    rewardDelta: '+0.060'
  }
];

const BENCHMARK_DOMAINS = [
  { name: 'Tabular & Relational', tasks: '86 tasks', pct: 88 },
  { name: 'Computer Vision', tasks: '52 tasks', pct: 68 },
  { name: 'Natural Language Processing', tasks: '41 tasks', pct: 56 },
  { name: 'Time-Series & Forecasting', tasks: '28 tasks', pct: 44 }
];

export const MleDojoSection: React.FC = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setStepIdx((prev) => (prev + 1) % EPISODE_STEPS.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const active = EPISODE_STEPS[stepIdx];

  return (
    <section id="research" className="section-carbon" aria-labelledby="research-heading">
      <div className="shell">
        <div className="section-kicker">
          <span>04 / Published Benchmark</span>
          <span>·</span>
          <span>NeurIPS 2025 · Georgia Tech &amp; Stanford</span>
        </div>

        <div className="section-header-split">
          <h2 id="research-heading" className="section-title">
            MLE-Dojo: <span className="serif-italic">interactive</span> POMDP environments for ML agents.
          </h2>
          <p className="section-lead">
            Co-authored across Georgia Tech and Stanford, MLE-Dojo unifies{' '}
            <strong className="num">200+</strong> real-world Kaggle challenges into an executable gym
            for supervised fine-tuning, reinforcement learning, and frontier evaluation across{' '}
            <strong className="num">8</strong> LLMs.
          </p>
        </div>

        <div className="mledojo-layout">
          {/* Interactive Episode Rollout Simulator */}
          <div className="carbon-card">
            <div className="terminal-topbar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="terminal-topbar__title">
                mledojo://pomdp-rollout/episode-042.py
              </div>
              <button
                id="mledojo-autoplay-toggle"
                type="button"
                className="play-pill"
                onClick={() => setAutoPlay((v) => !v)}
                aria-label={autoPlay ? 'Pause rollout simulation' : 'Play rollout simulation'}
              >
                {autoPlay ? <Pause size={12} /> : <Play size={12} />}
                <span>{autoPlay ? 'Live Loop' : 'Paused'}</span>
              </button>
            </div>

            <div className="step-tabs" role="tablist" aria-label="POMDP trajectory steps">
              {EPISODE_STEPS.map((step, idx) => {
                const isSelected = idx === stepIdx;
                return (
                  <button
                    key={step.id}
                    id={`mledojo-step-${step.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`step-tab ${isSelected ? 'is-active' : ''}`}
                    onClick={() => {
                      setAutoPlay(false);
                      setStepIdx(idx);
                    }}
                  >
                    {step.stepTag}
                  </button>
                );
              })}
            </div>

            <div className="rollout-body">
              <div>
                <div
                  className="mono"
                  style={{ fontSize: '0.73rem', color: 'var(--gold)', marginBottom: '0.25rem' }}
                >
                  {active.phase}
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink-80)' }}>
                  {active.observation}
                </p>
              </div>

              <pre className="rollout-code">
                <code>{active.code}</code>
              </pre>

              <div className="rollout-telemetry">
                <div className="telemetry-cell">
                  <span className="telemetry-cell__label">{active.metricLabel}</span>
                  <span className="telemetry-cell__value num">{active.metricValue}</span>
                </div>
                <div className="telemetry-cell">
                  <span className="telemetry-cell__label">POMDP Shaped Reward</span>
                  <span className="telemetry-cell__value telemetry-cell__value--jade num">
                    {active.rewardDelta} ΔCV
                  </span>
                </div>
                <div className="telemetry-cell">
                  <span className="telemetry-cell__label">Training Regimes</span>
                  <span className="telemetry-cell__value">SFT + RL Policy</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--rule)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--ink-60)' }}>
                  Qiang, Zhuang, Li, Sagar V K, Zhang, Li, <strong style={{ color: 'var(--ink-100)' }}>Ian Shu-Hei Wong</strong> et al.
                </span>
                <a
                  id="mledojo-arxiv-link"
                  href="https://arxiv.org/abs/2505.07782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-carbon"
                  style={{ minHeight: '38px', padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                >
                  <ArxivMark size={15} />
                  <span>Read arXiv:2505.07782</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Exascale Hardware Photo + Benchmark Corpus Breakdown */}
          <div className="mledojo-side">
            <figure className="photo-well" style={{ margin: 0 }}>
              <img
                src={assetUrl('assets/frontier-compute.jpg')}
                alt="High-density liquid-cooled compute racks powering large-scale ML agent evaluation"
                loading="lazy"
                width="1280"
                height="800"
              />
              <figcaption className="photo-well__overlay">
                <span className="photo-well__tag">Executable Agent Sandboxes</span>
                <p className="photo-well__caption">
                  Isolated container execution across 8 frontier LLMs with reproducible leaderboard scoring.
                </p>
              </figcaption>
            </figure>

            <div className="carbon-card domain-card">
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--ink-60)'
                  }}
                >
                  Corpus Distribution · 200+ Real Competitions
                </div>

                <div className="domain-bars">
                  {BENCHMARK_DOMAINS.map((d) => (
                    <div key={d.name}>
                      <div className="domain-row__top">
                        <span className="domain-row__name">{d.name}</span>
                        <span className="domain-row__count num">{d.tasks}</span>
                      </div>
                      <div className="domain-track">
                        <div className="domain-fill" style={{ width: `${d.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="mono"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--ink-60)',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--rule)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>Venue: NeurIPS 2025</span>
                <span style={{ color: 'var(--jade)' }}>Open-Source Benchmark</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
