import React from 'react';
import { DefaultLayout } from "../../layouts/Default";
import DefaultHeader from  "../../features/DefaultHeader";
import DefaultFooter from "../../features/DefaultFooter";
import SinglePagePreview from '../../features/singlePage/SinglePagePreview';
import SinglePageEditor from '../../features/singlePage/SinglePageEditor';
import { useAuth } from "../../utils/hooks/useAuth";

const singlePage = () => {
    const { user } = useAuth();
    const [previewMode, setPreviewMode] = React.useState(user.me? false : true);

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    }

    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={previewMode ?
                <SinglePagePreview authState={user.me? true : false} togglePreviewMode={togglePreviewMode} />:
                <SinglePageEditor togglePreviewMode={togglePreviewMode} />}
            footer={<DefaultFooter />}
        />
    )
}

export default singlePage;