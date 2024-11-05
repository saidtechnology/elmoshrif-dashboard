import React from 'react';
import { TajweedRule } from '../types';

interface SidebarProps {
  rules: TajweedRule[];
  selectedRule: TajweedRule;
  onSelectRule: (rule: TajweedRule) => void;
}

function Sidebar({ rules, selectedRule, onSelectRule }: SidebarProps) {
  return (
    <aside className="w-80 bg-white shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-emerald-800 mb-4">قواعد التجويد</h2>
        <div className="space-y-2">
          {rules.map((rule) => (
            <button
              key={rule.id}
              onClick={() => onSelectRule(rule)}
              className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                selectedRule.id === rule.id
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {rule.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;