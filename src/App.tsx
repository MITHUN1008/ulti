import { Routes, Route } from 'react-router-dom';
// ConvexAuthNextjsServerProvider is for Next.js server components, not needed in React

import { Modals } from "../components/provider/Modal";
import Toast from "../components/provider/Toast";
import { ThemeProvider } from "../components/provider/ThemeProvider";
import NetworkStatus from "../components/provider/NetworkStatus";
import { ConvexClientProvider } from "../components/provider/ConvexClientProvider";

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
      <ConvexClientProvider>
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
      </ConvexClientProvider>
    </ThemeProvider>
  );
}

export default App;