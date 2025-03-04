import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // If Clerk is still loading, prevent any redirects
  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  // Redirect to login if user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // Ensure user data is fully available before checking metadata
  if (user && !user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
