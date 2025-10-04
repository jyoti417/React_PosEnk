import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../components/layout";
import PrivateRoute from "../features/auth-guard/PrivateRoute";
import DashboardPage from "../pages/DashboardPage";
import ActivationLedgerReport from "../pages/ActivationLedgerReport";
import EmRecharge from "../pages/EmRecharge";
import EpayRecharge from "../pages/EpayRecharge";

export default function AppRoutes() {
  return (
    <BrowserRouter>
          <Routes>
             <Route path="/" element={<LoginPage />} />
            {/*  Routes with Protection */}
            <Route element={<PrivateRoute />}>
              <Route  element={<Layout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                 <Route path="ActivationLedgerReport" element={<ActivationLedgerReport />} />
                  <Route path="EmRecharge/:networkId" element={<EmRecharge />} />
                 <Route path="EpayRecharge/:networkId" element={<EpayRecharge />} />

               </Route>
            </Route>
            
            <Route path="*" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  );
}
