import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from './components/shared/ErrorBoundaryFallback.tsx'
import Search from './components/pages/GetSynonymsPage.tsx';
import CreateSynonyms from './components/pages/CreateSynonymsPage.tsx';
import GlobalNotificationProvider from './components/shared/GlobalNotificationProvider.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/create",
    element: <CreateSynonyms />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <QueryClientProvider client={queryClient}>
        <GlobalNotificationProvider>
          <RouterProvider router={router} />
        </GlobalNotificationProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
