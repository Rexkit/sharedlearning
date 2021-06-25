import * as React from "react";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import FileList from './FileList';
import Uploader from '../../components/Uploader';
import { useAuth } from "../../utils/hooks/useAuth";

import { USER_FILES_QUERY } from "../../utils/queries";
import { userFilesQuery } from "../../utils/types/userFilesQuery";

const SinglePageEditor = () => {
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
            {audioList.length > 0 || videoList.length > 0 ? 
                <>
                    <FileList files={audioList} type='Audio' refetch={() => refetch()} />
                    <FileList files={videoList} type='Video' refetch={() => refetch()} />
                </>
            :null}

            <Uploader user_id={user.me.id} page_id={page_id} refetch={() => refetch()} />
        </section>
    )
}

export default SinglePageEditor;