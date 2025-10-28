import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LeagueSelectionPage from '../pages/LeagueSelectionPage';
import PlayerSetupPage from '../pages/PlayerSetupPage';
import DraftPage from '../pages/DraftPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leagues" element={<LeagueSelectionPage />} />
        <Route path="/players" element={<PlayerSetupPage />} />
        <Route path="/draft" element={<DraftPage />} />
      </Routes>
    </BrowserRouter>
  );
}
