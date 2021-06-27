import * as React from "react";
import { useRouter } from 'next/router';

type SPPType = {
    authState: boolean,
    togglePreviewMode: () => void
}

const SinglePagePreview = ({ authState, togglePreviewMode }: SPPType) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <section className="container px-5 py-6 mx-auto space-y-4">
            {authState?
                <>
                    <header className="flex items-center justify-center">
                        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Page</h2>
                        <a onClick={togglePreviewMode} className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Edit
                        </a>
                    </header>
                </>: null}
        </section>
    )
}

export default SinglePagePreview;