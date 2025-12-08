interface QueryFormProps {
  activeTab: string;
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  handleSubmit: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function QueryForm({
  activeTab,
  query,
  setQuery,
  loading,
  handleSubmit,
  handleKeyPress,
}: QueryFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {activeTab === "drug"
            ? "Enter Drug Name or Question"
            : "Describe Your Symptoms"}
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={
            activeTab === "drug"
              ? 'e.g., "What is Ibuprofen used for?" or "Tell me about aspirin side effects"'
              : 'e.g., "I have a persistent headache and feel dizzy"'
          }
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`w-full text-white px-6 py-3 rounded-lg font-semibold transition disabled:bg-gray-400 ${
          activeTab === "drug"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={loading || !query.trim()}
      >
        {loading
          ? "Processing..."
          : activeTab === "drug"
          ? "Get Drug Information"
          : "Analyze Symptoms"}
      </button>
    </div>
  );
}
