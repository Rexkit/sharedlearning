import * as React from "react";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { USER_FILES_QUERY } from "../../utils/queries";
import { userFilesQuery } from "../../utils/types/userFilesQuery";
import dynamic from 'next/dynamic';

const PlayerWithNoSSR = dynamic(() => import('../../components/AudioPlayer'), {
  ssr: false,
})

type SPPType = {
    authState: boolean,
    togglePreviewMode: () => void
}

const SinglePagePreview = ({ authState, togglePreviewMode }: SPPType) => {
    const router = useRouter();
    const { id: page_id } = router.query;
    let videoList = [], audioList = [];
    const baseStorageURL = 'http://localhost:3001';

    const [shouldSkip, setShouldSkip] = React.useState(true)

    const { loading, data, refetch } = useQuery<userFilesQuery>(USER_FILES_QUERY, {
        variables: { pageid: page_id },
        skip: shouldSkip
    });

    React.useEffect(() => {
        if (page_id) {
          setShouldSkip(false)
        }
    }, [page_id]);

    if (data) {
        data.files.forEach(file => {
            if (file.type === 'video')
                videoList.push(file);
            else
                audioList.push({
                    name: file.filename.substring(file.filename.indexOf('-') + 1).split('.').slice(0, -1).join('.'),
                    musicSrc: `${baseStorageURL}/files/${file.page_id}/${file.filename}`,
                });
        });
        console.log(videoList);
        console.log(audioList);
    }

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
            <PlayerWithNoSSR audioList={audioList} />
        </section>
    )
}

export default SinglePagePreview;