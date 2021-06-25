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
        <li x-for="item in items" key={file.filename}>
            <a className="flex justify-between h-full hover:bg-indigo-500 group rounded-lg p-4 border dark:bg-gray-800 dark:hover:bg-indigo-500 border-gray-200 dark:border-gray-800  hover:border-transparent hover:shadow-lg ">
                <dl className="flex items-center">
                    <div>
                        <dt className="sr-only">Filename</dt>
                        <dd className="group-hover:text-white leading-6 font-medium text-gray-900 dark:text-gray-200">
                            {file.filename.substring(file.filename.indexOf('-') + 1)}
                        </dd>
                    </div>
                </dl>
                <button onClick={() => fdel(file.id)} mat-icon-button="" className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">X</button>
            </a>
        </li>
    )
}

export default FileItem;