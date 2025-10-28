import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SportsSoccer, Group, EmojiEvents, PlayArrow } from '@mui/icons-material';

export default function LandingPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <SportsSoccer />,
      title: 'Lig ve Takım Seçimi',
      description: 'Favori liglerinizi ve takımlarınızı seçin'
    },
    {
      icon: <Group />,
      title: 'Kadro Kurulumu',
      description: 'Takım isimleri ve formasyonları belirleyin'
    },
    {
      icon: <EmojiEvents />,
      title: 'Draft Başlasın',
      description: 'Çarkı çevirin ve oyuncuları seçin'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #ffffff 0%, #f6fff7 50%, #e9f6ec 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Roulette Draft
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: 'text.primary',
                mb: 4,
                fontWeight: 500,
              }}
            >
              Futbol oyuncularıyla eğlenceli draft deneyimi
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 6,
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Çarkı çevirin, takımınızı kurun ve en iyi kadroyu oluşturun!
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Nasıl Oynanır?
              </Typography>
              
              <List sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
                {steps.map((step, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                      {step.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={step.title}
                      secondary={step.description}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/leagues')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: 2,
              }}
            >
              Başla
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
