/**
 * Corruption Sentiment Index for Albania
 * Tracks public perception of corruption across institutions and sectors
 */

export interface CorruptionIndicator {
  id: string;
  name: {
    sq: string;
    en: string;
  };
  category: 'institutional' | 'sectoral' | 'political' | 'judicial';
  level: 'national' | 'regional' | 'local';
  severity: number; // 0-100 (higher is worse)
  trend: 'improving' | 'stable' | 'worsening';
  lastUpdated: Date;
}

export interface CorruptionCase {
  id: string;
  title: string;
  description: string;
  institution: string;
  individuals: string[];
  amount?: number;
  currency?: string;
  status: 'reported' | 'investigating' | 'prosecuted' | 'convicted' | 'dismissed';
  dateReported: Date;
  publicInterest: number; // 0-100
  mediaCoVerage: number; // 0-100
  source: string[];
}

export interface InstitutionTrust {
  institution: string;
  trustLevel: number; // 0-100
  corruptionPerception: number; // 0-100 (higher is worse)
  recentCases: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface CorruptionSentiment {
  overall: number; // 0-100 (higher is worse)
  byCategory: {
    institutional: number;
    sectoral: number;
    political: number;
    judicial: number;
  };
  byInstitution: InstitutionTrust[];
  topConcerns: string[];
  publicMood: 'optimistic' | 'neutral' | 'pessimistic';
  internationalRanking: {
    rank: number;
    total: number;
    source: string;
  };
}

class CorruptionSentimentIndex {
  private indicators: CorruptionIndicator[] = [
    {
      id: 'judiciary',
      name: { sq: 'Sistemi Gjyqësor', en: 'Judiciary System' },
      category: 'judicial',
      level: 'national',
      severity: 65,
      trend: 'improving',
      lastUpdated: new Date()
    },
    {
      id: 'public-procurement',
      name: { sq: 'Prokurimi Publik', en: 'Public Procurement' },
      category: 'institutional',
      level: 'national',
      severity: 75,
      trend: 'stable',
      lastUpdated: new Date()
    },
    {
      id: 'healthcare',
      name: { sq: 'Shëndetësia', en: 'Healthcare' },
      category: 'sectoral',
      level: 'national',
      severity: 70,
      trend: 'worsening',
      lastUpdated: new Date()
    },
    {
      id: 'education',
      name: { sq: 'Arsimi', en: 'Education' },
      category: 'sectoral',
      level: 'national',
      severity: 60,
      trend: 'stable',
      lastUpdated: new Date()
    },
    {
      id: 'police',
      name: { sq: 'Policia', en: 'Police' },
      category: 'institutional',
      level: 'national',
      severity: 55,
      trend: 'improving',
      lastUpdated: new Date()
    },
    {
      id: 'customs',
      name: { sq: 'Dogana', en: 'Customs' },
      category: 'institutional',
      level: 'national',
      severity: 68,
      trend: 'stable',
      lastUpdated: new Date()
    },
    {
      id: 'local-government',
      name: { sq: 'Qeverisja Vendore', en: 'Local Government' },
      category: 'political',
      level: 'local',
      severity: 72,
      trend: 'worsening',
      lastUpdated: new Date()
    },
    {
      id: 'political-parties',
      name: { sq: 'Partitë Politike', en: 'Political Parties' },
      category: 'political',
      level: 'national',
      severity: 80,
      trend: 'stable',
      lastUpdated: new Date()
    }
  ];

  private institutions: InstitutionTrust[] = [
    {
      institution: 'SPAK',
      trustLevel: 65,
      corruptionPerception: 25,
      recentCases: 45,
      trend: 'improving'
    },
    {
      institution: 'Parlamenti',
      trustLevel: 30,
      corruptionPerception: 70,
      recentCases: 12,
      trend: 'stable'
    },
    {
      institution: 'Qeveria',
      trustLevel: 35,
      corruptionPerception: 68,
      recentCases: 8,
      trend: 'stable'
    },
    {
      institution: 'Gjykatat',
      trustLevel: 40,
      corruptionPerception: 65,
      recentCases: 23,
      trend: 'improving'
    },
    {
      institution: 'Policia',
      trustLevel: 45,
      corruptionPerception: 55,
      recentCases: 15,
      trend: 'improving'
    },
    {
      institution: 'Bashkitë',
      trustLevel: 38,
      corruptionPerception: 72,
      recentCases: 31,
      trend: 'declining'
    },
    {
      institution: 'Ministritë',
      trustLevel: 32,
      corruptionPerception: 70,
      recentCases: 18,
      trend: 'stable'
    },
    {
      institution: 'Media',
      trustLevel: 42,
      corruptionPerception: 60,
      recentCases: 5,
      trend: 'stable'
    }
  ];

  private recentCases: CorruptionCase[] = [
    {
      id: 'case-001',
      title: 'Public Procurement Scandal',
      description: 'Alleged manipulation of tender process for road construction',
      institution: 'Ministry of Infrastructure',
      individuals: ['Official A', 'Businessman B'],
      amount: 5000000,
      currency: 'EUR',
      status: 'investigating',
      dateReported: new Date('2024-01-15'),
      publicInterest: 85,
      mediaCoverage: 90,
      source: ['BIRN', 'Top Channel', 'Exit.al']
    },
    {
      id: 'case-002',
      title: 'Healthcare Bribes',
      description: 'Doctors accepting bribes for medical services',
      institution: 'QSUT Hospital',
      individuals: ['Doctor X', 'Doctor Y'],
      status: 'prosecuted',
      dateReported: new Date('2024-02-20'),
      publicInterest: 75,
      mediaCoverage: 80,
      source: ['Syri.net', 'Report TV']
    },
    {
      id: 'case-003',
      title: 'Vote Buying Allegations',
      description: 'Political party accused of buying votes in local elections',
      institution: 'Political Party',
      individuals: ['Politician C'],
      amount: 500000,
      currency: 'ALL',
      status: 'reported',
      dateReported: new Date('2024-03-10'),
      publicInterest: 90,
      mediaCoverage: 95,
      source: ['BalkanWeb', 'News24']
    }
  ];

  /**
   * Calculate overall corruption sentiment index
   */
  calculateOverallIndex(): number {
    const categoryWeights = {
      institutional: 0.35,
      sectoral: 0.25,
      political: 0.25,
      judicial: 0.15
    };

    let weightedSum = 0;
    const categories = ['institutional', 'sectoral', 'political', 'judicial'] as const;

    categories.forEach(category => {
      const indicators = this.indicators.filter(i => i.category === category);
      const avgSeverity = indicators.reduce((sum, i) => sum + i.severity, 0) / indicators.length;
      weightedSum += avgSeverity * categoryWeights[category];
    });

    return Math.round(weightedSum);
  }

  /**
   * Get corruption sentiment analysis
   */
  getSentiment(): CorruptionSentiment {
    const overall = this.calculateOverallIndex();

    const byCategory = {
      institutional: this.getCategorySeverity('institutional'),
      sectoral: this.getCategorySeverity('sectoral'),
      political: this.getCategorySeverity('political'),
      judicial: this.getCategorySeverity('judicial')
    };

    const topConcerns = this.indicators
      .sort((a, b) => b.severity - a.severity)
      .slice(0, 5)
      .map(i => i.name.en);

    const publicMood = overall > 70 ? 'pessimistic' :
                      overall > 50 ? 'neutral' : 'optimistic';

    return {
      overall,
      byCategory,
      byInstitution: this.institutions,
      topConcerns,
      publicMood,
      internationalRanking: {
        rank: 104, // Albania's actual rank in Transparency International
        total: 180,
        source: 'Transparency International CPI 2023'
      }
    };
  }

  /**
   * Get category severity average
   */
  private getCategorySeverity(category: string): number {
    const indicators = this.indicators.filter(i => i.category === category);
    if (indicators.length === 0) return 0;
    return Math.round(
      indicators.reduce((sum, i) => sum + i.severity, 0) / indicators.length
    );
  }

  /**
   * Track new corruption case
   */
  addCase(corruptionCase: Omit<CorruptionCase, 'id'>): void {
    const newCase: CorruptionCase = {
      ...corruptionCase,
      id: `case-${Date.now()}`
    };
    this.recentCases.push(newCase);

    // Update relevant institution trust
    const institution = this.institutions.find(i =>
      i.institution.toLowerCase() === corruptionCase.institution.toLowerCase()
    );
    if (institution) {
      institution.recentCases++;
      institution.corruptionPerception = Math.min(100,
        institution.corruptionPerception + 2
      );
      institution.trustLevel = Math.max(0,
        institution.trustLevel - 3
      );
    }
  }

  /**
   * Get recent high-profile cases
   */
  getHighProfileCases(limit: number = 5): CorruptionCase[] {
    return this.recentCases
      .filter(c => c.publicInterest > 70)
      .sort((a, b) => b.publicInterest - a.publicInterest)
      .slice(0, limit);
  }

  /**
   * Calculate corruption risk for a sector
   */
  calculateSectorRisk(sector: string): {
    risk: 'low' | 'medium' | 'high' | 'critical';
    score: number;
    factors: string[];
  } {
    const indicator = this.indicators.find(i =>
      i.name.en.toLowerCase() === sector.toLowerCase()
    );

    if (!indicator) {
      return { risk: 'medium', score: 50, factors: ['Unknown sector'] };
    }

    const factors = [];
    let score = indicator.severity;

    // Adjust based on trend
    if (indicator.trend === 'worsening') {
      score += 10;
      factors.push('Worsening trend');
    } else if (indicator.trend === 'improving') {
      score -= 5;
      factors.push('Improving trend');
    }

    // Adjust based on recent cases
    const relatedCases = this.recentCases.filter(c =>
      c.institution.toLowerCase().includes(sector.toLowerCase())
    );
    if (relatedCases.length > 2) {
      score += 15;
      factors.push(`${relatedCases.length} recent cases`);
    }

    // Normalize score
    score = Math.max(0, Math.min(100, score));

    const risk = score >= 80 ? 'critical' :
                score >= 60 ? 'high' :
                score >= 40 ? 'medium' : 'low';

    return { risk, score, factors };
  }

  /**
   * Get corruption trends over time
   */
  getTrends(): {
    improving: string[];
    stable: string[];
    worsening: string[];
  } {
    return {
      improving: this.indicators
        .filter(i => i.trend === 'improving')
        .map(i => i.name.en),
      stable: this.indicators
        .filter(i => i.trend === 'stable')
        .map(i => i.name.en),
      worsening: this.indicators
        .filter(i => i.trend === 'worsening')
        .map(i => i.name.en)
    };
  }

  /**
   * Generate corruption heat map data
   */
  getHeatMapData(): Array<{
    institution: string;
    indicator: string;
    value: number;
  }> {
    const data: Array<{ institution: string; indicator: string; value: number }> = [];

    this.institutions.forEach(inst => {
      data.push({
        institution: inst.institution,
        indicator: 'Trust',
        value: inst.trustLevel
      });
      data.push({
        institution: inst.institution,
        indicator: 'Corruption',
        value: inst.corruptionPerception
      });
      data.push({
        institution: inst.institution,
        indicator: 'Cases',
        value: Math.min(100, inst.recentCases * 2) // Normalize cases to 0-100
      });
    });

    return data;
  }
}

export const corruptionSentimentIndex = new CorruptionSentimentIndex();