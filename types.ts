export enum Tone {
  Informative = 'Informative',
  Humorous = 'Humorous',
  Inspirational = 'Inspirational',
  Conversational = 'Conversational',
  Controversial = 'Controversial',
  Educational = 'Educational',
}

export enum Audience {
  Beginners = 'Beginners',
  Intermediate = 'Intermediate',
  Experts = 'Experts',
  General = 'General Audience',
  Kids = 'Kids',
}

export enum ScriptLength {
  Short = 'Short (< 3 mins)',
  Medium = 'Medium (5-10 mins)',
  Long = 'Long (10+ mins)',
}

export interface ScriptSection {
  heading: string;
  content: string;
  visualCue: string;
  durationEst?: string;
}

export interface GeneratedScript {
  id: string;
  topic: string;
  title: string;
  thumbnailIdea: string;
  sections: ScriptSection[];
  createdAt: number;
}

export interface ScriptFormData {
  topic: string;
  additionalContext: string;
  tone: Tone;
  audience: Audience;
  length: ScriptLength;
}
