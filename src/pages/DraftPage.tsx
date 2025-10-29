import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Chip, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useGameStore, FormationPreset } from '../store/useGameStore';
import { mockAvailablePlayers, mockTeams } from '../data/mockData';
import PitchBoard from '../components/PitchBoard';
import RouletteWheel from '../components/RouletteWheel';
import { Visibility, Refresh, Settings } from '@mui/icons-material';

export default function DraftPage() {
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const {
    squads,
    draftPhase,
    currentTurnIndex,
    spinResult,
    draftCandidate,
    selectedSlot,
    availablePlayers,
    isSquadOverviewOpen,
    isFormationModalOpen,
    formationModalSquadIndex,
    openSquadOverview,
    closeSquadOverview,
    openFormationModal,
    closeFormationModal,
    swapPlayers,
    changeFormationForSquad,
    continueAfterSpinResult,
    chooseDraftCandidate,
    selectSlotForCandidate,
    confirmPick,
  } = useGameStore();

  const formationOptions: FormationPreset[] = ['4-3-3', '4-4-2', '3-5-2', '4-2-3-1', '4-1-4-1', '5-3-2', '5-2-3', '4-5-1'];

  const handleDragDrop = (squadIndex: number) => (fromSlotId: string, toSlotId: string) => {
    swapPlayers(squadIndex, fromSlotId, toSlotId);
  };

  const handleFormationChange = (squadIndex: number, newFormation: FormationPreset) => {
    changeFormationForSquad(squadIndex, newFormation);
    closeFormationModal();
  };

  // Handle slot selection - open confirmation dialog instead of changing phase
  const handleSlotSelection = (slotId: string) => {
    selectSlotForCandidate(slotId);
    setConfirmDialogOpen(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    confirmPick();
    setConfirmDialogOpen(false);
  };

  // Handle back to slot selection
  const handleBack = () => {
    setConfirmDialogOpen(false);
  };

  const currentSquad = squads[currentTurnIndex] || { name: 'Takım', formation: '4-3-3', players: {} };
  const currentTeamId = spinResult?.teamId;
  const currentTeamPlayers = currentTeamId ? availablePlayers[currentTeamId] || [] : [];
  const currentTeamName = currentTeamId ? mockTeams.find(t => t.id === currentTeamId)?.name : '';

  const getAvailablePlayersForTeam = (teamId: string) => {
    const playerIds = availablePlayers[teamId] || [];
    console.log('getAvailablePlayersForTeam:', { 
      teamId, 
      playerIds, 
      availablePlayersKeys: Object.keys(availablePlayers),
      mockPlayersCount: mockAvailablePlayers[teamId]?.length || 0
    });
    
    if (!availablePlayers[teamId]) {
      console.warn(`No players found for teamId=${teamId}`);
    }
    
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
        console.log('choosePlayer phase:', { 
          currentTeamId, 
          currentTeamName, 
          spinResult,
          availablePlayersKeys: Object.keys(availablePlayers)
        });
        
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
                onSlotClick={handleSlotSelection}
                isInteractive={true}
                selectedSlot={selectedSlot}
                size="compact"
              />
            </Box>
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Mevcut Takım: {currentSquad.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Formasyon: {currentSquad.formation} | 
              Oyuncu Sayısı: {Object.keys(currentSquad.players).length}/11
            </Typography>
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
          fullWidth
          maxWidth="xl"
          PaperProps={{
            sx: { width: '90vw', height: '90vh', borderRadius: 2 },
          }}
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {squad.name} ({squad.formation})
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Settings />}
                          onClick={() => openFormationModal(index)}
                          sx={{ ml: 2 }}
                        >
                          Formasyonu Değiştir
                        </Button>
                      </Box>
                      <Box sx={{ height: '80vh', mb: 2, position: 'relative', width: '100%' }}>
                        <PitchBoard
                          squadIndex={index}
                          formation={squad.formation}
                          players={squad.players}
                          size="large"
                          isDraggable={true}
                          onDragDrop={handleDragDrop(index)}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Oyuncu Sayısı: {Object.keys(squad.players).length}/11
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Oyuncuların yerini değiştirmek için sürükle bırak yapabilir, formasyonu değiştirmek için butonu kullanabilirsiniz.
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

        {/* Formation Selection Dialog */}
        <Dialog
          open={isFormationModalOpen}
          onClose={closeFormationModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Formasyon Seç
            </Typography>
          </DialogTitle>
          <DialogContent>
            {formationModalSquadIndex !== null && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Formasyon</InputLabel>
                <Select
                  value={squads[formationModalSquadIndex]?.formation || '4-3-3'}
                  label="Formasyon"
                  onChange={(e) => handleFormationChange(formationModalSquadIndex, e.target.value as FormationPreset)}
                >
                  {formationOptions.map((formation) => (
                    <MenuItem key={formation} value={formation}>
                      {formation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Not: Mevcut oyuncular aynı pozisyon korunarak yeni formasyona taşınacak. 
              Uyumsuz oyuncular yedek kulübesine gönderilecektir.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFormationModal}>İptal</Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={handleBack}
          PaperProps={{
            sx: { borderRadius: 2, p: 4, maxWidth: 400 },
          }}
        >
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Seçimi Onayla
            </Typography>
          </DialogTitle>
          <DialogContent>
            {draftCandidate && selectedSlot && (
              <>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentTeamName} → {selectedSlot}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleBack}>
              Geri Dön
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Onayla
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
