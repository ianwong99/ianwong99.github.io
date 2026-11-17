import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, FileText, Search, Sparkles, X } from 'lucide-react';
import { ManifoldMode } from './CarbonManifoldCanvas';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectMode: (mode: ManifoldMode) => void;
  onCopyEmail: () => void;
}

interface PaletteAction {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
  icon?: React.ReactNode;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onSelectMode,
  onCopyEmail
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const actions: PaletteAction[] = useMemo(
    () => [
      {
        id: 'copy-email',
        label: 'Copy email address (ianwong.gatech@gmail.com)',
        hint: 'Copy',
        keywords: 'email contact hire mail reach',
        icon: <Copy size={15} />,
        run: () => {
          onCopyEmail();
          onClose();
        }
      },
      {
        id: 'open-paper',
        label: 'Read NeurIPS 2025 MLE-Dojo Paper',
        hint: 'arXiv:2505.07782',
        keywords: 'paper neurips research mledojo pomdp stanford gatech',
        icon: <ArrowUpRight size={15} />,
        run: () => {
          window.open('https://arxiv.org/abs/2505.07782', '_blank', 'noopener,noreferrer');
          onClose();
        }
      },
      {
        id: 'open-filebot',
        label: 'Open FileBot Nova GitHub Repository',
        hint: 'github.com/ianwong99/filebot',
        keywords: 'filebot nova macos windows native kdrama tmdb gemini',
        icon: <ArrowUpRight size={15} />,
        run: () => {
          window.open('https://github.com/ianwong99/filebot', '_blank', 'noopener,noreferrer');
          onClose();
        }
      },
      {
        id: 'open-cv',
        label: 'Open Curriculum Vitae (PDF)',
        hint: 'cv.pdf',
        keywords: 'resume cv pdf download education aws',
        icon: <FileText size={15} />,
        run: () => {
          window.open(`${import.meta.env.BASE_URL}cv.pdf`, '_blank', 'noopener,noreferrer');
          onClose();
        }
      },
      {
        id: 'open-linkedin',
        label: 'Connect on LinkedIn',
        hint: 'in/ian-wong-gt',
        keywords: 'linkedin social profile',
        icon: <ArrowUpRight size={15} />,
        run: () => {
          window.open('https://www.linkedin.com/in/ian-wong-gt/', '_blank', 'noopener,noreferrer');
          onClose();
        }
      },
      {
        id: 'shader-rollout',
        label: 'Switch 3D Manifold -> RL Trajectory Wave',
        hint: 'WebGL Shader',
        keywords: 'threejs shader 3d wave rollout mode',
        icon: <Sparkles size={15} />,
        run: () => {
          onSelectMode('rollout');
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }
      },
      {
        id: 'jump-systems',
        label: 'Jump to Interactive FileBot Nova Resolver',
        hint: '#systems',
        keywords: 'sandbox test filename renamer systems',
        icon: <Check size={15} />,
        run: () => {
          document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }
      }
    ],
    [onClose, onCopyEmail, onSelectMode]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.keywords.includes(q) || a.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  if (!open) return null;

  return (
    <div
      className="palette-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation and actions"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="palette-modal">
        <div className="palette-search-wrap">
          <Search size={16} style={{ color: 'var(--ink-60)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            className="palette-input"
            placeholder="Jump to paper, live sandbox, CV, or copy email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            id="command-palette-close"
            type="button"
            onClick={onClose}
            aria-label="Close command menu"
            style={{
              width: '32px',
              height: '32px',
              display: 'grid',
              placeItems: 'center',
              borderRadius: '8px',
              color: 'var(--ink-60)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="palette-list">
          {filtered.map((item) => (
            <button
              key={item.id}
              id={`palette-action-${item.id}`}
              type="button"
              className="palette-item"
              onClick={item.run}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold)', display: 'inline-flex' }}>{item.icon}</span>
                <span>{item.label}</span>
              </span>
              <span className="palette-item__hint">{item.hint}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div
              className="mono"
              style={{ padding: '1.25rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--ink-60)' }}
            >
              No matching command found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
