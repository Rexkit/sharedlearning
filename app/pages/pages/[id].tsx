import React from 'react';
import { DefaultLayout } from "../../layouts/Default";
import DefaultHeader from  "../../features/DefaultHeader";
import DefaultFooter from "../../features/DefaultFooter";
import SinglePagePreview from '../../features/singlePage/SinglePagePreview';
import SinglePageEditor from '../../features/singlePage/SinglePageEditor';
import { useAuth } from "../../utils/hooks/useAuth";

const singlePage = () => {
    const { user } = useAuth();

    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={user.me ? <SinglePageEditor /> : <SinglePagePreview />}
            footer={<DefaultFooter />}
        />
    )
}

export default singlePage;