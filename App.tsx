import React from 'react';
import DynamicBackground from './components/DynamicBackground';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <DynamicBackground />
      <div className="relative w-full">
        <Portfolio />
      </div>
    </div>
  );
};

export default App;