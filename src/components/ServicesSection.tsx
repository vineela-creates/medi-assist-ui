import ClipboardIcon from "../icons/ClipboardIcon";
import DrugIcon from "../icons/DrugIcon";

export default function ServicesSection() {
  return (
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
            <DrugIcon />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-green-100 rounded-lg p-8 h-64 flex items-center justify-center">
            <ClipboardIcon />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Symptom Analysis & Suggestions
            </h3>
            <p className="text-gray-700 mb-4">
              Describe your symptoms in natural language and receive intelligent
              suggestions. Our AI-powered system analyzes your input to provide:
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
  );
}
