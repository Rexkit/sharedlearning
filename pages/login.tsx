import * as React from "react";
import { DefaultLayout } from "../layouts/Default";
import DefaultHeader from  "../features/DefaultHeader";
import DefaultFooter from "../features/DefaultFooter";
import SignInForm from "../features/signin/SignInForm";

const login = () => {
    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={<SignInForm />}
            footer={<DefaultFooter />}
        />
    )
}

export default login;