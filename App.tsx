import React from 'react';
import DynamicBackground from './components/DynamicBackground';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <DynamicBackground />
      <div className="relative min-h-screen w-full">
        <Portfolio />
      </div>
    </div>
  );
};

export default App;