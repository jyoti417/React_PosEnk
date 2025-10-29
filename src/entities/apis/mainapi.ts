import { format } from "date-fns";

/**
 * Generic API Response Wrapper
 */
export interface ApiResponse<T> {
  statusCode?: number;
  data: T;
  message?: string;
  details?: string;
  status?: boolean;
}

/**
 * ------------------ AUTH ------------------
 */
export namespace Auth {
  export interface LoginRequest {
    username: string;
    password: string;
  }

  export interface LoginData {
    token: string;
  }

  export type LoginResponse = ApiResponse<LoginData>;
}

/**
 * ------------------ DASHBOARD ------------------
 */
export namespace Dashboard {
  export interface BaseRequest {
    SelectedDistributorId: number;
    PeriodType: string;
  }
  export type DashboardDataResponse = ApiResponse<any>;
}

/**
 * ------------------ REPORT ------------------
 */
export namespace Report {
  export interface ActivationLedgerRequest {
    ClientID: number;
    ClientTypeID: number;
    LoginID: number;
    CurrentLoginID: number;
    FromDate: string;
    ToDate: string;
    level1?: string;
    level2?: string;
    orderType?: string;
    status?: string;
  }

  export type ActivationLedgerResponse = ApiResponse<any[]>;

  // ✅ MAIN API — Get Ledger Report
  export const getActivationLedgerReport = async (
    from: Date,
    to: Date,
    filters: any,
    baseUrl: string,
  ): Promise<any[]> => {
    try {
      const params = {
        ClientID: 1,
        ClientTypeID: 1,
        LoginID: 1,
        CurrentLoginID: 1,
        FromDate: from.toISOString().split("T")[0],
        ToDate: to.toISOString().split("T")[0],
        level1: filters.level1 || "",
        level2: filters.level2 || "",
        orderType: filters.orderType || "",
        status: filters.status || "",
      };

      const queryString = new URLSearchParams(params as any).toString();
      const res = await fetch(
        `http://104.42.44.252/ENKReportsAPI/api/Reports/${baseUrl}?${queryString}`
      );
      const data = await res.json();
      return data?.data ? JSON.parse(data.data) : [];
    } catch (err) {
      console.error("❌ Report API Error:", err);
      return [];
    }
  };

  // ✅ SINGLE GENERIC DROPDOWN FETCH FUNCTION
  export const getDropdownData = async (treeLevel:number,distributorID:number) => {
         try {

            const response = await fetch(
                `http://104.42.44.252/ENKReportsAPI/api/LevelDistributor/GETLevelDistributor?treeLevel=${treeLevel}&distributorID=${distributorID}`
            );
            const data = await response.json();
            return data.Table ;
        } catch (err) {
            // console.error("Error fetching level", treeLevel, err);
            return [];
        }
  };
}

/**
 * ------------------ EMIDA ------------------
 */
export namespace Emida {
  export interface PlansRequest {
    networkid: number;
  }

  export type Plan = {
    id: number;
    name: string;
    price: number;
  };

  export type PlanResponse = ApiResponse<Plan[]>;

  export interface RechargeRequest {
    mobileNumber: string;
    planId: number;
    networkId?: number;
  }

  export type RechargeResponse = ApiResponse<{
    transactionId: string;
    amount: number;
  }>;
} 
