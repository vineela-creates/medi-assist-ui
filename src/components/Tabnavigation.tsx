interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSeeDemo: () => void;
}

export default function TabNavigation({
  activeTab,
  setActiveTab,
  onSeeDemo,
}: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-8 gap-4 flex-wrap">
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

      {/* See Demo Button */}
      <button
        onClick={onSeeDemo}
        className="px-6 py-2 rounded-md font-medium border-2 border-purple-500 text-purple-600 hover:bg-purple-50 transition flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        See Demo
      </button>
    </div>
  );
}
