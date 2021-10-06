import * as React from "react";
import Link from 'next/link';

type ItemProps = {
    name: string,
    description: string,
    id: string,
    pdel: (id: string) => void
}

const PageItem = ({ name, description, id, pdel }: ItemProps) => {
    return (
        <li x-for="item in items" key={id} className='relative'>
            <Link href={`/pages/${id}`}>
                <a className="h-full hover:bg-indigo-500 group block rounded-lg p-4 border dark:bg-gray-800 dark:hover:bg-indigo-500 border-gray-200 dark:border-gray-800 hover:border-transparent hover:shadow-lg transition ease-in duration-200">
                    <dl className="block items-center">
                        <div>
                            <dt className="sr-only">Title</dt>
                            <dd className="group-hover:text-white leading-6 font-medium text-gray-900 dark:text-gray-200">
                            {name}
                            </dd>
                        </div>
                        <div>
                            <dt className="sr-only">Description</dt>
                            <dd className="group-hover:text-indigo-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                            {description}
                            </dd>
                        </div>
                    </dl>
                </a>
            </Link>
            <button onClick={() => pdel(id)}
                className="absolute -top-2 -right-2 p-0 w-7 h-7 bg-red-600 rounded-full hover:bg-red-800 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
                    <line x1="15" y1="15" x2="25" y2="25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>
                    <line x1="25" y1="15" x2="15" y2="25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>    
                    <circle className="circle" cx="20" cy="20" r="19" opacity="0" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10" fill="none"></circle>
                </svg>
            </button>
        </li>
    )
}

export default PageItem;