export interface ZodiacSign {
  name: string;
  thaiName: string;
  element: ZodiacElement;
  quality: ZodiacQuality;
  ruler: Planet;
  symbol: string;
  dateRange: {
    start: { month: number; day: number };
    end: { month: number; day: number };
  };
}

export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';
export type ZodiacQuality = 'cardinal' | 'fixed' | 'mutable';

export interface Planet {
  name: string;
  thaiName: string;
  symbol: string;
  type: 'classical' | 'modern' | 'uranian';
}

export interface Aspect {
  type: AspectType;
  angle: number;
  orb: number;
  planet1: string;
  planet2: string;
  influence: 'positive' | 'negative' | 'neutral';
}

export type AspectType =
  | 'conjunction'
  | 'sextile'
  | 'square'
  | 'trine'
  | 'opposition';

export interface Compatibility {
  sign1: string;
  sign2: string;
  scores: {
    love: number;
    friendship: number;
    work: number;
  };
  aspects: Aspect[];
  analysis: {
    general: string;
    strengths: string[];
    challenges: string[];
    advice: string;
  };
}

export interface AstrologyChart {
  ascendant: string;
  midheaven: string;
  houses: House[];
  planets: PlanetPosition[];
  aspects: Aspect[];
}

export interface House {
  number: number;
  sign: string;
  cusp: number;
  planets: string[];
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  house: number;
  degree: number;
  isRetrograde: boolean;
}

// Uranian Astrology specific types
export interface UranianPoint {
  name: string;
  thaiName: string;
  calculation: string;
  interpretation: string;
}

export interface MidPoint {
  point1: string;
  point2: string;
  position: number;
  interpretation: string;
}

export interface TransitPeriod {
  startDate: Date;
  endDate: Date;
  activePlanets: string[];
  significance: string;
  advice: string;
}
