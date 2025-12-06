export interface MedicationInfo {
  //Basic drug information
  drugName: string;
  genericName: string[];
  brandNames: string;

  // RAG-generated content
  description: string;
  indications: string;
  sideEffects: string;
  contraIndications: string;
  medicalDisclaimer: string;

  // Metadata
  sources: SourceAttribution[];
  confidenceScore: number;
  errorMessage?: string;

  // Symptom search specific fields
  alternativeDrugs?: string[];
  searchedSymptom?: string;
  searchType: string;
}

// ========== SOURCE ATTRIBUTION ==========
export interface SourceAttribution {
  title: string;
  url?: string;
  publisher?: string;
  lastAccessed?: string;
  reliability?: number;
}
