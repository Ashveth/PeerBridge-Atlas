
import React from 'react';

interface CrisisAlertProps {
  onClose: () => void;
}

const CrisisAlert: React.FC<CrisisAlertProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="bg-rose-500 h-2 w-full"></div>
        <div className="p-8">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">We hear you, and you're not alone.</h2>
          <p className="text-slate-600 text-center mb-8">
            Our systems detected some heavy thoughts in your story. Please know that there are people who want to support you right now.
          </p>

          <div className="space-y-3 mb-8">
            <a 
              href="tel:988" 
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">988</div>
                <div>
                  <p className="font-bold text-slate-800">Suicide & Crisis Lifeline</p>
                  <p className="text-xs text-slate-500">Available 24/7 in English and Spanish</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            
            <a 
              href="sms:741741" 
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">SMS</div>
                <div>
                  <p className="font-bold text-slate-800">Crisis Text Line</p>
                  <p className="text-xs text-slate-500">Text HOME to 741741</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <button 
            onClick={onClose}
            className="w-full text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors py-2"
          >
            I'm safe, take me back to the Atlas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;
