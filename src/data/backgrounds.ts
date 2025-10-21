// 25+ Background effects with independent controls

export type BackgroundType = 'solid' | 'linearGradient' | 'radialGradient' | 'conicGradient' | 'meshGradient' | 'animatedGradient' 
  | 'gradientWaves' | 'dotGrid' | 'lineGrid' | 'diagonalStripes' | 'hexagonMesh' | 'circuitBoard' 
  | 'starField' | 'matrixCode' | 'binaryRain' | 'geometricShapes'
  | 'waveBottom' | 'waveTop' | 'doubleWave' | 'particleExplosion' | 'aurora' 
  | 'clouds' | 'lightning' | 'rain' | 'snow' | 'fire';

export interface BackgroundEffect {
  id: string;
  name: string;
  type: BackgroundType;
  description: string;
  category: 'gradient' | 'pattern' | 'animated';
  defaultOpacity: number;
  supportsAnimation: boolean;
  supportsColorization: boolean;
  generateCSS: (config: Record<string, string | number>) => string;
}

export const BACKGROUND_EFFECTS: BackgroundEffect[] = [
  // ===== GRADIENT TYPES =====
  {
    id: 'solidColor',
    name: 'Solid Color',
    type: 'solid',
    description: 'Single solid background color',
    category: 'gradient',
    defaultOpacity: 1,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background: ${config.color || '#000000'};`,
  },
  {
    id: 'linearGradient',
    name: 'Linear Gradient',
    type: 'linearGradient',
    description: 'Classic linear color blend',
    category: 'gradient',
    defaultOpacity: 1,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background: linear-gradient(${config.angle || 45}deg, ${config.color1 || '#000'}, ${config.color2 || '#fff'});`,
  },
  {
    id: 'radialGradient',
    name: 'Radial Gradient',
    type: 'radialGradient',
    description: 'Circular color blend',
    category: 'gradient',
    defaultOpacity: 1,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background: radial-gradient(circle, ${config.color1 || '#000'}, ${config.color2 || '#fff'});`,
  },
  {
    id: 'conicGradient',
    name: 'Conic Gradient',
    type: 'conicGradient',
    description: 'Spinning color wheel',
    category: 'gradient',
    defaultOpacity: 1,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background: conic-gradient(from 0deg, ${config.color1 || '#f00'}, ${config.color2 || '#0f0'}, ${config.color3 || '#00f'}, ${config.color1 || '#f00'});`,
  },
  {
    id: 'animatedGradient',
    name: 'Animated Gradient',
    type: 'animatedGradient',
    description: 'Shifting gradient colors',
    category: 'gradient',
    defaultOpacity: 1,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background: linear-gradient(-45deg, ${config.color1}, ${config.color2}, ${config.color3});
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
    `,
  },

  // ===== PATTERN OVERLAYS =====
  {
    id: 'dotGrid',
    name: 'Dot Grid',
    type: 'dotGrid',
    description: 'Dotted pattern overlay',
    category: 'pattern',
    defaultOpacity: 0.3,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background-image: radial-gradient(circle, ${config.color || '#ffffff'} 1px, transparent 1px); background-size: 20px 20px;`,
  },
  {
    id: 'lineGrid',
    name: 'Line Grid',
    type: 'lineGrid',
    description: 'Graph paper pattern',
    category: 'pattern',
    defaultOpacity: 0.2,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: 
        linear-gradient(0deg, transparent 24%, ${config.color || '#ffffff'}aa 25%, ${config.color || '#ffffff'}aa 26%, transparent 27%, transparent 74%, ${config.color || '#ffffff'}aa 75%, ${config.color || '#ffffff'}aa 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, ${config.color || '#ffffff'}aa 25%, ${config.color || '#ffffff'}aa 26%, transparent 27%, transparent 74%, ${config.color || '#ffffff'}aa 75%, ${config.color || '#ffffff'}aa 76%, transparent 77%, transparent);
      background-size: 50px 50px;
    `,
  },
  {
    id: 'diagonalStripes',
    name: 'Diagonal Stripes',
    type: 'diagonalStripes',
    description: 'Angled line pattern',
    category: 'pattern',
    defaultOpacity: 0.2,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background: repeating-linear-gradient(45deg, transparent, transparent 35px, ${config.color || '#ffffff'}33 35px, ${config.color || '#ffffff'}33 70px);`,
  },
  {
    id: 'hexagonMesh',
    name: 'Hexagon Mesh',
    type: 'hexagonMesh',
    description: 'Honeycomb pattern',
    category: 'pattern',
    defaultOpacity: 0.15,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='${encodeURIComponent(config.bgColor || '#000')}'/%3E%3Cpath d='M20 0l20 11.547v23.094L20 40 0 28.453V5.36L20 0M20 3.232l-17.32 10v20l17.32 10 17.32-10v-20L20 3.232z' stroke='${encodeURIComponent(config.color || '#ffffff')}' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
      background-size: 40px 40px;
    `,
  },
  {
    id: 'circuitBoard',
    name: 'Circuit Board',
    type: 'circuitBoard',
    description: 'Tech circuit lines',
    category: 'pattern',
    defaultOpacity: 0.2,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: 
        linear-gradient(0deg, ${config.color || '#00ff00'}33 1px, transparent 1px),
        linear-gradient(90deg, ${config.color || '#00ff00'}33 1px, transparent 1px);
      background-size: 50px 50px;
    `,
  },
  {
    id: 'starField',
    name: 'Star Field',
    type: 'starField',
    description: 'Random star pattern',
    category: 'pattern',
    defaultOpacity: 1,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background-image: radial-gradient(2px 2px at 20% 30%, ${config.color || '#ffff00'}, rgba(0,0,0,0)), radial-gradient(2px 2px at 60% 70%, white, rgba(0,0,0,0));`,
  },
  {
    id: 'matrixCode',
    name: 'Matrix Code',
    type: 'matrixCode',
    description: 'Falling matrix characters',
    category: 'pattern',
    defaultOpacity: 0.1,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-size='12' fill='${encodeURIComponent(config.color || '#00ff00')}' opacity='0.3'%3E0%3C/text%3E%3Ctext x='30' y='50' font-size='12' fill='${encodeURIComponent(config.color || '#00ff00')}' opacity='0.2'%3E1%3C/text%3E%3C/svg%3E");
      background-size: 100px 100px;
    `,
  },
  {
    id: 'binaryRain',
    name: 'Binary Rain',
    type: 'binaryRain',
    description: 'Falling 0s and 1s',
    category: 'pattern',
    defaultOpacity: 0.15,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='15' font-size='10' fill='${encodeURIComponent(config.color || '#0f0')}' opacity='0.4'%3E1%3C/text%3E%3Ctext x='25' y='40' font-size='10' fill='${encodeURIComponent(config.color || '#0f0')}' opacity='0.3'%3E0%3C/text%3E%3Ctext x='45' y='65' font-size='10' fill='${encodeURIComponent(config.color || '#0f0')}' opacity='0.2'%3E1%3C/text%3E%3C/svg%3E");
      background-size: 80px 80px;
      animation: matrixRain 20s linear infinite;
    `,
  },
  {
    id: 'geometricShapes',
    name: 'Geometric Shapes',
    type: 'geometricShapes',
    description: 'Random polygons',
    category: 'pattern',
    defaultOpacity: 0.1,
    supportsAnimation: false,
    supportsColorization: true,
    generateCSS: (config) => `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect x='10' y='10' width='30' height='30' fill='${encodeURIComponent(config.color || '#ff00ff')}' opacity='0.2'/%3E%3Ccircle cx='70' cy='30' r='20' fill='${encodeURIComponent(config.color || '#00ffff')}' opacity='0.2'/%3E%3Cpolygon points='50,5 80,40 50,75 20,40' fill='${encodeURIComponent(config.color || '#ffff00')}' opacity='0.2'/%3E%3C/svg%3E"); background-size: 100px 100px;`,
  },

  // ===== ANIMATED BACKGROUNDS =====
  {
    id: 'waveBottom',
    name: 'Wave Bottom',
    type: 'waveBottom',
    description: 'Ocean wave at bottom',
    category: 'animated',
    defaultOpacity: 0.3,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z' fill='${encodeURIComponent(config.color || '#ffffff')}'/%3E%3C/svg%3E") repeat-x bottom;
      background-size: 600px 120px;
      animation: wave 15s linear infinite;
    `,
  },
  {
    id: 'waveTop',
    name: 'Wave Top',
    type: 'waveTop',
    description: 'Inverted wave at top',
    category: 'animated',
    defaultOpacity: 0.3,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,70 Q300,120 600,70 T1200,70 L1200,0 L0,0 Z' fill='${encodeURIComponent(config.color || '#ffffff')}'/%3E%3C/svg%3E") repeat-x top;
      background-size: 600px 120px;
      animation: wave 15s linear infinite reverse;
    `,
  },
  {
    id: 'doubleWave',
    name: 'Double Wave',
    type: 'doubleWave',
    description: 'Waves on both sides',
    category: 'animated',
    defaultOpacity: 0.2,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: () => `
      background: 
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z' fill='${encodeURIComponent('#ffffff')}'/%3E%3C/svg%3E") repeat-x bottom,
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,70 Q300,120 600,70 T1200,70 L1200,0 L0,0 Z' fill='${encodeURIComponent('#ffffff')}'/%3E%3C/svg%3E") repeat-x top;
      background-size: 600px 120px, 600px 120px;
      animation: wave 15s linear infinite;
    `,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    type: 'aurora',
    description: 'Northern lights effect',
    category: 'animated',
    defaultOpacity: 0.4,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: () => `
      background: linear-gradient(180deg, rgba(0,255,136,0.1) 0%, rgba(0,255,200,0.05) 50%, transparent 100%);
      animation: aurora 8s ease-in-out infinite;
    `,
  },
  {
    id: 'clouds',
    name: 'Clouds',
    type: 'clouds',
    description: 'Floating clouds',
    category: 'animated',
    defaultOpacity: 0.2,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'%3E%3Ccircle cx='20' cy='25' r='10' fill='${encodeURIComponent(config.color || '#ffffff')}'/%3E%3Ccircle cx='30' cy='20' r='12' fill='${encodeURIComponent(config.color || '#ffffff')}'/%3E%3Ccircle cx='40' cy='25' r='10' fill='${encodeURIComponent(config.color || '#ffffff')}'/%3E%3C/svg%3E");
      background-size: 100px 50px;
      animation: float 20s linear infinite;
    `,
  },
  {
    id: 'rain',
    name: 'Rain',
    type: 'rain',
    description: 'Falling rain drops',
    category: 'animated',
    defaultOpacity: 0.15,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: linear-gradient(to bottom, transparent 0%, transparent 50%, ${config.color || '#ffffff'}20 50%, ${config.color || '#ffffff'}20 100%);
      background-size: 100% 100px;
      animation: rain 0.5s linear infinite;
    `,
  },
  {
    id: 'snow',
    name: 'Snow',
    type: 'snow',
    description: 'Falling snowflakes',
    category: 'animated',
    defaultOpacity: 0.2,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: (config) => `
      background-image: radial-gradient(2px 2px at 20px 30px, ${config.color || '#ffffff'}, rgba(0,0,0,0)), radial-gradient(2px 2px at 60px 70px, white, rgba(0,0,0,0));
      background-repeat: repeat;
      background-size: 200px 200px;
      animation: snowfall 10s linear infinite;
    `,
  },
  {
    id: 'fire',
    name: 'Fire',
    type: 'fire',
    description: 'Flame effect',
    category: 'animated',
    defaultOpacity: 0.3,
    supportsAnimation: true,
    supportsColorization: true,
    generateCSS: () => `
      background: linear-gradient(180deg, rgba(255,200,0,0.3) 0%, rgba(255,100,0,0.2) 50%, rgba(255,0,0,0.1) 100%);
      animation: flicker 0.15s linear infinite;
    `,
  },
];

export const BACKGROUND_CATEGORIES = {
  gradient: BACKGROUND_EFFECTS.filter(b => b.category === 'gradient'),
  pattern: BACKGROUND_EFFECTS.filter(b => b.category === 'pattern'),
  animated: BACKGROUND_EFFECTS.filter(b => b.category === 'animated'),
};
