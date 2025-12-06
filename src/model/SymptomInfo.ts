// ========== SYMPTOM MODEL ==========
export interface Symptom {
  id: string;
  symptom: string;
  possibleConditions: string[];
  urgencyLevel: string;
  nextSteps: string;
  otcOptions: string[];
  prescriptionOptions: string[];
  lifestyleRecommendations: string[];
  embedding?: number[];
}
