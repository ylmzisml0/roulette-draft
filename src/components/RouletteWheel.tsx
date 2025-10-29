import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Wheel } from 'react-custom-roulette';
import { useGameStore } from '../store/useGameStore';
import { mockTeams } from '../data/mockData';

export default function RouletteWheel() {
  // Pull correct state fields from Zustand
  const { selectedTeams, finishSpin, draftPhase } = useGameStore();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Debug: mustSpin değişikliklerini log'la
  useEffect(() => {
    console.log('mustSpin değişti:', mustSpin);
  }, [mustSpin]);

  // Filter only teams user allowed into the wheel
  // Note: using selectedTeams as allowedTeams (teams chosen on /leagues)
  const allowedTeams = selectedTeams || [];
  const wheelTeams = mockTeams.filter((team) =>
    allowedTeams.includes(team.id)
  );
  const teamCount = wheelTeams.length;

  // Data format required by react-custom-roulette
  const wheelData = wheelTeams.map((team, idx) => ({
    option: team.name,
    style: {
      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#eef8f0',
      textColor: '#0b2d17',
    },
    teamId: team.id,
    teamName: team.name,
  }));


  // Start spin
  const handleSpin = () => {
    if (isSpinning || draftPhase !== 'spin' || teamCount === 0) return;

    // Choose winner index deterministically before triggering animation
    const winnerIndex = Math.floor(Math.random() * teamCount);
    const winnerTeam = wheelTeams[winnerIndex];

    console.log('Spin başlatılıyor:', { 
      winnerIndex, 
      teamCount,
      winnerTeamName: winnerTeam?.name,
      winnerTeamId: winnerTeam?.id,
      wheelDataLength: wheelData.length
    });

    // Mark that we're spinning (disable button)
    setIsSpinning(true);
    
    // Set prizeNumber first
    setPrizeNumber(winnerIndex);
    
    // Immediately trigger spin - if mustSpin is false, set to true directly
    // If mustSpin is true, reset it first then set to true (for false->true transition)
    if (mustSpin) {
      setMustSpin(false);
      // Use double RAF to ensure state update is processed
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMustSpin(true);
        });
      });
    } else {
      // Already false, can set to true immediately
      setMustSpin(true);
    }
  };

  // After spin ends
  const handleStopSpinning = () => {
    console.log('Spin durdu, prizeNumber:', prizeNumber);
    setMustSpin(false);
    setIsSpinning(false);

    // Write the final winner into global store
    // prizeNumber is the index in wheelData array
    const winnerTeam = wheelTeams[prizeNumber];
    console.log('Kazanan takım:', { prizeNumber, winnerTeam, wheelTeamsLength: wheelTeams.length });
    
    if (winnerTeam) {
      finishSpin(winnerTeam.id, winnerTeam.name);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Çark */}
      {teamCount > 0 && (
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            onStopSpinning={handleStopSpinning}
            backgroundColors={['#ffffff', '#eef8f0']}
            textColors={['#0b2d17']}
            outerBorderColor="#1f4d2d"
            outerBorderWidth={3}
            innerRadius={18}
            innerBorderColor="#1f4d2d"
            innerBorderWidth={2}
            radiusLineColor="#1f4d2d"
            radiusLineWidth={2}
            fontSize={teamCount > 10 ? 11 : teamCount > 8 ? 12 : 13}
            fontWeight={700}
            textDistance={55}
            spinDuration={0.4}
            pointerProps={{
              style: {
                width: '20px',
                height: '20px',
                top: '50px',
                right: '15px',
                left: '380px',
                filter: 'brightness(0) saturate(100%) invert(26%) sepia(62%) saturate(1157%) hue-rotate(95deg) brightness(95%) contrast(90%)',
              }
            }}
            disableInitialAnimation={true}
          />
        </Box>
      )}

      {/* Alt bilgi: takım sayısı */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, textAlign: 'center' }}
      >
        Çarkta {teamCount} takım var
      </Typography>

      {/* Spin butonu */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSpin}
        disabled={isSpinning || draftPhase !== 'spin' || teamCount === 0}
        sx={{
          mt: 3,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          borderRadius: 2,
        }}
      >
        {isSpinning ? 'Döndürülüyor...' : 'Çarkı Çevir'}
      </Button>

      {/* Uyarı */}
      {teamCount === 0 && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          Önce takım seçimi yapın
        </Typography>
      )}
    </Box>
  );
}
