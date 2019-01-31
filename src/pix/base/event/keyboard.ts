interface IKeyBoard {
    code: number;
    isDown: boolean;
    isUp: boolean;
    press: () => void;
    release: () => void;
    downHandler: (e: any) => void;
    upHandler: (e: any) => void;
}
const Keyboard = (keyCode: number) => {
    const key = {} as IKeyBoard;
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    // The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    // The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    // Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

export default Keyboard; 