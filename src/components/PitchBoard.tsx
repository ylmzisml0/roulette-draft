import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormationPreset } from '../store/useGameStore';
import { formationLayouts } from '../store/useGameStore';

interface PitchBoardProps {
  squadIndex: number;
  formation: FormationPreset;
  players: Record<string, string>;
  onSlotClick?: (slotId: string) => void;
  isInteractive?: boolean;
  selectedSlot?: string | null;
  size?: 'full' | 'compact';
}

export default function PitchBoard({ 
  squadIndex, 
  formation, 
  players, 
  onSlotClick,
  isInteractive = false,
  selectedSlot = null,
  size = 'full'
}: PitchBoardProps) {
  const slots = formationLayouts[formation];
  
  const isCompact = size === 'compact';
  const slotSize = isCompact ? 32 : 40;
  const fontSize = isCompact ? '8px' : '10px';
  const height = isCompact ? 260 : '100%';

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        aspectRatio: isCompact ? '3/4' : '3/4',
        backgroundColor: '#0f3a1f',
        borderRadius: 2,
        border: '2px solid #0b2d17',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2px',
          height: '60%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      {/* Goal areas */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20%',
          height: '15%',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '0 0 8px 8px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20%',
          height: '15%',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px 8px 0 0',
        }}
      />

      {/* Player slots */}
      {slots.map((slot) => {
        const playerId = players[slot.slotId];
        const isSelected = selectedSlot === slot.slotId;
        const isEmpty = !playerId;
        
        return (
          <Box
            key={slot.slotId}
            onClick={() => isInteractive && onSlotClick?.(slot.slotId)}
            sx={{
              position: 'absolute',
              left: `${slot.xPct}%`,
              top: `${slot.yPct}%`,
              transform: 'translate(-50%, -50%)',
              width: slotSize,
              height: slotSize,
              borderRadius: '50%',
              backgroundColor: isEmpty ? 'rgba(255, 255, 255, 0.6)' : '#ffffff',
              border: `2px solid ${isSelected ? '#1f4d2d' : '#0b2d17'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isInteractive ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? '0 0 8px rgba(31, 77, 45, 0.5)' : 'none',
              '&:hover': isInteractive ? {
                backgroundColor: '#eef8f0',
                transform: 'translate(-50%, -50%) scale(1.1)',
                boxShadow: '0 0 8px rgba(31, 77, 45, 0.3)',
              } : {},
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: fontSize,
                fontWeight: 'bold',
                color: isSelected ? '#1f4d2d' : '#0b2d17',
                textAlign: 'center',
                lineHeight: 1,
              }}
            >
              {slot.slotId}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
