import { useState } from "react";
import type { MedicationInfo } from "./model/MedicationInfo";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import InteractiveDemo from "./components/InteractiveDemo";
import Footer from "./components/Footer";

function MediAssistApp() {
  const [activeTab, setActiveTab] = useState("drug");
  const [query, setQuery] = useState("");
  const [medicationResponse, setMedicationResponse] = useState(
    {} as MedicationInfo
  );
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setQuery("");
    setMedicationResponse({} as MedicationInfo);
  };
  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const endpoint =
        activeTab === "drug"
          ? `/api/drugs/v1/explainDrug?drugName=${encodeURIComponent(query)}`
          : `/api/drugs/v1/suggestDrug?query=${encodeURIComponent(query)}`;

      const result = await fetch(
        `https://drug-intelligence-system.onrender.com${endpoint}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!result.ok) {
        throw new Error("API request failed");
      }

      const data = await result.json();
      console.log(data);
      setMedicationResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setMedicationResponse({
        errorMessage: "Failed to fetch data",
      } as MedicationInfo);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <InteractiveDemo
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        query={query}
        setQuery={setQuery}
        loading={loading}
        medicationResponse={medicationResponse}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
      />
      <Footer />
    </div>
  );
}

export default MediAssistApp;
