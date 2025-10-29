import config from "../../config";
import type { ApiResponse ,Auth,Dashboard,Emida,Report } from "../../entities/apis/mainapi";

export class mainApiInstanceService {
  private baseUrl: string;
  private xapikey: string;
  
  constructor() {
    this.baseUrl = config.apiBaseUrl;
    this.xapikey = config.xapikey;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "x-api-key": this.xapikey,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204 ||response.status === 202) {
      return {} as T;
    }
   
    return response.json() as Promise<T>;
  }

   public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  public post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }


  // AUTH
  public auth = {
    login: (body: Auth.LoginRequest) =>
      this.request<Auth.LoginResponse>(config.endpoints.Authentication.login, {
        method: "POST",
        body: JSON.stringify(body),
      }),
      
      verifyPage: (pageName: string) =>
        this.request<ApiResponse<any>>(`${config.endpoints.Status.SinglePagesAccess}/${pageName}`),
  };

  // Dashboard
  public Dashboard = {
    getDashboardData: (RouteParams :Dashboard.BaseRequest) =>
      this.request<Dashboard.DashboardDataResponse>(`${config.endpoints.Admin.DashboardData}/${RouteParams.SelectedDistributorId}/${RouteParams.PeriodType}`),
  };

  // report
public Report = {
  getActivationLedger: (params: Report.ActivationLedgerRequest) =>
    this.request<Report.ActivationLedgerResponse>(
      `${config.endpoints.Report.ActivationLedger}?${new URLSearchParams(params as any).toString()}`
    ),
};


  //emida recharge
public emRecharge = {
  getplan: (body: Emida.PlansRequest) =>
    this.request<Emida.PlanResponse>(config.endpoints.Emida.plans, { method: "POST", body: JSON.stringify(body) }),
  
  recharge: (body: Emida.RechargeRequest) =>
    this.request<Emida.RechargeResponse>(config.endpoints.Emida.recharge, { method: "POST", body: JSON.stringify(body) }),
};
}

// ✅ Singleton instance
export const mainapiinstance = new mainApiInstanceService();
