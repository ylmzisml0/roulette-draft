import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, AutoAwesome } from '@mui/icons-material';
import Logo2 from '../assets/Logo 2.svg?url';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Animation and Brand Section */}
        <Box
          sx={{
            pt: { xs: 6, md: 10 },
            pb: { xs: 3, md: 4 },
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              width: { xs: '100%', sm: '80%', md: '600px' },
              height: { xs: '250px', sm: '300px', md: '350px' },
              mx: 'auto',
              mb: { xs: 2, md: 3 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: { xs: '200px', sm: '300px', md: '400px' },
                height: { xs: '200px', sm: '300px', md: '400px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={Logo2}
                alt="Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Modern Hero Section */}
        <Box 
          sx={{ 
            mb: { xs: 6, md: 8 }, 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack spacing={4} alignItems="center" sx={{ maxWidth: 650 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <AutoAwesome sx={{ fontSize: 28, color: '#09203F', opacity: 0.8 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#09203F',
                  textAlign: 'center',
                  fontSize: { xs: '1.35rem', md: '1.65rem' },
                  letterSpacing: '-0.01em',
                }}
              >
                Başlamaya Hazır Mısın?
              </Typography>
            </Box>
            
            <Typography
              variant="body1"
              sx={{
                color: '#09203F',
                textAlign: 'center',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.7,
                maxWidth: 550,
                opacity: 0.85,
              }}
            >
              Çarkı çevir, takımını kur ve en iyi kadroyu oluştur!
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/leagues')}
              sx={{
                px: { xs: 5, md: 7 },
                py: { xs: 1.75, md: 2.25 },
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 700,
                borderRadius: 3,
                background: '#209927',
                boxShadow: '0 10px 30px rgba(32, 153, 39, 0.4), 0 0 0 0 rgba(32, 153, 39, 0)',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover': {
                  background: '#209927',
                  boxShadow: '0 15px 40px rgba(32, 153, 39, 0.6), 0 0 0 4px rgba(32, 153, 39, 0.1)',
                  transform: 'translateY(-3px) scale(1.02)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(-1px) scale(0.98)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Hemen Başla
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
