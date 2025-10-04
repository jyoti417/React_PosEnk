// src/api/emida.ts
import { mainapiinstance } from "../../shared/api/mainapiinstance";

import type { Emida } from "../../entities/apis/emida"

export const EmidaApi = {
  getPlans: (payload: Emida.PlansRequest): Promise<Emida.PlanResponse> => {
    return mainapiinstance.post("/emida/getPlans", payload);
  },

  recharge: (payload: Emida.RechargeRequest): Promise<Emida.RechargeResponse> => {
    return mainapiinstance.post("/emida/recharge", payload);
  },

  getRechargeHistory: (networkId: number) => {
    return mainapiinstance.get(`/emida/${networkId}/history`);
  },

  getOffers: (networkId: number) => {
    return mainapiinstance.get(`/emida/${networkId}/offers`);
  },
};
