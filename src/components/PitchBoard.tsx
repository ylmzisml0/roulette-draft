import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormationPreset } from '../store/useGameStore';
import { formationLayouts } from '../store/useGameStore';
import { mockAvailablePlayers } from '../data/mockData';

interface PitchBoardProps {
  squadIndex: number;
  formation: FormationPreset;
  players: Record<string, string>;
  onSlotClick?: (slotId: string) => void;
  isInteractive?: boolean;
  selectedSlot?: string | null;
  size?: 'compact' | 'large';
  isDraggable?: boolean;
  onDragDrop?: (fromSlotId: string, toSlotId: string) => void;
}

export default function PitchBoard({ 
  squadIndex: _squadIndex, 
  formation, 
  players, 
  onSlotClick,
  isInteractive = false,
  selectedSlot = null,
  size = 'compact',
  isDraggable = false,
  onDragDrop,
}: PitchBoardProps) {
  const slots = formationLayouts[formation];
  
  const isCompact = size === 'compact';
  const isLarge = size === 'large';
  const slotSize = isLarge ? 72 : (isCompact ? 32 : 40);
  const fontSize = isLarge ? '10px' : (isCompact ? '8px' : '10px');
  const nameFontSize = isLarge ? 14 : (isCompact ? 8 : 10);
  const positionFontSize = isLarge ? 10 : (isCompact ? 6 : 8);
  const emptySlotFontSize = isLarge ? 12 : (isCompact ? 8 : 10);
  const height = isLarge ? '100%' : (isCompact ? 500 : '100%');

  // Helper function to get player info
  const getPlayerInfo = (playerId: string) => {
    for (const teamPlayers of Object.values(mockAvailablePlayers)) {
      const player = teamPlayers.find(p => p.id === playerId);
      if (player) return player;
    }
    return null;
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, slotId: string) => {
    if (!isDraggable || !players[slotId]) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', slotId);
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toSlotId: string) => {
    if (!isDraggable || !onDragDrop) return;
    e.preventDefault();
    const fromSlotId = e.dataTransfer.getData('text/plain');
    if (fromSlotId && fromSlotId !== toSlotId) {
      onDragDrop(fromSlotId, toSlotId);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        aspectRatio: isCompact ? '3/4' : undefined,
        background: isLarge 
          ? 'linear-gradient(to bottom, #0f3a1f 0%, #1f4d2d 100%)'
          : '#0f3a1f',
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
        const player = playerId ? getPlayerInfo(playerId) : null;
        
        return (
          <Box
            key={slot.slotId}
            draggable={isDraggable && !isEmpty}
            onDragStart={(e) => handleDragStart(e, slot.slotId)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, slot.slotId)}
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
              border: `3px solid ${isSelected ? '#1f4d2d' : '#0b2d17'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDraggable && !isEmpty ? 'grab' : (isInteractive ? 'pointer' : 'default'),
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? '0 0 8px rgba(31, 77, 45, 0.5)' : 'none',
              '&:active': isDraggable && !isEmpty ? {
                cursor: 'grabbing',
              } : {},
              '&:hover': isInteractive || isDraggable ? {
                backgroundColor: '#eef8f0',
                transform: 'translate(-50%, -50%) scale(1.1)',
                boxShadow: '0 0 8px rgba(31, 77, 45, 0.3)',
              } : {},
            }}
          >
            {player ? (
              isLarge ? (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: nameFontSize,
                      fontWeight: 600,
                      color: isSelected ? '#1f4d2d' : '#0b2d17',
                      textAlign: 'center',
                      lineHeight: 1.2,
                      mb: 0.25,
                    }}
                  >
                    {player.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: positionFontSize,
                      opacity: 0.8,
                      color: isSelected ? '#1f4d2d' : '#0b2d17',
                      textAlign: 'center',
                      lineHeight: 1,
                    }}
                  >
                    {player.position}
                  </Typography>
                </>
              ) : (
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
              )
            ) : (
              <Typography
                variant="caption"
                sx={{
                  fontSize: emptySlotFontSize,
                  fontWeight: 500,
                  color: isSelected ? '#1f4d2d' : '#0b2d17',
                  textAlign: 'center',
                  lineHeight: 1,
                }}
              >
                {slot.slotId}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
