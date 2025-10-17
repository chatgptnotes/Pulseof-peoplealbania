/**
 * Albanian Political Landscape Ontology
 * Maps parties, leaders, and political issues in Albania
 */

export interface PoliticalParty {
  id: string;
  name: string;
  acronym: string;
  fullName: {
    sq: string;
    en: string;
  };
  leader: string;
  founded: number;
  ideology: string[];
  position: 'government' | 'opposition' | 'neutral';
  seats: number;
  color: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export interface PoliticalLeader {
  id: string;
  name: string;
  party: string;
  position: string;
  birthYear: number;
  education: string;
  previousRoles: string[];
  approvalRating?: number;
  image?: string;
}

export interface PoliticalIssue {
  id: string;
  name: {
    sq: string;
    en: string;
  };
  category: 'domestic' | 'foreign' | 'economic' | 'social' | 'environmental';
  priority: 'critical' | 'high' | 'medium' | 'low';
  relatedParties: string[];
  publicSentiment: number; // -1 to 1
  keywords: string[];
}

export interface IssueSentiment {
  issue: string;
  party: string;
  stance: 'support' | 'oppose' | 'neutral';
  strength: number; // 0 to 1
  statements: string[];
}

class AlbanianPoliticalOntology {
  private parties: PoliticalParty[] = [
    {
      id: 'PS',
      name: 'Partia Socialiste',
      acronym: 'PS',
      fullName: {
        sq: 'Partia Socialiste e Shqipërisë',
        en: 'Socialist Party of Albania'
      },
      leader: 'Edi Rama',
      founded: 1991,
      ideology: ['Social Democracy', 'Third Way', 'Pro-European'],
      position: 'government',
      seats: 74,
      color: '#FF1744',
      website: 'https://ps.al',
      socialMedia: {
        facebook: 'partiasocialiste',
        instagram: 'partiasocialiste',
        twitter: 'partiasocialiste'
      }
    },
    {
      id: 'PD',
      name: 'Partia Demokratike',
      acronym: 'PD',
      fullName: {
        sq: 'Partia Demokratike e Shqipërisë',
        en: 'Democratic Party of Albania'
      },
      leader: 'Sali Berisha',
      founded: 1990,
      ideology: ['Conservative', 'Liberal Conservative', 'Pro-European'],
      position: 'opposition',
      seats: 59,
      color: '#0277BD',
      website: 'https://pd.al',
      socialMedia: {
        facebook: 'partiademokratike',
        instagram: 'partiademokratike'
      }
    },
    {
      id: 'LSI',
      name: 'Lëvizja Socialiste për Integrim',
      acronym: 'LSI',
      fullName: {
        sq: 'Lëvizja Socialiste për Integrim',
        en: 'Socialist Movement for Integration'
      },
      leader: 'Ilir Meta',
      founded: 2004,
      ideology: ['Social Democracy', 'Populism'],
      position: 'opposition',
      seats: 4,
      color: '#FFA726',
      website: 'https://lsi.al'
    },
    {
      id: 'PSD',
      name: 'Partia Socialdemokrate',
      acronym: 'PSD',
      fullName: {
        sq: 'Partia Socialdemokrate e Shqipërisë',
        en: 'Social Democratic Party of Albania'
      },
      leader: 'Tom Doshi',
      founded: 1991,
      ideology: ['Social Democracy'],
      position: 'neutral',
      seats: 3,
      color: '#9C27B0'
    },
    {
      id: 'PR',
      name: 'Partia Republikane',
      acronym: 'PR',
      fullName: {
        sq: 'Partia Republikane e Shqipërisë',
        en: 'Republican Party of Albania'
      },
      leader: 'Fatmir Mediu',
      founded: 1991,
      ideology: ['National Conservatism', 'Right-wing'],
      position: 'opposition',
      seats: 0,
      color: '#795548'
    },
    {
      id: 'PL',
      name: 'Partia e Lirisë',
      acronym: 'PL',
      fullName: {
        sq: 'Partia e Lirisë',
        en: 'Freedom Party'
      },
      leader: 'Ilir Meta',
      founded: 2022,
      ideology: ['Populism', 'Anti-establishment'],
      position: 'opposition',
      seats: 0,
      color: '#4CAF50'
    }
  ];

  private leaders: PoliticalLeader[] = [
    {
      id: 'edi-rama',
      name: 'Edi Rama',
      party: 'PS',
      position: 'Prime Minister',
      birthYear: 1964,
      education: 'Academy of Arts, Tirana',
      previousRoles: ['Mayor of Tirana', 'Minister of Culture'],
      approvalRating: 42
    },
    {
      id: 'sali-berisha',
      name: 'Sali Berisha',
      party: 'PD',
      position: 'Opposition Leader',
      birthYear: 1944,
      education: 'University of Tirana (Medicine)',
      previousRoles: ['President of Albania', 'Prime Minister'],
      approvalRating: 38
    },
    {
      id: 'ilir-meta',
      name: 'Ilir Meta',
      party: 'PL',
      position: 'Party Leader',
      birthYear: 1969,
      education: 'University of Tirana (Economics)',
      previousRoles: ['President of Albania', 'Prime Minister', 'Speaker of Parliament'],
      approvalRating: 25
    },
    {
      id: 'lulzim-basha',
      name: 'Lulzim Basha',
      party: 'PD',
      position: 'Former Party Leader',
      birthYear: 1974,
      education: 'Utrecht University (Law)',
      previousRoles: ['Minister of Foreign Affairs', 'Minister of Interior'],
      approvalRating: 20
    }
  ];

  private issues: PoliticalIssue[] = [
    {
      id: 'eu-accession',
      name: {
        sq: 'Anëtarësimi në BE',
        en: 'EU Accession'
      },
      category: 'foreign',
      priority: 'critical',
      relatedParties: ['PS', 'PD', 'LSI'],
      publicSentiment: 0.75,
      keywords: ['EU', 'Brussels', 'negotiations', 'chapters', 'reforms']
    },
    {
      id: 'corruption',
      name: {
        sq: 'Korrupsioni',
        en: 'Corruption'
      },
      category: 'domestic',
      priority: 'critical',
      relatedParties: ['PS', 'PD', 'LSI', 'PL'],
      publicSentiment: -0.8,
      keywords: ['SPAK', 'justice', 'bribes', 'scandal', 'arrests']
    },
    {
      id: 'migration',
      name: {
        sq: 'Emigrimi',
        en: 'Migration'
      },
      category: 'social',
      priority: 'high',
      relatedParties: ['PS', 'PD'],
      publicSentiment: -0.6,
      keywords: ['youth', 'brain drain', 'diaspora', 'return']
    },
    {
      id: 'economy',
      name: {
        sq: 'Ekonomia',
        en: 'Economy'
      },
      category: 'economic',
      priority: 'high',
      relatedParties: ['PS', 'PD', 'LSI'],
      publicSentiment: -0.3,
      keywords: ['GDP', 'inflation', 'jobs', 'investment', 'tourism']
    },
    {
      id: 'justice-reform',
      name: {
        sq: 'Reforma në Drejtësi',
        en: 'Justice Reform'
      },
      category: 'domestic',
      priority: 'critical',
      relatedParties: ['PS', 'PD'],
      publicSentiment: 0.5,
      keywords: ['vetting', 'judges', 'prosecutors', 'courts', 'SPAK']
    },
    {
      id: 'energy',
      name: {
        sq: 'Energjia',
        en: 'Energy'
      },
      category: 'economic',
      priority: 'high',
      relatedParties: ['PS', 'PD'],
      publicSentiment: -0.4,
      keywords: ['electricity', 'prices', 'hydropower', 'imports', 'crisis']
    },
    {
      id: 'education',
      name: {
        sq: 'Arsimi',
        en: 'Education'
      },
      category: 'social',
      priority: 'medium',
      relatedParties: ['PS', 'PD'],
      publicSentiment: -0.2,
      keywords: ['schools', 'universities', 'reform', 'quality', 'teachers']
    },
    {
      id: 'healthcare',
      name: {
        sq: 'Shëndetësia',
        en: 'Healthcare'
      },
      category: 'social',
      priority: 'high',
      relatedParties: ['PS', 'PD', 'LSI'],
      publicSentiment: -0.5,
      keywords: ['hospitals', 'doctors', 'medicine', 'insurance', 'COVID']
    },
    {
      id: 'environment',
      name: {
        sq: 'Mjedisi',
        en: 'Environment'
      },
      category: 'environmental',
      priority: 'medium',
      relatedParties: ['PS', 'PD'],
      publicSentiment: 0.3,
      keywords: ['pollution', 'waste', 'rivers', 'national parks', 'climate']
    },
    {
      id: 'infrastructure',
      name: {
        sq: 'Infrastruktura',
        en: 'Infrastructure'
      },
      category: 'economic',
      priority: 'high',
      relatedParties: ['PS', 'PD'],
      publicSentiment: 0.2,
      keywords: ['roads', 'airports', 'ports', 'construction', 'investment']
    }
  ];

  private issueStances: IssueSentiment[] = [
    {
      issue: 'eu-accession',
      party: 'PS',
      stance: 'support',
      strength: 0.9,
      statements: ['Albania will join EU by 2030', 'Reforms are on track']
    },
    {
      issue: 'eu-accession',
      party: 'PD',
      stance: 'support',
      strength: 0.8,
      statements: ['Government is failing EU negotiations', 'We would do better']
    },
    {
      issue: 'corruption',
      party: 'PD',
      stance: 'oppose',
      strength: 1.0,
      statements: ['Government is most corrupt ever', 'SPAK must investigate PM']
    },
    {
      issue: 'corruption',
      party: 'PS',
      stance: 'oppose',
      strength: 0.7,
      statements: ['Justice reform is working', 'Opposition leaders are corrupt']
    },
    {
      issue: 'migration',
      party: 'PS',
      stance: 'neutral',
      strength: 0.5,
      statements: ['Creating opportunities at home', 'Diaspora is important']
    },
    {
      issue: 'migration',
      party: 'PD',
      stance: 'oppose',
      strength: 0.8,
      statements: ['Youth are fleeing', 'Government has failed']
    }
  ];

  /**
   * Get all political parties
   */
  getParties(): PoliticalParty[] {
    return this.parties;
  }

  /**
   * Get party by ID
   */
  getParty(id: string): PoliticalParty | undefined {
    return this.parties.find(p => p.id === id);
  }

  /**
   * Get all political leaders
   */
  getLeaders(): PoliticalLeader[] {
    return this.leaders;
  }

  /**
   * Get all political issues
   */
  getIssues(): PoliticalIssue[] {
    return this.issues;
  }

  /**
   * Get issues by category
   */
  getIssuesByCategory(category: string): PoliticalIssue[] {
    return this.issues.filter(i => i.category === category);
  }

  /**
   * Get party stance on issue
   */
  getPartyStance(partyId: string, issueId: string): IssueSentiment | undefined {
    return this.issueStances.find(s => s.party === partyId && s.issue === issueId);
  }

  /**
   * Calculate party similarity based on issue stances
   */
  calculatePartySimilarity(party1: string, party2: string): number {
    const stances1 = this.issueStances.filter(s => s.party === party1);
    const stances2 = this.issueStances.filter(s => s.party === party2);

    let similarity = 0;
    let count = 0;

    stances1.forEach(s1 => {
      const s2 = stances2.find(s => s.issue === s1.issue);
      if (s2) {
        if (s1.stance === s2.stance) {
          similarity += 1 - Math.abs(s1.strength - s2.strength);
        }
        count++;
      }
    });

    return count > 0 ? similarity / count : 0;
  }

  /**
   * Get coalition possibilities
   */
  getCoalitionPossibilities(threshold: number = 71): Array<{
    parties: string[];
    seats: number;
    ideologicalAlignment: number;
  }> {
    const possibilities = [];
    const partyList = this.parties.filter(p => p.seats > 0);

    // Check all possible combinations
    for (let i = 0; i < partyList.length; i++) {
      for (let j = i + 1; j < partyList.length; j++) {
        const coalition = [partyList[i], partyList[j]];
        const totalSeats = coalition.reduce((sum, p) => sum + p.seats, 0);

        if (totalSeats >= threshold) {
          possibilities.push({
            parties: coalition.map(p => p.id),
            seats: totalSeats,
            ideologicalAlignment: this.calculatePartySimilarity(
              coalition[0].id,
              coalition[1].id
            )
          });
        }

        // Try three-party coalitions
        for (let k = j + 1; k < partyList.length; k++) {
          const triCoalition = [...coalition, partyList[k]];
          const triSeats = triCoalition.reduce((sum, p) => sum + p.seats, 0);

          if (triSeats >= threshold) {
            const avgAlignment = (
              this.calculatePartySimilarity(triCoalition[0].id, triCoalition[1].id) +
              this.calculatePartySimilarity(triCoalition[0].id, triCoalition[2].id) +
              this.calculatePartySimilarity(triCoalition[1].id, triCoalition[2].id)
            ) / 3;

            possibilities.push({
              parties: triCoalition.map(p => p.id),
              seats: triSeats,
              ideologicalAlignment: avgAlignment
            });
          }
        }
      }
    }

    return possibilities.sort((a, b) => b.ideologicalAlignment - a.ideologicalAlignment);
  }

  /**
   * Get trending topics for a party
   */
  getPartyTrendingTopics(partyId: string): PoliticalIssue[] {
    const partyStances = this.issueStances.filter(s => s.party === partyId);
    const issueIds = partyStances.map(s => s.issue);

    return this.issues
      .filter(i => issueIds.includes(i.id))
      .sort((a, b) => {
        const stanceA = partyStances.find(s => s.issue === a.id);
        const stanceB = partyStances.find(s => s.issue === b.id);
        return (stanceB?.strength || 0) - (stanceA?.strength || 0);
      });
  }
}

export const albanianPoliticalOntology = new AlbanianPoliticalOntology();