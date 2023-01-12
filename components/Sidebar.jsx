import Link from "next/link";
import React, { useState } from "react";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiCloseLine, RiPlayListLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";

// import { logo } from "../assets";

const links = [
  { name: "Home", to: "/", icon: HiOutlineHome },
  { name: "Albums", to: "/albums", icon: IoAlbumsOutline },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

const bottomlinks = [
  { name: "Recently Played", to: "/recently", icon: RiPlayListLine },
  { name: "PLayLists", to: "/playlists", icon: BsClockHistory },
];

const NavLinks = ({ handleClick }) => (
  <div className='mt-10'>
    {links.map((item) => (
      <Link
        key={item.name}
        href={item.to}
        className='my-8 flex flex-row items-center justify-start text-sm font-medium text-gray-800 hover:text-orange-600'
        onClick={() => handleClick && handleClick()}>
        <item.icon className='mr-2 h-6 w-6' />
        {item.name}
      </Link>
    ))}
  </div>
);

const BottomLinks = ({ handleClick }) => (
  <div className=''>
    {bottomlinks.map((item) => (
      <Link
        key={item.name}
        href={item.to}
        className='my-8 flex flex-row items-center justify-start text-sm font-medium text-gray-800 hover:text-orange-600'
        onClick={() => handleClick && handleClick()}>
        <item.icon className='mr-2 h-6 w-6' />
        {item.name}
      </Link>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='hidden w-[240px] flex-col bg-[#ffffff] py-10 px-4 shadow-lg md:flex '>
        <div className="flex items-center justify-start">
          <img
            src='/images/SpotifyLogo.png'
            alt='logo'
            className='h-14 object-contain'
          />
          <h2 className='font-bold text-xl'>Muzique</h2>
        </div>
        <NavLinks />
        <div className='flex flex-col '>
          <h2 className='font-bold text-gray-500'>MY MUSIC</h2>
          <BottomLinks />
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className='absolute top-6 right-3 block md:hidden'>
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className='mr-2 h-6 w-6 text-white'
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className='mr-2 h-6 w-6 text-white'
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`smooth-transition absolute top-0 z-10 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#b5b5b7] p-6 backdrop-blur-lg md:hidden ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        <h2 className='font-bold text-gray-500'>MY MUSIC</h2>
        <BottomLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
