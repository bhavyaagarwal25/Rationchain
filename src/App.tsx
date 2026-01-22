import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './app/components/ui/sonner';
import { LandingPage } from './app/components/LandingPage';
import { ClientLogin } from './app/components/ClientLogin';
import { PasswordSetup } from './app/components/PasswordSetup';
import { ClientDashboard } from './app/components/ClientDashboard';
import { ShopkeeperDashboard } from './app/components/ShopkeeperDashboard';
import Camera from "./app/components/camera";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/setup-password" element={<PasswordSetup />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
