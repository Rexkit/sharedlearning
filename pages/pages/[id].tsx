import React from 'react';
import { DefaultLayout } from "../../layouts/Default";
import DefaultHeader from  "../../features/DefaultHeader";
import DefaultFooter from "../../features/DefaultFooter";
import SinglePage from '../../features/singlePage/SinglePage';
import { useAuth } from "../../utils/hooks/useAuth";

type props = {
    page_id: string
}

const singlePage = ({ page_id }: props) => {
    const { user } = useAuth();
    const [sharedMode, setSharedMode] = React.useState(user.me? false : true);
    const [previewMode, setPreviewMode] = React.useState(false);

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    }

    return (
        <DefaultLayout
            header={<DefaultHeader sharedMode={sharedMode} />}
            content={<SinglePage sharedMode={sharedMode} previewMode={previewMode} page_id={page_id} togglePreviewMode={togglePreviewMode} />}
            footer={<DefaultFooter />}
        />
    )
}

export const getServerSideProps = ({ params }) => {
    return {
        props: {
            page_id: params.id
        }
    }
}

export default singlePage;