import { createRef, useEffect, useState } from "react";
import style from "../styles/OperationPanel.module.scss";

const OperationPanel = (props) => {
    const {
        reversColor,
        grayscale,
        stretchHistogram,
        histogram,
        threshholdBinary,
        threshholdWithSlider,
        limiColorLevels,
        limit,
        setLimit,
        max,
        min,
        setMax,
        setMin,
        p1,
        p2,
        q3,
        q4,
        setP1,
        setP2,
        setQ3,
        setQ4,
        equalizeHistogram,
        stretchHistogramWithRange,
    } = props;
    const canvasRef = createRef();
    const [ctx, setCtx] = useState();
    const [myCanvas, setMyCanvas] = useState();
    const [lutActive, setLutActive] = useState(false);
    const [lutRed, setLutRed] = useState([]);
    const [lutGreen, setLutGreen] = useState([]);
    const [lutBlue, setLutBlue] = useState([]);

    useEffect(() => {
        setCtx(canvasRef.current.getContext("2d"));
        setMyCanvas(canvasRef.current);
    }, [canvasRef]);

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
        let scale = 0;
        if (
            histogram.max.red >= histogram.max.blue &&
            histogram.max.red >= histogram.max.green
        ) {
            scale = Math.ceil(histogram.max.red / 255);
        } else if (histogram.max.blue >= histogram.max.green) {
            scale = Math.ceil(histogram.max.blue / 255);
        } else {
            scale = Math.ceil(histogram.max.green / 255);
        }

        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { red, green, blue } = histogram;
            drawHistogram(red, "red", scale);
            drawHistogram(green, "green", scale);
            drawHistogram(blue, "blue", scale);
        }
    };

    const getHistogramRed = () => {
        const scale = Math.ceil(histogram.max.red / 255);
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { red } = histogram;
            drawHistogram(red, "red", scale);
        }
    };

    const getHistogramGreen = () => {
        const scale = Math.ceil(histogram.max.green / 255);
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { green } = histogram;
            drawHistogram(green, "green", scale);
        }
    };

    const getHistogramBlue = () => {
        const scale = Math.ceil(histogram.max.blue / 255);
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { blue } = histogram;
            drawHistogram(blue, "blue", scale);
        }
    };

    const getHistogramGray = () => {
        const scale = Math.ceil(histogram.max.red / 255);
        if (ctx) {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            const { red } = histogram;
            drawHistogram(red, "black", scale);
        }
    };

    const clearHistogram = () => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    };

    const createLut = () => {
        if (!lutActive) {
            const colors = histogram;
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

    const handleChangeInputLimit = (e) => {
        setLimit(e.target.value);
    };

    const handleChangeInputMin = (e) => {
        setMin(e.target.value);
    };

    const handleChangeInputMax = (e) => {
        setMax(e.target.value);
    };

    const handleChangeInputP1 = (e) => {
        setP1(e.target.value);
    };

    const handleChangeInputP2 = (e) => {
        setP2(e.target.value);
    };

    const handleChangeInputQ3 = (e) => {
        setQ3(e.target.value);
    };

    const handleChangeInputQ4 = (e) => {
        setQ4(e.target.value);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.operation_wrapper}>
                <div className={style.operation}>
                    <label htmlFor="limit">Limit</label>
                    <input
                        type="number"
                        name="limit"
                        id="limit"
                        min="0"
                        max="255"
                        placeholder="Limit"
                        onChange={handleChangeInputLimit}
                        value={limit}
                    />
                    <label htmlFor="min">Min</label>
                    <input
                        type="number"
                        name="min"
                        id="min"
                        min="0"
                        max="255"
                        placeholder="Min"
                        onChange={handleChangeInputMin}
                        value={min}
                    />
                    <label htmlFor="max">max</label>
                    <input
                        type="number"
                        name="max"
                        id="max"
                        min="0"
                        max="255"
                        placeholder="Max"
                        onChange={handleChangeInputMax}
                        value={max}
                    />
                    <br />
                    <label htmlFor="max">p1</label>
                    <input
                        type="number"
                        name="p1"
                        id="p1"
                        min="0"
                        max="255"
                        placeholder="p1"
                        onChange={handleChangeInputP1}
                        value={p1}
                    />

                    <label htmlFor="max">p2</label>
                    <input
                        type="number"
                        name="p2"
                        id="p2"
                        min="0"
                        max="255"
                        placeholder="p2"
                        onChange={handleChangeInputP2}
                        value={p2}
                    />
                    <label htmlFor="max">q3</label>
                    <input
                        type="number"
                        name="q3"
                        id="q3"
                        min="0"
                        max="255"
                        placeholder="q3"
                        onChange={handleChangeInputQ3}
                        value={q3}
                    />
                    <label htmlFor="max">q4</label>
                    <input
                        type="number"
                        name="q4"
                        id="q4"
                        min="0"
                        max="255"
                        placeholder="q4"
                        onChange={handleChangeInputQ4}
                        value={q4}
                    />
                    <button onClick={grayscale}>Szaroodcieniowy</button>
                    <button onClick={reversColor}>Odwrócenie kolorów</button>
                    <button onClick={equalizeHistogram}>
                        Selektywne rozciąganie histogramu
                    </button>
                    <button onClick={stretchHistogram}>
                        Rozciągnij histogram
                    </button>
                    <button onClick={threshholdBinary}>
                        Progowanie binarne
                    </button>
                    <button onClick={threshholdWithSlider}>
                        Progowanie z zachowanie poziomów szarości
                    </button>
                    <button onClick={limiColorLevels}>
                        Ograniczenie poziomów kolorów
                    </button>
                    <button onClick={stretchHistogramWithRange}>
                        Rozciąganie histogramu z zakresu p1, p2 do q3, q4
                    </button>
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
