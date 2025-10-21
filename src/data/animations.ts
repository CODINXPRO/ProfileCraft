// 30+ Text Animations with full customization

export type AnimationEasing = string; // Allows any easing function including steps()

export interface Animation {
  id: string;
  name: string;
  category: 'entrance' | 'continuous' | 'special';
  description: string;
  keyframes: string;
  defaultDuration: number;
  defaultDelay: number;
  defaultEasing: AnimationEasing;
  supportsIntensity: boolean;
  supportsDirection: boolean;
}

export const ANIMATIONS: Record<string, Animation> = {
  // ===== ENTRANCE ANIMATIONS =====
  fadeIn: {
    id: 'fadeIn',
    name: 'Fade In',
    category: 'entrance',
    description: 'Classic opacity transition',
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    defaultDuration: 1,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: false,
    supportsDirection: false,
  },
  slideLeft: {
    id: 'slideLeft',
    name: 'Slide Left',
    category: 'entrance',
    description: 'Slides from right edge',
    keyframes: `
      @keyframes slideLeft {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
    defaultDuration: 0.8,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  slideRight: {
    id: 'slideRight',
    name: 'Slide Right',
    category: 'entrance',
    description: 'Slides from left edge',
    keyframes: `
      @keyframes slideRight {
        from { opacity: 0; transform: translateX(-100px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
    defaultDuration: 0.8,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  slideUp: {
    id: 'slideUp',
    name: 'Slide Up',
    category: 'entrance',
    description: 'Rises from bottom',
    keyframes: `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(100px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    defaultDuration: 0.8,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  slideDown: {
    id: 'slideDown',
    name: 'Slide Down',
    category: 'entrance',
    description: 'Drops from top',
    keyframes: `
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-100px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    defaultDuration: 0.8,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  zoomIn: {
    id: 'zoomIn',
    name: 'Zoom In',
    category: 'entrance',
    description: 'Scales from tiny to normal',
    keyframes: `
      @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.3); }
        to { opacity: 1; transform: scale(1); }
      }
    `,
    defaultDuration: 0.6,
    defaultDelay: 0,
    defaultEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    supportsIntensity: true,
    supportsDirection: false,
  },
  zoomOut: {
    id: 'zoomOut',
    name: 'Zoom Out',
    category: 'entrance',
    description: 'Scales from huge to normal',
    keyframes: `
      @keyframes zoomOut {
        from { opacity: 0; transform: scale(2); }
        to { opacity: 1; transform: scale(1); }
      }
    `,
    defaultDuration: 0.6,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  typewriter: {
    id: 'typewriter',
    name: 'Typewriter',
    category: 'entrance',
    description: 'Types character by character',
    keyframes: `
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
    `,
    defaultDuration: 3,
    defaultDelay: 0,
    defaultEasing: 'steps(40, end)',
    supportsIntensity: false,
    supportsDirection: false,
  },
  glitch: {
    id: 'glitch',
    name: 'Glitch',
    category: 'entrance',
    description: 'Digital glitch effect with color shift',
    keyframes: `
      @keyframes glitch {
        0% { opacity: 0; transform: translate(-2px, -2px); }
        20% { opacity: 1; transform: translate(2px, 2px); color: #FF10F0; }
        40% { transform: translate(-2px, 2px); color: #00FFFF; }
        60% { transform: translate(2px, -2px); color: #FF10F0; }
        80% { opacity: 1; transform: translate(-1px, 1px); }
        100% { opacity: 1; transform: translate(0, 0); }
      }
    `,
    defaultDuration: 0.6,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: true,
    supportsDirection: false,
  },
  bounceIn: {
    id: 'bounceIn',
    name: 'Bounce In',
    category: 'entrance',
    description: 'Bouncy elastic entrance',
    keyframes: `
      @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
    `,
    defaultDuration: 0.7,
    defaultDelay: 0,
    defaultEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    supportsIntensity: true,
    supportsDirection: false,
  },
  rotateIn: {
    id: 'rotateIn',
    name: 'Rotate In',
    category: 'entrance',
    description: 'Spins while fading in',
    keyframes: `
      @keyframes rotateIn {
        from { opacity: 0; transform: rotate(-45deg) scale(0.5); }
        to { opacity: 1; transform: rotate(0) scale(1); }
      }
    `,
    defaultDuration: 0.8,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  split: {
    id: 'split',
    name: 'Split',
    category: 'entrance',
    description: 'Text splits from center',
    keyframes: `
      @keyframes split {
        0% { opacity: 0; transform: translateX(-50px); }
        50% { transform: translateX(0px); }
        100% { opacity: 1; transform: translateX(0px); }
      }
    `,
    defaultDuration: 1,
    defaultDelay: 0,
    defaultEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    supportsIntensity: true,
    supportsDirection: false,
  },
  waveIn: {
    id: 'waveIn',
    name: 'Wave In',
    category: 'entrance',
    description: 'Letters wave in sequence',
    keyframes: `
      @keyframes waveIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `,
    defaultDuration: 1.2,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: false,
    supportsDirection: false,
  },
  blurIn: {
    id: 'blurIn',
    name: 'Blur In',
    category: 'entrance',
    description: 'Focuses from blurry',
    keyframes: `
      @keyframes blurIn {
        from { opacity: 0; filter: blur(20px); }
        to { opacity: 1; filter: blur(0); }
      }
    `,
    defaultDuration: 0.8,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },

  // ===== CONTINUOUS ANIMATIONS =====
  pulse: {
    id: 'pulse',
    name: 'Pulse',
    category: 'continuous',
    description: 'Breathing scale effect',
    keyframes: `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
      }
    `,
    defaultDuration: 2,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  glow: {
    id: 'glow',
    name: 'Glow',
    category: 'continuous',
    description: 'Neon breathing glow',
    keyframes: `
      @keyframes glow {
        0%, 100% { text-shadow: 0 0 5px currentColor; }
        50% { text-shadow: 0 0 20px currentColor; }
      }
    `,
    defaultDuration: 2,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  float: {
    id: 'float',
    name: 'Float',
    category: 'continuous',
    description: 'Gentle up/down motion',
    keyframes: `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `,
    defaultDuration: 3,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  shake: {
    id: 'shake',
    name: 'Shake',
    category: 'continuous',
    description: 'Subtle vibration',
    keyframes: `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        50% { transform: translateX(3px); }
        75% { transform: translateX(-3px); }
      }
    `,
    defaultDuration: 0.5,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: true,
    supportsDirection: false,
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow',
    category: 'continuous',
    description: 'Color cycling through spectrum',
    keyframes: `
      @keyframes rainbow {
        0% { color: #FF0000; }
        16.67% { color: #FF7F00; }
        33.33% { color: #FFFF00; }
        50% { color: #00FF00; }
        66.67% { color: #0000FF; }
        83.33% { color: #4B0082; }
        100% { color: #FF0000; }
      }
    `,
    defaultDuration: 3,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: false,
    supportsDirection: false,
  },
  flicker: {
    id: 'flicker',
    name: 'Flicker',
    category: 'continuous',
    description: 'Neon sign flicker effect',
    keyframes: `
      @keyframes flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
        20%, 24%, 55% { opacity: 0.3; }
      }
    `,
    defaultDuration: 0.15,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: true,
    supportsDirection: false,
  },
  waveText: {
    id: 'waveText',
    name: 'Wave Text',
    category: 'continuous',
    description: 'Letters bob up and down in sequence',
    keyframes: `
      @keyframes waveText {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
    `,
    defaultDuration: 0.6,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  rotateLoop: {
    id: 'rotateLoop',
    name: 'Rotate Loop',
    category: 'continuous',
    description: 'Slow continuous rotation',
    keyframes: `
      @keyframes rotateLoop {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
    defaultDuration: 4,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: false,
    supportsDirection: false,
  },
  gradientShift: {
    id: 'gradientShift',
    name: 'Gradient Shift',
    category: 'continuous',
    description: 'Text color gradient animates',
    keyframes: `
      @keyframes gradientShift {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `,
    defaultDuration: 4,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: false,
    supportsDirection: false,
  },
  glitchLoop: {
    id: 'glitchLoop',
    name: 'Glitch Loop',
    category: 'continuous',
    description: 'Constant glitching effect',
    keyframes: `
      @keyframes glitchLoop {
        0%, 100% { transform: translate(0, 0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
      }
    `,
    defaultDuration: 0.3,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: true,
    supportsDirection: false,
  },

  // ===== CREATIVE/SPECIAL ANIMATIONS =====
  matrixRain: {
    id: 'matrixRain',
    name: 'Matrix Rain',
    category: 'special',
    description: 'Characters rain down then form text',
    keyframes: `
      @keyframes matrixRain {
        0% { opacity: 0; transform: translateY(-100px); }
        70% { opacity: 1; }
        100% { opacity: 1; transform: translateY(0); }
      }
    `,
    defaultDuration: 1.5,
    defaultDelay: 0,
    defaultEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    supportsIntensity: false,
    supportsDirection: false,
  },
  pixelDissolve: {
    id: 'pixelDissolve',
    name: 'Pixel Dissolve',
    category: 'special',
    description: 'Forms from pixel blocks',
    keyframes: `
      @keyframes pixelDissolve {
        0% { opacity: 0; filter: pixelate(8px); }
        100% { opacity: 1; filter: pixelate(0px); }
      }
    `,
    defaultDuration: 1.2,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  particleForm: {
    id: 'particleForm',
    name: 'Particle Form',
    category: 'special',
    description: 'Text forms from particles',
    keyframes: `
      @keyframes particleForm {
        0% { opacity: 0; filter: blur(10px); transform: scale(0.8); }
        100% { opacity: 1; filter: blur(0); transform: scale(1); }
      }
    `,
    defaultDuration: 1.5,
    defaultDelay: 0,
    defaultEasing: 'ease-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  neonTube: {
    id: 'neonTube',
    name: 'Neon Tube',
    category: 'special',
    description: 'Draws like neon tube light',
    keyframes: `
      @keyframes neonTube {
        0% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; opacity: 0; }
        50% { opacity: 0.5; }
        100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor; opacity: 1; }
      }
    `,
    defaultDuration: 1,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  hologram: {
    id: 'hologram',
    name: 'Hologram',
    category: 'special',
    description: 'Holographic flicker effect',
    keyframes: `
      @keyframes hologram {
        0%, 100% { opacity: 1; filter: hue-rotate(0deg); }
        25% { opacity: 0.8; filter: hue-rotate(90deg); }
        50% { opacity: 0.6; filter: hue-rotate(180deg); }
        75% { opacity: 0.8; filter: hue-rotate(270deg); }
      }
    `,
    defaultDuration: 2,
    defaultDelay: 0,
    defaultEasing: 'ease-in-out',
    supportsIntensity: true,
    supportsDirection: false,
  },
  cyberpunkScan: {
    id: 'cyberpunkScan',
    name: 'Cyberpunk Scan',
    category: 'special',
    description: 'Scanning line effect',
    keyframes: `
      @keyframes cyberpunkScan {
        0% { 
          background-position: 0% 0%;
          text-shadow: 0 0 10px #FF10F0;
        }
        50% {
          background-position: 100% 100%;
          text-shadow: 0 0 20px #00FFFF;
        }
        100% {
          background-position: 0% 0%;
          text-shadow: 0 0 10px #FF10F0;
        }
      }
    `,
    defaultDuration: 2,
    defaultDelay: 0,
    defaultEasing: 'linear',
    supportsIntensity: true,
    supportsDirection: false,
  },
};

export const ANIMATION_CATEGORIES = {
  entrance: Object.values(ANIMATIONS).filter(a => a.category === 'entrance'),
  continuous: Object.values(ANIMATIONS).filter(a => a.category === 'continuous'),
  special: Object.values(ANIMATIONS).filter(a => a.category === 'special'),
};

export const EASING_OPTIONS: Record<string, AnimationEasing> = {
  Linear: 'linear',
  'Ease In': 'ease-in',
  'Ease Out': 'ease-out',
  'Ease In-Out': 'ease-in-out',
  'Bounce (elastic)': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'Overshoot': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
