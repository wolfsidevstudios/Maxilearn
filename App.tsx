
import React, { PropsWithChildren } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Pricing from './pages/Pricing';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Credits from './pages/Credits';
import ToolsHub from './pages/ToolsHub';
import Profile from './pages/Profile';
import AITutor from './pages/Tools/AITutor';
import Humanizer from './pages/Tools/Humanizer';
import NotesGenerator from './pages/Tools/NotesGenerator';
import PolishedWriter from './pages/Tools/PolishedWriter';
import AIDetector from './pages/Tools/AIDetector';
import LectureNotes from './pages/Tools/LectureNotes';
import ResearchAssistant from './pages/Tools/ResearchAssistant';
import Summarizer from './pages/Tools/Summarizer';
import QuizGenerator from './pages/Tools/QuizGenerator';
import { AppProvider, useApp } from './context/AppContext';
import { Loader2 } from 'lucide-react';

// Guard for protected routes
const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { userState, loading } = useApp();
  
  if (loading) {
      return (
          <div className="h-screen w-full flex items-center justify-center bg-white">
              <Loader2 className="animate-spin text-gray-300" size={32} />
          </div>
      );
  }

  if (!userState.isAuthenticated) {
      return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated but not onboarded, send to onboarding
  // We check window.location to prevent redirect loop if we are already on onboarding
  if (!userState.isOnboarded) {
     return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

// Separate guard for Onboarding to prevent access if not logged in
const OnboardingRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const { userState, loading } = useApp();
    if (loading) return <div></div>;
    if (!userState.isAuthenticated) return <Navigate to="/login" replace />;
    if (userState.isOnboarded) return <Navigate to="/app" replace />;
    return <>{children}</>;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Onboarding */}
            <Route path="/onboarding" element={
                <OnboardingRoute>
                    <Onboarding />
                </OnboardingRoute>
            } />

            {/* Protected App Routes */}
            <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/app/tutor" replace />} /> {/* Default to Tutor/Home */}
                
                {/* Main Navigation */}
                <Route path="tutor" element={<AITutor />} />
                <Route path="tools" element={<ToolsHub />} />
                <Route path="profile" element={<Profile />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="credits" element={<Credits />} />
                
                {/* Specific Tools (Accessed via Hub) */}
                <Route path="humanizer" element={<Humanizer />} />
                <Route path="notes" element={<NotesGenerator />} />
                <Route path="writer" element={<PolishedWriter />} />
                <Route path="detector" element={<AIDetector />} />
                <Route path="lecture" element={<LectureNotes />} />
                <Route path="research" element={<ResearchAssistant />} />
                <Route path="summarizer" element={<Summarizer />} />
                <Route path="quiz" element={<QuizGenerator />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
