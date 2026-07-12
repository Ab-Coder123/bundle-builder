import React from 'react';
import { useLocalStorageRestore } from './hooks/useLocalStorage';
import BundleSteps from './components/BundleBuilder/BundleSteps';
import ReviewPanel from './components/ReviewPanel/ReviewPanel';

export const App: React.FC = () => {
  useLocalStorageRestore();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] flex flex-col font-sans">
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Mobile: stacked. Desktop: two-column side by side */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* "Let's get started!" title — visible on mobile only */}
          <h1 className="text-[28px] font-bold text-[#0B0D10] text-center mb-6 lg:hidden">
            Let's get started!
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Builder Steps (Left column on desktop, full width on mobile) */}
            <section className="w-full lg:flex-1 min-w-0">
              <BundleSteps />
            </section>

            {/* Live Review Panel (Right column on desktop, below steps on mobile) */}
            <aside className="w-full lg:w-[360px] shrink-0">
              <ReviewPanel />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
