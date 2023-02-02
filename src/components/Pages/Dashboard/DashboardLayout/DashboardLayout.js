import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { FaBloggerB } from "react-icons/fa";
import Navbar from "../../../SharedPage/Navbar/Navbar";
import Footer from "../../../SharedPage/Footer/Footer";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const menus = [
    { name: "All User", link: "/dashboard/users", icon: AiOutlineUser },
    { name: "Add Blogs", link: "/dashboard/addBlog", icon: FaBloggerB },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full">
      <Navbar></Navbar>
    <section className="flex md:w-4/5 lg:w-full w-4/5">
      <div
        className={`bg-violet-500 min-h-screen ${
          open ? "md:w-72 lg:w-72 w-12" : "lg:w-72 md:w-72 w-12"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end ">
          <HiMenuAlt3
            size={32}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:text-orange-500 transition-colors rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-xl ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              
            </Link>
          ))}
        </div>
      </div>
      <div className="text-xl w-full  text-gray-900 font-semibold border-violet-200" >
        <Outlet></Outlet>
      </div>
    </section>
    <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;