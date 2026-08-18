import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught an error in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: '#f8fafc',
            color: '#0f172a',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '2rem' }}>Something went wrong</h2>
          <p style={{ margin: 0, maxWidth: '420px', lineHeight: 1.6, color: '#475569' }}>
            We’re sorry, but this section could not load properly. Please refresh the page and try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;