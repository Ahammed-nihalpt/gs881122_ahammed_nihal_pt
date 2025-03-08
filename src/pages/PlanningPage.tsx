import React from 'react';
import PlanningGrid from '../components/PlanningScreen/PlanningGrid';

const PlanningPage: React.FC = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5">Planning Screen</h1>
      <div className="w-full h-[calc(100vh-100px)]">
        <PlanningGrid />
      </div>
    </div>
  );
};

export default PlanningPage;
