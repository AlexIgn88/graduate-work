const handleOnKeyEnterDown = (evt, action) => {

    if (evt.keyCode === 13) {
        evt.preventDefault();
        action();
    }
};

export default handleOnKeyEnterDown;