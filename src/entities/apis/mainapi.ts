// Generic base response wrapper
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

// Namespace for Authentication-related types
export namespace Auth {
  export interface LoginRequest {
    username: string;
    password: string;
  }

  export interface LoginData {
    token: string;
    // refreshToken?: string; // add if API provides
  }

  // Full login API response
  export type LoginResponse = ApiResponse<LoginData>;
}

// Namespace for Dashboard
export namespace Dashboard {
 export interface BaseRequest {
    SelectedDistributorId : number;
    PeriodType : string;
  }
  export type DashboardDataResponse = ApiResponse<any>;
}
// Namespace for report
export namespace Report {
 export interface BaseRequest {
    username: string;
    password: string;
  }
  export type ReportReportResponse = ApiResponse<any>;
}

// Namespace for Emida
export namespace Emida {
  export interface PlansRequest{
    networkid :number
  }
   // One plan
  export type plans ={
    id: number;
    name: string;
    price: number;
  }
    // Response for plans
  export type PlanResponse =ApiResponse<plans[]>;

    // Request for recharge
    export interface RechargeRequest {
     mobileNumber: string;
      planId: number;
      networkId?: number;
    }
     // Response for recharge

     export type RechargeResponse = ApiResponse<{
      transactionId: string;
      amount: number;
     }>;
}

