import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from 'next-themes';
import { useMutation, useQuery } from '@apollo/client';
import Dante, { darkTheme, defaultTheme, defaultPlugins } from 'dante3';
import { initialContent } from "../utils/initialTextEditorContent";
import { SET_PAGE_TEXT_CONTENT, PAGE_TEXT_CONTENT } from "../utils/queries";
import { setPageTextContent, setPageTextContentVariables } from "../utils/types/setPageTextContent";
import { pageTextContent } from "../utils/types/pageTextContent";
import { Notification } from "./Notification";
 
const DanteEditor = dynamic(
    () => import('dante3'),
    { ssr: false }
)

type editorProps = {
    page_id: string,
    previewMode?: boolean
}

const TextEditor = ({ previewMode = false, page_id }: editorProps) => {
    const {theme} = useTheme();
    const [error, setError] = React.useState<{message:string}|null>(null);
    const [editorState, setEditorState] = React.useState<JSON>(null);
    const [readOnly, setreadOnly] = React.useState(false);
    const [textUpdated, setTextUpdated] = React.useState(false);

    const [updateTextContent, result] = useMutation<setPageTextContent, setPageTextContentVariables>(SET_PAGE_TEXT_CONTENT, {
        onError: error => {
            setError(error);
        }
    });

    const { loading, data, refetch } = useQuery<pageTextContent>(PAGE_TEXT_CONTENT, {
        variables: { pageid: page_id }
    });

    React.useEffect(() => {
        if(loading === false && data){
            if (data.pageTextContent.length === 0) {
                if (!previewMode) {
                    setEditorState(initialContent.default);
                }
            } else {
                const textData = data.pageTextContent[0].data;
                setEditorState(textData);
            }
        }
    }, [ loading, data ]);

    React.useEffect(() => {
        setreadOnly(previewMode);
        if (data && data.pageTextContent.length === 0) {
            if (previewMode) {
                setEditorState(null);
            } else {
                setEditorState(initialContent.default);
            }
        }
    }, [previewMode])

    const onContentChange = (editor) => {
        setEditorState(editor.getJSON());
    }

    const onSave = async () => {
        const content = editorState;
        await updateTextContent({variables: { pageid: page_id, content }});
        setTextUpdated(true);
        refetch();
    }

    return (
        <>
            {textUpdated ? <Notification heading='Notification' text="Text updated!" state={true} callback={() => setTextUpdated(false)} /> : null}
            <div className="container px-5 mx-auto pb-5">
                {/*// @ts-ignore */}
                {editorState && readOnly && <DanteEditor widgets={[]} theme={theme === 'dark' ? darkTheme : defaultTheme} readOnly={true} content={editorState} onUpdate={onContentChange} />} // @ts-ignore 
                {/*// @ts-ignore */}
                {editorState && !readOnly && <DanteEditor widgets={[]} theme={theme === 'dark' ? darkTheme : defaultTheme} readOnly={false} content={editorState} onUpdate={onContentChange} />} // @ts-ignore
                {!previewMode &&
                    <a onClick={onSave} className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                    </a>}
            </div>
        </>
    )
}

export default TextEditor;
