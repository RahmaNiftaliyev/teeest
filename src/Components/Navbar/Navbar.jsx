import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../Assets/Images/logo.svg";
import { mobilNavLinks, navLinks } from "../../Constants/constants";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../Assets/Images/Icon.svg";
import profile from "../../Assets/Images/profile.png";
import { RiCloseLine } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BOOKING_URL } from "../../Config/config.constant";
import { handleShowSearch } from "../../Redux/features/searchSlice";
import { redirect, redirectToBooking } from "../../Utils/isFavorites.util";
import { useGetSalonsQuery } from "../../Redux/services/SalonsApi";
import { useGetEmployeesQuery } from "../../Redux/services/EmployeeApi";
import { useTranslation } from "react-i18next";
import { BiLogOut } from "react-icons/bi";
import { setCredentials, logout } from "../../Redux/features/loginSlice";
import { setLoading } from "../../Redux/features/loadingSpinnerSlice";
import Language from "../Language/Language";



const Navbar = () => {
  
  const dispatch = useDispatch();
  const { isShowSearch } = useSelector((state) => state.search);
  const { t, i18n } = useTranslation();
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const { data: salons } = useGetSalonsQuery();
  const { data: employees } = useGetEmployeesQuery();
  const [activeMenu, setActiveMenu] = useState(false);
  const [stickyClass, setStickyClass] = useState("relative");
  const [isShowLoginDropdown, setIsShowLoginDropdown] = useState(false);
  const [isShowUserProfile, setIsShowUserProfile] = useState(false);
  const { data: salonsData, isLoading, refetch } = useGetSalonsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isShowRegisterDropdown, setIsShowRegisterDropdown] =
    useState(false);
  const [showAuthBtns, setShowAuthBtns] = useState(true);
  // const token = useSelector((state) => state.login.token);
  const user = localStorage.getItem("clientName");

  const { data: employeesData, refetch: refetch1 } =
    useGetEmployeesQuery();
  let accToken = localStorage.getItem("ACCESS_TOKEN");

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const showSidebarNav = () => {
    setIsOpenNavbar(true);
    if (window.innerWidth <= 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeSidebarNav = () => {
    setIsOpenNavbar(false);

    document.body.style.overflow = "auto";
  };

  const handleClick = (id) => {
    setIsShowLoginDropdown(!isShowLoginDropdown);
  };
  const handleClick2 = () => {
    setIsShowRegisterDropdown(!isShowRegisterDropdown);
  };

  const handleActiveMenu = (title) => {
    localStorage.setItem("active", title);
    setActiveMenu(title);
  };

  const stickNavbar = () => {
    if (window.scrollY > 100) {
      setStickyClass("fixed-nav");
    } else {
      setStickyClass("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (accToken) {
      setShowAuthBtns(false);
    }
  }, [accToken]);

  useEffect(() => {
    setActiveMenu(localStorage.getItem("active"));
  }, [activeMenu]);

  let concattedArr = salons?.data?.concat(employees && employees?.data);

  const searchedItems = concattedArr?.filter((item) =>
    item?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const newArr = [];
  while (searchedItems?.length) newArr.push(searchedItems?.splice(0, 5));

  const showUserProfile = () => {
    setIsShowUserProfile(!isShowUserProfile);
  };
  const logOut = () => {
    // dispatch(setLoading(true));
    dispatch(logout(navigate));
    setShowAuthBtns(true);
    window.scrollTo({ top: 0 });
    refetch(salonsData);
    refetch1(employeesData);
    // dispatch(setLoading(false));
  };
  return (
    <>
      <div className="relative">
        <div className="fixed top-0 bg-white  z-50 w-full  py-0 md:py-1">
          <div
            className={` px-0 md:px-5  w-full mx-auto md:flex border-1  justify-between md:bg-white h-0 md:h-24`}
          >
            <div className="w-full lg:w-auto flex items-center ">
              <div
                className={`flex items-center w-[100%] lg:w-auto ${stickyClass}  justify-between px-2.5 lg:px-0 py-4 md:py-0`}
              >
                <div className="cursor-pointer">
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.setItem("active", "");
                    }}
                  >
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
                <div className="flex ">
                  <div
                    className={` ${
                      showAuthBtns ? "hidden" : "block relative"
                    }`}
                    onClick={showUserProfile}
                  >
                    <img
                      className="block lg:hidden"
                      src={profile}
                      alt="profile"
                    />
                    <ul
                      className={` ${
                        isShowUserProfile ? "block md:hidden" : "hidden"
                      } bg-white px-6 absolute bottom-[-160px] rounded-lg left-[-170px] w-48 shadow  pb-10`}
                    >
                      <h3 className="text-lg font-medium capitalize border-b-[1px] border-color-[#8C8C8C] py-5">
                        {user}
                      </h3>
                      {/* <li className="mb-6">
                    <Link
                      className="text-black text-base flex items-center"
                      to="/profile"
                    >
                      <BiUser className="mr-3 text-lg" />
                      Profile
                    </Link>
                  </li>
                  <li className="mb-6">
                    <Link
                      className="text-black text-base flex items-center "
                      to="/favorites "
                    >
                      <BsHeart className="mr-3 text-lg" /> Favorites
                    </Link>
                  </li> */}
                      <li onClick={logOut}>
                        <Link
                          className="text-black text-base flex items-center"
                          to="/"
                        >
                          <BiLogOut className="mr-3 text-lg" />{" "}
                          {t("logout")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={showSidebarNav}
                    className="text-2xl lg:hidden ml-2.5"
                  >
                    <GiHamburgerMenu />
                  </button>
                </div>
              </div>
              <nav className="relative">
                <ul
                  className={`fixed top-[0] left-[0] hidden  lg:static lg:flex ml-12 xl:ml-20 mb-0
             
             `}
                >
                  {navLinks.map(({ id, title, path }) => (
                    <li
                      onClick={() => handleActiveMenu(title)}
                      key={id}
                      className="mr-8 xl:mr-10"
                    >
                      <Link
                        className={`${
                          activeMenu === title
                            ? "text-[#7338ac]"
                            : "text-black"
                        }
                      capitalize text-bs xl:text-base font-normal leading-7  text-black hover:text-primary-color`}
                        to={path}
                      >
                        {t(title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <ul className="hidden  lg:flex items-center mb-0">
              <li className="lg:mr-8 xl:mr-12">
                <button
                  className="flex items-center"
                  onClick={() => {
                    dispatch(handleShowSearch(true));
                  }}
                >
                  <FiSearch className="mr-2.5 text-[#292D32] w-6 h-6 font-normal" />
                  <span className="text-base xl:text-lg font-normal leading-7 text-black">
                    {t("search")}
                  </span>
                </button>
              </li>
              <div className="lang-selector">
                <Language />
              </div>
              <li
                onClick={() =>
                  localStorage.setItem("currentPage", "/signin")
                }
                className={` ${showAuthBtns ? "flex" : "hidden"} mr-10`}
              >
                <Link
                  to="/join-us"
                  className={`text-base xl:text-lg font-normal leading-7 text-black hover:text-primary-color`}
                >
                  {t("login")}
                </Link>
              </li>
              <li
                onClick={() =>
                  localStorage.setItem("currentPage", "/signup")
                }
                className={` ${showAuthBtns ? "flex" : "hidden"} `}
              >
                <Link
                  className="py-3 px-7 rounded-lg text-base xl:text-lg font-normal leading-7 text-white bg-primary-color hover:text-white"
                  to="/join-us"
                >
                  {t("signup")}
                </Link>
              </li>
              <li
                onClick={showUserProfile}
                className={` ${
                  showAuthBtns ? "hidden" : "block relative"
                }`}
              >
                <Link to="">
                  <img src={profile} alt="" />
                </Link>
                <ul
                  className={` ${
                    isShowUserProfile ? "block" : "hidden"
                  } bg-white px-6 absolute bottom-[-160px] rounded-lg left-[-170px] w-48 shadow  pb-10`}
                >
                  <h3 className="text-lg font-medium capitalize border-b-[1px] border-color-[#8C8C8C] py-5">
                    {user}
                  </h3>
                  {/* <li className="mb-6">
                    <Link
                      className="text-black text-base flex items-center"
                      to="/profile"
                    >
                      <BiUser className="mr-3 text-lg" />
                      Profile
                    </Link>
                  </li>
                  <li className="mb-6">
                    <Link
                      className="text-black text-base flex items-center "
                      to="/favorites "
                    >
                      <BsHeart className="mr-3 text-lg" /> Favorites
                    </Link>
                  </li> */}
                  <li onClick={logOut}>
                    <Link
                      className="text-black text-base flex items-center"
                      to="/"
                    >
                      <BiLogOut className="mr-3 text-lg" /> Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div
              className={`px-5 py-2.5 z-10 transition-all fixed top-0 lg:hidden w-full bg-white h-[100%] overflow-y-scroll ${
                isOpenNavbar ? " left-0" : "left-[-100%]"
              }
        `}
            >
              <div className="flex items-center justify-between ">
                <div>
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>

                <div>
                  <button className="text-3xl" onClick={closeSidebarNav}>
                    <RiCloseLine />
                  </button>
                </div>
              </div>
              <ul className="w-full ">
                {mobilNavLinks.map(
                  ({ id, title, path, icon, subelements }, index) => (
                    <li
                      onClick={() => {
                        handleClick(id);
                        closeSidebarNav();
                      }}
                      className="first:mt-9 mr-0 lg:mr-12"
                      key={id}
                    >
                      <Link
                        className="capitalize flex items-center mb-4 text-lg font-normal leading-7  text-black hover:text-primary-color"
                        to={path}
                      >
                        <img src={icon} alt="icon" className="mr-2.5" />
                        {t(title)}
                      </Link>
                    </li>
                  ),
                )}
                <li onClick={handleClick}>
                  <Link
                    to=""
                    className="flex  items-center mb-4 text-lg font-normal leading-7  text-black hover:text-primary-color"
                  >
                    <img src={icon} alt="" className="mr-2.5" />
                    Log in
                    {!isShowLoginDropdown ? (
                      <FaAngleDown className="flex ml-auto" />
                    ) : (
                      <FaAngleUp className="flex ml-auto" />
                    )}
                  </Link>
                  {isShowLoginDropdown && (
                    <ul className="px-7">
                      <li>
                        <Link
                          onClick={closeSidebarNav}
                          to="/signin"
                          className="text-[#8C8C8C] font-medium text-base mb-5 inline-block"
                        >
                          Customer
                        </Link>
                      </li>
                      <li onClick={closeSidebarNav}>
                        <Link
                          onClick={() =>
                            redirect("https://partner.rihand.az")
                          }
                          to="redirect"
                          className="text-[#8C8C8C] font-medium text-base mb-5 inline-block"
                        >
                          Business
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={handleClick2}>
                  <Link
                    to=""
                    className="flex  items-center mb-4 text-lg font-normal leading-7  text-black hover:text-primary-color"
                  >
                    <img src={icon} alt="" className="mr-2.5" />
                    Sign up
                    {!isShowRegisterDropdown ? (
                      <FaAngleDown className="flex ml-auto" />
                    ) : (
                      <FaAngleUp className="flex ml-auto" />
                    )}
                  </Link>
                  {isShowRegisterDropdown && (
                    <ul className="px-7">
                      <li onClick={closeSidebarNav}>
                        <Link
                          to="/signup"
                          className="text-[#8C8C8C] font-medium text-base mb-5 inline-block"
                        >
                          Customer
                        </Link>
                      </li>
                      <li onClick={closeSidebarNav}>
                        <Link
                          onClick={() =>
                            redirect("https://partner.rihand.az")
                          }
                          to="redirect"
                          className="text-[#8C8C8C] font-medium text-base mb-5 inline-block"
                        >
                          Business
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div
            className={` absolute top-0 left-0 bg-white w-[100%] h-[100vh] md:h-[450px] pt-16 px-3 md:px-28  ${
              isShowSearch ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-between items-center ">
              {/* <h4 className="font-medium text-4xl leading-10 ">Search</h4> */}
              <div className="flex items-center w-[100%] relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  className="pl-5 md:pl-0 rounded-xl md:rounded-none md:border-b  bg-[#EBEBEB]    md:bg-transparent   border-black w-[100%] outline-none text-xl md:text-4xl py-4 md:py-0 md:pb-5 placeholder:text-sm  md:placeholder:text-4xl placeholder:font-medium placeholder:text-[#8C8C8C] md:placeholder:text-black "
                  placeholder={t("search")}
                />
                <FiSearch className="block md:hidden absolute text-xl top-4 right-2.5" />
              </div>
              <button
                className="cursor-pointer ml-auto"
                onClick={() => {
                  dispatch(handleShowSearch(false));
                }}
              >
                <RiCloseLine className="text-3xl" />
              </button>
            </div>
            <div>
              {/* <h5 className="text-base md:text-2xl mt-10 mb-5">
              Categories
            </h5> */}
              <div className="flex gap-x-1 mt-10">
                {searchQuery !== "" &&
                  newArr?.map((column, index) => (
                    <ul key={index}>
                      {column.map((row) => (
                        <li
                          key={row.name}
                          className="font-normal text-base md:text-lg text-[#8C8C8C] leading-7 cursor-pointer mb-3 md:mb-3.5"
                        >
                          <Link
                            className="text-[#8C8C8C] mr-16"
                            to={`/booking/${row?.slug}`}
                            onClick={() =>
                              // navigate(`/booking/${row?.slug}`)
                              // redirectToBooking(BOOKING_URL, row?.slug)
                              dispatch(handleShowSearch(false))
                            }
                            
                          >
                            {row.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                {/* <ul> */}
                {/* {searchQuery !== "" &&
                  searchedItems?.map((item) => (
                    <li
                      className="font-normal text-base md:text-lg text-[#8C8C8C] leading-7 cursor-pointer mb-3 md:mb-3.5"
                      onClick={() => redirect(item.slug)}
                    >

                      {item.name}
                    </li>
                  ))} */}

                {/* {newArr?.map((item) => item.map((x) => <li>{x.name}</li>))}
              </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;