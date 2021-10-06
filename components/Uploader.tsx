import * as React from "react";
import Dropzone from 'react-dropzone-uploader-with-credentials';
import { useAuth } from "../utils/hooks/useAuth";
import configData from "../config";

type UploaderProps = {
    page_id: string | string[],
    refetch: () => void
}

const Uploader = ({ page_id, refetch }: UploaderProps) => {
    const { user } = useAuth();
    
    // specify upload params and url for your files
    {/*// @ts-ignore */}
    const getUploadParams = ({ meta }) => { return { url: `${configData.U_SERVER_URL}/${user.me.id}/${page_id}`, headers: {withCredentials: true}} };

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
                /*// @ts-ignore */
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
