import React, { useState, useRef } from 'react';
import { GeneratedScript, ScriptSection } from '../types';
import { Button } from './Button';
import { Copy, Download, ArrowLeft, Image as ImageIcon, MonitorPlay } from 'lucide-react';

interface ScriptDisplayProps {
  script: GeneratedScript;
  onBack: () => void;
}

export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script, onBack }) => {
  const [sections, setSections] = useState<ScriptSection[]>(script.sections);
  const printRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (index: number, field: 'content' | 'visualCue' | 'heading', value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleCopy = () => {
    const text = sections.map(s => `[${s.heading.toUpperCase()}]\nVisual: ${s.visualCue}\n\n${s.content}\n`).join('\n---\n\n');
    navigator.clipboard.writeText(`${script.title}\n\n${text}`);
    alert("Script copied to clipboard!");
  };

  const handleDownload = () => {
     const text = sections.map(s => `[${s.heading.toUpperCase()}]\nVisual: ${s.visualCue}\n\n${s.content}\n`).join('\n---\n\n');
     const blob = new Blob([`TITLE: ${script.title}\n\n${text}`], { type: "text/plain" });
     const url = URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href = url;
     a.download = `${script.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
     a.click();
     URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onBack} className="!px-2">
              <ArrowLeft size={20} />
            </Button>
            <h2 className="text-xl font-bold text-white truncate max-w-md">{script.title}</h2>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button variant="secondary" onClick={handleCopy} icon={<Copy size={16}/>}>
              Copy
            </Button>
            <Button variant="primary" onClick={handleDownload} icon={<Download size={16}/>}>
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Thumbnail Idea</h3>
            <div className="flex gap-3">
                <ImageIcon className="text-slate-400 shrink-0" size={24} />
                <p className="text-slate-300 text-sm leading-relaxed">{script.thumbnailIdea}</p>
            </div>
         </div>
         <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 md:col-span-2">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Video Title Optimization</h3>
            <div className="flex gap-3">
                <MonitorPlay className="text-slate-400 shrink-0" size={24} />
                <p className="text-white text-lg font-medium leading-relaxed">{script.title}</p>
            </div>
         </div>
      </div>

      {/* Script Editor */}
      <div ref={printRef} className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/30 transition-colors shadow-sm">
            {/* Section Header */}
            <div className="bg-slate-900/50 px-6 py-3 border-b border-slate-700 flex items-center justify-between">
                <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => handleContentChange(idx, 'heading', e.target.value)}
                    className="bg-transparent text-cyan-400 font-mono font-bold text-sm uppercase tracking-wider focus:outline-none focus:text-cyan-300 w-full"
                />
                <span className="text-xs text-slate-500 font-mono">{section.durationEst || 'auto'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-700">
                {/* Visual Cue Column */}
                <div className="md:col-span-4 p-4 bg-slate-800/30">
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Visual / B-Roll</label>
                    <textarea 
                        value={section.visualCue}
                        onChange={(e) => handleContentChange(idx, 'visualCue', e.target.value)}
                        className="w-full h-full min-h-[100px] bg-slate-900/50 text-slate-300 text-sm p-3 rounded-lg border border-slate-700/50 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none resize-y font-medium italic"
                    />
                </div>
                
                {/* Audio/Script Column */}
                <div className="md:col-span-8 p-4 bg-slate-800">
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Audio / Script</label>
                    <textarea 
                        value={section.content}
                        onChange={(e) => handleContentChange(idx, 'content', e.target.value)}
                        className="w-full min-h-[150px] bg-transparent text-slate-100 text-base leading-relaxed p-2 border-0 focus:ring-0 focus:outline-none resize-none font-sans"
                        style={{ height: 'auto' }}
                        ref={(el) => {
                             if (el) {
                                 el.style.height = 'auto';
                                 el.style.height = el.scrollHeight + 'px';
                             }
                        }}
                    />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
