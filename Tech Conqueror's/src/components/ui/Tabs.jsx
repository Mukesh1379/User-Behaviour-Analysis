import React from 'react';

export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex space-x-2 p-1 backdrop-blur-md bg-white/20 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-white text-gray-800 shadow-md'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}