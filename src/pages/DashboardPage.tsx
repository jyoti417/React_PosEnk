import {Link } from "react-router-dom";
import networks from "../shared/networks";

export default function DashboardPage() {

  return (
     <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 
                px-4 py-6  ">
      {networks.map((item) => {
        let path: string = "/"; // ✅ default string

        if (item.type === "dashboard" && item.route) {
          path = item.route;
        }
        if (item.type === "emida" && item.value) {
           path = `/EmRecharge/${item.value}`;
        }
        if (item.type === "epay" && item.networkId) {
          path = `/EpayRecharge/${item.networkId}`;
        }
        return (
        <Link
          key={item.id}
          to={path}
          className={`flex items-center justify-center
    h-25 
    p-0 m-[15px_0_5px]
    rounded-[5px] border  
    shadow-[12px_12px_15px_#bac0d2,-3px_-4px_15px_#e8f0ff]
    origin-bottom-right transform-gpu
    transition-all duration-200 ease-in-out
    hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[3px_3px_1px_#6e6e6e]
    focus:not-active:translate-x-[5px] focus:not-active:translate-y-[5px]
    focus:not-active:shadow-[0px_0px_10px_#000000]
    focus:not-active:bg-[#e4e4e4] focus:not-active:text-[#dedede]
    dark:bg-gray-400 dark:border-gray-900 dark:shadow-none dark:hover:shadow-none dark:text-white
    ${item.bg}`}  >
          <img src={item.img} alt={item.name} className="object-contain w-30" />
        </Link>
        );
      })}
      <div className="butn  col-span-2 flex items-center justify-center mt-6">
        <a
        href="#"
        className="bg-[#253b47] text-white text-[16px] border-2 border-[#3c4c54] 
          rounded-[12px] font-semibold px-6 py-2 
          transition-all duration-700 ease-in hover:bg-[#2a353a] "
      >
        Click here to Sign up T-Mobile/Ultra Mobile
      </a>
      </div>

    </div>
  );
}