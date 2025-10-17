/**
 * People Pulse Index (PPI) Calculator
 *
 * A comprehensive metric to measure public confidence in government
 * Combines multiple economic and social indicators into a single index
 */

export interface PPIFactors {
  // Economic Indicators (40% weight)
  outputGap: number;           // GDP actual vs potential (-10 to +10%)
  unemploymentRate: number;    // Current unemployment rate (0-100%)
  inflationRate: number;       // Annual inflation rate (0-20%)
  gdpGrowthRate: number;      // Year-over-year GDP growth (-10 to +10%)

  // Media & Public Sentiment (30% weight)
  mediaConfidence: number;     // Media sentiment analysis (0-100)
  socialMediaSentiment: number; // Social media analysis (0-100)
  pollApproval: number;        // Government approval polls (0-100)

  // Social Indicators (20% weight)
  corruptionIndex: number;     // Corruption perception (0-100, higher is better)
  safetyIndex: number;         // Public safety perception (0-100)
  healthcareAccess: number;    // Healthcare accessibility (0-100)

  // Governance Indicators (10% weight)
  policyEffectiveness: number; // Policy implementation success (0-100)
  transparencyScore: number;   // Government transparency (0-100)
}

export interface PPIWeights {
  economic: number;
  sentiment: number;
  social: number;
  governance: number;
}

export interface PPIResult {
  index: number;              // Final PPI score (0-100)
  category: string;           // Category (Critical/Poor/Fair/Good/Excellent)
  trend: 'declining' | 'stable' | 'improving';
  components: {
    economic: number;
    sentiment: number;
    social: number;
    governance: number;
  };
  factors: PPIFactors;
  timestamp: Date;
  confidence: number;         // Confidence level in the calculation (0-100)
}

export class PPICalculator {
  private weights: PPIWeights = {
    economic: 0.40,
    sentiment: 0.30,
    social: 0.20,
    governance: 0.10
  };

  /**
   * Main calculation method for PPI
   */
  calculate(factors: PPIFactors, previousPPI?: number): PPIResult {
    // Economic Component (40%)
    const economicScore = this.calculateEconomicScore(factors);

    // Sentiment Component (30%)
    const sentimentScore = this.calculateSentimentScore(factors);

    // Social Component (20%)
    const socialScore = this.calculateSocialScore(factors);

    // Governance Component (10%)
    const governanceScore = this.calculateGovernanceScore(factors);

    // Calculate weighted PPI
    const ppi =
      economicScore * this.weights.economic +
      sentimentScore * this.weights.sentiment +
      socialScore * this.weights.social +
      governanceScore * this.weights.governance;

    // Determine trend
    const trend = this.determineTrend(ppi, previousPPI);

    // Calculate confidence level based on data completeness
    const confidence = this.calculateConfidence(factors);

    return {
      index: Math.round(ppi * 10) / 10,
      category: this.categorize(ppi),
      trend,
      components: {
        economic: Math.round(economicScore * 10) / 10,
        sentiment: Math.round(sentimentScore * 10) / 10,
        social: Math.round(socialScore * 10) / 10,
        governance: Math.round(governanceScore * 10) / 10
      },
      factors,
      timestamp: new Date(),
      confidence
    };
  }

  /**
   * Calculate economic component score
   */
  private calculateEconomicScore(factors: PPIFactors): number {
    // Normalize output gap (-10 to +10 -> 0 to 100)
    const outputGapScore = this.normalizeOutputGap(factors.outputGap);

    // Invert unemployment (lower is better)
    const unemploymentScore = Math.max(0, 100 - factors.unemploymentRate * 2);

    // Normalize inflation (2-3% is optimal)
    const inflationScore = this.normalizeInflation(factors.inflationRate);

    // Normalize GDP growth
    const gdpScore = this.normalizeGDPGrowth(factors.gdpGrowthRate);

    // Weighted average of economic factors
    return (
      outputGapScore * 0.25 +
      unemploymentScore * 0.35 +
      inflationScore * 0.20 +
      gdpScore * 0.20
    );
  }

  /**
   * Calculate sentiment component score
   */
  private calculateSentimentScore(factors: PPIFactors): number {
    return (
      factors.mediaConfidence * 0.35 +
      factors.socialMediaSentiment * 0.35 +
      factors.pollApproval * 0.30
    );
  }

  /**
   * Calculate social component score
   */
  private calculateSocialScore(factors: PPIFactors): number {
    return (
      factors.corruptionIndex * 0.40 +
      factors.safetyIndex * 0.35 +
      factors.healthcareAccess * 0.25
    );
  }

  /**
   * Calculate governance component score
   */
  private calculateGovernanceScore(factors: PPIFactors): number {
    return (
      factors.policyEffectiveness * 0.50 +
      factors.transparencyScore * 0.50
    );
  }

  /**
   * Normalize output gap to 0-100 scale
   */
  private normalizeOutputGap(outputGap: number): number {
    // Output gap of 0% is optimal (score = 100)
    // Further from 0, lower the score
    const absoluteGap = Math.abs(outputGap);
    if (absoluteGap <= 1) return 100;
    if (absoluteGap <= 2) return 90;
    if (absoluteGap <= 3) return 75;
    if (absoluteGap <= 5) return 60;
    if (absoluteGap <= 7) return 40;
    return Math.max(0, 100 - absoluteGap * 10);
  }

  /**
   * Normalize inflation rate (2-3% is optimal)
   */
  private normalizeInflation(inflation: number): number {
    if (inflation >= 2 && inflation <= 3) return 100;
    if (inflation >= 1 && inflation < 2) return 85;
    if (inflation > 3 && inflation <= 4) return 85;
    if (inflation > 4 && inflation <= 5) return 70;
    if (inflation > 5 && inflation <= 7) return 50;
    if (inflation > 7 && inflation <= 10) return 30;
    if (inflation > 10) return Math.max(0, 100 - inflation * 5);
    if (inflation < 1 && inflation >= 0) return 70;
    return 50; // Deflation
  }

  /**
   * Normalize GDP growth rate
   */
  private normalizeGDPGrowth(gdpGrowth: number): number {
    if (gdpGrowth >= 2 && gdpGrowth <= 4) return 100;
    if (gdpGrowth >= 1 && gdpGrowth < 2) return 80;
    if (gdpGrowth > 4 && gdpGrowth <= 6) return 85;
    if (gdpGrowth > 6) return 70; // Too hot
    if (gdpGrowth >= 0 && gdpGrowth < 1) return 60;
    if (gdpGrowth < 0 && gdpGrowth >= -2) return 30;
    return Math.max(0, 50 + gdpGrowth * 5); // Recession
  }

  /**
   * Categorize PPI score
   */
  private categorize(ppi: number): string {
    if (ppi >= 80) return 'Excellent';
    if (ppi >= 65) return 'Good';
    if (ppi >= 50) return 'Fair';
    if (ppi >= 35) return 'Poor';
    return 'Critical';
  }

  /**
   * Determine trend based on current and previous PPI
   */
  private determineTrend(current: number, previous?: number): 'declining' | 'stable' | 'improving' {
    if (!previous) return 'stable';
    const change = current - previous;
    if (change > 2) return 'improving';
    if (change < -2) return 'declining';
    return 'stable';
  }

  /**
   * Calculate confidence level based on data completeness
   */
  private calculateConfidence(factors: PPIFactors): number {
    const fields = Object.values(factors);
    const validFields = fields.filter(v => v !== null && v !== undefined && !isNaN(v));
    return Math.round((validFields.length / fields.length) * 100);
  }

  /**
   * Get historical PPI for trend analysis
   */
  getHistoricalPPI(startDate: Date, endDate: Date): PPIResult[] {
    // This would fetch from a database in production
    // For now, return mock historical data
    return this.generateMockHistoricalData(startDate, endDate);
  }

  /**
   * Generate mock historical data for demonstration
   */
  private generateMockHistoricalData(startDate: Date, endDate: Date): PPIResult[] {
    const results: PPIResult[] = [];
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    let basePPI = 65;
    for (let i = 0; i <= days; i += 7) { // Weekly data points
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Add some variation
      basePPI += (Math.random() - 0.5) * 5;
      basePPI = Math.max(30, Math.min(85, basePPI));

      results.push({
        index: Math.round(basePPI * 10) / 10,
        category: this.categorize(basePPI),
        trend: 'stable',
        components: {
          economic: basePPI + (Math.random() - 0.5) * 10,
          sentiment: basePPI + (Math.random() - 0.5) * 10,
          social: basePPI + (Math.random() - 0.5) * 10,
          governance: basePPI + (Math.random() - 0.5) * 10
        },
        factors: this.generateMockFactors(basePPI),
        timestamp: date,
        confidence: 85 + Math.random() * 10
      });
    }

    return results;
  }

  /**
   * Generate mock factors for testing
   */
  private generateMockFactors(basePPI: number): PPIFactors {
    const variance = () => (Math.random() - 0.5) * 10;

    return {
      outputGap: -2 + variance() / 5,
      unemploymentRate: Math.max(2, 10 - basePPI / 10 + variance()),
      inflationRate: 2.5 + variance() / 5,
      gdpGrowthRate: basePPI / 20 + variance() / 5,
      mediaConfidence: basePPI + variance(),
      socialMediaSentiment: basePPI + variance(),
      pollApproval: basePPI + variance(),
      corruptionIndex: basePPI + variance(),
      safetyIndex: basePPI + variance(),
      healthcareAccess: basePPI + variance(),
      policyEffectiveness: basePPI + variance(),
      transparencyScore: basePPI + variance()
    };
  }

  /**
   * Update weights for custom calculations
   */
  updateWeights(weights: Partial<PPIWeights>): void {
    this.weights = { ...this.weights, ...weights };
  }
}

// Export singleton instance
export const ppiCalculator = new PPICalculator();