import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useGameStore } from '../store/useGameStore';
import { mockTeams } from '../data/mockData';

export default function RouletteWheel() {
  const { selectedTeams, finishSpin, draftPhase } = useGameStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const allowedTeams = mockTeams.filter(team => selectedTeams.includes(team.id));
  const sliceAngle = allowedTeams.length > 0 ? 360 / allowedTeams.length : 0;

  const handleSpin = () => {
    if (isSpinning || draftPhase !== 'spin' || allowedTeams.length === 0) return;
    
    setIsSpinning(true);
    const randomRotation = Math.random() * 360 + 720; // At least 2 full rotations
    const newRotation = rotation + randomRotation;
    setRotation(newRotation);

    // Simulate spin duration
    setTimeout(() => {
      const finalAngle = newRotation % 360;
      const selectedIndex = Math.floor((360 - finalAngle) / sliceAngle) % allowedTeams.length;
      const selectedTeam = allowedTeams[selectedIndex];
      
      console.log('Spin result:', { finalAngle, selectedIndex, selectedTeam });
      finishSpin(selectedTeam.id, selectedTeam.name);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative' }}>
      {/* Pointer */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '20px solid #1f4d2d',
          zIndex: 10,
        }}
      />

      {/* Wheel */}
      <Box
        sx={{
          position: 'relative',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: '4px solid #1f4d2d',
          overflow: 'hidden',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
        }}
      >
        {allowedTeams.map((team, index) => {
          const startAngle = index * sliceAngle;
          const endAngle = (index + 1) * sliceAngle;
          const midAngle = (startAngle + endAngle) / 2;
          
          // Calculate slice path
          const radius = 150;
          const centerX = 150;
          const centerY = 150;
          
          const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
          const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
          const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
          const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
          
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${startX} ${startY}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'Z'
          ].join(' ');

          return (
            <Box
              key={team.id}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <svg
                width="300"
                height="300"
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                <path
                  d={pathData}
                  fill={index % 2 === 0 ? '#ffffff' : '#eef8f0'}
                  stroke="#1f4d2d"
                  strokeWidth="2"
                />
                
                {/* Team name text */}
                <text
                  x={centerX + (radius * 0.5) * Math.cos((midAngle - 90) * Math.PI / 180)}
                  y={centerY + (radius * 0.5) * Math.sin((midAngle - 90) * Math.PI / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}, ${centerX + (radius * 0.5) * Math.cos((midAngle - 90) * Math.PI / 180)}, ${centerY + (radius * 0.5) * Math.sin((midAngle - 90) * Math.PI / 180)})`}
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fill: '#0b2d17',
                  }}
                >
                  {team.name.length > 12 ? (
                    <>
                      <tspan x={centerX + (radius * 0.5) * Math.cos((midAngle - 90) * Math.PI / 180)} dy="-5">
                        {team.name.split(' ')[0]}
                      </tspan>
                      <tspan x={centerX + (radius * 0.5) * Math.cos((midAngle - 90) * Math.PI / 180)} dy="10">
                        {team.name.split(' ')[1] || ''}
                      </tspan>
                    </>
                  ) : (
                    team.name
                  )}
                </text>
              </svg>
            </Box>
          );
        })}
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleSpin}
        disabled={isSpinning || draftPhase !== 'spin' || allowedTeams.length === 0}
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        {isSpinning ? 'Döndürülüyor...' : 'Draft Et'}
      </Button>

      {allowedTeams.length === 0 && (
        <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
          Önce takım seçimi yapın
        </Typography>
      )}
    </Box>
  );
}
