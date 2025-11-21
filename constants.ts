import { ScriptFormData, Tone, Audience, ScriptLength } from './types';

export const DEFAULT_FORM_DATA: ScriptFormData = {
  topic: '',
  additionalContext: '',
  tone: Tone.Conversational,
  audience: Audience.General,
  length: ScriptLength.Medium,
};

export const TONE_OPTIONS = Object.values(Tone);
export const AUDIENCE_OPTIONS = Object.values(Audience);
export const LENGTH_OPTIONS = Object.values(ScriptLength);
