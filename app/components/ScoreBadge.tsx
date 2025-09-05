import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green'; // background green
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow'; // background yellow
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-badge-red'; // background red
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium text-black">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
