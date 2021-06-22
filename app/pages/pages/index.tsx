import * as React from "react";
import { DefaultLayout } from "../../layouts/Default";
import DefaultHeader from  "../../features/DefaultHeader";
import DefaultFooter from "../../features/DefaultFooter";
import PagesList from "../../features/pages/PagesList";

const pages = () => {
    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={<PagesList />}
            footer={<DefaultFooter />}
        />
    )
}

export default pages;