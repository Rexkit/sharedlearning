import * as React from "react";
import Link from 'next/link';

type ItemProps = {
    name: string,
    description: string,
    id: number
}

const PageItem = ({ name, description, id}) => {
    return (
        <li x-for="item in items" key={id}>
            <Link href={`/pages/${id}`}>
                <a className="h-full hover:bg-indigo-500 group block rounded-lg p-4 border dark:bg-gray-800 dark:hover:bg-indigo-500 border-gray-200 dark:border-gray-800  hover:border-transparent hover:shadow-lg ">
                    <dl className="block items-center">
                        <div>
                            <dt className="sr-only">Title</dt>
                            <dd className="group-hover:text-white leading-6 font-medium text-gray-900 dark:text-gray-200">
                            {name} Title
                            </dd>
                        </div>
                        <div>
                            <dt className="sr-only">Description</dt>
                            <dd className="group-hover:text-indigo-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                            {description} Description
                            </dd>
                        </div>
                    </dl>
                </a>
            </Link>
        </li>
    )
}

export default PageItem;