import { Box, Container, Typography, Button, Card, CardContent, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { mockLeagues, mockTeams } from '../data/mockData';

export default function LeagueSelectionPage() {
  const navigate = useNavigate();
  const { selectedLeagues, selectedTeams, toggleLeague, toggleTeam, hydrateRostersFromMock } = useGameStore();

  const handleNext = () => {
    if (selectedTeams.length === 0) {
      alert('En az bir takım seçmelisiniz!');
      return;
    }
    hydrateRostersFromMock();
    navigate('/players');
  };

  const filteredTeams = mockTeams.filter(team => 
    selectedLeagues.includes(team.leagueId)
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Lig ve Takım Seçimi
        </Typography>

        {/* Leagues Grid */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              Ligler
            </Typography>
            
            <Grid container spacing={2}>
              {mockLeagues.map((league) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={league.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: selectedLeagues.includes(league.id) ? '2px solid #09203F' : '2px solid transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(32, 153, 39, 0.1)',
                          transform: 'scale(1.02)',
                        },
                      }}
                      onClick={() => toggleLeague(league.id, mockTeams)}
                    >
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                        {league.icon}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {league.name}
                      </Typography>
                      <Checkbox
                        checked={selectedLeagues.includes(league.id)}
                        onChange={() => toggleLeague(league.id, mockTeams)}
                        color="primary"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={4}>

          {/* Teams */}
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                  Takımlar ({selectedTeams.length} seçili)
                </Typography>
                
                {selectedLeagues.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    Önce lig seçimi yapın
                  </Typography>
                ) : (
                  <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <Grid container spacing={1}>
                      {filteredTeams.map((team) => (
                        <Grid item xs={12} sm={6} md={4} key={team.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedTeams.includes(team.id)}
                                onChange={() => toggleTeam(team.id)}
                                color="primary"
                                size="small"
                              />
                            }
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {team.shortCode}
                                </Typography>
                                <Typography variant="body2">
                                  {team.name}
                                </Typography>
                              </Box>
                            }
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ px: 4 }}
          >
            Geri
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={selectedTeams.length === 0}
            sx={{ px: 4 }}
          >
            Devam Et: Oyuncular ve Formasyonlar
          </Button>
        </Box>

        {selectedTeams.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            {selectedTeams.length} takım seçildi
          </Typography>
        )}
      </Container>
    </Box>
  );
}
