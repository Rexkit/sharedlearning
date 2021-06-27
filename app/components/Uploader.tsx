import * as React from "react";
import Dropzone from 'react-dropzone-uploader-with-credentials';

type UploaderProps = {
    user_id: string,
    page_id: string | string[],
    refetch: () => void
}

const Uploader = ({ user_id, page_id, refetch }: UploaderProps) => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: `http://localhost:3001/${user_id}/${page_id}`, headers: {withCredentials: true}} };

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { 
        console.log(status, meta, file);
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
        refetch();
    }

    return (
        <>
            <header className="flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Upload your files</h2>
            </header>
            <Dropzone
                addClassNames={{
                    dropzone: "overflow-hidden",
                    preview: "dark:text-gray-200"
                }}
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="audio/*,video/*"
                submitButtonContent={'Display'}
            />
        </>
    )
}

export default Uploader;
