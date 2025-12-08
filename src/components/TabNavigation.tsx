interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({
  activeTab,
  setActiveTab,
}: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
        <button
          onClick={() => setActiveTab("drug")}
          className={`px-6 py-2 rounded-md font-medium transition ${
            activeTab === "drug"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Drug Information
        </button>
        <button
          onClick={() => setActiveTab("symptom")}
          className={`px-6 py-2 rounded-md font-medium transition ${
            activeTab === "symptom"
              ? "bg-green-600 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Symptom Analysis
        </button>
      </div>
    </div>
  );
}
