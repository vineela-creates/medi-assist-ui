import type { MedicationInfo } from "../model/MedicationInfo";

interface ResponseDisplayProps {
  activeTab: string;
  medicationResponse: MedicationInfo;
}

export default function ResponseDisplay({
  activeTab,
  medicationResponse,
}: ResponseDisplayProps) {
  if (!medicationResponse.drugName) {
    return null;
  }

  return (
    <div
      className={`mt-8 p-6 rounded-lg border ${
        activeTab === "drug"
          ? "bg-blue-50 border-blue-200"
          : "bg-green-50 border-green-200"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Response:</h3>
      <p className="text-gray-700 leading-relaxed">
        {medicationResponse.drugName}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {medicationResponse.indications}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {medicationResponse.contraIndications}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {medicationResponse.alternativeDrugs}
      </p>
    </div>
  );
}
