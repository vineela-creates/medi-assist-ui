export interface Source {
  drugName: string;
  source: string | null;
  chunkType: string;
  relevanceScore: number;
  contentSnippet: string;
}

export interface MedicationInfo {
  drugName?: string;
  genericName?: string[];
  brandNames?: string;
  description?: string;
  indications?: string;
  sideEffects?: string;
  contraIndications?: string;
  medicalDisclaimer?: string;
  sources?: Source[];
  confidenceScore?: number;
  errorMessage?: string;
  alternativeDrugs?: string;
  searchedSymptom?: string;
  searchType?: string;
  valid?: boolean;
  highConfidence?: boolean;
  confidenceLevel?: string;
  confidencePercentage?: string;
}
