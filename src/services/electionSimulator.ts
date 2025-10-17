/**
 * Election Simulation Engine
 * For Serbia and Balkan Region Elections
 */

export interface Party {
  id: string;
  name: string;
  acronym: string;
  color: string;
  leader: string;
  ideology: string;
  currentSupport: number;  // Percentage
  momentum: number;        // -5 to +5 trend
  strongholds: string[];   // Regions where party is strong
}

export interface Region {
  id: string;
  name: string;
  population: number;
  registeredVoters: number;
  turnoutHistory: number;  // Historical turnout percentage
  urbanRural: 'urban' | 'rural' | 'mixed';
  economicLevel: 'high' | 'medium' | 'low';
}

export interface ElectionScenario {
  name: string;
  description: string;
  factors: {
    economicSituation: number;    // -1 to 1 (bad to good)
    internationalRelations: number; // -1 to 1
    socialStability: number;       // -1 to 1
    mediaInfluence: number;        // -1 to 1
    youthEngagement: number;       // 0 to 1
    diasporaParticipation: number; // 0 to 1
  };
  events: string[];  // Recent events affecting election
}

export interface SimulationResult {
  winner: Party;
  results: Array<{
    party: Party;
    votes: number;
    percentage: number;
    seats: number;
    change: number;  // Change from last election
  }>;
  coalitionScenarios: Array<{
    parties: Party[];
    totalSeats: number;
    stability: 'stable' | 'fragile' | 'unstable';
  }>;
  turnout: number;
  invalidVotes: number;
  regionalBreakdown: Array<{
    region: Region;
    winner: Party;
    results: Map<string, number>;
  }>;
  confidence: number;  // Confidence in prediction (0-100)
  uncertaintyFactors: string[];
}

// Serbian parties data
export const serbianParties: Party[] = [
  {
    id: 'SNS',
    name: 'Srpska Napredna Stranka',
    acronym: 'SNS',
    color: '#2563eb',
    leader: 'Current Leadership',
    ideology: 'Conservative, Pro-European',
    currentSupport: 42,
    momentum: -0.5,
    strongholds: ['Belgrade', 'Novi Sad', 'Central Serbia']
  },
  {
    id: 'SPS',
    name: 'Socijalistička Partija Srbije',
    acronym: 'SPS',
    color: '#dc2626',
    leader: 'Socialist Leadership',
    ideology: 'Socialist, Left-wing',
    currentSupport: 12,
    momentum: 0,
    strongholds: ['Southern Serbia', 'Rural areas']
  },
  {
    id: 'SSP',
    name: 'Stranka Slobode i Pravde',
    acronym: 'SSP',
    color: '#10b981',
    leader: 'Opposition Leadership',
    ideology: 'Liberal, Pro-European',
    currentSupport: 15,
    momentum: 1.5,
    strongholds: ['Belgrade', 'Urban centers']
  },
  {
    id: 'SRS',
    name: 'Srpska Radikalna Stranka',
    acronym: 'SRS',
    color: '#1e3a8a',
    leader: 'Radical Leadership',
    ideology: 'Nationalist, Right-wing',
    currentSupport: 8,
    momentum: -1,
    strongholds: ['Vojvodina', 'Border regions']
  },
  {
    id: 'DS',
    name: 'Demokratska Stranka',
    acronym: 'DS',
    color: '#eab308',
    leader: 'Democratic Leadership',
    ideology: 'Center-left, Liberal',
    currentSupport: 10,
    momentum: 0.5,
    strongholds: ['Belgrade', 'Novi Sad']
  },
  {
    id: 'PSG',
    name: 'Pokret Slobodnih Građana',
    acronym: 'PSG',
    color: '#8b5cf6',
    leader: 'Civic Leadership',
    ideology: 'Liberal, Civic',
    currentSupport: 7,
    momentum: 2,
    strongholds: ['Belgrade', 'Student areas']
  },
  {
    id: 'Others',
    name: 'Other Parties',
    acronym: 'Others',
    color: '#6b7280',
    leader: 'Various',
    ideology: 'Mixed',
    currentSupport: 6,
    momentum: 0,
    strongholds: ['Various']
  }
];

// Balkan countries for regional analysis
export const balkanCountries = [
  { id: 'RS', name: 'Serbia', capital: 'Belgrade' },
  { id: 'HR', name: 'Croatia', capital: 'Zagreb' },
  { id: 'BA', name: 'Bosnia and Herzegovina', capital: 'Sarajevo' },
  { id: 'ME', name: 'Montenegro', capital: 'Podgorica' },
  { id: 'MK', name: 'North Macedonia', capital: 'Skopje' },
  { id: 'AL', name: 'Albania', capital: 'Tirana' },
  { id: 'XK', name: 'Kosovo', capital: 'Pristina' },
  { id: 'BG', name: 'Bulgaria', capital: 'Sofia' },
  { id: 'RO', name: 'Romania', capital: 'Bucharest' },
  { id: 'SI', name: 'Slovenia', capital: 'Ljubljana' }
];

export class ElectionSimulator {
  private parties: Party[];
  private regions: Region[];
  private totalSeats: number = 250; // Serbian Parliament seats

  constructor(parties: Party[] = serbianParties) {
    this.parties = parties;
    this.regions = this.initializeRegions();
  }

  private initializeRegions(): Region[] {
    return [
      {
        id: 'belgrade',
        name: 'Belgrade',
        population: 1700000,
        registeredVoters: 1300000,
        turnoutHistory: 58,
        urbanRural: 'urban',
        economicLevel: 'high'
      },
      {
        id: 'vojvodina',
        name: 'Vojvodina',
        population: 1900000,
        registeredVoters: 1500000,
        turnoutHistory: 52,
        urbanRural: 'mixed',
        economicLevel: 'medium'
      },
      {
        id: 'central-serbia',
        name: 'Central Serbia',
        population: 2800000,
        registeredVoters: 2200000,
        turnoutHistory: 48,
        urbanRural: 'mixed',
        economicLevel: 'medium'
      },
      {
        id: 'southern-serbia',
        name: 'Southern Serbia',
        population: 900000,
        registeredVoters: 700000,
        turnoutHistory: 45,
        urbanRural: 'rural',
        economicLevel: 'low'
      }
    ];
  }

  /**
   * Run election simulation
   */
  simulate(scenario: ElectionScenario): SimulationResult {
    // Calculate adjusted support based on scenario
    const adjustedParties = this.adjustPartySupport(this.parties, scenario);

    // Calculate turnout
    const turnout = this.calculateTurnout(scenario);

    // Simulate voting by region
    const regionalResults = this.simulateRegionalVoting(adjustedParties, scenario);

    // Calculate national results
    const nationalResults = this.aggregateNationalResults(regionalResults, turnout);

    // Calculate seat distribution (D'Hondt method)
    const seatDistribution = this.calculateSeats(nationalResults);

    // Identify winner and coalition scenarios
    const winner = this.identifyWinner(seatDistribution);
    const coalitions = this.generateCoalitionScenarios(seatDistribution);

    // Calculate confidence and uncertainty
    const { confidence, uncertaintyFactors } = this.assessConfidence(scenario, turnout);

    return {
      winner,
      results: seatDistribution,
      coalitionScenarios: coalitions,
      turnout,
      invalidVotes: Math.random() * 2 + 1, // 1-3% invalid
      regionalBreakdown: regionalResults,
      confidence,
      uncertaintyFactors
    };
  }

  /**
   * Adjust party support based on scenario factors
   */
  private adjustPartySupport(parties: Party[], scenario: ElectionScenario): Party[] {
    return parties.map(party => {
      let adjustedSupport = party.currentSupport;

      // Apply momentum
      adjustedSupport += party.momentum * 2;

      // Apply scenario factors
      if (party.ideology.includes('Pro-European')) {
        adjustedSupport += scenario.factors.internationalRelations * 3;
      }
      if (party.ideology.includes('Socialist') || party.ideology.includes('Left')) {
        adjustedSupport += (1 - scenario.factors.economicSituation) * 2;
      }
      if (party.ideology.includes('Liberal')) {
        adjustedSupport += scenario.factors.youthEngagement * 4;
      }
      if (party.ideology.includes('Nationalist')) {
        adjustedSupport -= scenario.factors.internationalRelations * 2;
      }

      // Add randomness
      adjustedSupport += (Math.random() - 0.5) * 4;

      // Ensure bounds
      adjustedSupport = Math.max(0, Math.min(100, adjustedSupport));

      return {
        ...party,
        currentSupport: adjustedSupport
      };
    });
  }

  /**
   * Calculate expected turnout
   */
  private calculateTurnout(scenario: ElectionScenario): number {
    let baseTurnout = 52; // Historical average

    // Adjust based on factors
    baseTurnout += scenario.factors.socialStability * 5;
    baseTurnout += scenario.factors.mediaInfluence * 3;
    baseTurnout += scenario.factors.youthEngagement * 8;
    baseTurnout += scenario.factors.diasporaParticipation * 4;

    // Add randomness
    baseTurnout += (Math.random() - 0.5) * 6;

    return Math.max(35, Math.min(75, baseTurnout));
  }

  /**
   * Simulate voting by region
   */
  private simulateRegionalVoting(parties: Party[], scenario: ElectionScenario): any[] {
    return this.regions.map(region => {
      const results = new Map<string, number>();
      let remainingVotes = 100;

      parties.forEach(party => {
        let regionalSupport = party.currentSupport;

        // Adjust for regional strongholds
        if (party.strongholds.some(s =>
          region.name.toLowerCase().includes(s.toLowerCase()))) {
          regionalSupport *= 1.2;
        }

        // Urban/rural adjustments
        if (region.urbanRural === 'urban' && party.ideology.includes('Liberal')) {
          regionalSupport *= 1.15;
        }
        if (region.urbanRural === 'rural' && party.ideology.includes('Conservative')) {
          regionalSupport *= 1.1;
        }

        // Economic level adjustments
        if (region.economicLevel === 'low' && party.ideology.includes('Socialist')) {
          regionalSupport *= 1.1;
        }

        const votes = Math.min(remainingVotes, regionalSupport);
        results.set(party.id, votes);
        remainingVotes -= votes;
      });

      // Normalize to 100%
      const total = Array.from(results.values()).reduce((a, b) => a + b, 0);
      results.forEach((value, key) => {
        results.set(key, (value / total) * 100);
      });

      // Determine regional winner
      let winner = parties[0];
      let maxVotes = 0;
      results.forEach((votes, partyId) => {
        const party = parties.find(p => p.id === partyId);
        if (party && votes > maxVotes) {
          winner = party;
          maxVotes = votes;
        }
      });

      return {
        region,
        winner,
        results
      };
    });
  }

  /**
   * Aggregate national results from regional voting
   */
  private aggregateNationalResults(regionalResults: any[], turnout: number): any[] {
    const nationalVotes = new Map<string, number>();
    const totalVoters = this.regions.reduce((sum, r) => sum + r.registeredVoters, 0);
    const actualVoters = totalVoters * (turnout / 100);

    // Aggregate votes from all regions
    regionalResults.forEach(regional => {
      const regionVoters = regional.region.registeredVoters * (turnout / 100);
      regional.results.forEach((percentage: number, partyId: string) => {
        const votes = (percentage / 100) * regionVoters;
        nationalVotes.set(partyId, (nationalVotes.get(partyId) || 0) + votes);
      });
    });

    // Convert to percentages
    return this.parties.map(party => ({
      party,
      votes: nationalVotes.get(party.id) || 0,
      percentage: ((nationalVotes.get(party.id) || 0) / actualVoters) * 100
    }));
  }

  /**
   * Calculate seat distribution using D'Hondt method
   */
  private calculateSeats(results: any[]): any[] {
    const threshold = 3; // 3% electoral threshold
    const eligibleParties = results.filter(r => r.percentage >= threshold);

    // D'Hondt method
    const seats = new Array(eligibleParties.length).fill(0);
    const quotients: number[] = [];

    for (let seat = 0; seat < this.totalSeats; seat++) {
      eligibleParties.forEach((result, index) => {
        quotients[index] = result.votes / (seats[index] + 1);
      });

      const maxIndex = quotients.indexOf(Math.max(...quotients));
      seats[maxIndex]++;
    }

    return results.map(result => {
      const index = eligibleParties.findIndex(e => e.party.id === result.party.id);
      const seatCount = index >= 0 ? seats[index] : 0;
      const previousSeats = Math.round(result.party.currentSupport * 2.5); // Approximate previous

      return {
        ...result,
        seats: seatCount,
        change: seatCount - previousSeats
      };
    });
  }

  /**
   * Identify the winner
   */
  private identifyWinner(results: any[]): Party {
    const sorted = [...results].sort((a, b) => b.seats - a.seats);
    return sorted[0].party;
  }

  /**
   * Generate possible coalition scenarios
   */
  private generateCoalitionScenarios(results: any[]): any[] {
    const scenarios = [];
    const majoritySeats = Math.floor(this.totalSeats / 2) + 1;

    // Sort by seats
    const sorted = [...results].sort((a, b) => b.seats - a.seats);

    // Try different combinations
    for (let i = 0; i < sorted.length; i++) {
      const coalition = [sorted[i].party];
      let totalSeats = sorted[i].seats;

      if (totalSeats >= majoritySeats) {
        // Single party majority
        scenarios.push({
          parties: coalition,
          totalSeats,
          stability: 'stable'
        });
        break;
      }

      // Try to form coalition
      for (let j = 0; j < sorted.length; j++) {
        if (i !== j && this.areCompatible(sorted[i].party, sorted[j].party)) {
          coalition.push(sorted[j].party);
          totalSeats += sorted[j].seats;

          if (totalSeats >= majoritySeats) {
            scenarios.push({
              parties: [...coalition],
              totalSeats,
              stability: this.assessCoalitionStability(coalition)
            });
            break;
          }
        }
      }
    }

    return scenarios.slice(0, 3); // Return top 3 scenarios
  }

  /**
   * Check if two parties are compatible for coalition
   */
  private areCompatible(party1: Party, party2: Party): boolean {
    // Simple compatibility check based on ideology
    if (party1.ideology.includes('Liberal') && party2.ideology.includes('Conservative')) {
      return false;
    }
    if (party1.ideology.includes('Nationalist') && party2.ideology.includes('Pro-European')) {
      return false;
    }
    return Math.random() > 0.3; // Some randomness
  }

  /**
   * Assess coalition stability
   */
  private assessCoalitionStability(parties: Party[]): 'stable' | 'fragile' | 'unstable' {
    if (parties.length === 1) return 'stable';
    if (parties.length === 2) return 'fragile';
    return 'unstable';
  }

  /**
   * Assess confidence in the simulation
   */
  private assessConfidence(scenario: ElectionScenario, turnout: number): {
    confidence: number;
    uncertaintyFactors: string[];
  } {
    let confidence = 75; // Base confidence
    const uncertaintyFactors: string[] = [];

    // Adjust based on various factors
    if (Math.abs(scenario.factors.economicSituation) > 0.7) {
      confidence -= 10;
      uncertaintyFactors.push('High economic volatility');
    }

    if (turnout < 40 || turnout > 65) {
      confidence -= 5;
      uncertaintyFactors.push('Unusual turnout expectations');
    }

    if (scenario.factors.youthEngagement > 0.7) {
      confidence -= 8;
      uncertaintyFactors.push('Unpredictable youth vote');
    }

    if (scenario.events.length > 3) {
      confidence -= 5;
      uncertaintyFactors.push('Multiple recent political events');
    }

    // Add general uncertainty
    if (uncertaintyFactors.length === 0) {
      uncertaintyFactors.push('Standard polling uncertainty');
    }

    return {
      confidence: Math.max(40, Math.min(90, confidence)),
      uncertaintyFactors
    };
  }

  /**
   * Generate multiple scenarios for comparison
   */
  generateScenarios(): ElectionScenario[] {
    return [
      {
        name: 'Status Quo',
        description: 'Current trends continue with no major changes',
        factors: {
          economicSituation: 0,
          internationalRelations: 0.2,
          socialStability: 0.3,
          mediaInfluence: 0.1,
          youthEngagement: 0.3,
          diasporaParticipation: 0.2
        },
        events: ['Regular campaign period']
      },
      {
        name: 'Economic Crisis',
        description: 'Economic downturn affects voter sentiment',
        factors: {
          economicSituation: -0.7,
          internationalRelations: -0.2,
          socialStability: -0.4,
          mediaInfluence: 0.3,
          youthEngagement: 0.5,
          diasporaParticipation: 0.1
        },
        events: ['Inflation spike', 'Unemployment rise', 'Currency devaluation']
      },
      {
        name: 'EU Integration Progress',
        description: 'Positive developments in EU accession talks',
        factors: {
          economicSituation: 0.4,
          internationalRelations: 0.8,
          socialStability: 0.5,
          mediaInfluence: 0.4,
          youthEngagement: 0.7,
          diasporaParticipation: 0.5
        },
        events: ['EU opens new chapters', 'Foreign investment increase', 'Visa liberalization']
      },
      {
        name: 'Youth Mobilization',
        description: 'High youth turnout changes dynamics',
        factors: {
          economicSituation: 0.1,
          internationalRelations: 0.3,
          socialStability: 0.2,
          mediaInfluence: 0.6,
          youthEngagement: 0.9,
          diasporaParticipation: 0.6
        },
        events: ['Student protests', 'Social media campaigns', 'Youth registration drive']
      }
    ];
  }
}

// Export singleton instance
export const electionSimulator = new ElectionSimulator();