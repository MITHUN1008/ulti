import { Routes, Route } from 'react-router-dom';

import { Modals } from "../components/provider/Modal";
import Toast from "../components/provider/Toast";
import { ThemeProvider } from "../components/provider/ThemeProvider";
import NetworkStatus from "../components/provider/NetworkStatus";
import { AuthProvider } from "../components/provider/AuthProvider";

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DesignPage from './pages/DesignPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="canva"
      defaultTheme="dark"
    >
      <NetworkStatus />
      <Toast />
      <AuthProvider>
        <Modals />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/design/:id" 
            element={
              <ProtectedRoute>
                <DesignPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;