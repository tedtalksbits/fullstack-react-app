import React from "react";
import { signUpAction } from "../components/auth/authMethods";
import { Form } from "../components/Form";
import { formTypes } from "../constants/formTypes";

export const SignUp = () => {
    const createNewUser = async (user) => {
        try {
            const createdUser = await signUpAction(user);
            console.log(createdUser);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form formType={formTypes.SIGN_UP} onSubmit={createNewUser} />
        </>
    );
};
