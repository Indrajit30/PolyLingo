import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { AiFillCaretDown } from "react-icons/ai";
import { logout } from "../../services/operations/authAPI";
import logo1 from "../../assets/image.png";
function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);
  function signout() {
    dispatch(logout());
    navigate("/");
  }

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing sublinks result", result);
      console.log("Printing sublinks result 1", result.data.data);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  function matchRoute(route) {
    // console.log(matchPath({ path: route }, location.pathname));
    return matchPath({ path: route }, location.pathname);
  }

  // className="flex w-10/12 max-w-maxContent items-center justify-between mx-auto fixed  "
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] bg-richblack-900 border-b-richblack-700  z-[500] ">
      <div className="flex fixed w-10/12 max-w-maxContent items-center justify-between mx-auto   ">
        <Link to="/">
					{/*   {/* <img className="" src={logo} alt="Logo" width={160} height={32} loading="lazy" /> */}
					{/* <span className='text-white'>Good morning</span>  */}
          <span className="text-white flex gap-2 items-center">
            <img src={logo1} alt="" />
            <span className="text-xl"> PolyLingo</span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((elem, i) => (
              <div key={i}>
                {elem.title === "Catalog" ? (
                  <div
                    className="flex relative items-center gap-x-1 group"
                    onClick={() => console.log(subLinks)}
                  >
                    <p>{elem.title}</p>
                    <AiFillCaretDown />

                    <div
                      className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                      translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4
                      text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                      group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%]
                          translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"
                      ></div>

                      {subLinks.length ? (
                        subLinks.map((elem, i) => (
                          <Link
                            key={i}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            to={`/catalog/${elem.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <span>{elem.name}</span>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={elem?.path}>
                    <p
                      className={`${
                        matchRoute(elem?.path)
                          ? "text-blue-100"
                          : "text-richblack-25"
                      }`}
                    >
                      {elem.title}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </ul>
        </nav>

        <div className=" ml-5 flex items-center gap-x-5">
          {user && user?.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative text-richblack-5 flex items-center "
            >
              {/* <img src={ } alt="" /> */}
              <AiOutlineShoppingCart></AiOutlineShoppingCart>

              {totalItems > 0 && <span>{totalItems}</span>}
              {/* <span>{totalItems}</span> */}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button
                type="submit"
                className="bg-transparent hover:bg-gray-800 text-white py-[6px] px-5 border border-gray-400 rounded shadow"
              >
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button
                type="submit"
                className="bg-transparent hover:bg-gray-800 text-white py-[6px] px-5 border border-gray-400 rounded shadow"
              >
                Signup
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}

          {token !== null && (
            <button
              className="bg-transparent text-white py-2 px-6 border-gray-400 rounded shadow "
              onClick={signout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
