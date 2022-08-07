import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../components/auth/authMethods";
import { Form } from "../components/Form";
import { formTypes } from "../constants/formTypes";
import { useUser } from "../context/UserContext";

export const SignIn = () => {
    const { setUser, user } = useUser();
    const navigate = useNavigate();
    const [msg, setMsg] = useState({
        text: "",
        showText: false,
    });

    const logIn = async (userObj) => {
        try {
            const loggedInUser = await loginAction(userObj);
            const logInError = loggedInUser.error;
            console.log(loggedInUser);

            if (!logInError) {
                setUser(loggedInUser);
                navigate("/");
            }

            return loggedInUser;
        } catch (error) {
            console.log(error, "here");
        }
    };
    return (
        <>
            <Form formType={formTypes.LOGIN} onSubmit={logIn} />
        </>
    );
};
