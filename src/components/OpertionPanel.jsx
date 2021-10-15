import { createRef, useEffect, useState } from "react";
import style from "../styles/OperationPanel.module.scss";

const OperationPanel = (props) => {
    const { reversColor, grayscale, histogram } = props;
    const canvasRef = createRef();
    const [ctx, setCtx] = useState();
    const [myCanvas, setMyCanvas] = useState();
    const [scale, setScale] = useState(20);

    useEffect(() => {
        setCtx(canvasRef.current.getContext("2d"));
        setMyCanvas(canvasRef.current);
    }, [canvasRef]);

    const countHistogram = () => {
        const red = {};
        const green = {};
        const blue = {};
        for (const colors of histogram) {
            if (red[colors["red"]] === undefined) {
                red[colors["red"]] = 0;
            } else {
                red[colors["red"]]++;
            }

            if (green[colors["green"]] === undefined) {
                green[colors["green"]] = 0;
            } else {
                green[colors["green"]]++;
            }

            if (blue[colors["blue"]] === undefined) {
                blue[colors["blue"]] = 0;
            } else {
                blue[colors["blue"]]++;
            }
        }
        return { red, green, blue };
    };

    const drawHistogram = (value, color, scale) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        for (let i = 0; i <= 256; i++) {
            ctx.moveTo(i, myCanvas.height);
            ctx.lineTo(
                i,
                myCanvas.height -
                    (value[i] === undefined ? 0 : value[i]) / scale
            );
        }
        ctx.stroke();
    };

    const getHistogramRGB = () => {
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { red, green, blue } = countHistogram();
            drawHistogram(red, "red", scale);
            drawHistogram(green, "green", scale);
            drawHistogram(blue, "blue", scale);
        }
    };

    const getHistogramRed = () => {
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { red } = countHistogram();
            drawHistogram(red, "red", scale);
        }
    };

    const getHistogramGreen = () => {
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { green } = countHistogram();
            drawHistogram(green, "green", scale);
        }
    };

    const getHistogramBlue = () => {
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { blue } = countHistogram();
            drawHistogram(blue, "blue", scale);
        }
    };

    const clearHistogram = () => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    };

    const getHistogramGray = () => {
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { red } = countHistogram();
            drawHistogram(red, "gray", scale);
        }
    };

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
                    ref={canvasRef}
                ></canvas>
                <button onClick={getHistogramRGB}>RGB</button>
                <button onClick={getHistogramRed}>R</button>
                <button onClick={getHistogramGreen}>G</button>
                <button onClick={getHistogramBlue}>B</button>
                <button onClick={getHistogramGray}>Gray</button>
                <button onClick={clearHistogram}>Wyczyść</button>
            </div>
        </div>
    );
};

export default OperationPanel;
