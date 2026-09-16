export type ClaimCategory =
  | 'banking_fintech'
  | 'elections_politics'
  | 'education_exams'
  | 'telecom_tech'
  | 'public_health'
  | 'security_alerts'
  | 'general';

export type VerdictType = 'SUPPORTED' | 'CONTRADICTED' | 'MISLEADING' | 'UNVERIFIED';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ExtractedClaim {
  normalizedClaim: string;
  entity: string;
  category: ClaimCategory;
  location?: string;
  dateClaimed?: string;
  rawText: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  snippet: string;
  url: string;
  domain: string;
  sourceName: string;
  isOfficialAuthority: boolean;
  publishedDate?: string;
  score: number; // 0 - 100
  authorityScore: number;
  relevanceScore: number;
  recencyScore: number;
  corroborationScore: number;
}

export interface FactCheckMatch {
  claim: string;
  claimant?: string;
  publisher: string;
  rating: string;
  reviewUrl: string;
  reviewDate?: string;
}

export interface VerificationResult {
  id: string;
  query: string;
  extractedClaim: ExtractedClaim;
  verdict: VerdictType;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0 - 100
  reasoning: string;
  shortExplanation: string;
  pidginExplanation?: string;
  keyQuote?: string;
  evidence: EvidenceItem[];
  factCheckFound: boolean;
  factCheckDetails?: FactCheckMatch;
  verifiedAt: string;
  processingTimeMs: number;
  pipelineStages: {
    stage: string;
    status: 'completed' | 'skipped' | 'fallback';
    durationMs: number;
    details: string;
  }[];
}

export interface DemoPreset {
  id: string;
  title: string;
  category: ClaimCategory;
  prompt: string;
  expectedVerdict: VerdictType;
  tag: string;
  badgeColor: string;
}
