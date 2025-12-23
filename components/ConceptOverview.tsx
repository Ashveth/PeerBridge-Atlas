
import React from 'react';

const ConceptOverview: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-left duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold brand-font text-slate-900 dark:text-slate-50 mb-6 transition-colors">PeerBridge Atlas</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl transition-colors">
          A mental health hackathon concept reimagining how we share stories and learn coping strategies through 
          the power of AI-guided peer support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <section>
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 uppercase tracking-widest text-sm">The Problem</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
            Mental health struggles are often met with professional high barriers (cost, access) or digital isolation. 
            Furthermore, current AI therapy bots often sound robotic or fail to account for the deep <strong>cultural nuances</strong> that shape our experiences.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 uppercase tracking-widest text-sm">The Vision</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
            A bridge between <strong>Personal Narrative</strong> and <strong>Clinical Education</strong>. 
            PeerBridge uses Gemini AI not to diagnose, but to translate stories into manageable emotional maps and CBT-based toolsets.
          </p>
        </section>
      </div>

      <div className="bg-indigo-600 dark:bg-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl shadow-indigo-200 dark:shadow-none transition-colors">
        <h3 className="text-2xl font-bold mb-8 brand-font">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-bold mb-2">Instant Reframing</h4>
            <p className="text-indigo-100 text-sm">Gemini detects emotional tones and summarizes them empathetically, helping users feel "seen".</p>
          </div>
          <div>
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-bold mb-2">CBT Education</h4>
            <p className="text-indigo-100 text-sm">Translates struggles into actionable, educational Cognitive Behavioral Therapy concepts.</p>
          </div>
          <div>
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.65M18 20.28V18a2 2 0 00-2-2h-1a2 2 0 01-2-2v-1a2 2 0 00-2-2 2 2 0 01-2-2V7a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.05.81l-1.498 2.997a1 1 0 01-.894.503h-2.017a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H10.5a2 2 0 01-2-2v-.5a2 2 0 00-2-2h-.5a2 2 0 01-2-2V10.5A2.5 2.5 0 003.5 8h-.445" />
              </svg>
            </div>
            <h4 className="font-bold mb-2">Cultural Safety</h4>
            <p className="text-indigo-100 text-sm">Specially tuned to recognize and respect heritage, family values, and diverse backgrounds.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="border border-slate-200 dark:border-slate-800 p-8 rounded-2xl transition-colors">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors">User Journey</h4>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors"><strong>Anonymous Landing:</strong> User enters the Atlas, reading others' stories and feeling less alone.</p>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors"><strong>Safe Sharing:</strong> User writes their own story. There is no judgment, only an open field.</p>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors"><strong>AI Bridge:</strong> Gemini analyzes the text, identifying cognitive distortions and offering educational strategies.</p>
            </li>
          </ol>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-800 p-8 rounded-2xl transition-colors">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors">Ethical Safeguards</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors"><strong>Crisis Detection:</strong> Real-time screening for self-harm keywords with instant helpline redirection.</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors"><strong>No Medical Advice:</strong> Disclaimer-first design and strict system prompts to avoid diagnosis.</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors"><strong>Anonymity by Default:</strong> No tracking, no profiles, just temporary session identities.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConceptOverview;
