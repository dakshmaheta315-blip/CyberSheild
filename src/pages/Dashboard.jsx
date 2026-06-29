import React from 'react';
import CyberDashboard from '../components/CyberDashboard';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]">
      {/* અહીં આપણે કમ્પોનન્ટને કોલ કરીએ છીએ */}
      <CyberDashboard setActiveTab={setActiveTab} />
    </div>
  );
}