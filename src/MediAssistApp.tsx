import { useState } from "react";
import type { MedicationInfo } from "./model/MedicationInfo";

function MedicalRAGApp() {
  const [activeTab, setActiveTab] = useState("drug");
  const [query, setQuery] = useState("");
  const [medicationResponse, setMedicationResponse] = useState(
    {} as MedicationInfo
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const endpoint =
        activeTab === "drug"
          ? `/api/drugs/v1/explainDrug?drugName=${encodeURIComponent(query)}`
          : `/api/drugs/v1/suggestDrug?query=${encodeURIComponent(query)}`;

      const result = await fetch(`http://localhost:8080${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok) {
        throw new Error("API request failed");
      }

      const data = await result.json();
      console.log(data);
      setMedicationResponse(data); // Adjust based on your actual response structure
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
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/mediassist.svg"
                alt="Medi Assist Logo"
                className="h-16 w-auto"
              />
              <span className="text-2xl font-bold text-blue-600">
                MediAssist
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Welcome Message */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to MediAssist
            </h1>
            <p className="text-xl text-blue-100 mb-4 leading-relaxed">
              Your intelligent healthcare companion powered by advanced AI
              technology. MediAssist helps you make informed decisions about
              your health by providing:
            </p>
            <div className="space-y-3 mb-8 text-lg text-blue-50">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Comprehensive Drug Information:</strong> Get detailed
                  information about medications, including uses, dosages, side
                  effects, and interactions
                </span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Symptom-Based Suggestions:</strong> Describe your
                  symptoms and receive intelligent suggestions for potential
                  conditions and treatment options
                </span>
              </div>
            </div>
            <a
              href="#services"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How MediAssist Can Help You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Leveraging cutting-edge Retrieval-Augmented Generation (RAG)
              technology, we provide accurate, context-aware medical information
              at your fingertips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Drug Information Database
              </h3>
              <p className="text-gray-700 mb-4">
                Access a comprehensive database of medications with detailed
                information about each drug. Search by drug name, active
                ingredient, or therapeutic class to find:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Purpose and uses of the medication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Recommended dosages and administration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Potential side effects and warnings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Drug interactions and contraindications</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <svg
                className="w-32 h-32 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-green-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <svg
                className="w-32 h-32 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Symptom Analysis & Suggestions
              </h3>
              <p className="text-gray-700 mb-4">
                Describe your symptoms in natural language and receive
                intelligent suggestions. Our AI-powered system analyzes your
                input to provide:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>

                  <span>Possible conditions related to your symptoms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>

                  <span>Recommended next steps and when to seek care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>

                  <span>Over-the-counter or prescription options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Lifestyle recommendations and home remedies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Try MediAssist Now
          </h2>

          {/* Tab Navigation */}
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

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
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

            {medicationResponse.drugName && (
              <div
                className={`mt-8 p-6 rounded-lg border ${
                  activeTab === "drug"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Response:
                </h3>
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
            )}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This tool provides general
              information only and is not a substitute for professional medical
              advice. Always consult with a healthcare provider for medical
              concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MediAssist</h3>
              <p className="text-gray-400">
                Your intelligent healthcare companion powered by advanced RAG
                technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#home" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Email: vineelalearns@gmail.com
                <br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MedicalRAGApp;
