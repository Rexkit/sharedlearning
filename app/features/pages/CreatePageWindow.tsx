import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useMutation } from '@apollo/client';
import { CREATE_PAGE_QUERY } from "../../utils/queries";
import { createPage, createPageVariables } from "../../utils/types/createPage";

type Props = {
    isOpenProp: boolean,
    closeModalProp: () => {}
}

const CreatePageWindow = ({ isOpenProp, closeModalProp }) => {
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [error, setError] = React.useState<{message:string}|null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(isOpenProp);

    const [createPage, result] = useMutation<createPage, createPageVariables>(CREATE_PAGE_QUERY, {
        onError: error => {
            setError(error);
        }
    });

    React.useEffect(() => {
        if ( result.data ) {
            console.log(result.data);
        }
    }, [result.data])

    React.useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false)
        closeModalProp();
    }

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createPage({variables: { name, description}});
        setName('');
        setDescription('');

        closeModal();
    }

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 cursor-pointer" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 border-gray-600 shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Create a page
                            </Dialog.Title>
                            <div className="mt-2">
                                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submit}>
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="name" className="sr-only">
                                                Page title
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-200 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Title"
                                                value={name}
                                                maxLength={40}
                                                onChange={({ target }) => setName(target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="sr-only">
                                                Page description
                                            </label>
                                            <input
                                                id="description"
                                                name="description"
                                                type="text"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-200 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Description"
                                                value={description}
                                                maxLength={200}
                                                onChange={({ target }) => setDescription(target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CreatePageWindow;