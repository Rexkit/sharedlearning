import * as React from "react";
import { DefaultLayout } from "../layouts/Default";
import DefaultHeader from  "../features/DefaultHeader";
import DefaultFooter from "../features/DefaultFooter";
import AuthForm from "../features/auth/AuthForm";

const login = () => {
    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={<AuthForm type="login" />}
            footer={<DefaultFooter />}
        />
    )
}

export default login;