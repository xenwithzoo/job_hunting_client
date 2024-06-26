import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button2 from "../../../components/Button/Button2";
import Button3 from "../../../components/Button/Button3";
import Input2 from "../../../components/Input/Input2";
import { FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import SidebarItem from "../../../components/Item/SidebarItem";
import { TbMessage2 } from "react-icons/tb";
import { MdOutlineLogout } from "react-icons/md";
import { FaGripLinesVertical } from "react-icons/fa";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { RiLoader2Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { LuPanelLeftOpen } from "react-icons/lu";
const Sidebar = ({ className, children, data, onNewConversation }) => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const [isColapse, setIsColapse] = useState(false);
  const [isColapseHover, setIsColapseHover] = useState(false);
  const [isSidebarBtnClose, setIsSidebarBtnClose] = useState(true);

  const onSearchBtnClick = (value) => {
    if (value) {
      setIsSidebarBtnClose(!isSidebarBtnClose);
    }
  };

  const onNewChatBtnClick = (value) => {
    onNewConversation();
    if (value) {
      setIsSidebarBtnClose(!isSidebarBtnClose);
    }
  };

  useEffect(() => {
    setHistories(data);
  }, [data]);

  const renderHistories = (items) => {
    if (histories.length > 0) {
      // if(false) {
      // today
      const today = new Date();
      // yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      // previous 7 days
      const previous7Days = new Date(today);
      previous7Days.setDate(previous7Days.getDate() - 7);
      // previous 30 days
      const previous30Days = new Date(today);
      previous30Days.setDate(previous30Days.getDate() - 30);

      const todayItems = histories?.filter(
        (item) => new Date(item.createdAt) > today
      );

      const yesterdayItems = histories?.filter(
        (item) =>
          new Date(item.createdAt) > yesterday &&
          new Date(item.createdAt) < today
      );

      const previous7DaysItems = histories?.filter(
        (item) =>
          new Date(item.createdAt) > previous7Days &&
          new Date(item.createdAt) < yesterday
      );

      const previous30DaysItems = histories?.filter(
        (item) =>
          new Date(item.createdAt) > previous30Days &&
          new Date(item.createdAt) < previous7Days
      );

      // console.log("todayItems", todayItems);
      // console.log("yesterdayItems", yesterdayItems);
      // console.log("previous7DaysItems", previous7DaysItems);
      // console.log("previous30DaysItems", previous30DaysItems);
      // console.log("previous30DaysIsdfsdftems", histories[1].createdAt);
      // console.log(
      //   "previous30DaysIsdfsdftems",
      //   new Date(histories[1].createdAt)
      // );

      const renderItems = (items) => {
        return items.map((item) => {
          return (
            <div key={item.id}>
              <SidebarItem icon={<TbMessage2 />} id={item.id}>
                {item.title}
              </SidebarItem>
            </div>
          );
        });
      };

      return (
        <>
          {todayItems.length > 0 ? (
            <>
              <div className={"w-full flex justify-between"}>
                <span span className={"text-sm font-semibold text-slate-400"}>
                  Today
                </span>
              </div>
              <div className="w-full h-0.5 my-3 bg-violet-100"></div>
              {renderItems(todayItems)}
            </>
          ) : (
            <></>
          )}

          {yesterdayItems.length > 0 ? (
            <>
              <div className={"w-full flex justify-between"}>
                <span className={"text-sm font-semibold text-slate-400"}>
                  Yesterday
                </span>
              </div>
              <div className="w-full h-0.5 my-3 bg-violet-100"></div>
              {renderItems(yesterdayItems)}
            </>
          ) : (
            <></>
          )}

          {previous7DaysItems.length > 0 ? (
            <>
              <div className={"w-full flex justify-between"}>
                <span className={"text-sm font-semibold text-slate-400"}>
                  Previous 7 days
                </span>
              </div>
              <div className="w-full h-0.5 my-3 bg-violet-100"></div>
              {renderItems(previous7DaysItems)}
            </>
          ) : (
            <></>
          )}

          {previous30DaysItems.length > 0 ? (
            <>
              <div className={"w-full flex justify-between"}>
                <span className={"text-sm font-semibold text-slate-400"}>
                  Previous 30 days
                </span>
              </div>
              <div className="w-full h-0.5 my-3 bg-violet-100"></div>
              {renderItems(previous30DaysItems)}
            </>
          ) : (
            <></>
          )}
        </>
      );
    }

    return (
      <div className={"w-full h-full flex justify-center items-center "}>
        <span className={"animate-spin h-5 w-5 mr-3 text-slate-500 text-xl "}>
          <RiLoader2Line />
        </span>
      </div>
    );
  };

  useEffect(() => {
    const newWidth = window.innerWidth;
    if (newWidth < 768) {
      setIsColapse(true);
    }
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth < 768) {
        setIsColapse(true);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div
      className={`flex ${className} min-[0px]:max-md:absolute z-3 min-[0px]:max-md:h-full`}
    >
      <div className={`flex min-[0px]:max-md:p-3`}>
        <div
          className={`flex flex-col items-center bg-white/50 min-[0px]:max-md:bg-white rounded-3xl relative transition-all ease-in-out ${
            isColapse ? "invisible w-0 opacity-0" : "min-w-80"
          }`}
        >
          <div
            className={`flex flex-col items-center  h-full w-full px-3 pt-4 pb-2`}
          >
            <div className={`flex flex-col items-center h-full w-full`}>
              <div className={" w-full flex justify-center items-center mb-4"}>
                <div
                  className={`relative w-full h-full flex justify-center items-center`}
                >
                  <div
                    className={`hidden min-[0px]:max-md:block absolute w-full h-full flex justify-end`}
                  >
                    <button
                      className="min-[0px]:max-md:block transition-opacity ease-linear delay-100 hover:bg-white/10 rounded-full "
                      onClick={() => setIsColapse(!isColapse)}
                      onMouseEnter={() => setIsColapseHover(true)}
                      onMouseLeave={() => setIsColapseHover(false)}
                    >
                      <div className={"bg-white/20 rounded-full"}>
                        <span
                          className={`text-3xl w-7 text-slate-400 flex j  ustify-center transition-opacity ease-linear delay-100 ${
                            isColapse ? "invisible w-0 h-0 opacity-0" : ""
                          }`}
                        >
                          <MdOutlineClose />
                        </span>
                      </div>
                    </button>
                  </div>
                  <Link
                    to={`${process.env.REACT_APP_BASE_URL}`}
                    className={`text-slate-700 no-underline`}
                  >
                    <h4 className={"font-bold mb-0"}>
                      {process.env.REACT_APP_BRAND_NAME || "Chat App"}
                    </h4>
                  </Link>
                </div>
              </div>
              {/* sidebar button */}
              <div className={" flex w-full h-15 transition-all easy-in-out"}>
                <div
                  className={`${
                    !isSidebarBtnClose ? "w-full" : "w-15"
                  } transition-all ease-out mr-3 `}
                >
                  <Button2
                    className={`text-white p-2 h-15 min-w-15 w-full rounded-full bg-violet-300`}
                    icon={<FiPlus />}
                    onClick={onNewChatBtnClick}
                    iconOnly={isSidebarBtnClose}
                  >
                    New Chat
                  </Button2>
                </div>
                <div
                  className={`${
                    isSidebarBtnClose ? "w-full" : "w-15"
                  } transition-all ease-out`}
                >
                  <Input2
                    className={`text-white p-2 h-15 min-w-15 ${
                      !isSidebarBtnClose ? "w-full" : ""
                    } rounded-full bg-violet-900 `}
                    icon={<IoSearch />}
                    onClick={onSearchBtnClick}
                    iconOnly={!isSidebarBtnClose}
                    placeholder={"Search conversation..."}
                  />
                </div>
              </div>

              {/* clear conversation */}
              <div className="w-full h-0.5 my-3 bg-violet-100"></div>
              <div className={"w-full flex justify-between p-2"}>
                <span className={"text-sm text-slate-500"}>
                  Your conversations
                </span>
                <button
                  className={
                    "text-sm font-bold text-violet-500 hover:text-violet-700 hover:underline hover:decoration-solid transition-all easy-in-out"
                  }
                >
                  clear all
                </button>
              </div>

              <div className="w-full h-0.5 my-3 bg-violet-100"></div>
              {/*chat histories*/}
              <div className={`overflow-y-auto max-w-80 w-full h-full`}>
                {renderHistories()}
              </div>
              {/* Settings */}
              <div className={"relative flex flex-col-reverse w-full pt-4"}>
                {/* <Button3
                  icon={
                    <img
                      src="/img/avatar.png"
                      alt="logo"
                      className="h-full w-full object-cover object-center rounded-full"
                    />
                  }
                >
                  Lê Văn Đạt
                </Button3> */}
                {/* <Button3 icon={<IoSettingsOutline />} className={`mb-3`}>
                  Settings
                </Button3> */}
                <Button3
                  icon={<MdOutlineLogout className={`text-slate-500`} />}
                  className={`mb-3 rounded-3xl`}
                  onClick={handleLogout}
                >
                  <span className={`text-slate-500 mr-3  hover:text-slate-700`}>
                    Logout
                  </span>
                </Button3>
              </div>
            </div>
          </div>
        </div>

        {/*colapse button  */}
        <button
          className="hidden absolute min-[0px]:max-md:block transition-opacity ease-linear delay-100 hover:bg-white/10 rounded-full "
          onClick={() => setIsColapse(!isColapse)}
          onMouseEnter={() => setIsColapseHover(true)}
          onMouseLeave={() => setIsColapseHover(false)}
        >
          <div className={" top-0 p-3 bg-white/20 rounded-full ml-3"}>
            <span
              className={`text-2xl w-7 text-slate-600 flex justify-center transition-opacity ease-linear delay-100 ${
                isColapse ? "" : "invisible w-0 h-0 opacity-0"
              }`}
            >
              <LuPanelLeftOpen />
            </span>
          </div>
        </button>

        <button
          className="min-[0px]:max-md:hidden transition-opacity ease-linear delay-100 hover:bg-white/10 rounded-full "
          onClick={() => setIsColapse(!isColapse)}
          onMouseEnter={() => setIsColapseHover(true)}
          onMouseLeave={() => setIsColapseHover(false)}
        >
          <span
            className={`text-xl w-7 text-slate-400 flex justify-center transition-opacity ease-linear delay-100 ${
              isColapse || isColapseHover ? "invisible w-0 h-0 opacity-0" : ""
            }`}
          >
            <FaGripLinesVertical />
          </span>
          <span
            className={`text-3xl w-7 text-slate-900 flex justify-center transition-opacity ease-linear delay-100 ${
              !isColapse && isColapseHover ? "" : "invisible w-0 h-0 opacity-0"
            }`}
          >
            <BsChevronCompactLeft />
          </span>
          <span
            className={`text-3xl w-7 text-slate-90place-items-end0 flex justify-center transition-opacity ease-linear delay-100 ${
              isColapse ? "" : "invisible w-0 h-0 opacity-0"
            }`}
          >
            <BsChevronCompactRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
  