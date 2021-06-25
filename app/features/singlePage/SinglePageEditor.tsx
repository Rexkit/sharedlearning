import * as React from "react";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Dropzone from 'react-dropzone';
import FileList from './FileList';

import { USER_FILES_QUERY } from "../../utils/queries";
import { userFilesQuery } from "../../utils/types/userFilesQuery";

const SinglePageEditor = () => {
    const router = useRouter();
    const { id: page_id } = router.query;

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

    let videoList = [], audioList = [];

    const onDrop = React.useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    if (loading) {
        return <p>Loading</p>
    }

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
            
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        </section>
    )
}

export default SinglePageEditor;