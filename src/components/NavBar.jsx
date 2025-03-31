import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const filteredPathnames = pathnames.slice(1);

  const nameUser = localStorage.getItem("user");
  const profileUser = localStorage.getItem("profile_image_url");

  return (
    <div className="flex justify-between items-center bg-white text-black h-16 pl-8 pr-8">
      <ol className="list-reset flex text-black">
        {filteredPathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 2).join("/")}`;
          return (
            <li key={routeTo} className="flex items-center">
              {index > 0 && <div className="px-2.5">/</div>}
              <Link
                className="text-primary font-medium transition-opacity hover:opacity-80"
                to={routeTo}
              >
                {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="account flex items-center space-x-4">
        <img
          src={profileUser}
          alt="User  profile"
          className="h-9 w-9 rounded-full"
        />
        <div className="details">
          <p className="font-semibold text-black">{nameUser}</p>
          <p className="text-sm text-black">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
