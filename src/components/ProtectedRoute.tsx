import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

type UserRole = 'guest' | 'user' | 'mentor' | 'community_moderator' | 'premium';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ 
  children, 
  requiresAuth = true,
  requiredRole
}: ProtectedRouteProps) => {
  const { user, userRole, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requiresAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            You need the "{requiredRole}" role to access this feature.
          </p>
          <p className="text-sm text-muted-foreground">
            Your current role: {userRole || 'none'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
