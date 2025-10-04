import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { mainapiinstance } from "../../shared/api/mainapiinstance";
import { Loader } from "../../components/utils/Loader";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      if (!isAuthenticated) {
        setAllowed(false);
        setLoading(false);
        return;
      }
      else{ //remove this condition after new api ,used this only for testing enviorment.
        setAllowed(true);
        setLoading(false);
         return;
      }
      try {
        // 👇 pass the pathname (without leading slash if backend expects only name)
        const pageName = location.pathname.split("/").pop() || "";
        const res = await mainapiinstance.auth.verifyPage(pageName);
        setAllowed(res.statusCode===1200);
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [isAuthenticated, location.pathname]);

  if (loading) return <Loader size="lg" variant="fullscreen" text="Checking access..." /> ;

  if (!allowed) return <Navigate to="/" replace />;

  return <Outlet />;
}
