import  { useState ,useEffect,useRef} from "react";
import {  Link } from "react-router-dom";
import { useSidebar } from "../../contexts/ui/SidebarContext";
import ThemeToggleButton from "../buttons/ThemeToggleButton";
import NotificationDropdown from "../dropdown/NotificationDropdown";
import SignOutButton from "../../pages/SignOutButton";
export default function Header(){
const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
     <header className="fixed  flex w-full  h-10 z-99999 dark:border-gray-800 dark:bg-gray-900 border-gray-600  border-b   lg:sticky">
     <div className="flex px-2  items-center grow lg:flex-row ">
          <button
            className="items-center justify-center text-white w-5 h-5 pl-0.5 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-9"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {/* Cross Icon */}
          </button>

          {/* <Link to="/" className="lg:hidden flex items-center">
           <img src={Imagelogo}  width={154}
              height={30}
              className="dark:hidden"
              alt="Logo" />

             <img src={Imagedarklogo}  width={154}
              height={30}
              className="hidden dark:block"
              alt="Logo" />
          </Link> */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-5 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>

                  <Link to="/addfund"
                    className="btns btn-one px-2 py-1 text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-medium rounded bg-[#d2344a] text-white mx-1 
             dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300" >
                     Add Fund
                  </Link>
                  <Link to="contact"
                    className="btns btn-two flex  text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-medium rounded bg-gray-500 text-white mx-1
                          dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.05 15.05 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2 2 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"/></svg> <span> Contact</span>
                  </Link>
                  </div>
                   {/* <span className="user_id">
                            <span  className="dis">ENK 1001 : </span>
                                  <span className="amt">  ENK Wireless</span>
                        </span> */}

                  <span className="acount_balance flex items-center text-white bg-[#31373a] font-semibold px-2 py-1 rounded-md mx-2 mr-1 text-[9px] sm:text-[12px] md:text-[14px">
                            <span  className="dis pr-1">Account Balance: </span>
                                  <span className="amt"> USD -166564.44</span>
                        </span>
             <ThemeToggleButton />
          <NotificationDropdown/>
              <SignOutButton isExpanded={true} isHovered={false} isMobileOpen={isMobileOpen} />
          
    </header>


     
  );
}