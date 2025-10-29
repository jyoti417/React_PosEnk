
// src/config.ts

// Define supported environments
type Environment = "development" | "production";

// Define the endpoint structure
interface Endpoints {
  Authentication: {
    login: string;
  };
  Admin: {
    DashboardData: string;
  };
  Status:{
    SinglePagesAccess: string;
  }
  Report: {
    RechargeReport: string;
    ActivationLedger: string; 
  };
  Emida: {
    plans: string;
    recharge: string;
  };
}

// Define environment-specific config
interface EnvConfig {
  apiBaseUrl: string;
  xapikey: string;
  endpoints: Endpoints;
}

// Common endpoints (same for all environments)
const endpoints: Endpoints = {
  Authentication: {
    login: "/Authentication/login",
  },
  Admin: {
    DashboardData: "/Admin/GetDashboardData",
  },  
  Status:{
    SinglePagesAccess:"/GetUsersPageAccess"
  },
 Report: {
    RechargeReport: "/Reports/RechargeReport",
    ActivationLedger: "/Reports/GetActivationLedger", // ✅ Added here
  },
  
  Emida:{
    plans:"/Emida/GetPlans",
    recharge: "/Emida/Recharge",
  },

};

// Pick environment from Vite
const ENV = (import.meta.env.MODE as Environment) || "development";

// Environment-specific values (only base URL and key differ)
const CONFIGS: Record<Environment, Omit<EnvConfig, "endpoints">> = {
  development: {
    apiBaseUrl: "https://central.enkwirelessinc.com/RechargeCentralAPIV2",
    xapikey: "8nwd64XCIsoMQwDmT91p9OLA6LCaZ75OcJ29Yx92deXlDC8caP8qDmjPhukSfqxv",
  },
  production: {
    apiBaseUrl: "https://central.enkwirelessinc.com/RechargeCentralAPIV2", // change for prod
    xapikey: "8nwd64XCIsoMQwDmT91p9OLA6LCaZ75OcJ29Yx92deXlDC8caP8qDmjPhukSfqxv",
  },
};

// Merge environment config with shared endpoints
const config: EnvConfig = {
  ...CONFIGS[ENV],
  endpoints,
};

export default config;