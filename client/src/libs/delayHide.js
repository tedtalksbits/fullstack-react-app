export const delayHide = (fn) => {
    setTimeout(() => {
        fn();
    }, 3000);
};
