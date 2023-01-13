import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiChevronDown, BiLogOutCircle } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";

const Dropdown = () => {
  const { data: session } = useSession();

  return (
    <Menu as='div' className='relative flex items-center'>
      <Menu.Button className='mx-8 flex h-12 w-[95px] items-center justify-center rounded-full border  bg-opacity-20 text-sm font-medium text-white'>
        <BiChevronDown
          className='mr-10 text-2xl text-white'
          aria-hidden='true'
        />
        <div className='absolute right-3 flex  items-center justify-center rounded-full border border-inherit'>
          <img
            src={session ? session.user.image : "/images/avatar.jpg"}
            alt=''
            className='h-14 w-14  rounded-full '
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute top-14 right-3 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg  bg-[#333131] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className={`${
                    active ? "bg-gray-500/25 text-white" : "text-white"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  <BiLogOutCircle className='text-2xl' /> Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
