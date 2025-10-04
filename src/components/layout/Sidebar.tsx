import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSidebar } from "../../contexts/ui/SidebarContext";
import type { NavItem } from "../../entities/modals/component/layout";
export const Icons = {
  DashboardIcon: <Icon icon="ri:dashboard-line" className="w-4 h-4" />,
  BoxCubeIcon: <Icon icon="ri:archive-line" className="w-4 h-4" />,
  CalenderIcon: <Icon icon="ri:calendar-line" className="w-4 h-4" />,
  ChevronDownIcon: <Icon icon="ri:arrow-down-s-line" className="w-4 h-4" />,
  GridIcon: <Icon icon="ri:layout-grid-line" className="w-4 h-4" />,
  ListIcon: <Icon icon="ri:list-unordered" className="w-4 h-4" />,
  PageIcon: <Icon icon="ri:file-text-line" className="w-4 h-4" />,
  PieChartIcon: <Icon icon="ri:pie-chart-line" className="w-4 h-4" />,
  PlugInIcon: <Icon icon="ri:plug-line" className="w-4 h-4" />,
  TableIcon: <Icon icon="ri:table-line" className="w-4 h-4" />,
  UserCircleIcon: <Icon icon="ri:user-line" className="w-4 h-4" />,
};
const navItems: NavItem[] = [
  {
    icon: Icons.DashboardIcon,
    name: "Dashboard",
    subItems: [
      { name: "LinkUp Dashboard", path: "/linkup", icon: "ri:links-line" },
      { name: "Surf Dashboard", path: "/surf", icon: "ri:global-line" },
      { name: "Rivertel Dashboard", path: "/rivertel", icon: "ri:base-station-line" },
      { name: "Wifly Dashboard", path: "/wifly", icon: "ri:wifi-line" },
      { name: "Unidata Dashboard", path: "/unidata", icon: "ri:database-2-line" },
      { name: "Ultra Dashboard", path: "/ultra", icon: "ri:rocket-line" },
      { name: "ATnT Dashboard", path: "/atnt", icon: "ri:cellphone-line" },
    ],
  },
    {
      name: "Admin",
      icon: Icons.PageIcon,
      subItems: [
        { name: "Surf access", path: "/SurfPageAccess" },
        { name: "Linkup access", path: "/LinkUpPageAccess" },
        { name: "Surf order list", path: "/SurfOrderSimReport" },
        { name: "Tmo month control", path: "/TMOMonthStats" },
        { name: "Tmo topup", path: "/PromoBalance" },
        { name: "ApIS logs", path: "/AllPanelTransactionDetails" },
        { name: "Tmo sim swap price", path: "/TMOSIMSWAPDealerWisePrice" },
        { name: "Atnt price panel", path: "/ATTLiteDealerWisePlanPrice" },
        { name: "Plans cost controller", path: "/TMOInstantRegularPlanPricePanel" },
        { name: "Recharge aggregator", path: "/RechargeAggregator" },
        { name: "Plans groups", path: "/TariffGroup" },
        { name: "RTR master", path: "/RechargeDiscountingCarrierWise" },
        { name: "Instant preload tg", path: "/BNKIPTG" },
        { name: "Ip ports management", path: "/IPPortsManagement" },
        { name: "Doc review", path: "/extDocs" },
        { name: "Carrier access control", path: "/reqInitiatorStatus" },
        { name: "Tmo sim order list", path: "/TMOSIMOrderList" },
        { name: "Boom sim order list", path: "/BoomSIMOrderList" },
        { name: "Ultra sim order list", path: "/UltraSIMOrderList" },
        { name: "W9 process list", path: "/InvalidTaxDetails" },
        { name: "Multi month topup list", path: "/BoomMobileMultiRecharge" },
        { name: "Seller", path: "/DistributorView" },
        { name: "Refund timeout", path: "/RefundTimeOut" },
        { name: "Transaction reverse/audit", path: "/TransactionAdjustmentPanel" },
        { name: "Paypal bridge transaction", path: "/PaypalAllFailAndPending" },
        { name: "Plans list", path: "/Createplans" },
        {
          name: "Manage funds",
          subItems: [
            { name: "Add Fund", path: "/Addelvnfunds" },
            { name: "New Add Funds", path: "/PayPallInbuilt" },
          ],
        },
        { name: "Paypal Control", path: "/PaypalDistributorRights" },
        { name: "Users", path: "/UserList" },
        { name: "API Status", path: "/apistatus" },
        { name: "Expired Sim List", path: "/EnkPreloadedExpiredSimList" },
      ],
    },
  { icon: Icons.CalenderIcon, name: "Recharge",
     subItems: [
    { name: "Emida Recharge", path: "/EmRecharge" },
    {name: "EPay Recharge", path: "/EpayRecharge" },
     ],
    },
  
  { icon: Icons.UserCircleIcon, name: "Account Report", path: "/ActivationLedgerReport" },
  {
    icon: Icons.ListIcon,
    name: "Reports",
    subItems: [
      { name: "Master RTR Reports", path: "/MasterrtrReport" },
      { name: "Network Commission", path: "/NetworkCommissionReport" },
      { name: "Promo Ledger Reports", path: "/PromoBalanceTransactionReport" },
      { name: "Promo Balance Reports", path: "/PromoBalanceReport" },
      { name: "Dealer Account Balance", path: "/DealerAccountBalance" },
      { name: "Month End Manual Commission", path: "/MonthEndManualCommissionDetails" },
      { name: "Inventory Purchase Report", path: "/PurchaseReport" },
      { name: "Commission Reports", path: "/CommissionReport" },
      {
        name: "Ledger Reports",
        icon: Icons.ListIcon,
        subItems: [
          { name: "Ledger Report", path: "/LedgerReport" },
          { name: "Topup Report", path: "/TopupReport" },
          { name: "Deduction Report", path: "/DeductReport" },
          { name: "Topup Details", path: "/PaymentDetail" },
        ],
      },
      {
        name: "Other Reports",
         icon: Icons.TableIcon,
        subItems: [
          { name: "Sim History Report", path: "/SimHistoryReport" },
          { name: "Bundle Renewal Report", path: "/ExcelImport" },
          { name: "Login History Reports", path: "/LoginHistory" },
          { name: "Subscriber Log Detail", path: "/SubscriberLog" },
        ],
      },
    ],
  },
  {
    name: "Inventory",
    icon: Icons.TableIcon,
    subItems: [
      { name: "Purchase boom sim", path: "/BoomPurchaseSIM" },
      { name: "Purchase surf sim", path: "/purchaseSurfSim" },
      { name: "Purchase linkup sim", path: "/LinkUpPurchaseSim" },
      { name: "Purchase ATnT sim", path: "/ATnTSIMPurchase" },
      { name: "Surf sim plan mapping", path: "/SurfSimPlanMapping" },
      { name: "Purchase tmo sim", path: "/TMOPurchaseSIM" },
      { name: "TMO SIM Inventory", path: "/TmoSimInventory" },
      { name: "Stock transfer reports", path: "/StockTransferReport" },
      { name: "TMO SIM plan Mapping", path: "/TMOSimPlanMapping" },
      { name: "Boom Sim plan Mapping", path: "/BOOMSimPlanMapping" },
    ],
    },
  
    {
      icon: Icons.PieChartIcon,
      name: "Banner",
      subItems: [
        { name: "External banner", path: "/Banner.aspx?ImgFlag=1" },
        { name: "Internal banner", path: "/Banner.aspx?ImgFlag=2" },
        { name: "Distributor banner", path: "/InternalBannerLevelWise" },
        { name: "Tmobile banner", path: "/Banner.aspx?ImgFlag=4" },
        { name: "Ultra banner", path: "/Banner.aspx?ImgFlag=5" },
        { name: "Unidata banner", path: "/Banner.aspx?ImgFlag=6" },
        { name: "Ip banner", path: "/Banner.aspx?ImgFlag=3" },
        { name: "Boom banner", path: "/Banner.aspx?ImgFlag=7" },
        { name: "Rivertel banner", path: "/Banner.aspx?ImgFlag=8" },
        { name: "Surf banner", path: "/Banner.aspx?ImgFlag=9" },
        { name: "Atnt banner", path: "/Banner.aspx?ImgFlag=10" },
        { name: "Wifly banner", path: "/Banner.aspx?ImgFlag=11" },
        { name: "Linkup banner", path: "/Banner.aspx?ImgFlag=12" },
      ],
    },
    // { icon: Icons.UserCircleIcon, name: "Emailer", path: "/ENKEmailer" },
    // {
    //   icon: Icons.BoxCubeIcon,
    //   name: "Sales reports",
    //   subItems: [
    //     { name: "Uploaded sales reports", path: "/SalesPageReport" },
    //     { name: "Downloaded sales reports", path: "/SalesReportDownload" },
    //     {
    //       name: "More options",
    //       subItems: [{ name: "Reset password", path: "/Resetpassword" }],
    //     },
    //   ],
    // },
    { icon: Icons.PlugInIcon, name: "HELP", path: "/TicketList" },
  ];
export default function Sidebar(){
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path?: string) => path === pathname, [pathname]);
  const makeKey = (parentKey: string, index: number) => `${parentKey}-${index}`;

  const toggleKey = (key: string, level: number, root: string) => {
    setOpenKeys((prev) => {
      const next = { ...prev };
      if (level === 1) {
        Object.keys(next).forEach((k) => {
          if (k.startsWith(root + "-")) delete next[k];
        });
        if (!prev[key]) next[key] = true;
      } else {
        next[key] = !prev[key];
      }
      return next;
    });
  };

  const findKeysForPath = (items: NavItem[], targetPath: string, parentKey: string): string[] | null => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const key = makeKey(parentKey, i);
      if (item.path === targetPath) return [key];
      if (item.subItems) {
        const childChain = findKeysForPath(item.subItems, targetPath, key);
        if (childChain) return [key, ...childChain];
      }
    }
    return null;
  };


  const setSubMenuRef = (key: string) => (el: HTMLDivElement | null) => {
  if (el) {
    subMenuRefs.current[key] = el;
  } else {
    delete subMenuRefs.current[key];
  }
};

  useEffect(() => {
    const keysToOpen: Record<string, boolean> = {};
    const chain = pathname ? findKeysForPath(navItems, pathname, "main") : null;
    if (chain) chain.forEach((k) => (keysToOpen[k] = true));
    setOpenKeys(chain ? keysToOpen : {});
  }, [pathname]);

  useEffect(() => {
    const openKeyList = Object.keys(openKeys).filter((k) => openKeys[k]);
    requestAnimationFrame(() => {
      const newHeights: Record<string, number> = {};
      openKeyList.forEach((k) => {
        const el = subMenuRefs.current[k];
        if (el) newHeights[k] = el.scrollHeight;
      });
    });
  }, [openKeys]);

  const renderMenuItems = (items: NavItem[], root: string, parentKey: string = root, level = 1) => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => {
        const key = makeKey(parentKey, index);
        const isOpen = !!openKeys[key];
        const hasChildren = !!nav.subItems?.length;

        return (
          <li key={key}>
            {hasChildren ? (
              <button
                onClick={() => toggleKey(key, level, root)}
                className={`menu-item group ${isOpen ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
                }`}
              >
                <span className={isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                {(isExpanded || isHovered || isMobileOpen) &&
                  React.cloneElement(Icons.ChevronDownIcon, {
                    className: `ml-auto w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-500" : ""}`,
                  })}
              </button>
            ) : (
              nav.path && (
               <Link
  to={nav.path}
  className={`menu-item group ${
    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
  } cursor-pointer ${
    !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
  }`}
>
  <span
    className={
      isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"
    }
  >
    {nav.icon}
  </span>
  {(isExpanded || isHovered || isMobileOpen) && (
    <span className="menu-item-text">{nav.name}</span>
  )}
</Link>

              )
            )}

          {hasChildren && (
  <div
    className={`mt-2 overflow-hidden transition-all duration-300 text-white px-5 ${
      isOpen ? "max-h-[2000px]" : "max-h-0"
    } ${level > 1 ? "ml-2 border-l border-gray-200 pl-3" : ""}`}
    ref={setSubMenuRef(key)} // ✅ fixed ref
  >
    {nav.subItems!.map((sub, subIndex) => {
      const childKey = makeKey(key, subIndex);
      const childHasChildren = !!sub.subItems?.length;

      if (childHasChildren) {
        return (
          <div key={childKey}>
            {renderMenuItems([sub], root, childKey, level + 1)}
          </div>
        );
      }

      return (
        <div key={childKey}>
          <Link
            to={sub.path!}
            className={`menu-dropdown-item ${
              isActive(sub.path!)
                ? "menu-dropdown-item-active"
                : "menu-dropdown-item-inactive"
            }`}
          >
            <Icon icon={sub.icon as string} className="w-3 h-3" />
            {sub.name}
            <span className="flex items-center gap-1 ml-auto">
              {sub.new && <span className="menu-dropdown-badge">new</span>}
              {sub.pro && <span className="menu-dropdown-badge">pro</span>}
            </span>
          </Link>
        </div>
      );
    })}
  </div>
)}

          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 px-3 left-0 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen  transition-all duration-300 ease-in-out z-50 border-gray-200
        ${isExpanded || isMobileOpen ? "w-[250px]" : isHovered ? "w-[250px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="py-2 border-b border-gray-600 flex justify-center">
        <Link to="/" className="flex flex-col items-center  pb-1 ">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img className="dark:hidden" src="../../logo/enk_logo.png" alt="Logo" width={100} height={40} />
              <img className="hidden dark:block" src="../../logo/enk_logo.png" alt="Logo" width={100} height={40} />
            </>
          ) : (
            <img src="../../logo/enk_logo.png" alt="Logo" width={60} height={32} />
          )}
        </Link>
      </div>

      {/* Nav Items */}
   <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-2">
  <nav className="mb-4">{renderMenuItems(navItems, "main", "main", 1)}</nav>

  {/* ✅ New Sign Out Button Component */}
 
</div>
    </aside>
  );
};