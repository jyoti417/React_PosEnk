"use client";
import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
// import { mainapiinstance } from "../shared/api/mainapiinstance";
import { EmidaApi } from "../shared/api/emida";
import type { Emida } from "../entities/apis/emida";
import networks from "../shared/networks"; 

const REGULATORY_PERCENT = 5;

type RechargeFormInputs = {
  mobile: string;
  planId: number;
};

export default function EmRecharge() {
  const { networkId } = useParams<{ networkId: string }>();
  const parsedNetworkId = Number(networkId);

  // ✅ find the current network from config
   const currentNetwork = networks.find((n) => n.value === parsedNetworkId);

  const [plans, setPlans] = useState<Emida.Plan[]>([]);
  const [summary, setSummary] = useState<{
    mobile?: string;
    planId?: number;
    price?: number;
    regulatory?: number;
    total?: number;
  }>({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RechargeFormInputs>();

  // ✅ fetch plans dynamically based on current network
  useEffect(() => {
    const fetchPlans = async () => {
      if (!currentNetwork?.value) return;
      setLoading(true);
      try {
        const res = await EmidaApi.getPlans({ networkid: currentNetwork.value });
        if (res.statusCode === 1200) setPlans(res.data);
        else setApiMessage(res.message);
      } catch (err: any) {
        setApiMessage(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [currentNetwork]);

  const onSummary: SubmitHandler<RechargeFormInputs> = (data) => {
    const plan = plans.find((p) => p.id === Number(data.planId));
    if (!plan) return;
    const price = plan.price;
    const regulatory = price * (REGULATORY_PERCENT / 100);
    const total = price + regulatory;

    setSummary({
      mobile: data.mobile,
      planId: plan.id,
      price,
      regulatory,
      total,
    });
  };

  const onSubmitRecharge = async () => {
    if (!summary.mobile || !currentNetwork?.value) return;
    setLoading(true);
    try {
      const payload: Emida.RechargeRequest = {
        mobileNumber: summary.mobile,
        planId: Number(summary.planId),
        networkId: currentNetwork.value, 
      };
       const res = await EmidaApi.recharge(payload);

      if (res.statusCode === 1200) {
        setApiMessage(`✅ Recharge successful! Txn ID: ${res.data.transactionId}`);
        reset();
        setSummary({});
      } else {
        setApiMessage(`❌ ${res.message}`);
      }
    } catch (err: any) {
      setApiMessage(err.message || "Recharge failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-2 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-6 border-b">
        <h2 className="text-2xl font-bold text-[#d2344a] tracking-wide">
           {currentNetwork?.name || "Emida"} Recharge
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch ">
        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full md:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-5 flex-1">
            <form onSubmit={handleSubmit(onSummary)} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="# Mobile No."
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/\D/g, "");
                  }}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold">Choose Plan</label>
                <select
                  {...register("planId", { required: "Please select a plan" })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value={0}>- Select Plan -</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.planId && (
                  <p className="text-red-500 text-sm">{errors.planId.message}</p>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Plan Summary"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setSummary({});
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full md:w-1/2 flex flex-col justify-between">
          <div className="flex justify-center mb-4">
            {currentNetwork && (
              <img
                src={currentNetwork.img}
                alt={currentNetwork.name}
                className="max-h-14 object-contain"
              />
            )}
          </div>
          <h2 className="text-center text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
            Summary
          </h2>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-gray-700 dark:text-gray-200">Mobile Number</p>
              <p className="font-semibold">{summary.mobile ?? "X-X-X-X-X-X-X-X"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-700 dark:text-gray-200">Plan Price</p>
              <p className="font-semibold">${summary.price ?? 0}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-700 dark:text-gray-200">Regulatory</p>
              <p className="font-semibold">${summary.regulatory?.toFixed(2) ?? 0}</p>
            </div>

            <div className="flex justify-between border-t pt-2 mt-2">
              <p className="text-[15px] font-bold">Amount To Pay:</p>
              <p className="text-[15px] font-bold text-green-600 dark:text-green-400">
                ${summary.total?.toFixed(2) ?? 0}
              </p>
            </div>
          </div>

          {summary.mobile && (
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={onSubmitRecharge}
                className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-md transition font-semibold"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
              <button
                className="px-5 py-2.5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white shadow-md transition font-semibold"
                onClick={() => setSummary({})}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {apiMessage && (
        <div className="mt-6 text-center">
          <p className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-100">
            {apiMessage}
          </p>
        </div>
      )}
    </div>
  );
}
