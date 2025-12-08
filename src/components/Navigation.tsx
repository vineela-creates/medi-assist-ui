export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/mediassist.svg"
              alt="Medi Assist Logo"
              className="h-16 w-auto"
            />
            <span className="text-2xl font-bold text-blue-600">MediAssist</span>
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
  );
}
