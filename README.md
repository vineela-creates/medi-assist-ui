# MediAssist App - Component Structure

This is a refactored version of the MediAssist application, broken down into modular, reusable components.

## Component Hierarchy

```
MediAssistApp (Main App)
├── Navigation
├── HeroSection
│   └── CheckIcon
├── ServicesSection
│   ├── DrugIcon
│   └── ClipboardIcon
├── InteractiveDemo
│   ├── TabNavigation
│   ├── QueryForm
│   ├── ResponseDisplay
│   └── Disclaimer
└── Footer
```

## File Structure

```
/
├── MediAssistApp.tsx           # Main application component
├── components/
│   ├── Navigation.tsx          # Top navigation bar
│   ├── HeroSection.tsx         # Hero/welcome section
│   ├── ServicesSection.tsx     # Services information section
│   ├── InteractiveDemo.tsx     # Interactive query demo section
│   ├── TabNavigation.tsx       # Tab switcher (Drug/Symptom)
│   ├── QueryForm.tsx           # Query input form
│   ├── ResponseDisplay.tsx     # API response display
│   ├── Disclaimer.tsx          # Medical disclaimer
│   ├── Footer.tsx              # Page footer
│   └── icons/
│       ├── CheckIcon.tsx       # Checkmark icon
│       ├── DrugIcon.tsx        # Drug/flask icon
│       └── ClipboardIcon.tsx   # Clipboard icon
└── model/
    └── MedicationInfo.ts       # TypeScript interface (not included, use existing)
```

## Component Descriptions

### Main Components

- **MediAssistApp**: The root component that manages state and coordinates all other components
- **Navigation**: Displays the top navigation bar with logo and menu links
- **HeroSection**: Welcome section with key features and CTA button
- **ServicesSection**: Information about drug database and symptom analysis features
- **InteractiveDemo**: Interactive section where users can query drug info or symptoms
- **Footer**: Page footer with links and contact information

### Sub-Components

- **TabNavigation**: Toggle between "Drug Information" and "Symptom Analysis" modes
- **QueryForm**: Text input and submit button for queries
- **ResponseDisplay**: Displays the API response from medication queries
- **Disclaimer**: Medical disclaimer warning

### Icon Components

- **CheckIcon**: Checkmark/success icon
- **DrugIcon**: Flask/beaker icon for drug information
- **ClipboardIcon**: Clipboard with checkmark icon for symptom analysis

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the app
3. **Maintainability**: Easier to find and fix bugs in specific components
4. **Testability**: Each component can be tested independently
5. **Readability**: Smaller files are easier to understand and navigate
6. **Scalability**: Easy to add new features without affecting existing code

## Usage

Import the main component:

```tsx
import MediAssistApp from "./MediAssistApp";

function App() {
  return <MediAssistApp />;
}
```

## Props Interface

Key props passed through the component tree:

- **activeTab**: Current tab ("drug" or "symptom")
- **query**: User's input text
- **medicationResponse**: API response data
- **loading**: Loading state
- **handleSubmit**: Function to submit query
- **handleKeyPress**: Keyboard event handler

## State Management

State is managed in the main `MediAssistApp` component and passed down as props. Consider using Context API or a state management library (Redux, Zustand) for more complex state needs.
