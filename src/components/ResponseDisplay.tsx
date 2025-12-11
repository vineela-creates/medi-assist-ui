import type { MedicationInfo } from "../model/MedicationInfo";
import type { SymptomDiagnosisResponse } from "../model/SymptomInfo";

interface ResponseDisplayProps {
  activeTab: string;
  medicationResponse: MedicationInfo;
  symptomResponse: SymptomDiagnosisResponse;
}

// Symptom Response Display Component
function SymptomResponseDisplay({
  response,
}: {
  response: SymptomDiagnosisResponse;
}) {
  // Handle error state
  if (response.errorMessage) {
    return (
      <div className="mt-8 p-6 rounded-lg border bg-red-50 border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-2">❌ Error</h3>
        <p className="text-red-700 whitespace-pre-line">
          {response.errorMessage}
        </p>
      </div>
    );
  }
  // Handle symptom response
  if (!response.symptomQuery && !response.errorMessage) {
    return null;
  }
  // Get urgency color
  const getUrgencyColor = (level: string) => {
    const l = level?.toLowerCase() || "low";
    console.log("Urgency level:", l);

    switch (l) {
      case "emergency":
        return "border-red-600 bg-red-50";
      case "high":
        return "border-orange-500 bg-orange-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const getConfidenceBadgeColor = (level: string) => {
    const l = level?.toUpperCase() || "LOW";
    switch (l) {
      case "HIGH":
        return "bg-green-100 text-green-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
      case "VERY LOW":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const confidencePercentage = Math.round(response?.confidenceScore * 100);

  return (
    <div className={response && `mt-8 space-y-6`}>
      {/* Header Section with Matched Symptom and Urgency */}
      <div
        className={
          response.urgencyLevel &&
          `p-6 rounded-lg border-2 ${getUrgencyColor(response.urgencyLevel)}`
        }
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {response.urgencyEmoji && (
                <span className="text-3xl">{response.urgencyEmoji}</span>
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {response.matchedSymptom}
                </h3>
                {response.symptomQuery !== response.matchedSymptom && (
                  <p className="text-sm text-gray-600 mt-1">
                    Your query: "{response.symptomQuery}"
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={
                response.confidenceLevel &&
                `px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceBadgeColor(
                  response.confidenceLevel
                )}`
              }
            >
              {response.confidenceLevel &&
                `${confidencePercentage}% ${response?.confidenceLevel}`}
            </span>
            {response.urgencyLevel && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white">
                {response.urgencyLevel.toUpperCase()} URGENCY
              </span>
            )}
          </div>
        </div>
        {/* Search Type */}
        {response.searchType && (
          <p className="text-xs text-gray-500">
            Search Type: {response.searchType.replace(/_/g, " ")}
          </p>
        )}
      </div>

      {/* Medical Disclaimer Alert */}
      {response.medicalDisclaimer && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-line">
              {response.medicalDisclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Possible Conditions */}
      {response.possibleConditions &&
        response.possibleConditions.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Possible Conditions
            </h4>
            <ul className="space-y-2">
              {response.possibleConditions.map((condition, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Next Steps */}
      {response.nextSteps && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg
              className="w-5 h-5 text-purple-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            Next Steps
          </h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {response.nextSteps}
          </p>
        </div>
      )}

      {/* OTC Treatment Options */}
      {response.otcOptions && response.otcOptions.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Over-the-Counter Options
          </h4>
          <ul className="space-y-2">
            {response.otcOptions.map((option, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prescription Options */}
      {response.prescriptionOptions &&
        response.prescriptionOptions.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-orange-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Prescription Options
            </h4>
            <ul className="space-y-2">
              {response.prescriptionOptions.map((option, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">℞</span>
                  <span className="text-gray-700">{option}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-3 italic">
              * Requires prescription from a healthcare provider
            </p>
          </div>
        )}

      {/* Lifestyle Recommendations */}
      {response.lifestyleRecommendations &&
        response.lifestyleRecommendations.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-teal-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Lifestyle & Self-Care
            </h4>
            <ul className="space-y-2">
              {response.lifestyleRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-teal-500 mr-2 mt-1">♥</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Alternative Matches */}
      {response.alternativeMatches &&
        response.alternativeMatches.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              Alternative Matches
            </h4>
            <div className="space-y-3">
              {response.alternativeMatches.map((match, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-900 flex-1">
                      {match.symptom}
                    </p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded ml-2">
                      {Math.round(match.confidenceScore * 100)}%
                    </span>
                  </div>
                  {match.possibleConditions &&
                    match.possibleConditions.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Conditions: {match.possibleConditions.join(", ")}
                      </p>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Sources Section */}
      {response.sources && response.sources.length > 0 && (
        <div className="pt-6 border-t border-gray-300">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Information Sources
          </h4>
          <div className="flex flex-wrap gap-2">
            {response.sources.map((source, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResponseDisplay({
  activeTab,
  medicationResponse,
  symptomResponse,
}: ResponseDisplayProps) {
  // Handle symptom response
  if (activeTab === "symptom" && symptomResponse) {
    return <SymptomResponseDisplay response={symptomResponse} />;
  }

  // Handle medication response
  if (!medicationResponse.drugName && !medicationResponse.errorMessage) {
    return null;
  }

  // Handle error state
  if (medicationResponse.errorMessage) {
    return (
      <div className="mt-8 p-6 rounded-lg border bg-red-50 border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
        <p className="text-red-700">{medicationResponse.errorMessage}</p>
      </div>
    );
  }

  const bgColor = activeTab === "drug" ? "bg-blue-50" : "bg-green-50";
  const borderColor =
    activeTab === "drug" ? "border-blue-200" : "border-green-200";
  const badgeColor =
    activeTab === "drug"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";

  return (
    <div className={`mt-8 p-6 rounded-lg border ${bgColor} ${borderColor}`}>
      {/* Header Section with Drug Name and Confidence */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {medicationResponse.drugName}
            </h3>
            {medicationResponse.genericName &&
              medicationResponse.genericName.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Generic: {medicationResponse.genericName.join(", ")}
                </p>
              )}
          </div>
          {medicationResponse.highConfidence !== undefined && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
            >
              {medicationResponse.confidencePercentage ||
                `${Math.round(
                  (medicationResponse.confidenceScore || 0) * 100
                )}%`}{" "}
              Confidence
            </span>
          )}
        </div>

        {medicationResponse.brandNames && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Brand Names:</span>{" "}
            {medicationResponse.brandNames}
          </p>
        )}
      </div>

      {/* Search Context (for symptom-based searches) */}
      {medicationResponse.searchedSymptom && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Your Query:</span> "
            {medicationResponse.searchedSymptom}"
          </p>
          {medicationResponse.searchType && (
            <p className="text-xs text-gray-500 mt-1">
              Search Type: {medicationResponse.searchType.replace(/_/g, " ")}
            </p>
          )}
        </div>
      )}

      {/* Medical Disclaimer Alert */}
      {medicationResponse.medicalDisclaimer && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-amber-800 leading-relaxed">
              {medicationResponse.medicalDisclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Description */}
      {medicationResponse.description && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h4>
          <p className="text-gray-700 leading-relaxed">
            {medicationResponse.description}
          </p>
        </div>
      )}

      {/* Indications */}
      {medicationResponse.indications && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Uses & Indications
          </h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {medicationResponse.indications}
            </p>
          </div>
        </div>
      )}

      {/* Side Effects */}
      {medicationResponse.sideEffects && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg
              className="w-5 h-5 text-orange-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Side Effects
          </h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {medicationResponse.sideEffects}
            </p>
          </div>
        </div>
      )}

      {/* Contraindications */}
      {medicationResponse.contraIndications && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            Contraindications
          </h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {medicationResponse.contraIndications}
            </p>
          </div>
        </div>
      )}

      {/* Alternative Drugs */}
      {medicationResponse.alternativeDrugs && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <svg
              className="w-5 h-5 text-purple-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            Alternative Medications
          </h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {medicationResponse.alternativeDrugs}
            </p>
          </div>
        </div>
      )}

      {/* Sources Section */}
      {medicationResponse.sources && medicationResponse.sources.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-300">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Information Sources
          </h4>
          <div className="space-y-2">
            {medicationResponse.sources.map((source, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded border border-gray-200 text-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {source.drugName}
                  </span>
                  <div className="flex items-center gap-2">
                    {source.chunkType && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {source.chunkType.replace(/_/g, " ")}
                      </span>
                    )}
                    {source.relevanceScore !== undefined && (
                      <span className="text-xs text-gray-500">
                        {Math.round(source.relevanceScore * 100)}% relevant
                      </span>
                    )}
                  </div>
                </div>
                {source.contentSnippet && (
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {source.contentSnippet}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
