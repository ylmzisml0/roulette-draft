import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, LinearProgress } from '@mui/material';
import Lottie from 'lottie-react';
import soccerAnimation from '../assets/soccer.json';

export default function SimulationLoadingPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 5 saniye içinde progress bar'ı doldur
    const duration = 5000; // 5 saniye
    const interval = 100; // Her 100ms'de bir güncelle
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // 5 saniye sonra sonuç sayfasına yönlendir
    const timeout = setTimeout(() => {
      navigate('/simulation');
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        {/* Lottie Animation */}
        <Box
          sx={{
            width: { xs: '300px', sm: '400px', md: '500px' },
            height: { xs: '300px', sm: '400px', md: '500px' },
            mx: 'auto',
            mb: 4,
          }}
        >
          <Lottie
            animationData={soccerAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>

        {/* Loading Text */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#09203F',
            mb: 4,
          }}
        >
          Lig Simüle Ediliyor...
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ width: '100%', maxWidth: '400px', mx: 'auto' }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(9, 32, 63, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: '#209927',
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}


