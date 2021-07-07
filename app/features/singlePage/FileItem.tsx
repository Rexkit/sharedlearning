import * as React from "react";
import Link from 'next/link';

type ItemProps = {
    file: {
        id: string,
        filename: string,
        type: string,
        user_id: string,
        page_id: string
    },
    fdel: (id: string) => void
}

const FileItem = ({ file, fdel }: ItemProps) => {
    return (
        <li x-for="item in items" key={file.filename} className='relative'>
            <a className="flex justify-between h-full group rounded-lg p-4 border dark:bg-gray-800 border-gray-200">
                <dl className="flex items-center">
                    <div>
                        <dt className="sr-only">Filename</dt>
                        <dd className="leading-6 font-medium text-gray-900 dark:text-gray-200">
                            {file.filename.substring(file.filename.indexOf('-') + 1)}
                        </dd>
                    </div>
                </dl>
                {/* <button onClick={() => fdel(file.id)} mat-icon-button="" className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">X</button> */}
                <button onClick={() => fdel(file.id)}
                    className="absolute -top-2 -right-2 p-0 w-7 h-7 bg-red-600 rounded-full hover:bg-red-800 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
                        <line x1="15" y1="15" x2="25" y2="25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>
                        <line x1="25" y1="15" x2="15" y2="25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>    
                        <circle className="circle" cx="20" cy="20" r="19" opacity="0" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10" fill="none"></circle>
                    </svg>
                </button>
            </a>
        </li>
    )
}

export default FileItem;