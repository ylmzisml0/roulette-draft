import { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, TextField, Grid, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGameStore, FormationPreset } from '../store/useGameStore';
import PitchBoard from '../components/PitchBoard';
import { Add, Delete } from '@mui/icons-material';

const formationOptions: FormationPreset[] = ['4-3-3', '4-4-2', '3-5-2', '4-2-3-1', '4-1-4-1', '5-3-2', '5-2-3', '4-5-1'];

export default function PlayerSetupPage() {
  const navigate = useNavigate();
  const { initSquads, hydrateRostersFromMock } = useGameStore();
  
  const [squads, setSquads] = useState<{ name: string; formation: FormationPreset }[]>([
    { name: 'Takım 1', formation: '4-3-3' },
    { name: 'Takım 2', formation: '4-3-3' },
  ]);

  const addSquad = () => {
    if (squads.length < 5) {
      setSquads([...squads, { name: `Takım ${squads.length + 1}`, formation: '4-3-3' }]);
    }
  };

  const removeSquad = (index: number) => {
    if (squads.length > 2) {
      setSquads(squads.filter((_, i) => i !== index));
    }
  };

  const updateSquad = (index: number, field: 'name' | 'formation', value: string) => {
    const updatedSquads = [...squads];
    updatedSquads[index] = { ...updatedSquads[index], [field]: value };
    setSquads(updatedSquads);
  };

  const handleStartDraft = () => {
    initSquads(squads);
    hydrateRostersFromMock();
    navigate('/draft');
  };

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
          Takım Kurulumu
        </Typography>

        <Grid container spacing={4}>
          {squads.map((squad, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Takım {index + 1}
                    </Typography>
                    {squads.length > 2 && (
                      <IconButton
                        onClick={() => removeSquad(index)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Takım Adı"
                        value={squad.name}
                        onChange={(e) => updateSquad(index, 'name', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Formasyon</InputLabel>
                        <Select
                          value={squad.formation}
                          onChange={(e) => updateSquad(index, 'formation', e.target.value)}
                          label="Formasyon"
                        >
                          {formationOptions.map((formation) => (
                            <MenuItem key={formation} value={formation}>
                              {formation}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Box sx={{ height: 500 }}>
                    <PitchBoard
                      squadIndex={index}
                      formation={squad.formation}
                      players={{}}
                      size="compact"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {squads.length < 5 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addSquad}
              sx={{ px: 4 }}
            >
              Takım Ekle
            </Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/leagues')}
            sx={{ px: 4 }}
          >
            Geri
          </Button>
          
          <Button
            variant="contained"
            onClick={handleStartDraft}
            sx={{ px: 4 }}
          >
            Draft Başlasın
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
