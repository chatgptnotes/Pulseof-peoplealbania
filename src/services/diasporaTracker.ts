/**
 * Albanian Diaspora Influence Tracker
 * Monitors online participation of Albanian diaspora communities
 * and tracks cross-border narrative flows
 */

export interface DiasporaLocation {
  country: string;
  countryCode: string;
  population: number;
  mainCities: string[];
  socialPlatforms: string[];
  influence: 'high' | 'medium' | 'low';
}

export interface DiasporaPost {
  id: string;
  location: DiasporaLocation;
  platform: string;
  content: string;
  author: string;
  timestamp: Date;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  sentiment: 'positive' | 'negative' | 'neutral';
  topics: string[];
  narrativeType: 'domestic' | 'external' | 'hybrid';
  influence_score: number;
}

export interface NarrativeFlow {
  origin: string;
  destination: string;
  narrative: string;
  strength: number;
  timeline: Date[];
  platforms: string[];
}

export interface DiasporaMetrics {
  totalPopulation: number;
  activeUsers: number;
  engagementRate: number;
  topNarratives: string[];
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
  crossBorderFlows: NarrativeFlow[];
  influenceIndex: number;
}

class DiasporaTracker {
  private locations: DiasporaLocation[] = [
    {
      country: 'Italy',
      countryCode: 'IT',
      population: 500000,
      mainCities: ['Milan', 'Rome', 'Turin', 'Florence'],
      socialPlatforms: ['Facebook', 'Instagram', 'TikTok'],
      influence: 'high'
    },
    {
      country: 'Greece',
      countryCode: 'GR',
      population: 450000,
      mainCities: ['Athens', 'Thessaloniki'],
      socialPlatforms: ['Facebook', 'Instagram'],
      influence: 'high'
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      population: 300000,
      mainCities: ['Munich', 'Stuttgart', 'Frankfurt', 'Berlin'],
      socialPlatforms: ['Facebook', 'Instagram', 'TikTok'],
      influence: 'medium'
    },
    {
      country: 'Switzerland',
      countryCode: 'CH',
      population: 200000,
      mainCities: ['Zurich', 'Geneva', 'Basel'],
      socialPlatforms: ['Facebook', 'Instagram'],
      influence: 'medium'
    },
    {
      country: 'United Kingdom',
      countryCode: 'UK',
      population: 150000,
      mainCities: ['London', 'Manchester', 'Birmingham'],
      socialPlatforms: ['Facebook', 'Instagram', 'Twitter'],
      influence: 'medium'
    },
    {
      country: 'United States',
      countryCode: 'US',
      population: 120000,
      mainCities: ['New York', 'Detroit', 'Boston', 'Chicago'],
      socialPlatforms: ['Facebook', 'Instagram', 'TikTok', 'Twitter'],
      influence: 'low'
    },
    {
      country: 'Canada',
      countryCode: 'CA',
      population: 50000,
      mainCities: ['Toronto', 'Montreal'],
      socialPlatforms: ['Facebook', 'Instagram'],
      influence: 'low'
    }
  ];

  /**
   * Track diaspora posts and engagement
   */
  trackPost(post: Omit<DiasporaPost, 'id' | 'influence_score'>): DiasporaPost {
    const influenceScore = this.calculateInfluenceScore(post);

    return {
      ...post,
      id: this.generateId(),
      influence_score: influenceScore
    };
  }

  /**
   * Calculate influence score based on engagement and location
   */
  private calculateInfluenceScore(post: any): number {
    const locationWeight = post.location.influence === 'high' ? 1.5 :
                          post.location.influence === 'medium' ? 1.0 : 0.7;

    const engagementScore = (
      post.engagement.likes * 1 +
      post.engagement.shares * 3 +
      post.engagement.comments * 2
    ) / 1000;

    const narrativeWeight = post.narrativeType === 'hybrid' ? 1.3 :
                           post.narrativeType === 'external' ? 0.9 : 1.0;

    return Math.min(100, engagementScore * locationWeight * narrativeWeight);
  }

  /**
   * Detect narrative re-entry from diaspora to homeland
   */
  detectNarrativeReEntry(posts: DiasporaPost[]): NarrativeFlow[] {
    const flows: NarrativeFlow[] = [];
    const narrativeGroups = this.groupByNarrative(posts);

    narrativeGroups.forEach((posts, narrative) => {
      const timeline = posts.map(p => p.timestamp).sort((a, b) => a.getTime() - b.getTime());
      const origins = [...new Set(posts.map(p => p.location.country))];

      if (origins.length > 1 && this.hasReEnteredAlbania(posts)) {
        flows.push({
          origin: origins[0],
          destination: 'Albania',
          narrative,
          strength: this.calculateFlowStrength(posts),
          timeline,
          platforms: [...new Set(posts.map(p => p.platform))]
        });
      }
    });

    return flows;
  }

  /**
   * Group posts by narrative theme
   */
  private groupByNarrative(posts: DiasporaPost[]): Map<string, DiasporaPost[]> {
    const groups = new Map<string, DiasporaPost[]>();

    posts.forEach(post => {
      post.topics.forEach(topic => {
        if (!groups.has(topic)) {
          groups.set(topic, []);
        }
        groups.get(topic)!.push(post);
      });
    });

    return groups;
  }

  /**
   * Check if narrative has re-entered Albania
   */
  private hasReEnteredAlbania(posts: DiasporaPost[]): boolean {
    // Check for temporal pattern: diaspora discussion followed by domestic uptake
    const sortedPosts = posts.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const diasporaPosts = sortedPosts.filter(p => p.narrativeType === 'external');
    const domesticPosts = sortedPosts.filter(p => p.narrativeType === 'domestic');

    if (diasporaPosts.length === 0 || domesticPosts.length === 0) return false;

    const firstDiaspora = diasporaPosts[0].timestamp;
    const firstDomestic = domesticPosts[0].timestamp;

    return firstDomestic > firstDiaspora;
  }

  /**
   * Calculate narrative flow strength
   */
  private calculateFlowStrength(posts: DiasporaPost[]): number {
    const totalEngagement = posts.reduce((sum, post) =>
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0);

    const avgInfluence = posts.reduce((sum, post) => sum + post.influence_score, 0) / posts.length;

    return Math.min(100, (totalEngagement / 10000) * (avgInfluence / 50));
  }

  /**
   * Get diaspora metrics
   */
  getMetrics(posts: DiasporaPost[]): DiasporaMetrics {
    const totalPopulation = this.locations.reduce((sum, loc) => sum + loc.population, 0);
    const activeUsers = new Set(posts.map(p => p.author)).size;

    const totalEngagement = posts.reduce((sum, post) =>
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0);

    const engagementRate = (totalEngagement / (activeUsers * posts.length)) * 100;

    const sentimentCounts = posts.reduce((acc, post) => {
      acc[post.sentiment]++;
      return acc;
    }, { positive: 0, negative: 0, neutral: 0 });

    const totalSentiments = posts.length;
    const sentimentBreakdown = {
      positive: (sentimentCounts.positive / totalSentiments) * 100,
      negative: (sentimentCounts.negative / totalSentiments) * 100,
      neutral: (sentimentCounts.neutral / totalSentiments) * 100
    };

    const topicCounts = new Map<string, number>();
    posts.forEach(post => {
      post.topics.forEach(topic => {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
      });
    });

    const topNarratives = Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);

    const crossBorderFlows = this.detectNarrativeReEntry(posts);

    const influenceIndex = posts.reduce((sum, post) => sum + post.influence_score, 0) / posts.length;

    return {
      totalPopulation,
      activeUsers,
      engagementRate,
      topNarratives,
      sentimentBreakdown,
      crossBorderFlows,
      influenceIndex
    };
  }

  /**
   * Generate sample diaspora data for demonstration
   */
  generateSampleData(): DiasporaPost[] {
    const topics = [
      'EU Accession', 'Corruption', 'Elections', 'Economy', 'Migration',
      'Education', 'Healthcare', 'Infrastructure', 'Justice Reform', 'Tourism'
    ];

    const posts: DiasporaPost[] = [];

    this.locations.forEach(location => {
      for (let i = 0; i < 10; i++) {
        const post: DiasporaPost = {
          id: this.generateId(),
          location,
          platform: location.socialPlatforms[Math.floor(Math.random() * location.socialPlatforms.length)],
          content: `Sample post about Albanian politics from ${location.country}`,
          author: `User_${location.countryCode}_${i}`,
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          engagement: {
            likes: Math.floor(Math.random() * 500),
            shares: Math.floor(Math.random() * 100),
            comments: Math.floor(Math.random() * 200)
          },
          sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as any,
          topics: [topics[Math.floor(Math.random() * topics.length)]],
          narrativeType: Math.random() > 0.7 ? 'external' : Math.random() > 0.4 ? 'domestic' : 'hybrid',
          influence_score: 0
        };

        post.influence_score = this.calculateInfluenceScore(post);
        posts.push(post);
      }
    });

    return posts;
  }

  /**
   * Get diaspora locations
   */
  getLocations(): DiasporaLocation[] {
    return this.locations;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `diaspora_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const diasporaTracker = new DiasporaTracker();