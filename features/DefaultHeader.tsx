import * as React from "react";
import Link from 'next/link';
import { Popover, Transition } from "@headlessui/react";
import { AcademicCapIcon, MenuIcon, XIcon} from "@heroicons/react/outline";
import { ThemeChanger } from "../components/ThemeChanger";
import { useAuth } from "../utils/hooks/useAuth";

type HeaderProps = {
    sharedMode?: boolean
}

export default function DefaultHeader({ sharedMode = false }: HeaderProps) {
    const { user, logout } = useAuth();

    return (
        <Popover className="relative dark:bg-gray-900">
            {({ open }) => (
                <>
                <div className="container px-5 mx-auto">
                    <div className="flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-800 py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start">
                            <a href="/">
                                <span className="sr-only">SharedLearning</span>
                                <AcademicCapIcon
                                    className="mx-auto h-12 w-auto text-indigo-600"
                                    aria-hidden="true"
                                />
                            </a>
                        </div>

                        {!sharedMode && 
                            <div className="md:hidden order-last">
                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>}

                        {!sharedMode && user.me ? 
                            <nav className="hidden md:flex space-x-10">
                                <Link href="/pages">
                                    <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
                                        Pages
                                    </a>
                                </Link>
                            </nav>: null}

                        <div className="flex items-center justify-end md:flex-1 lg:w-0">
                            <div className="md:mr-8">
                                <ThemeChanger />
                            </div>
                            {!sharedMode ? user.me ? 
                                <div className="hidden md:flex items-center">
                                    <Link href="/login">
                                        <a onClick={() => logout()} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
                                            Logout
                                        </a>
                                    </Link>
                                </div>:
                                <div className="hidden md:flex items-center">
                                    <Link href="/login">
                                        <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
                                            Sign in
                                        </a>
                                    </Link>
                                    
                                    <Link href="/signup">
                                        <a href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                            Sign up
                                        </a>
                                    </Link>
                                </div>
                            : null}
                        </div>
                    </div>
                </div>

                <Transition
                    show={open}
                    as={React.Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel focus static className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50 dark:divide-gray-700">
                            <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <AcademicCapIcon
                                        className="mx-auto h-12 w-auto text-indigo-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center dark:bg-gray-800 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-100">
                                    Pages
                                </a>
                            </div>
                            <div>
                                <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                    Sign up
                                </a>
                                <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-200 dark:hover:text-gray-100">
                                    Existing user?{" "}
                                    <a href="#" className="text-indigo-500 hover:text-indigo-400">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
                </>
            )}
        </Popover>
    );
}
