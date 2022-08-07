import { useState } from "react";

export const useShowMessage = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [focus, setFocus] = useState({
        element: "",
        focus: false,
    });

    const showMsg = (msg) => {
        setShowMessage(true);
        setMessage(msg);
    };

    const hideMsg = () => {
        setShowMessage(false);
        setMessage("");
    };

    return { showMessage, message, showMsg, hideMsg, focus, setFocus };
};
