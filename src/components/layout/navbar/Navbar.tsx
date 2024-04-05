import { NavLink, useNavigate } from "react-router-dom";
import {
  AllRecipesDropDownLinks,
  Logo,
  HamburgerMenu,
  UserProfileMenuDropDown,
  SearchBar,
} from ".";
import { ModeToggle } from "@/context/theme";
import { ShoppingBasket, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllCartData } from "@/redux/cartSlice";
import { useState } from "react";
import { getIsAuthenticated, signOut } from "@/redux/userAuthenticatedSlice";
import { usePost as useSignOut } from "@/hooks";

export const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const cartLength = useAppSelector(getAllCartData)?.length;
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    error: signOutError,
    isError: isSignOutError,
    mutate: signOutMutation,
  } = useSignOut("http://localhost:5000/user/signout");

  if (isSignOutError) console.log(signOutError?.message);

  const handleSignOut = () => {
    signOutMutation(undefined);
    dispatch(signOut());
    navigate("/");
  };

  return (
    <>
      <header className="text-lg z-[10001]">
        <nav className="flex items-center justify-between px-3 py-4 shadow-lg dark:on-dark-shadow">
          <Logo />
          <div className="flex items-center gap-5">
            <NavLink to="/" end className=" max-[820px]:hidden">
              <li>Home</li>
            </NavLink>
            <div className="dropDownLinksMediaQuery">
              <AllRecipesDropDownLinks />
            </div>
            <NavLink to="/shop">
              <li> Shop</li>
            </NavLink>
          </div>

          <div className="flex gap-5 cursor-pointer">
            <Search onClick={() => setShowSearchBar((prev) => !prev)} />
          </div>

          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <li className="cursor-pointer" onClick={handleSignOut}>
                Sign Out
              </li>
            ) : (
              <NavLink to="/signin" className="max-[820px]:hidden">
                <li> Sign In</li>
              </NavLink>
            )}

            <div className="max-[550px]:hidden">
              {isAuthenticated && <UserProfileMenuDropDown />}
            </div>
            <NavLink to="all-menus/cart">
              <li className="relative">
                <ShoppingBasket className="w-7 h-7" />
                {cartLength > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-white rounded-full border-1 -top-3 -end-4 dark:border-gray-900">
                    {cartLength}
                  </div>
                )}
              </li>
            </NavLink>
          </div>

          <div className="max-[550px]:hidden">
            <ModeToggle />
          </div>
          <div className="hidden max-[1000px]:flex">
            <HamburgerMenu />
          </div>

          <div className="flex items-center gap-5 max-[1000px]:hidden">
            <NavLink to="all-menus/about-us">
              <li> About Us</li>
            </NavLink>
            <NavLink to="all-menus/contact-us">
              <li>Contact Us</li>
            </NavLink>
          </div>
        </nav>
        {showSearchBar && <SearchBar setShowSearchBar={setShowSearchBar} />}
      </header>
      {/* create space beneath search bar */}
      {showSearchBar && (
        <div className="w-full h-28 top-28  mb-6 z-[10001] "></div>
      )}
      {!showSearchBar && <div className="w-full h-20 top-28  z-[10001] "></div>}
    </>
  );
};
