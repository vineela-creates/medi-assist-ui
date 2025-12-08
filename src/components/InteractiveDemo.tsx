import type { MedicationInfo } from "../model/MedicationInfo";
import Disclaimer from "./Disclaimer";
import QueryForm from "./Queryform";
import ResponseDisplay from "./ResponseDisplay";
import TabNavigation from "./Tabnavigation";
interface InteractiveDemoProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  medicationResponse: MedicationInfo;
  handleSubmit: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function InteractiveDemo({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  loading,
  medicationResponse,
  handleSubmit,
  handleKeyPress,
}: InteractiveDemoProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Try MediAssist Now
        </h2>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <QueryForm
            activeTab={activeTab}
            query={query}
            setQuery={setQuery}
            loading={loading}
            handleSubmit={handleSubmit}
            handleKeyPress={handleKeyPress}
          />

          <ResponseDisplay
            activeTab={activeTab}
            medicationResponse={medicationResponse}
          />
        </div>

        <Disclaimer />
      </div>
    </section>
  );
}
