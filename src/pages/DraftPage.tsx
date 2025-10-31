import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Chip, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useGameStore, FormationPreset } from '../store/useGameStore';
import { mockAvailablePlayers, mockTeams, mockPlayers } from '../data/mockData';
import PitchBoard from '../components/PitchBoard';
import RouletteWheel from '../components/RouletteWheel';
import { Visibility, Refresh, Settings, PlayArrow, Casino, SportsSoccer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { simulateLeague } from '../engine/simulation';

export default function DraftPage() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [spinResultModalOpen, setSpinResultModalOpen] = useState(false);
  const navigate = useNavigate();

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
    selectedLeagues,
    randomFillAllSquads,
    setSimulationResult,
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
    goBackToPlayerSelection,
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
    // Close modal when pick is confirmed
    setSpinResultModalOpen(false);
  };

  // Handle back to slot selection
  const handleBack = () => {
    setConfirmDialogOpen(false);
  };

  const currentSquad = squads[currentTurnIndex] || { name: 'Takım', formation: '4-3-3', players: {} };
  const currentTeamId = spinResult?.teamId;
  const currentTeamName = currentTeamId ? mockTeams.find(t => t.id === currentTeamId)?.name : '';

  // Open modal when spin result is ready (1 second after spin ends)
  useEffect(() => {
    if (draftPhase === 'spinResult' && spinResult) {
      // Automatically go to choosePlayer phase
      continueAfterSpinResult();
      // Open modal after 1 second delay
      const timer = setTimeout(() => {
        setSpinResultModalOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [draftPhase, spinResult, continueAfterSpinResult]);

  // Close modal when draft phase changes away from player selection or when draft is completed
  useEffect(() => {
    if (draftPhase === 'spin') {
      setSpinResultModalOpen(false);
    }
  }, [draftPhase]);

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

  // Handle back from slot selection to player selection
  const handleBackToPlayerSelection = () => {
    goBackToPlayerSelection();
    setConfirmDialogOpen(false);
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
        // This case is now handled by modal, but keeping for safety
        return null;

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
                        backgroundColor: 'rgba(32, 153, 39, 0.1)',
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
            <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleBackToPlayerSelection}
                sx={{ px: 4 }}
              >
                Kadroya Geri Dön
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const isDraftComplete = squads.length > 0 && squads.every(squad => Object.keys(squad.players).length >= 11);

  const handleRandomFill = () => {
    randomFillAllSquads();
  };

  const handleSimulateLeague = async () => {
    if (!isDraftComplete) return;
    
    setIsSimulating(true);
    
    try {
      // Convert squads to simulation format
      const simulationTeams = squads.map(squad => {
        const players = Object.entries(squad.players)
          .map(([, playerId]) => {
            // Find player in mock data
            for (const teamId of Object.keys(mockAvailablePlayers)) {
              const found = mockAvailablePlayers[teamId].find(p => p.id === playerId);
              if (found) {
                // Find original market value from mockPlayers
                const originalPlayer = mockPlayers
                  .flatMap(c => c.players)
                  .find(p => p.id === playerId);
                return {
                  id: playerId,
                  name: found.name,
                  position: found.position,
                  marketValue: originalPlayer?.marketValue || 5000000,
                  age: originalPlayer?.age,
                  nationality: originalPlayer?.nationality || [],
                };
              }
            }
            return null;
          })
          .filter((player): player is NonNullable<typeof player> => player !== null);

        return {
          id: squad.id,
          name: squad.name,
          formation: squad.formation,
          players: players,
        };
      });

      const leagueId = selectedLeagues[0] || 'super-lig';
      const leagueName = 'Trendyol Süper Lig'; // You can derive this from selected leagues

      // Start simulation in background
      const simulationPromise = simulateLeague({
        leagueId,
        leagueName,
        season: '2025/26',
        seed: `draft-${Date.now()}`,
        teams: simulationTeams,
      });

      // Navigate to loading page immediately
      navigate('/simulation-loading');

      // Wait for simulation to complete and store result
      simulationPromise
        .then((result) => {
          setSimulationResult(result);
        })
        .catch((error) => {
          console.error('Simülasyon hatası:', error);
          alert('Simülasyon sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        })
        .finally(() => {
          setIsSimulating(false);
        });
    } catch (error) {
      console.error('Simülasyon başlatma hatası:', error);
      alert('Simülasyon başlatılırken bir hata oluştu. Lütfen tekrar deneyin.');
      setIsSimulating(false);
    }
  };

  if (squads.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            Lig Seçimi Gerekli
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Önce lig seçim sayfasından ligleri seçin.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/leagues')}
            sx={{ px: 4 }}
          >
            Lig Seçimine Git
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
            {!isDraftComplete && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Casino />}
                onClick={handleRandomFill}
                sx={{ borderStyle: 'dashed' }}
              >
                Random Doldur (Test)
              </Button>
            )}
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
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={handleSimulateLeague}
                    disabled={isSimulating}
                    sx={{ px: 4 }}
                  >
                    {isSimulating ? 'Simüle Ediliyor...' : 'Ligi Simüle Et'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Refresh />}
                    onClick={() => window.location.reload()}
                    sx={{ px: 4 }}
                  >
                    Yeni Draft Başlat
                  </Button>
                </Box>
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
          <DialogContent sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 3, overflow: 'hidden', flex: 1 }}>
              {squads.map((squad, index) => (
                <Box key={squad.id} sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexShrink: 0 }}>
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
                      <Box sx={{ flex: 1, minHeight: 0, mb: 2, position: 'relative', width: '100%' }}>
                        <PitchBoard
                          squadIndex={index}
                          formation={squad.formation}
                          players={squad.players}
                          size="large"
                          isDraggable={true}
                          onDragDrop={handleDragDrop(index)}
                        />
                      </Box>
                      <Box sx={{ flexShrink: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Oyuncu Sayısı: {Object.keys(squad.players).length}/11
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          Oyuncuların yerini değiştirmek için sürükle bırak yapabilir, formasyonu değiştirmek için butonu kullanabilirsiniz.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
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

        {/* Spin Result Modal - Large modal for player selection */}
        <Dialog
          open={spinResultModalOpen}
          onClose={() => {}} // Prevent closing by clicking outside
          fullWidth
          maxWidth="lg"
          PaperProps={{
            sx: { 
              width: '90vw', 
              maxHeight: '90vh',
              borderRadius: 2,
              m: 2,
            },
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SportsSoccer sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {spinResult?.teamName}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Bu takımdan bir oyuncu seçin
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ overflow: 'auto', minHeight: 400 }}>
            {(draftPhase === 'choosePlayer' || draftPhase === 'chooseSlot') && (
              <Box>
                {draftPhase === 'choosePlayer' && (
                  <Grid container spacing={2}>
                    {getAvailablePlayersForTeam(currentTeamId!).map((player) => (
                      <Grid item xs={12} sm={6} md={4} key={player!.id}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(32, 153, 39, 0.1)',
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
                )}
                
                {draftPhase === 'chooseSlot' && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                      Oyuncuyu Sahaya Yerleştirin
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                      {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.name} - 
                      {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.position}
                    </Typography>
                    <Box sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={handleBackToPlayerSelection}
                        sx={{ px: 4 }}
                      >
                        Kadroya Geri Dön
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={handleBack}
          PaperProps={{
            sx: { borderRadius: 2, p: 4, maxWidth: 600, minWidth: 500 },
          }}
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Seçimi Onayla
            </Typography>
          </DialogTitle>
          <DialogContent>
            {draftCandidate && selectedSlot && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 1 }}>
                  {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {mockAvailablePlayers[currentTeamId!]?.find(p => p.id === draftCandidate)?.position}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {currentTeamName} → {selectedSlot}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ px: 4, py: 1.5 }}>
              Geri Dön
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ px: 4, py: 1.5 }}>
              Onayla
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
