import React, { useState } from 'react';
import { ScriptFormData, Tone, Audience, ScriptLength } from '../types';
import { TONE_OPTIONS, AUDIENCE_OPTIONS, LENGTH_OPTIONS } from '../constants';
import { Button } from './Button';
import { Sparkles, AlignLeft, Users, Radio, Clock } from 'lucide-react';

interface ScriptFormProps {
  onSubmit: (data: ScriptFormData) => void;
  isLoading: boolean;
}

export const ScriptForm: React.FC<ScriptFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ScriptFormData>({
    topic: '',
    additionalContext: '',
    tone: Tone.Conversational,
    audience: Audience.General,
    length: ScriptLength.Medium
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-full mb-4 ring-1 ring-cyan-400/30">
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Create Your Next Viral Video</h2>
        <p className="text-slate-400">Tell Robo AI what you want to create, and get a production-ready script in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
        {/* Topic Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-sm font-medium text-slate-300">
            Video Topic / Title Idea
          </label>
          <div className="relative">
            <input
              id="topic"
              type="text"
              required
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g., How to build a PC for under $500"
              className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <div className="absolute right-3 top-3 text-slate-600">
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* Context Input */}
        <div className="space-y-2">
          <label htmlFor="context" className="block text-sm font-medium text-slate-300">
            Key Points or Outline (Optional)
          </label>
          <div className="relative">
            <textarea
              id="context"
              rows={4}
              value={formData.additionalContext}
              onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
              placeholder="1. Intro to parts&#10;2. CPU Installation&#10;3. Cable Management tips..."
              className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
            />
            <div className="absolute right-3 top-3 text-slate-600">
              <AlignLeft size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Audience */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
              <Users size={16} className="text-cyan-400" /> Target Audience
            </label>
            <select
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value as Audience })}
              className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-3 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {AUDIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
              <Radio size={16} className="text-purple-400" /> Tone of Voice
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value as Tone })}
              className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-3 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {TONE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Length */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
              <Clock size={16} className="text-green-400" /> Est. Duration
            </label>
            <select
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value as ScriptLength })}
              className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-3 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {LENGTH_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading} 
            className="w-full h-12 text-lg font-semibold shadow-cyan-500/25"
          >
            Generate Script
          </Button>
          <p className="text-center text-xs text-slate-500 mt-3">
            Powered by Gemini 2.5 Flash. Scripts are generated instantly.
          </p>
        </div>
      </form>
    </div>
  );
};
