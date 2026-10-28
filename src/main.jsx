import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

const legacyHashRoute = window.location.hash.match(/^#\/(services(?:\/[^?]*)?|contact)(?:\?.*)?$/);
if (legacyHashRoute) {
  window.history.replaceState(null, "", `/${legacyHashRoute[1]}`);
}

const rootElement = document.getElementById('root');
const application = (
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}