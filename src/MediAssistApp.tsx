import { useState } from "react";
import type { MedicationInfo } from "./model/MedicationInfo";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import InteractiveDemo from "./components/InteractiveDemo";
import Footer from "./components/Footer";
import type { SymptomDiagnosisResponse } from "./model/SymptomInfo";
import { DEMO_DATA } from "./model/DemoData";

function MediAssistApp() {
  const [activeTab, setActiveTab] = useState("drug");
  const [query, setQuery] = useState("");
  const [medicationResponse, setMedicationResponse] = useState(
    {} as MedicationInfo
  );
  const [symptomResponse, setSymptomResponse] = useState(
    {} as SymptomDiagnosisResponse
  );
  const [loading, setLoading] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setQuery("");
    setMedicationResponse({} as MedicationInfo);
    setSymptomResponse({} as SymptomDiagnosisResponse);
  };

  // ✅ NEW: handleSeeDemo function
  const handleSeeDemo = async () => {
    if (activeTab === "drug") {
      // Demo for Drug Information tab
      const demoDrug = DEMO_DATA.drugs[demoIndex % DEMO_DATA.drugs.length];
      setQuery(demoDrug);

      // Auto-submit after setting query
      setTimeout(async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/explainDrug?drugName=${encodeURIComponent(demoDrug)}`
          );
          const data = await response.json();
          setMedicationResponse(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }, 100);
    } else {
      // Demo for Symptom Analysis tab
      const demoSymptoms =
        DEMO_DATA.symptoms[demoIndex % DEMO_DATA.symptoms.length];
      setQuery(demoSymptoms);

      // Auto-submit after setting query
      setTimeout(async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/suggestDrug?query=${encodeURIComponent(demoSymptoms)}`
          );
          const data = await response.json();
          setSymptomResponse(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }, 100);
    }

    // Increment demo index for next click
    setDemoIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      // Using Vercel proxy endpoints instead of direct EC2 URL
      const endpoint =
        activeTab === "drug"
          ? `/api/explainDrug?drugName=${encodeURIComponent(query)}`
          : `/api/suggestDrug?query=${encodeURIComponent(query)}`;

      const result = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok) {
        throw new Error("API request failed");
      }

      const data = await result.json();
      console.log(data);
      setMedicationResponse(data);
      setSymptomResponse(data);
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
        symptomResponse={symptomResponse}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
        handleSeeDemo={handleSeeDemo} 
      />
      <Footer />
    </div>
  );
}

export default MediAssistApp;
