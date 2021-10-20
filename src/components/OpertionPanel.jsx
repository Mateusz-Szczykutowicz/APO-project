import { createRef, useEffect, useState } from "react";
import style from "../styles/OperationPanel.module.scss";

const OperationPanel = (props) => {
    const { reversColor, grayscale, histogram } = props;
    const canvasRef = createRef();
    const [ctx, setCtx] = useState();
    const [myCanvas, setMyCanvas] = useState();
    const [scale, setScale] = useState(20);
    const [lutActive, setLutActive] = useState(false);
    const [lutRed, setLutRed] = useState([]);
    const [lutGreen, setLutGreen] = useState([]);
    const [lutBlue, setLutBlue] = useState([]);

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
        for (let i = 0; i < 256; i++) {
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
            drawHistogram(red, "black", scale);
        }
    };

    const createLut = () => {
        if (!lutActive) {
            const colors = countHistogram();
            const red = [];
            const green = [];
            const blue = [];
            for (let i = 0; i < 256; i++) {
                red.push({
                    index: i,
                    value: colors.red[i] === undefined ? 0 : colors.red[i],
                });
                green.push({
                    index: i,
                    value: colors.green[i] === undefined ? 0 : colors.green[i],
                });
                blue.push({
                    index: i,
                    value: colors.blue[i] === undefined ? 0 : colors.blue[i],
                });
            }
            setLutRed(red);
            setLutGreen(green);
            setLutBlue(blue);
            console.log("item :>> ", red);
        }

        setLutActive(!lutActive);
    };

    const getIndexLut = () => {
        const item = [];
        for (let i = 0; i < 256; i++) {
            item.push(i);
        }
        return item.map((i) => (
            <div key={i} className={style.item}>
                {i}
            </div>
        ));
    };

    const getRedLut = () => {
        return lutRed.map((i) => (
            <div key={i.index} className={`${style.item} ${style.red}`}>
                {i.value}
            </div>
        ));
    };

    const getGreenLut = () => {
        return lutGreen.map((i) => (
            <div key={i.index} className={`${style.item} ${style.green}`}>
                {i.value}
            </div>
        ));
    };

    const getBlueLut = () => {
        return lutBlue.map((i) => (
            <div key={i.index} className={`${style.item} ${style.blue}`}>
                {i.value}
            </div>
        ));
    };

    return (
        <div className={style.wrapper}>
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
                    <button onClick={createLut}>LUT</button>
                </div>
            </div>
            {lutActive ? (
                <div className={style.lut}>
                    <h2>LUT</h2>
                    <div className={style.table}>
                        <div className={style.lut_column}>
                            <div>Index</div>
                            {getIndexLut()}
                        </div>
                        <div className={style.lut_column}>
                            <div>Red</div>
                            {getRedLut()}
                        </div>
                        <div className={style.lut_column}>
                            <div>Green</div>
                            {getGreenLut()}
                        </div>
                        <div className={style.lut_column}>
                            <div>Blue</div>
                            {getBlueLut()}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default OperationPanel;
