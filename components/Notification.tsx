import * as React from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';

type Props = {
    heading: string,
    text: string,
    state: boolean,
    duration?: number,
    callback?: () => void
}

export const Notification = ({ heading, text, state, duration = 4000, callback }: Props) => {
    const [show, setShow] = React.useState(true);

    const setTimer = () => {
        setTimeout(() => {
            setShow(false);
            callback();
        }, duration - 150 - 75);
    }

    return (
        <Transition
            appear={true}
            show={show}
            unmount={true}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterEnter={setTimer}
        >
            <div className="fixed z-100 bottom-8 right-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg border-gray-200 dark:border-gray-800 border p-3 shadow-lg">
                <div className="flex flex-row">
                    <div className="px-2">
                        {state ? 
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />:
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                        }
                    </div>
                    <div className="ml-2 mr-6">
                    <span className="font-semibold">{heading}</span>
                    <span className="block text-gray-500 dark:text-gray-400">{text}</span>
                    </div>
                </div>
                </div>
            </div>
        </Transition>
    )
}
