import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader } from "../components/utils/Loader";
import { useParams } from "react-router-dom";
import networks from "../shared/networks";

type RechargeForm = {
  mobile: string;
  amount: number;
};

export default function EpayRecharge() {
  const [loading, setLoading] = useState(false);

 // ✅ find the current network from config
const { networkId } = useParams<{ networkId: string }>();
const parsedNetworkId = Number(networkId);

const currentNetwork = networks.find(
  (n) => n.type === "epay" && n.networkId === parsedNetworkId
);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<RechargeForm>({
    defaultValues: { mobile: "", amount: undefined },
  });

  // live watch values
  const mobile = watch("mobile");
  const amount = watch("amount");

  const profit = amount && amount >= 10 ? +(amount * 0.09).toFixed(2) : 0;
  const toPay = amount && amount >= 10 ? +(amount - profit).toFixed(2) : 0;

  const onSubmit: SubmitHandler<RechargeForm> = async (data) => {
    if (!data.mobile || !data.amount) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate API
      alert(`Payment gateway triggered for ${data.mobile}, Amount: $${toPay}`);
      reset();
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="relative p-2 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-gray-100">
            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <Loader size="lg" variant="inline" />
                </div>
            )}

            {/* Header */}
            <div className="mb-6 border-b">
                <h2 className="text-2xl font-bold text-[#d2344a] tracking-wide">EPay Recharge</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-stretch">
                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full md:w-1/2 flex flex-col justify-between">

                      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                        <div>
                            <label className="block text-sm font-semibold">Mobile Number</label>
                           <input
                                type="tel"
                                maxLength={10}
                                placeholder="# Mobile No."
                                {...register("mobile", {
                                required: "Mobile number is required",
                                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                                })}
                                onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                target.value = target.value.replace(/\D/g, "");
                                }}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                        
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Plan Amount <span className="text-red-500">*</span>
                            </h2>
                            <input
                                type="text"
                                placeholder="Enter plan amount"
                                {...register("amount", {
                                    required: "Enter a valid plan amount",
                                    min: { value: 10, message: "Minimum amount is 10.00" },
                                    validate: (val) => /^\d*(\.\d{0,2})?$/.test(val.toString()) || "Enter Valid amount",
                                })}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                        </div>
                      
                    </form>
                </div>

                {/* Profit */}
                {/* Summary Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full md:w-1/2 flex flex-col justify-between">
                        <div className="flex justify-center mb-4">
                         {currentNetwork && (

                            <img src={currentNetwork.img} 
                            alt={currentNetwork.name} className="max-h-14 object-contain" />
                             )}
                        </div>
                        <h2 className="text-center text-lg font-bold mb-4">Summary</h2>
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex justify-between">
                            <p className="text-gray-700 dark:text-gray-200">Mobile Number</p>
                            <p className="font-semibold">{mobile || "X-X-X-X-X-X-X-X-X-X"}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="text-gray-700 dark:text-gray-200">Plan Amount</p>
                            <p className="font-semibold">${amount || 0}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="text-gray-700 dark:text-gray-200">Profit</p>
                            <p className="font-semibold">${profit.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-2">
                            <p className="text-[15px] font-bold">Amount To Pay</p>
                            <p className="text-[15px] font-bold text-red-600">${toPay.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Show buttons only if amount is valid */}
                        {amount && amount >= 10 && (
                            <div className="flex justify-end mt-6 gap-3">
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-md transition font-semibold"
                            >
                                {loading ? "Processing..." : "Recharge"}
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-5 py-2.5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white shadow-md transition font-semibold"
                            >
                                Cancel
                            </button>
                            </div>
                        )}
                        </div>
                        </div>
                <div className="mt-8 bottom">
                    <h2 className="text-green-700 font-bold underline text-sm mb-2">
                        ATTENTION CA Retailers </h2>
                    <p className="text-green-700 text-sm"> All the California dealer must collect MTS tax and 911 surcharge from customers. </p>
                    <p className="text-green-700 text-sm mt-2"> Please click below link to get more information about MTS permit: </p>
                    <p className="text-green-700 text-sm mt-2">
                        <a href="#" className="text-green-700 text-sm mt-2" > www.cdtfa.ca.gov/industry/seller-servicesupplier.htm#Sellers </a>
                    </p> <p className="text-green-700 font-bold text-sm mt-2"> Click here to Apply MTS permit if you don’t have one yet: </p>
                    <p className="text-green-700 text-sm mt-2"> <a href="#" className="text-green-700 text-sm mt-2" >onlineservices.cdtfa.ca.gov/Directory/ </a>
                    </p>
               
            </div>
        </div>
    );
}