export interface SentimentData {
  issue: string;
  sentiment: number;
  polarity: 'positive' | 'negative' | 'neutral';
  intensity: number;
  emotion?: 'anger' | 'trust' | 'fear' | 'hope' | 'pride';
}

export interface TrendData {
  date: string;
  jobs: number;
  infrastructure: number;
  health: number;
  education: number;
  lawOrder: number;
}

export interface CompetitorData {
  issue: string;
  candidateA: number;
  candidateB: number;
}

export interface HeatmapData {
  ward: string;
  issue: string;
  sentiment: number;
}

export interface InfluencerData {
  id: string;
  name: string;
  type: 'positive' | 'neutral' | 'critical';
  engagement: number;
  reach: number;
  platform: string;
}

export interface AlertData {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  ward?: string;
  issue?: string;
}