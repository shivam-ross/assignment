import { useState } from 'react';
import NewDealForm from '../components/newDealForm';
import DealsPage from '../components/dealspage';

export default function App() {
  const [view, setView] = useState('form');
  
  function handleDealAdded() {
      setView('deals');
  };

  return (
    <div className="min-h-screen bg-gray-400 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white tracking-tight">DealFlow</h1>
            <nav className="flex items-center space-x-2 rounded-lg bg-white/60 border border-white/70 backdrop-blur p-1">
              <button
                onClick={() => setView('form')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${view === 'form' ? 'bg-gray-800 text-white' : 'text-gray-800 hover:bg-gray-500'}`}
              >
                New Deal
              </button>
              <button
                onClick={() => setView('deals')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${view === 'deals' ? 'bg-gray-800 text-white' : 'text-gray-800 hover:bg-gray-700'}`}
              >
                View Deals
              </button>
            </nav>
          </div>
        </header>

        <main>
          {view === 'form' ? (
            <div className="max-w-2xl mx-auto">
                <NewDealForm onDealAdded={handleDealAdded} />
            </div>
          ) : (
            <DealsPage />
          )}
        </main>
      
      </div>
    </div>
  );
}