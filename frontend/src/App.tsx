import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { useAuth } from "./hooks/useAuth";
import NavBar from './components/navbar/NavBar'
import PageNotFound from './Pages/PageNotFound'


export const PrivateRoute =({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

const AppRoutes = () => {
  const location = useLocation();
  const showNavbar = location.pathname === "/";

  return (
    <>
      {showNavbar && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}



export default function App() {
  return (
    <Provider store={store}>
          <Router>
      <AppRoutes />
    </Router>
    </Provider>

  );
}
