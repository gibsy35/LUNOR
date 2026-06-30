export interface ShowcaseProject {
  id: string;
  title: string;
  category: 'aftermovies' | 'mariages' | 'promotions' | 'artistes';
  subtitle: string;
  tagline: string;
  director: string;
  year: string;
  duration: string;
  aspectRatio: string;
  location: string;
  camera: string;
  lenses: string;
  colorGrade: string[];
  colorDescription?: string;
  synopsis?: string;
  scriptSnippet?: string;
  image: string;
  video?: string;
  client?: string;
  agency?: string;
}

export interface CameraModel {
  id: string;
  name: string;
  manufacturer: string;
  sensor: string;
  maxResolution: string;
  nativeISO: string;
  description: string;
  rentCostPerDay: number;
}

export interface LensModel {
  id: string;
  name: string;
  type: 'anamorphic' | 'spherical';
  look: string;
  maxAperture: string;
  description: string;
  rentCostPerDay: number;
}

export interface ScriptTemplate {
  id: string;
  title: string;
  genre: string;
  tone: string;
  scriptText: string;
}
