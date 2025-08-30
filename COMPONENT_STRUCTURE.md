# Component Structure Documentation

## Overview
The `App.jsx` file has been successfully segregated into multiple focused components based on their use cases. This improves code maintainability, reusability, and follows React best practices.

## Component Architecture

### 1. **Header Component** (`src/components/Header/`)
- **Purpose**: Manages the data manager toggle functionality
- **Props**: 
  - `showDataManager`: Boolean state for visibility
  - `onToggleDataManager`: Function to toggle visibility
- **Features**: Responsive toggle button with active/inactive states

### 2. **MapSection Component** (`src/components/MapSection/`)
- **Purpose**: Wraps the interactive map with descriptive header
- **Props**: 
  - `reports`: Array of environmental reports
  - `userCoords`: User's GPS coordinates
- **Features**: Map header with title and description

### 3. **StatisticsDashboard Component** (`src/components/StatisticsDashboard/`)
- **Purpose**: Displays impact statistics in a grid layout
- **Props**: 
  - `reports`: Array of submitted reports
  - `leaderboard`: Array of user leaderboard data
- **Features**: 
  - Reports count
  - Active contributors count
  - Total points earned
  - Mangrove areas monitored

### 4. **QuickLinks Component** (`src/components/QuickLinks/`)
- **Purpose**: Educational links about mangrove conservation
- **Features**: 
  - Global Mangrove Watch
  - Mangrove Action Project
  - IUCN Red List
  - Hover effects and animations

### 5. **Footer Component** (`src/components/Footer/`)
- **Purpose**: App footer with branding and description
- **Features**: 
  - HackOut25 branding
  - Environmental mission statement
  - Responsive design

## Custom Hooks

### 1. **useGeolocation Hook** (`src/hooks/useGeolocation.jsx`)
- **Purpose**: Manages GPS location functionality
- **Returns**: 
  - `coords`: GPS coordinates
  - `error`: Location error message
  - `loading`: Loading state
- **Features**: Error handling, timeout, and accuracy options

### 2. **useAppState Hook** (`src/hooks/useAppState.jsx`)
- **Purpose**: Manages main application state
- **Returns**: 
  - `reports`: Array of reports
  - `leaderboard`: User leaderboard
  - `showDataManager`: Data manager visibility
  - `handleReportSubmit`: Report submission handler
  - `toggleDataManager`: Data manager toggle
- **Features**: Automatic leaderboard updates on report submission

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single, clear responsibility
2. **Reusability**: Components can be easily reused in other parts of the app
3. **Maintainability**: Easier to debug and modify specific functionality
4. **Testing**: Individual components can be tested in isolation
5. **Performance**: Better code splitting and lazy loading opportunities
6. **Team Development**: Multiple developers can work on different components simultaneously

## File Organization

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── MapSection/
│   │   ├── MapSection.jsx
│   │   └── MapSection.css
│   ├── StatisticsDashboard/
│   │   ├── StatisticsDashboard.jsx
│   │   └── StatisticsDashboard.css
│   ├── QuickLinks/
│   │   ├── QuickLinks.jsx
│   │   └── QuickLinks.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   └── index.js
├── hooks/
│   ├── useGeolocation.jsx
│   ├── useAppState.jsx
│   └── index.js
└── App.jsx (refactored)
```

## Usage Example

```jsx
import {
  Header,
  MapSection,
  StatisticsDashboard,
  QuickLinks,
  Footer
} from "./components";
import { useGeolocation, useAppState } from "./hooks";

export default function App() {
  const { coords, error, loading } = useGeolocation();
  const { reports, leaderboard, showDataManager, handleReportSubmit, toggleDataManager } = useAppState();
  
  // Component usage...
}
```

## Future Enhancements

1. **Context API**: Consider using React Context for state management
2. **Error Boundaries**: Add error boundaries for better error handling
3. **Lazy Loading**: Implement lazy loading for better performance
4. **TypeScript**: Consider migrating to TypeScript for better type safety
5. **Storybook**: Add Storybook for component documentation and testing
