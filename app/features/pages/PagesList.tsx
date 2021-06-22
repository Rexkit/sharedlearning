import * as React from "react";
import { useQuery } from '@apollo/client';
import { USER_PAGES_QUERY } from "../../utils/queries";
import { userPagesQuery } from "../../utils/types/userPagesQuery";
import PageItem from "./PageItem"
import CreatePageWindow from "./CreatePageWindow";

const PagesList = () => {
    const { loading, data, refetch } = useQuery<userPagesQuery>(USER_PAGES_QUERY);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    if (loading) {
        return <p>Loading</p>
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        refetch();
    }

    return (
        <section className="container px-5 py-6 mx-auto space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Pages</h2>
                <button onClick={openModal} className="hover:bg-indigo-200 hover:text-indigo-800 group flex items-center rounded-md bg-indigo-100 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-indigo-600 dark:text-white text-sm font-medium px-4 py-2">
                    <svg className="text-indigo-500 dark:text-white mr-2" width="12" height="20" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                    </svg>
                    New
                </button>
            </header>
            <form className="relative">
                <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                </svg>
                <input className="focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border dark:bg-gray-800 border-gray-200 dark:border-gray-800 dark:text-gray-200 rounded-md py-2 pl-10" type="text" aria-label="Filter pages" placeholder="Filter pages" />
            </form>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.pages.map(item => (
                    <PageItem name={item.name} description={item.description} id={item.id} />
                ))}
                <li className="hover:shadow-lg flex rounded-lg cursor-pointer" key={-1}>
                    <a onClick={openModal} className="hover:border-transparent dark:hover:border-indigo-500 hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
                        New Project
                    </a>
                </li>
            </ul>
            <CreatePageWindow isOpenProp={isModalOpen} closeModalProp={closeModal} />
        </section>
    );
}

export default PagesList;