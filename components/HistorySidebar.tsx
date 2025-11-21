import React from 'react';
import { GeneratedScript } from '../types';
import { History, FileText, Trash2, Plus } from 'lucide-react';

interface HistorySidebarProps {
  history: GeneratedScript[];
  onSelect: (script: GeneratedScript) => void;
  onNew: () => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  isOpen: boolean;
  currentId?: string;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  history, 
  onSelect, 
  onNew, 
  onDelete,
  isOpen,
  currentId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <div className="bg-cyan-500/10 p-1.5 rounded-md">
             <History size={18} className="text-cyan-400" />
        </div>
        <span className="font-display font-bold text-white tracking-wide">LIBRARY</span>
      </div>

      {/* New Script Button */}
      <div className="p-4">
        <button 
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          New Script
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-thin">
        {history.length === 0 ? (
          <div className="text-center p-4 text-slate-500 text-sm">
            No saved scripts yet.
          </div>
        ) : (
          history.map((script) => (
            <div 
              key={script.id}
              onClick={() => onSelect(script)}
              className={`group relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                currentId === script.id 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <FileText size={16} className={`mt-0.5 shrink-0 ${currentId === script.id ? 'text-cyan-400' : 'text-slate-500'}`} />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate leading-tight mb-0.5">{script.topic}</h4>
                <p className="text-[10px] opacity-60">{new Date(script.createdAt).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={(e) => onDelete(script.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-600 text-center">
        Robo AI v1.0
      </div>
    </div>
  );
};
