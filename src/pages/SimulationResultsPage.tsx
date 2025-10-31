import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Divider,
  Stack,
} from '@mui/material';
import {
  ArrowBack,
  EmojiEvents,
} from '@mui/icons-material';
import { useGameStore } from '../store/useGameStore';
import type { LeagueSimulationResponse } from '../engine/simulation/types';

export default function SimulationResultsPage() {
  const navigate = useNavigate();
  const { simulationResult } = useGameStore();

  if (!simulationResult) {
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
            Simülasyon Sonucu Bulunamadı
          </Typography>
          <Button variant="contained" onClick={() => navigate('/draft')}>
            Draft Sayfasına Dön
          </Button>
        </Card>
      </Box>
    );
  }

  const result = simulationResult as LeagueSimulationResponse;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'GOAL':
        return '⚽';
      case 'YELLOW':
        return '🟨';
      case 'RED':
        return '🟥';
      default:
        return '•';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 1,
              }}
            >
              🏆 {result.leagueName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {result.season} • {result.standings.length} Takım • {result.totalMatches} Maç (Double Round-Robin)
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/draft')}
          >
            Draft'a Dön
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Standings Column */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(9, 32, 63, 0.1)',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'primary.light',
              }}
            >
              <Box
                sx={{
                  background: '#209927',
                  p: 3,
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  📊 Puan Durumu
                </Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 'bold', py: 1 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Takım</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>
                        O
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>
                        G
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>
                        B
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>
                        M
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>
                        A
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>
                        P
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.standings.map((team, idx) => (
                      <TableRow
                        key={team.teamId}
                        sx={{
                            bgcolor:
                            team.rank === 1
                              ? 'rgba(32, 153, 39, 0.1)'
                              : idx % 2 === 0
                                ? '#FFFFFF'
                                : 'grey.50',
                          '&:hover': { bgcolor: 'rgba(32, 153, 39, 0.08)' },
                          transition: 'background-color 0.2s',
                        }}
                      >
                        <TableCell>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: team.rank <= 3 ? 'bold' : 'normal',
                                fontSize: '0.875rem',
                              }}
                            >
                              {team.rank}
                            </Typography>
                            {team.rank === 1 && (
                              <EmojiEvents sx={{ color: '#FFD700', fontSize: 16 }} />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: team.rank <= 3 ? 'bold' : 'normal',
                              fontSize: '0.875rem',
                            }}
                          >
                            {team.team}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{team.played}</TableCell>
                        <TableCell align="center">{team.won}</TableCell>
                        <TableCell align="center">{team.drawn}</TableCell>
                        <TableCell align="center">{team.lost}</TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                team.goalDiff > 0
                                  ? 'success.main'
                                  : team.goalDiff < 0
                                    ? 'error.main'
                                    : 'text.secondary',
                              fontWeight: 'bold',
                              fontSize: '0.875rem',
                            }}
                          >
                            {team.goalDiff > 0 ? '+' : ''}
                            {team.goalDiff}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={team.points}
                            size="small"
                            color={team.rank === 1 ? 'warning' : team.rank <= 3 ? 'success' : 'default'}
                            sx={{
                              fontWeight: 'bold',
                              minWidth: 40,
                              height: 24,
                              fontSize: '0.75rem',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* Team Powers */}
            <Card
              sx={{
                mt: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(9, 32, 63, 0.1)',
                border: '1px solid',
                borderColor: 'primary.light',
              }}
            >
              <Box
                sx={{
                  background: '#209927',
                  p: 3,
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  💪 Takım Güç Analizi
                </Typography>
              </Box>
              <CardContent>
                <Grid container spacing={2}>
                  {result.teamPowers.map((team) => (
                    <Grid item xs={12} key={team.teamId}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'grey.50',
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', mb: 1 }}
                        >
                          {team.teamName}
                        </Typography>
                        <Stack spacing={1}>
                          <Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 0.5,
                              }}
                            >
                              <Typography variant="caption">Güç</Typography>
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: 'bold' }}
                              >
                                {team.powerRating.toFixed(1)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                height: 6,
                                bgcolor: 'grey.300',
                                borderRadius: 3,
                                overflow: 'hidden',
                              }}
                            >
                              <Box
                                sx={{
                                  height: '100%',
                                  width: `${team.powerRating}%`,
                                  background: '#209927',
                                }}
                              />
                            </Box>
                          </Box>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Hücum {team.attackRating.toFixed(0)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Defans {team.defenseRating.toFixed(0)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Orta {team.midfieldRating.toFixed(0)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Kaleci {team.keeperRating.toFixed(0)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Match Results Column */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(9, 32, 63, 0.1)',
                border: '1px solid',
                borderColor: 'primary.light',
              }}
            >
              <Box
                sx={{
                  background: '#209927',
                  p: 3,
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  ⚽ Maç Sonuçları
                </Typography>
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  {result.results.map((match) => (
                    <Card
                      key={match.matchId}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        {/* Match Header */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <Chip
                            label={`${match.round}. Hafta`}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(match.date).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </Typography>
                        </Box>

                        {/* Score */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <Box sx={{ flex: 1, textAlign: 'right', pr: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 'bold',
                                color:
                                  match.winner === 'HOME'
                                    ? 'success.main'
                                    : 'text.primary',
                              }}
                            >
                              {match.homeTeam}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: '0.7rem' }}
                            >
                              xG: {match.xgHome.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 'bold',
                                minWidth: 80,
                                textAlign: 'center',
                              }}
                            >
                              {match.homeScore} - {match.awayScore}
                            </Typography>
                          </Box>
                          <Box sx={{ flex: 1, textAlign: 'left', pl: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 'bold',
                                color:
                                  match.winner === 'AWAY'
                                    ? 'success.main'
                                    : 'text.primary',
                              }}
                            >
                              {match.awayTeam}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: '0.7rem' }}
                            >
                              xG: {match.xgAway.toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Events - Only Goals */}
                        {match.events.filter((e) => e.type === 'GOAL').length > 0 && (
                          <>
                            <Divider sx={{ my: 1.5 }} />
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                              }}
                            >
                              {match.events
                                .filter((e) => e.type === 'GOAL')
                                .map((event, idx) => (
                                  <Chip
                                    key={idx}
                                    icon={<span>{getEventIcon(event.type)}</span>}
                                    label={
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 0.5,
                                        }}
                                      >
                                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                          {event.minute}'
                                        </Typography>
                                        <Typography variant="caption">
                                          {event.playerName}
                                        </Typography>
                                      </Box>
                                    }
                                    size="small"
                                    color="success"
                                    sx={{
                                      height: 24,
                                      '& .MuiChip-label': { px: 1 },
                                    }}
                                  />
                                ))}
                            </Box>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
