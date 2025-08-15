import { SentimentData, AlertData } from '../types';
import { mockSentimentData } from '../data/mockData';

class RealTimeService {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private isConnected = false;

  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        console.log('Real-time service connected');
        resolve();
      }, 1000);
    });
  }

  disconnect(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.listeners.clear();
    this.isConnected = false;
    console.log('Real-time service disconnected');
  }

  subscribe<T>(channel: string, callback: (data: T) => void): () => void {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, new Set());
    }
    
    this.listeners.get(channel)!.add(callback);
    
    this.startChannelUpdates(channel);

    return () => {
      const channelListeners = this.listeners.get(channel);
      if (channelListeners) {
        channelListeners.delete(callback);
        if (channelListeners.size === 0) {
          this.stopChannelUpdates(channel);
          this.listeners.delete(channel);
        }
      }
    };
  }

  private startChannelUpdates(channel: string): void {
    if (this.intervals.has(channel)) return;

    const updateInterval = this.getUpdateInterval(channel);
    const interval = setInterval(() => {
      this.generateUpdate(channel);
    }, updateInterval);

    this.intervals.set(channel, interval);
  }

  private stopChannelUpdates(channel: string): void {
    const interval = this.intervals.get(channel);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(channel);
    }
  }

  private getUpdateInterval(channel: string): number {
    const intervals: Record<string, number> = {
      'sentiment-live': 5000,       // 5 seconds
      'alerts-live': 10000,         // 10 seconds
      'trends-live': 30000,         // 30 seconds
      'metrics-live': 15000,        // 15 seconds
      'influencers-live': 60000     // 1 minute
    };
    
    return intervals[channel] || 30000;
  }

  private generateUpdate(channel: string): void {
    const listeners = this.listeners.get(channel);
    if (!listeners || listeners.size === 0) return;

    let data: any;

    switch (channel) {
      case 'sentiment-live':
        data = this.generateSentimentUpdate();
        break;
      case 'alerts-live':
        data = this.generateAlertUpdate();
        break;
      case 'trends-live':
        data = this.generateTrendUpdate();
        break;
      case 'metrics-live':
        data = this.generateMetricsUpdate();
        break;
      case 'influencers-live':
        data = this.generateInfluencerUpdate();
        break;
      default:
        return;
    }

    listeners.forEach(callback => callback(data));
  }

  private generateSentimentUpdate(): { type: 'sentiment-update'; data: SentimentData[] } {
    const updatedData = mockSentimentData.map(item => ({
      ...item,
      sentiment: Math.max(0, Math.min(1, item.sentiment + (Math.random() - 0.5) * 0.1)),
      intensity: Math.max(0, Math.min(1, item.intensity + (Math.random() - 0.5) * 0.15))
    }));

    return {
      type: 'sentiment-update',
      data: updatedData
    };
  }

  private generateAlertUpdate(): { type: 'new-alert'; data: AlertData } | null {
    if (Math.random() < 0.3) { // 30% chance of new alert
      const issues = ['Jobs', 'Infrastructure', 'Health', 'Education', 'Law & Order'];
      const wards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'];
      const severities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
      
      const alertTitles = [
        'Sentiment spike detected',
        'Negative trend emerging', 
        'Positive feedback increasing',
        'Discussion volume surge',
        'Regional sentiment shift'
      ];

      const newAlert: AlertData = {
        id: `alert-${Date.now()}`,
        title: alertTitles[Math.floor(Math.random() * alertTitles.length)],
        description: `Real-time alert generated at ${new Date().toLocaleTimeString()}`,
        severity: severities[Math.floor(Math.random() * severities.length)],
        timestamp: new Date(),
        issue: Math.random() > 0.3 ? issues[Math.floor(Math.random() * issues.length)] : undefined,
        ward: Math.random() > 0.4 ? wards[Math.floor(Math.random() * wards.length)] : undefined
      };

      return {
        type: 'new-alert',
        data: newAlert
      };
    }
    
    return null;
  }

  private generateTrendUpdate(): { type: 'trend-update'; data: any } {
    const currentTime = new Date();
    const timeLabel = currentTime.toISOString().split('T')[0];
    
    return {
      type: 'trend-update',
      data: {
        date: timeLabel,
        jobs: 0.5 + Math.random() * 0.4,
        infrastructure: 0.4 + Math.random() * 0.4,
        health: 0.6 + Math.random() * 0.3,
        education: 0.5 + Math.random() * 0.3,
        lawOrder: 0.4 + Math.random() * 0.4
      }
    };
  }

  private generateMetricsUpdate(): { type: 'metrics-update'; data: any } {
    return {
      type: 'metrics-update',
      data: {
        overallSentiment: Math.round((0.6 + Math.random() * 0.3) * 100),
        activeConversations: Math.round(12000 + Math.random() * 2000),
        criticalAlerts: Math.floor(Math.random() * 5),
        lastUpdate: new Date().toISOString(),
        engagement: {
          twitter: Math.round(80 + Math.random() * 15),
          facebook: Math.round(70 + Math.random() * 20),
          instagram: Math.round(75 + Math.random() * 15)
        }
      }
    };
  }

  private generateInfluencerUpdate(): { type: 'influencer-update'; data: any } {
    return {
      type: 'influencer-update',
      data: {
        id: `influencer-${Date.now()}`,
        activity: 'New post with high engagement',
        platform: ['Twitter', 'Facebook', 'Instagram'][Math.floor(Math.random() * 3)],
        sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
        reach: Math.round(10000 + Math.random() * 50000),
        timestamp: new Date()
      }
    };
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  simulateConnectionIssue(): void {
    this.isConnected = false;
    setTimeout(() => {
      this.isConnected = true;
      console.log('Connection restored');
    }, 5000);
  }
}

export const realTimeService = new RealTimeService();