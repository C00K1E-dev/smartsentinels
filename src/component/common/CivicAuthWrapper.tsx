"use client";
import { CivicAuthProvider } from "@civic/auth/nextjs";
import { ReactNode, useEffect, useState } from "react";

interface CivicAuthWrapperProps {
  children: ReactNode;
}

// Error boundary wrapper for Civic Auth to handle iframe detection issues
export default function CivicAuthWrapper({ children }: CivicAuthWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Handle iframe detection errors and Sentry warnings globally
    const originalError = window.console.error;
    const originalWarn = window.console.warn;
    
    window.console.error = (...args) => {
      const errorMsg = args.join(' ');
      if (errorMsg.includes('Blocked a frame with origin') || 
          errorMsg.includes('Failed to read a named property') ||
          errorMsg.includes('cross-origin frame') ||
          errorMsg.includes('Multiple browserTracingIntegration') ||
          errorMsg.includes('Cannot initialize SDK with `debug` option') ||
          errorMsg.includes('ERR_BLOCKED_BY_CLIENT')) {
        // Suppress these errors in development
        if (process.env.NODE_ENV === 'development') {
          return;
        }
      }
      originalError.apply(console, args);
    };

    window.console.warn = (...args) => {
      const warnMsg = args.join(' ');
      if (warnMsg.includes('browserTracingIntegration') ||
          warnMsg.includes('Sentry') ||
          warnMsg.includes('monitoring')) {
        // Suppress Sentry warnings in development
        if (process.env.NODE_ENV === 'development') {
          return;
        }
      }
      originalWarn.apply(console, args);
    };

    // Add error event listener for unhandled errors
    const errorHandler = (event: ErrorEvent) => {
      if (event.message.includes('Failed to read a named property') ||
          event.message.includes('cross-origin frame') ||
          event.message.includes('Cypress') ||
          event.message.includes('browserTracingIntegration') ||
          event.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.console.error = originalError;
      window.console.warn = originalWarn;
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  // Don't render on server to avoid hydration issues
  if (!isClient) {
    return <div>{children}</div>;
  }

  if (hasError) {
    return (
      <div>
        <div style={{ 
          padding: '20px', 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          margin: '10px'
        }}>
          <strong>Auth Service Notice:</strong> Authentication service is temporarily unavailable. 
          Please refresh the page or try again later.
        </div>
        {children}
      </div>
    );
  }

  try {
    return (
      <CivicAuthProvider>
        {children}
      </CivicAuthProvider>
    );
  } catch (error) {
    console.warn('Civic Auth Provider error caught:', error);
    setHasError(true);
    return <div>{children}</div>;
  }
}
