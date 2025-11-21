import React, { useState, useEffect } from 'react';
import { ScriptForm } from './components/ScriptForm';
import { ScriptDisplay } from './components/ScriptDisplay';
import { HistorySidebar } from './components/HistorySidebar';
import { generateScriptWithGemini } from './services/geminiService';
import { GeneratedScript, ScriptFormData } from './types';
import { Menu, Bot } from 'lucide-react';

const App: React.FC = () => {
  const [history, setHistory] = useState<GeneratedScript[]>([]);
  const [currentScript, setCurrentScript] = useState<GeneratedScript | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile
  const [error, setError] = useState<string | null>(null);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('robo-ai-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem('robo-ai-history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (formData: ScriptFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generateScriptWithGemini(formData);
      
      const newScript: GeneratedScript = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        topic: formData.topic,
        ...generatedData
      };

      setHistory(prev => [newScript, ...prev]);
      setCurrentScript(newScript);
    } catch (err) {
      setError("Failed to generate script. Please ensure your API Key is valid and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    if (currentScript?.id === id) {
      setCurrentScript(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar (Desktop always visible via padding, Mobile toggleable) */}
      <div className={`fixed inset-y-0 left-0 z-40 md:w-64 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
         <HistorySidebar 
           history={history}
           isOpen={true} // Always rendering internally, parent controls visibility
           onSelect={(s) => {
             setCurrentScript(s);
             setIsSidebarOpen(false);
           }}
           onNew={() => {
             setCurrentScript(null);
             setIsSidebarOpen(false);
           }}
           onDelete={handleDelete}
           currentId={currentScript?.id}
         />
      </div>

      {/* Main Content */}
      <main className="md:pl-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500/20 p-1 rounded text-cyan-400"><Bot size={20}/></div>
            <span className="font-bold text-white">Robo AI</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {!currentScript ? (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <ScriptForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          ) : (
            <ScriptDisplay 
              script={currentScript} 
              onBack={() => setCurrentScript(null)} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
