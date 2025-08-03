'use client';
import Link from 'next/link';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import ThemeToggler from './ThemeToggler';

const Header = ({ sidebarOpen, setSidebarOpen, authStatus }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-bodybg drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div
        className={`flex flex-grow items-center justify-between px-4 py-2 h-16 shadow-2 md:px-6 2xl:px-11 ${
          authStatus === 'authenticated' ? 'md:justify-end' : ''
        }`}>
        {authStatus === 'authenticated' ? (
          <div className="flex items-center gap-2 sm:gap-4 md:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark md:hidden">
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && '!w-full delay-300'
                    }`}></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && 'delay-400 !w-full'
                    }`}></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && '!w-full delay-500'
                    }`}></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && '!h-0 !delay-[0]'
                    }`}></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && '!h-0 !delay-200'
                    }`}></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}

            <Link className="block flex-shrink-0 md:hidden" href="/">
              <Image
                width={32}
                height={32}
                src={'/images/logo/logo-icon.svg'}
                alt="Logo"
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 -mt-2">
            <div className="dark:hidden">
              {/* <Link href="/">
                <Image
                  width={154}
                  height={28}
                  src={'/images/logo/logo-original.svg'}
                  alt="Logo"
                />
              </Link> */}
            </div>
            <div className="hidden dark:block">
              {/* <Link href="/">
                <Image
                  width={176}
                  height={32}
                  src={'/images/logo/logo-dark.svg'}
                  alt="Logo"
                />
              </Link> */}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-2">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeToggler />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* {authStatus === 'authenticated' && <DropdownNotification />} */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          {authStatus === 'authenticated' && <DropdownUser />}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
