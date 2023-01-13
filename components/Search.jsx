import React from "react";
import {AiOutlineSearch} from "react-icons/ai"
import Dropdown from "./Dropdown";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineShieldCheck} from "react-icons/hi";
import { BiBell } from "react-icons/bi";


const Search = ({search, setSearch}) => {
  return (
    <div className='flex w-full flex-1 items-center justify-between p-5'>
      <div className='ml-6 flex items-center space-x-3 rounded-lg bg-white px-2 shadow-md '>
        <AiOutlineSearch className='text-xl text-orange-600' />
        <input
          type='text'
          className='w-full bg-transparent p-2 text-black focus:outline-none placeholder:text-gray-400 placeholder:font-semibold'
          placeholder="Search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* left side */}
      <div className='hidden items-center space-x-5 divide-x divide-dashed divide-gray-400 lg:flex'>
        <div className='flex items-center space-x-3 rounded-full p-3'>
          <HiOutlineShieldCheck className='headIcon text-xl' />
          <MdOutlineSettings className='headIcon text-xl' />
          <BiBell className='headIcon text-xl' />
        </div>

        <Dropdown />
      </div>
    </div>
  );
};

export default Search;
