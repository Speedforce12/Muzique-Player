import { Popover } from "@headlessui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTrash } from "react-icons/bi"

const PopUPMenu = () => {
  return (
    <div>
      <Popover className='relative flex justify-end'>
        <Popover.Button className='cursor-pointer rounded-full p-1 text-white'>
          <BsThreeDotsVertical size={25} />
        </Popover.Button>
        <Popover.Panel className='absolute -right-5 top-8 z-10 w-32 rounded-lg bg-gray-800'>
          <div className='flex items-center flex-col p-3'>
            <div className='flex items-center'>
              <AiOutlineHeart className='text-2xl text-white' />

              <button
                // onClick={() => dispatch(getUserData(emp._id))}
                className='cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-indigo-500 hover:bg-gray-200'>
                More Info
              </button>
            </div>
            <div className='flex items-center'>
              <BiTrash className='text-2xl text-white' />
              <button
                // onClick={() => handleDelete({ emp })}
                className='cursor-pointer ml-5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-indigo-500 hover:bg-gray-200'>
                Delete
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default PopUPMenu;
