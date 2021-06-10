import * as React from "react";
import { Dialog } from '@headlessui/react';
import { useMutation } from '@apollo/client';
import { CREATE_PAGE_QUERY } from "../../utils/queries";
import { createPage, createPageVariables } from "../../utils/types/createPage";

const CreatePageWindow = () => {
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [error, setError] = React.useState<{message:string}|null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(true);

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

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Overlay />

            <Dialog.Title>Create Page</Dialog.Title>
            <Dialog.Description>
                Here you can create a new page
            </Dialog.Description>

            

            <button onClick={() => setIsOpen(false)}>Create</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog>
    )
}

export default CreatePageWindow;