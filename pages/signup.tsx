import * as React from "react";
import { DefaultLayout } from "../layouts/Default";
import DefaultHeader from  "../features/DefaultHeader";
import DefaultFooter from "../features/DefaultFooter";
import AuthForm from "../features/auth/AuthForm";

const signup = () => {
    return (
        <DefaultLayout
            header={<DefaultHeader />}
            content={<AuthForm type="signup" />}
            footer={<DefaultFooter />}
        />
    )
}

export default signup;