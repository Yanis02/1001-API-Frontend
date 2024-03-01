"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showDiv, setShowDiv] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        if (showDiv) setShowDiv(false);
      } else {
        if (!showDiv) setShowDiv(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  const navLinks = [
    {
      Link: "/",
      name: "Categories",
    },
    {
      Link: "/",
      name: "Services",
    },
    {
      Link: "/",
      name: "APIs",
    },
  ];

  return (
    <>
      {(showDiv || open) && (
        <nav
          className={`fixed  z-50 w-full bg-white transition-all shadow-md  duration-300  top-0`}
        >
          <div
            className={`px-4 py-10 h-20   hidden items-center justify-around xl:flex w-full`}
          >
            <Link href="/">
              <p className="  text-primary text-3xl font-extrabold ">
                1<span className="text-secondary">00</span>1 API
              </p>
            </Link>
            <div className={`flex    items-center gap-10`}>
              <div className={`flex    items-center gap-10 font-medium`}>
                {navLinks.map((link) => (
                  <Link href={link.Link}>
                    <p className={` primary-gradient `}>{link.name}</p>
                  </Link>
                ))}
              </div>
              <Link href="/auth/login/">
                <Button
                  variant={"outline"}
                  className={`  text-primary font-medium `}
                >
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  className={`transition-all font-medium duration-300 bg-primary bg-opacity-0 hover:bg-opacity-100 hover:text-white border-primary border-[1px]     rounded-md px-6 py-2`}
                >
                  S'inscrire
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <div
            className={`  xl:hidden  relative flex w-full h-20  items-center justify-between px-6`}
          >
            <Link href="/">
              <p className="  text-primary text-3xl font-extrabold ">
                1<span className="text-secondary">00</span>1 API
              </p>
            </Link>
            <div className={`flex  items-center gap-8`}>
              <ThemeToggle />
              {open ? (
                <ImCancelCircle
                  onClick={toggleMenu}
                  size={25}
                  className="font-semibold cursor-pointer"
                />
              ) : (
                <RiMenuFoldLine
                  onClick={toggleMenu}
                  size={25}
                  className="font-semibold cursor-pointer"
                />
              )}
            </div>
            <div
              className={` absolute gap-6 py-10 transition-all duration-300 top-20  bg-white w-full min-h-screen h-10 overflow-auto left-0 ${
                open ? "flex  flex-col " : "translate-x-full"
              } `}
            >
              <div
                className={`flex  px-8   flex-col text-xl justify-around gap-4  font-semibold`}
              >
                {navLinks.map((link) => (
                  <Link onClick={toggleMenu} href={link.Link}>
                    <p className={` primary-gradient `}>{link.name}</p>
                  </Link>
                ))}
              </div>
              <div className="flex  my-4 gap-4 items-center justify-center">
                <Link onClick={toggleMenu} href="/auth/login/">
                  <Button
                    variant={"outline"}
                    className={`  text-primary font-semibold `}
                  >
                    Se connecter
                  </Button>
                </Link>
                <Link onClick={toggleMenu} href="/auth/register">
                  <Button
                    className={`transition-all font-semibold duration-300 bg-primary bg-opacity-0 hover:bg-opacity-100 hover:text-white border-primary border-[1px]     rounded-md px-6 py-2`}
                  >
                    S'inscrire
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
