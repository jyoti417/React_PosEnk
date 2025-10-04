// src/entities/apis/emida.ts
import type { ApiResponse } from "./mainapi";

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
    networkId: number;
  }

  export type RechargeResponse = ApiResponse<{
    transactionId: string;
    amount: number;
  }>;
}
