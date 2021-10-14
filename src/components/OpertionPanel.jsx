import style from "../styles/OperationPanel.module.scss";

const OperationPanel = (props) => {
    const { reversColor, grayscale, histogram } = props;
    const getHistogramRGB = () => {
        console.log("newHistogram :>> ", histogram);
    };

    // const getHistogramR = () => {};

    // const getHistogramG = () => {};

    // const getHistogramB = () => {};

    // const getHistogramGray = () => {};

    return (
        <div className={style.operation_wrapper}>
            <div className={style.operation}>
                <button onClick={grayscale}>Szaroodcieniowy</button>
                <button onClick={reversColor}>Odwrócenie kolorów</button>
            </div>
            <div className={style.histogram}>
                <canvas
                    width="256"
                    height="256"
                    className={style.canvas}
                ></canvas>
                <button onClick={getHistogramRGB}>RGB</button>
            </div>
        </div>
    );
};

export default OperationPanel;
