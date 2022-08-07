export const loginAction = async (userObj) => {
    try {
        const res = await fetch("http://localhost:5010/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        });

        const loggedInUser = await res.json();
        return loggedInUser;
    } catch (error) {
        console.log(error, "here");
    }
};

export const signUpAction = async (userObj) => {
    try {
        const res = await fetch("http://localhost:5010/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        });

        const createdUser = await res.json();
        console.log(createdUser);
    } catch (error) {
        console.log(error);
    }
};
