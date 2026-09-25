import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.3-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5Z" />
  </svg>
);

export const PauseIcon = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <rect x="6.5" y="5" width="3.5" height="14" rx="0.8" />
    <rect x="14" y="5" width="3.5" height="14" rx="0.8" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const VolumeOn = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
);

export const VolumeOff = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);

export const YoutubeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 8.2a2.6 2.6 0 0 0-1.8-1.9C17.6 6 12 6 12 6s-5.6 0-7.2.3A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.7 12c0 1.3.1 2.6.3 3.8a2.6 2.6 0 0 0 1.8 1.9C6.4 18 12 18 12 18s5.6 0 7.2-.3a2.6 2.6 0 0 0 1.8-1.9c.2-1.2.3-2.5.3-3.8s-.1-2.6-.3-3.8Z" />
    <path d="m10.2 14.6 4.4-2.6-4.4-2.6z" fill="currentColor" />
  </svg>
);

export const TiktokIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3" />
    <path d="M14 3.5a4.8 4.8 0 0 0 4.8 4.8" />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.5 8H16V4.6h-2.3A3.7 3.7 0 0 0 10 8.3V11H8v3.3h2V21h3.3v-6.7h2.3L16 11h-2.7V8.9a.9.9 0 0 1 .9-.9Z" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
