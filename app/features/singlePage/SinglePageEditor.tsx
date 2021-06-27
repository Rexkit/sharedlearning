import * as React from "react";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import FileList from './FileList';
import Uploader from '../../components/Uploader';
import MarkdownEditor from "../../components/MarkdownEditor";
import { useAuth } from "../../utils/hooks/useAuth";

import { USER_FILES_QUERY } from "../../utils/queries";
import { userFilesQuery } from "../../utils/types/userFilesQuery";

type SPType = {
    togglePreviewMode: () => void
}

const SinglePageEditor = ({ togglePreviewMode }: SPType) => {
    const router = useRouter();
    const { id: page_id } = router.query;

    const [shouldSkip, setShouldSkip] = React.useState(true)
    const { user } = useAuth();

    const { loading, data, refetch } = useQuery<userFilesQuery>(USER_FILES_QUERY, {
        variables: { pageid: page_id },
        skip: shouldSkip
    });

    React.useEffect(() => {
        if (page_id) {
          setShouldSkip(false)
        }
    }, [page_id]);

    let videoList = [], audioList = [];

    if (data) {
        data.files.forEach(file => {
            if (file.type === 'video')
                videoList.push(file);
            else
                audioList.push(file);
        });
    }

    return (
        <section className="container px-5 py-6 mx-auto space-y-4">
            <header className="flex items-center justify-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Add content to the page</h2>
                <a onClick={togglePreviewMode} className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Preview
                </a>
            </header>

            <MarkdownEditor />

            {audioList.length > 0 ?
                <FileList files={audioList} type='Audio' refetch={() => refetch()} />
            :null}

            {videoList.length > 0 ?
                <FileList files={videoList} type='Video' refetch={() => refetch()} />
            :null}

            <Uploader user_id={user.me.id} page_id={page_id} refetch={() => refetch()} />
        </section>
    )
}

export default SinglePageEditor;