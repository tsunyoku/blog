import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { PostHogProvider } from 'posthog-js/react'

const posthogOptions = {
  api_host: process.env.REACT_APP_POSTHOG_HOST
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PostHogProvider apiKey={process.env.REACT_APP_POSTHOG_KEY!} options={posthogOptions}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
