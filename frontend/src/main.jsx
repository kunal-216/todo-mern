import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/app.scss';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export const server = "https://todo-list-d8yj.onrender.com/api";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

// Ensure the root is only created once
const rootElement = document.getElementById('root');
if (!rootElement._reactRootContainer) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
