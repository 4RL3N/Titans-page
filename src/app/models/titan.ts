export interface TitanData {
  id: number;
  name: string;
  img: string;
  height: string;
  abilities: string[];
  allegiance: string;
  description?: string;
}

export interface TitanMetrics {
  strength: number;
  speed: number;
  size: number;
  hardness: number;
}

export interface Titan extends TitanData {
  metrics: TitanMetrics;
  isShifter: boolean;
}

