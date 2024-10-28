import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import CreatePlayer from './components/CreatePlayer';
import PrivateRoute from './components/PrivateRoute';
import NewCareer from './components/NewCareer';
import Play from './components/Play';
import Upgrade from './pages/Upgrade';
import Badges from './components/Badges';
import Agent from './components/Agent';
import SaveLoad from './components/SaveLoad';
import useStore from './store';

function App() {
  const playerInfo = useStore((state) => state.playerInfo);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/new-career" element={<NewCareer />} />
        <Route path="/create-player" element={<CreatePlayer />} />
        
        <Route element={<Layout />}>
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/play" 
            element={
              <PrivateRoute>
                <Play />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/upgrade" 
            element={
              <PrivateRoute>
                <Upgrade />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/badges" 
            element={
              <PrivateRoute>
                <Badges />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/agent" 
            element={
              <PrivateRoute>
                <Agent />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/save-load" 
            element={
              <PrivateRoute>
                <SaveLoad />
              </PrivateRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;