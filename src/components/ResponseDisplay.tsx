import type { MedicationInfo } from "../model/MedicationInfo";

interface ResponseDisplayProps {
  activeTab: string;
  medicationResponse: MedicationInfo;
}

export default function ResponseDisplay({
  activeTab,
  medicationResponse,
}: ResponseDisplayProps) {
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
