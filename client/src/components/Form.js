import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Slide,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formTypes } from "../constants/formTypes";
import { useShowMessage } from "../hooks/useShowMsg";

export const Form = ({ formType, onSubmit }) => {
    // const inputRef = useRef(null)
    const { hideMsg, showMsg, message, showMessage, setFocus, focus } =
        useShowMessage();

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        email: "",
    });

    // hide error message after 3000ms
    function delayHide() {
        setTimeout(() => {
            hideMsg();
        }, 3000);
    }

    // control inputs
    const handleChange = (e, property) => {
        setNewUser({ ...newUser, [property]: e.target.value });
        setFocus({ element: "", focus: false });
    };

    // show and hide password
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    // async function to send request to server and validate form
    async function submitUser() {
        if (newUser.username === "") {
            showMsg("Please enter your username.");
            setFocus({ element: "username", focus: true });
            delayHide();
            return;
        }
        if (newUser.password === "") {
            showMsg("Please enter your password.");
            setFocus({ element: "password", focus: true });
            delayHide();
            return;
        }
        if (newUser.email === "" && formType === formTypes.SIGN_UP) {
            showMsg("Please enter your email.");
            setFocus({ element: "email", focus: true });
            delayHide();
            return;
        }

        try {
            const user = await onSubmit(newUser);
            if (user.error) {
                showMsg(user.errorMsg);
                delayHide();
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container px={4}>
            <Slide
                direction="bottom"
                in={showMessage}
                unmountOnExit={true}
                style={{ zIndex: 10 }}
            >
                <Box bg="tomato" p="40px" rounded="4px 4px 0 0" mt={4}>
                    <Text fontSize="lg" color="whiteAlpha.800">
                        {message}
                    </Text>
                </Box>
            </Slide>
            <form onSubmit={(e) => e.preventDefault()}>
                <Center height="100vh">
                    <Box
                        p={8}
                        borderWidth="1px"
                        w="500px"
                        borderRadius="lg"
                        boxShadow="lg"
                        bg="gray.100"
                    >
                        <Flex flexDirection="column">
                            <Heading height="100px">
                                {formType === formTypes.LOGIN
                                    ? "Login"
                                    : formType === formTypes.SIGN_UP
                                    ? "Sign up"
                                    : ""}
                            </Heading>
                            <Box mt={4} flex={1}>
                                <FormControl>
                                    <Stack spacing={8}>
                                        <Box>
                                            <FormLabel htmlFor="username">
                                                Username
                                            </FormLabel>
                                            <Input
                                                border="1px"
                                                borderColor="gray.400"
                                                id="username"
                                                type="text"
                                                placeholder="username"
                                                value={newUser.username}
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    handleChange(e, "username")
                                                }
                                                ref={(input) => {
                                                    if (
                                                        focus.element ===
                                                        "username"
                                                    ) {
                                                        input?.focus();
                                                    }
                                                }}
                                            />
                                        </Box>
                                        {formType === formTypes.SIGN_UP && (
                                            <Box>
                                                <FormLabel htmlFor="email">
                                                    Email address
                                                </FormLabel>
                                                <Input
                                                    border="1px"
                                                    borderColor="gray.400"
                                                    id="email"
                                                    type="email"
                                                    placeholder="email"
                                                    autoComplete="email"
                                                    onChange={(e) =>
                                                        handleChange(e, "email")
                                                    }
                                                    value={newUser.email}
                                                    ref={(input) => {
                                                        if (
                                                            focus.element ===
                                                            "email"
                                                        ) {
                                                            input?.focus();
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        <Box>
                                            <FormLabel htmlFor="password">
                                                Password
                                            </FormLabel>
                                            <InputGroup>
                                                <Input
                                                    border="1px"
                                                    borderColor="gray.400"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="password"
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            "password"
                                                        )
                                                    }
                                                    value={newUser.password}
                                                    ref={(input) => {
                                                        if (
                                                            focus.element ===
                                                            "password"
                                                        ) {
                                                            input?.focus();
                                                        }
                                                    }}
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <Button
                                                        h="1.75rem"
                                                        size="sm"
                                                        onClick={handleClick}
                                                    >
                                                        {show ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </Box>
                                        <Box>
                                            <Button
                                                w="100%"
                                                colorScheme="teal"
                                                onClick={submitUser}
                                            >
                                                {formType === formTypes.LOGIN
                                                    ? "Login"
                                                    : "Sign up"}
                                            </Button>
                                        </Box>
                                        <Text color="gray.400">
                                            By signing up to Global, you agree
                                            to our terms of service and privacy
                                            policy.
                                        </Text>
                                        <Link
                                            to={
                                                formType === formTypes.LOGIN
                                                    ? "/sign-up"
                                                    : "/sign-in"
                                            }
                                        >
                                            <Text textDecoration={"underline"}>
                                                {formType === formTypes.LOGIN
                                                    ? "Don't have an account? Sign up"
                                                    : "Already have an account? Sign in"}
                                            </Text>
                                        </Link>
                                    </Stack>
                                </FormControl>
                            </Box>
                        </Flex>
                    </Box>
                </Center>
            </form>
        </Container>
    );
};
