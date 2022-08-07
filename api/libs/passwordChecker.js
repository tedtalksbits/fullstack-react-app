export const pwCheck = (password) => {
    // Check if password is at least 8 characters long
    if (password.length < 8) {
        return {
            error: true,
            message: 'Password must be at least 8 characters long',
        };
    }
    // Check if password has at least one number
    if (!/\d/.test(password)) {
        return {
            error: true,
            message: 'Password must have at least one number',
        };
    }
    // Check if password has at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return {
            error: true,
            message: 'Password must have at least one uppercase letter',
        };
    }
    // Check if password has at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return {
            error: true,
            message: 'Password must have at least one lowercase letter',
        };
    }
    // Check if password has at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return {
            error: true,
            message: 'Password must have at least one special character',
        };
    }
    return {
        error: false,
        message: 'Password is valid',
    };
};
