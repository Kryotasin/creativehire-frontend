import React from 'react';
import * as Sentry from '@sentry/browser';


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, eventId: null };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
        Sentry.withScope((scope) => {
          scope.setExtras(errorInfo);
          const eventId = Sentry.captureException(error);
          this.setState({eventId});
      });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
        );
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;