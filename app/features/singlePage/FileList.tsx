import * as React from "react";
import FileItem from './FileItem';
import axios from 'axios';
import configData from "../../config.json";

type listProps = {
    files: Array<{
        id: string,
        filename: string,
        type: string,
        user_id: string,
        page_id: string
    }>,
    type: string,
    refetch: () => void,
    page_id: string | string[]
}

const FileList = ({ files, type, refetch, page_id }: listProps) => {

    const deleteItem = async (id: string) => {
        try {
            const response = await axios.delete(`${configData.U_SERVER_URL}/${page_id}/${id}`, {withCredentials: true});
            refetch();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header className="flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">{type} Files</h2>
            </header>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map(file => (
                    <FileItem file={file} key={file.filename} fdel={(id: string) => deleteItem(id)} />
                ))}
            </ul>
        </>
    );
}

export default FileList;