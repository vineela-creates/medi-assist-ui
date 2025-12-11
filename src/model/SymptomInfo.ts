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

/**
 * Response model for symptom-based diagnosis queries
 * Contains diagnosis, treatment recommendations, and urgency information
 */
export interface SymptomDiagnosisResponse {
  /**
   * The symptom query from the user
   */
  symptomQuery: string;

  /**
   * The matched symptom description from database
   */
  matchedSymptom: string;

  /**
   * Possible medical conditions
   */
  possibleConditions: string[];

  /**
   * Urgency level: low, medium, high, emergency
   */
  urgencyLevel: string;

  /**
   * Urgency emoji for display
   */
  urgencyEmoji: string;

  /**
   * Recommended next steps
   */
  nextSteps: string;

  /**
   * Over-the-counter medication options
   */
  otcOptions: string[];

  /**
   * Prescription medication options
   */
  prescriptionOptions: string[];

  /**
   * Lifestyle and self-care recommendations
   */
  lifestyleRecommendations: string[];

  /**
   * Confidence score (0.0 to 1.0)
   */
  confidenceScore: number;

  /**
   * Confidence level: HIGH, MEDIUM, LOW
   */
  confidenceLevel: string;

  /**
   * Alternative symptom matches (if any)
   */
  alternativeMatches: AlternativeMatch[];

  /**
   * Medical disclaimer
   */
  medicalDisclaimer: string;

  /**
   * Search type identifier
   */
  searchType: string;

  /**
   * Error message (if any)
   */
  errorMessage?: string;

  /**
   * Sources used for the diagnosis
   */
  sources: string[];
}

/**
 * Alternative symptom match
 */
export interface AlternativeMatch {
  symptom: string;
  possibleConditions: string[];
  confidenceScore: number;
}

// ========== HELPER FUNCTIONS ==========

/**
 * Check if urgent medical attention is needed
 */
export function requiresUrgentCare(
  response: SymptomDiagnosisResponse
): boolean {
  if (!response.urgencyLevel) return false;
  const level = response.urgencyLevel.toLowerCase();
  return level === "high" || level === "emergency";
}

/**
 * Check if has OTC treatment options
 */
export function hasOtcOptions(response: SymptomDiagnosisResponse): boolean {
  return response.otcOptions != null && response.otcOptions.length > 0;
}

/**
 * Check if requires prescription
 */
export function requiresPrescription(
  response: SymptomDiagnosisResponse
): boolean {
  return (
    response.prescriptionOptions != null &&
    response.prescriptionOptions.length > 0
  );
}

/**
 * Get confidence as percentage
 */
export function getConfidencePercentage(confidenceScore: number): number {
  return Math.round(confidenceScore * 100);
}

/**
 * Get confidence percentage for alternative match
 */
export function getAlternativeConfidencePercentage(
  match: AlternativeMatch
): number {
  return Math.round(match.confidenceScore * 100);
}

/**
 * Get urgency level color for UI display
 */
export function getUrgencyColor(urgencyLevel: string): string {
  const level = urgencyLevel?.toLowerCase() || "low";

  switch (level) {
    case "emergency":
      return "#DC2626"; // Red-600
    case "high":
      return "#EA580C"; // Orange-600
    case "medium":
      return "#F59E0B"; // Amber-500
    case "low":
      return "#10B981"; // Green-500
    default:
      return "#6B7280"; // Gray-500
  }
}

/**
 * Get confidence level color for UI display
 */
export function getConfidenceLevelColor(confidenceLevel: string): string {
  const level = confidenceLevel?.toUpperCase() || "LOW";

  switch (level) {
    case "HIGH":
      return "#10B981"; // Green-500
    case "MEDIUM":
      return "#F59E0B"; // Amber-500
    case "LOW":
    case "VERY LOW":
      return "#EF4444"; // Red-500
    default:
      return "#6B7280"; // Gray-500
  }
}

/**
 * Format urgency level for display
 */
export function formatUrgencyLevel(
  urgencyLevel: string,
  urgencyEmoji?: string
): string {
  const emoji = urgencyEmoji || "";
  const level =
    urgencyLevel?.charAt(0).toUpperCase() +
    urgencyLevel?.slice(1).toLowerCase();
  return emoji ? `${emoji} ${level}` : level;
}

/**
 * Type guard to check if response has error
 */
export function hasError(response: SymptomDiagnosisResponse): boolean {
  return !!response.errorMessage;
}

/**
 * Type guard to check if response is valid diagnosis
 */
export function isValidDiagnosis(response: SymptomDiagnosisResponse): boolean {
  return (
    !hasError(response) &&
    !!response.matchedSymptom &&
    !!response.possibleConditions &&
    response.possibleConditions.length > 0
  );
}
