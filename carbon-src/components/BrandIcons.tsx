import React from 'react';
import {
  siPython,
  siPytorch,
  siTensorflow,
  siGo,
  siCplusplus,
  siTypescript,
  siReact,
  siNextdotjs,
  siD3,
  siApachespark,
  siApple,
  siGooglegemini,
  siGithub,
  siArxiv,
  siDocker,
  siLinux,
  siSqlite
} from 'simple-icons';

interface SimpleIconDef {
  title: string;
  path: string;
}

export const TECH_STACK_ICONS: Array<{ label: string; icon: SimpleIconDef; domain: string }> = [
  { label: 'PyTorch', icon: siPytorch, domain: 'RL & Deep Learning' },
  { label: 'Python', icon: siPython, domain: 'ML & AWS Automation' },
  { label: 'Go', icon: siGo, domain: 'Cloud Release E2E' },
  { label: 'Google Gemini', icon: siGooglegemini, domain: 'FileBot Nova 3.8 Flash' },
  { label: 'C++', icon: siCplusplus, domain: 'Systems & Simulation' },
  { label: 'TensorFlow', icon: siTensorflow, domain: 'Neural Architectures' },
  { label: 'Apache Spark', icon: siApachespark, domain: '1M-Row Distributed Data' },
  { label: 'Apple AppKit', icon: siApple, domain: '153 KB macOS Native' },
  { label: 'TypeScript', icon: siTypescript, domain: 'Typed Interfaces' },
  { label: 'React', icon: siReact, domain: 'Interactive Systems' },
  { label: 'Next.js', icon: siNextdotjs, domain: 'Full-Stack Web' },
  { label: 'D3.js', icon: siD3, domain: 'Visual Analytics' },
  { label: 'Linux', icon: siLinux, domain: 'Ubuntu AMI Pipelines' },
  { label: 'Docker', icon: siDocker, domain: 'POMDP Sandboxes' },
  { label: 'SQLite / SQL', icon: siSqlite, domain: 'Relational Engines' }
];

export const SimpleSvgIcon: React.FC<{
  icon: SimpleIconDef;
  size?: number;
  className?: string;
}> = ({ icon, size = 16, className }) => (
  <svg
    role="img"
    aria-label={icon.title}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d={icon.path} />
  </svg>
);

export const GithubMark: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <SimpleSvgIcon icon={siGithub} size={size} />
);

export const ArxivMark: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <SimpleSvgIcon icon={siArxiv} size={size} />
);

export const NeuripsMark: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="13.5" stroke="#E5B454" strokeWidth="1.6" strokeOpacity="0.65" />
    <path
      d="M9.5 21.5V10.5L22.5 21.5V10.5"
      stroke="#F5F3EE"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9.5" cy="10.5" r="2" fill="#E5B454" />
    <circle cx="22.5" cy="21.5" r="2" fill="#34D399" />
  </svg>
);
