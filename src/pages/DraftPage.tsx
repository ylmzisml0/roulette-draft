import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useGameStore } from '../store/useGameStore';
import { mockAvailablePlayers, mockTeams } from '../data/mockData';
import PitchBoard from '../components/PitchBoard';
import RouletteWheel from '../components/RouletteWheel';
import { Visibility, Refresh } from '@mui/icons-material';

export default function DraftPage() {
  const {
    squads,
    draftPhase,
    currentTurnIndex,
    spinResult,
    draftCandidate,
    selectedSlot,
    availablePlayers,
    isSquadOverviewOpen,
    openSquadOverview,
    closeSquadOverview,
    continueAfterSpinResult,
    chooseDraftCandidate,
    selectSlotForCandidate,
    confirmPick,
  } = useGameStore();

  const currentSquad = squads[currentTurnIndex] || { name: 'Takım', formation: '4-3-3', players: {} };
  const currentTeamId = spinResult?.teamId;
  const currentTeamPlayers = currentTeamId ? availablePlayers[currentTeamId] || [] : [];
  const currentTeamName = currentTeamId ? mockTeams.find(t => t.id === currentTeamId)?.name : '';

  const getAvailablePlayersForTeam = (teamId: string) => {
    const playerIds = availablePlayers[teamId] || [];
    console.log('getAvailablePlayersForTeam:', { teamId, playerIds, availablePlayers });
    return playerIds.map(playerId => {
      const teamPlayers = mockAvailablePlayers[teamId] || [];
      return teamPlayers.find(p => p.id === playerId);
    }).filter(Boolean);
  };

  const renderPhaseContent = () => {
    switch (draftPhase) {
      case 'spin':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              {currentSquad.name} - Sıra Sizde!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Çarkı çevirin ve hangi takımdan oyuncu seçeceğinizi belirleyin
            </Typography>
            <RouletteWheel />
          </Box>
        );

      case 'spinResult':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
              🎉 {spinResult?.teamName}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Bu takımdan bir oyuncu seçin
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={continueAfterSpinResult}
              sx={{ px: 4 }}
            >
              Oyuncu Seç
            </Button>
          </Box>
        );

      case 'choosePlayer':
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              {currentTeamName} Oyuncuları
            </Typography>
            <Grid container spacing={2}>
              {getAvailablePlayersForTeam(currentTeamId!).map((player) => (
                <Grid item xs={12} sm={6} md={4} key={player!.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={() => chooseDraftCandidate(player!.id)}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {player!.name}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          label={player!.position}
                          color="primary"
                          size="small"
                        />
                        <Chip
                          label={player!.nationality}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {player!.marketValue}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 'chooseSlot':
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              Oyuncuyu Sahaya Yerleştirin
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.name} - 
              {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.position}
            </Typography>
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <PitchBoard
                squadIndex={currentTurnIndex}
                formation={currentSquad.formation}
                players={currentSquad.players}
                onSlotClick={selectSlotForCandidate}
                isInteractive={true}
                selectedSlot={selectedSlot}
                size="full"
              />
            </Box>
          </Box>
        );

      case 'confirm':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Seçimi Onaylayın
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.name} - 
              {selectedSlot} pozisyonuna yerleştirilecek
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={confirmPick}
              sx={{ px: 4 }}
            >
              Onayla
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  const isDraftComplete = squads.length > 0 && squads.every(squad => Object.keys(squad.players).length >= 11);

  if (squads.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #ffffff 0%, #f6fff7 50%, #e9f6ec 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Takım Kurulumu Gerekli
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Önce takım kurulumu sayfasından takımlarınızı oluşturun.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/players'}
            sx={{ px: 4 }}
          >
            Takım Kurulumuna Git
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #ffffff 0%, #f6fff7 50%, #e9f6ec 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Draft
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={openSquadOverview}
            >
              Kadroları Görüntüle
            </Button>
          </Box>
        </Box>

        {/* Current Squad Info */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Mevcut Takım: {currentSquad.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Formasyon: {currentSquad.formation} | 
                  Oyuncu Sayısı: {Object.keys(currentSquad.players).length}/11
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: 150 }}>
                  <PitchBoard
                    squadIndex={currentTurnIndex}
                    formation={currentSquad.formation}
                    players={currentSquad.players}
                    size="compact"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardContent sx={{ minHeight: 400 }}>
            {isDraftComplete ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                  🏆 Draft Tamamlandı!
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                  Tüm takımlar kadrolarını tamamladı
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Refresh />}
                  onClick={() => window.location.reload()}
                  sx={{ px: 4 }}
                >
                  Yeni Draft Başlat
                </Button>
              </Box>
            ) : (
              renderPhaseContent()
            )}
          </CardContent>
        </Card>

        {/* Squad Overview Modal */}
        <Dialog
          open={isSquadOverviewOpen}
          onClose={closeSquadOverview}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Takım Kadroları
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              {squads.map((squad, index) => (
                <Grid item xs={12} md={6} key={squad.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {squad.name} ({squad.formation})
                      </Typography>
                      <Box sx={{ height: 200, mb: 2 }}>
                        <PitchBoard
                          squadIndex={index}
                          formation={squad.formation}
                          players={squad.players}
                          size="compact"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Oyuncu Sayısı: {Object.keys(squad.players).length}/11
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSquadOverview}>Kapat</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
