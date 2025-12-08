import CheckIcon from "../icons/CheckIcon";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to MediAssist
          </h1>
          <p className="text-xl text-blue-100 mb-4 leading-relaxed">
            Your intelligent healthcare companion powered by advanced AI
            technology. MediAssist helps you make informed decisions about your
            health by providing:
          </p>
          <div className="space-y-3 mb-8 text-lg text-blue-50">
            <div className="flex items-start">
              <CheckIcon />
              <span>
                <strong>Comprehensive Drug Information:</strong> Get detailed
                information about medications, including uses, dosages, side
                effects, and interactions
              </span>
            </div>
            <div className="flex items-start">
              <CheckIcon />
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
  );
}
