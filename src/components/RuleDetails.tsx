import React from 'react';
import { PlayCircle } from 'lucide-react';
import { TajweedRule } from '../types';

interface RuleDetailsProps {
  rule: TajweedRule;
}

function RuleDetails({ rule }: RuleDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">{rule.title}</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">التعريف</h3>
          <p className="text-gray-600 leading-relaxed">{rule.definition}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">الأمثلة</h3>
          <div className="grid gap-4">
            {rule.examples.map((example, index) => (
              <div 
                key={index}
                className="bg-emerald-50 p-4 rounded-lg border border-emerald-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-700 font-semibold">{example.text}</span>
                  {example.audioUrl && (
                    <button 
                      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>استمع</span>
                    </button>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{example.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {rule.notes && (
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">ملاحظات</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {rule.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default RuleDetails;