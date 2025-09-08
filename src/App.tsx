import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";

// PrimeReact CSS imports
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00809D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated after loading is complete, redirect to login
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00809D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    console.log('User is authenticated, redirecting to dashboard');
    return <Navigate to="/dashboards" replace />;
  }

  // If not authenticated, show login page
  console.log('User not authenticated, showing login page');
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Router>
          <Toaster />
          <Sonner />
          <Routes>
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to="/dashboards" replace />}
            />
            <Route 
              path="/dashboards" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/masters/*" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users/*" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dockyard-plans" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/surveys" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hvac-trial" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/drawing" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {/* Content is now handled by TabContent component */}
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
