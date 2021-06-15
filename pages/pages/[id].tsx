import React from 'react';
import { DefaultLayout } from "../../layouts/Default";
import DefaultHeader from  "../../features/DefaultHeader";
import DefaultFooter from "../../features/DefaultFooter";
import SinglePageContent from '../../features/singlePage/SinglePageContent';

const singlePage = () => {
    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={<SinglePageContent />}
            footer={<DefaultFooter />}
        />
    )
}

export default singlePage;