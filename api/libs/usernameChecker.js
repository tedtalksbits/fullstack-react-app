export const usernameChecker = (username) => {
    // valid username regex, cannot start with a number

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    // check if username is valid
    if (!usernameRegex.test(username)) {
        return {
            error: true,
            message: 'Username must be between 3 and 20 characters long',
        };
    }
    return {
        error: false,
        message: 'Username is valid',
    };
};
