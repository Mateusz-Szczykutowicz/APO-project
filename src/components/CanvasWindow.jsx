import style from "../styles/CanvasWindow.module.scss";
import { createRef, useEffect, useState } from "react";
import OptionPanel from "./OptionPanel";
import OperationPanel from "./OpertionPanel";
import { createHistogram } from "../scripts/CanvasWindow.script";
// import cv from "../scripts/opencv.js";
// const cv = require("https://docs.opencv.org/4.x/opencv.js");
// const cv = require("../scripts/opencv.js");

const CanvasWindow = (props) => {
    const {
        id,
        activeBookmark,
        setTitle,
        clickDuplicate,
        isLoaded,
        imageProps,
    } = props;
    const myRef = createRef();
    const myRef2 = createRef();
    const [limit, setLimit] = useState(127);
    const [max, setMax] = useState(255);
    const [min, setMin] = useState(0);
    const [p1, setP1] = useState(0);
    const [p2, setP2] = useState(255);
    const [q3, setQ3] = useState(0);
    const [q4, setQ4] = useState(255);
    const [ctx, setCtx] = useState();
    const [ctx2, setCtx2] = useState();
    const [image] = useState(new Image());
    const [image2] = useState(new Image());
    const [isLoadedImage, setIsLoadedImage] = useState(isLoaded);
    const [myCanvas, setMyCanvas] = useState();
    const [myCanvas2, setMyCanvas2] = useState();
    const [refresh, setRefresh] = useState(false);
    const [histogram, setHistogram] = useState([]);
    const drawImage = (imageVar) => {
        image.src = imageVar;
    };
    const drawImage2 = (imageVar) => {
        image2.src = imageVar;
    };
    useEffect(() => {
        setCtx(myRef.current.getContext("2d"));
        setCtx2(myRef2.current.getContext("2d"));
        setMyCanvas(myRef.current);
        setMyCanvas2(myRef2.current);
        if (imageProps) {
            // console.log("imageProps :>> ", imageProps);
            image.src = imageProps.src;
        }
    }, []);

    const refreshPage = () => {
        setRefresh(!refresh);
    };

    const loadImage = (e) => {
        const fr = new FileReader();
        fr.onload = () => {
            drawImage(fr.result);
        };
        setTitle(id, e.target.files[0].name);

        fr.readAsDataURL(e.target.files[0]);
        setIsLoadedImage(true);
    };

    const loadImage2 = (e) => {
        const fr = new FileReader();
        fr.onload = () => {
            drawImage2(fr.result);
        };
        if (e.target.files[0]) fr.readAsDataURL(e.target.files[0]);
    };

    image.addEventListener("load", () => {
        if (ctx) {
            ctx.drawImage(image, 0, 0);
            setHistogram(createHistogram(ctx, image));
            refreshPage();
        }
    });

    image2.addEventListener("load", () => {
        if (ctx2) {
            ctx2.drawImage(image2, 0, 0);
            setHistogram(createHistogram(ctx2, image2));
            refreshPage();
        }
    });

    const reversColor = () => {
        if (myCanvas) {
            const myImgData = ctx.getImageData(0, 0, image.width, image.height);
            // console.log("myImgData.data.lenght :>> ", myImgData.data.length);
            for (let i = 0; i < myImgData.data.length; i += 4) {
                myImgData.data[i] = 255 - myImgData.data[i]; //czerwony
                myImgData.data[i + 1] = 255 - myImgData.data[i + 1]; //zielony
                myImgData.data[i + 2] = 255 - myImgData.data[i + 2]; //niebieski
            }
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            ctx.putImageData(myImgData, 0, 0);
            setHistogram(createHistogram(ctx, image));
            refreshPage();
        }
    };

    const grayscale = () => {
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        let d1;
        for (let i = 0; i < myImgData.data.length; i += 4) {
            d1 =
                0.2989 * myImgData.data[i] +
                0.587 * myImgData.data[i + 1] +
                0.114 * myImgData.data[i + 2];
            myImgData.data[i] = d1; //czerwony
            myImgData.data[i + 1] = d1; //zielony
            myImgData.data[i + 2] = d1; //niebieski
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const stretchHistogram = () => {
        let min = { red: 0, green: 0, blue: 0 };
        let max = { red: 255, green: 255, blue: 255 };
        for (let i = 0; i <= 255; i++) {
            if (histogram.red[i] > 0) {
                max.red = i;
            }
            if (histogram.green[i] > 0) {
                max.green = i;
            }
            if (histogram.blue[i] > 0) {
                max.blue = i;
            }
        }

        for (let i = 255; i >= 0; i--) {
            if (histogram.red[i] > 0) {
                min.red = i;
            }
            if (histogram.green[i] > 0) {
                min.green = i;
            }
            if (histogram.blue[i] > 0) {
                min.blue = i;
            }
        }

        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        for (let i = 0; i < myImgData.data.length; i += 4) {
            myImgData.data[i] =
                (255 / (max.red - min.red)) * (myImgData.data[i] - min.red); //czerwony
            myImgData.data[i + 1] =
                (255 / (max.green - min.green)) *
                (myImgData.data[i + 1] - min.green); //zielony
            myImgData.data[i + 2] =
                (255 / (max.blue - min.blue)) *
                (myImgData.data[i + 2] - min.blue); //niebieski
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const equalizeHistogram = () => {
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        let min = {};
        for (let i = 255; i >= 0; i--) {
            if (histogram.red[i] > 0) {
                min.red = i;
            }
            if (histogram.green[i] > 0) {
                min.green = i;
            }
            if (histogram.blue[i] > 0) {
                min.blue = i;
            }
        }

        const result = { red: [], green: [], blue: [] };
        let sum = { red: 0, green: 0, blue: 0 };
        for (let i = 0; i <= 255; i++) {
            if (histogram.red[i] !== undefined) {
                sum.red += histogram.red[i];
            }

            result.red[i] = Math.round(
                ((sum.red - min.red) / (myImgData.data.length / 4 - min.red)) *
                    255
            );

            if (histogram.green[i] !== undefined) {
                sum.green += histogram.green[i];
            }

            result.green[i] = Math.round(
                ((sum.green - min.green) /
                    (myImgData.data.length / 4 - min.green)) *
                    255
            );

            if (histogram.blue[i] !== undefined) {
                sum.blue += histogram.blue[i];
            }

            result.blue[i] = Math.round(
                ((sum.blue - min.blue) /
                    (myImgData.data.length / 4 - min.blue)) *
                    255
            );
        }

        for (let i = 0; i < myImgData.data.length; i += 4) {
            myImgData.data[i] = result.red[myImgData.data[i]]; //czerwony
            myImgData.data[i + 1] = result.green[myImgData.data[i + 1]]; //zielony
            myImgData.data[i + 2] = result.blue[myImgData.data[i + 2]]; //niebieski
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const threshholdBinary = () => {
        // grayscale();
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        for (let i = 0; i < myImgData.data.length; i += 4) {
            myImgData.data[i] = myImgData.data[i] >= limit ? 255 : 0;
            myImgData.data[i + 1] = myImgData.data[i + 1] >= limit ? 255 : 0;
            myImgData.data[i + 2] = myImgData.data[i + 2] >= limit ? 255 : 0;
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const threshholdWithSlider = () => {
        grayscale();
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        for (let i = 0; i < myImgData.data.length; i += 4) {
            if (myImgData.data[i] > max) {
                myImgData.data[i] = 0;
            } else if (myImgData.data[i] < min) {
                myImgData.data[i] = 0;
            }

            if (myImgData.data[i + 1] > max) {
                myImgData.data[i + 1] = 0;
            } else if (myImgData.data[i + 1] < min) {
                myImgData.data[i + 1] = 0;
            }

            if (myImgData.data[i + 2] > max) {
                myImgData.data[i + 2] = 0;
            } else if (myImgData.data[i + 2] < min) {
                myImgData.data[i + 2] = 0;
            }
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const limiColorLevels = () => {
        const colorLimit = Math.round(255 / (limit - 1));
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        for (let i = 0; i < myImgData.data.length; i += 4) {
            if (myImgData.data[i] > 0) {
                myImgData.data[i] =
                    Math.floor(
                        (myImgData.data[i] + colorLimit / 2 - 1) / colorLimit
                    ) * colorLimit; //czerwony
            }
            if (myImgData.data[i + 1] > 0) {
                myImgData.data[i + 1] =
                    Math.floor(
                        (myImgData.data[i + 1] + colorLimit / 2 - 1) /
                            colorLimit
                    ) * colorLimit; //zielony
            }
            if (myImgData.data[i + 2] > 0) {
                myImgData.data[i + 2] =
                    Math.floor(
                        (myImgData.data[i + 2] + colorLimit / 2 - 1) /
                            colorLimit
                    ) * colorLimit; //niebieski
            }
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const stretchHistogramWithRange = () => {
        const q5 = 0; // tło

        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        // console.log("myImgData.data.lenght :>> ", myImgData.data.length);
        for (let i = 0; i < myImgData.data.length; i += 4) {
            if (myImgData.data[i] >= p1 && myImgData.data[i] <= p2) {
                myImgData.data[i] =
                    (myImgData.data[i] - p1) * ((q4 - q3) / (p2 - p1)) + q3; //czerwony
            } else {
                myImgData.data[i] = q5;
            }

            if (myImgData.data[i + 1] >= p1 && myImgData.data[i + 1] <= p2) {
                myImgData.data[i + 1] =
                    (myImgData.data[i + 1] - p1) * ((q4 - q3) / (p2 - p1)) + q3; //zielony
            } else {
                myImgData.data[i + 1] = q5;
            }

            if (myImgData.data[i + 2] >= p1 && myImgData.data[i + 2] <= p2) {
                myImgData.data[i + 2] =
                    (myImgData.data[i + 2] - p1) * ((q4 - q3) / (p2 - p1)) + q3; //niebieski
            } else {
                myImgData.data[i + 2] = q5;
            }
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const operationAND = () => {
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        const myImgData2 = ctx2.getImageData(0, 0, image.width, image.height);

        for (let i = 0; i < myImgData.data.length; i += 4) {
            const whitePixel = {
                red:
                    myImgData.data[i] >= 127 && myImgData2.data[i] >= 127
                        ? myImgData2.data[i]
                        : 0,
                green:
                    myImgData.data[i + 1] >= 127 &&
                    myImgData2.data[i + 1] >= 127
                        ? myImgData2.data[i + 1]
                        : 0,
                blue:
                    myImgData.data[i + 2] >= 127 &&
                    myImgData2.data[i + 2] >= 127
                        ? myImgData2.data[i + 2]
                        : 0,
            };
            myImgData.data[i] = whitePixel.red; //czerwony
            myImgData.data[i + 1] = whitePixel.green; //zielony
            myImgData.data[i + 2] = whitePixel.blue; //niebieski
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const operationOR = () => {
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        const myImgData2 = ctx2.getImageData(0, 0, image.width, image.height);

        for (let i = 0; i < myImgData.data.length; i += 4) {
            const pixel = {
                red:
                    myImgData.data[i] > myImgData2.data[i]
                        ? myImgData.data[i]
                        : myImgData2.data[i],
                green:
                    myImgData.data[i + 1] > myImgData2.data[i + 1]
                        ? myImgData.data[i + 1]
                        : myImgData2.data[i + 1],
                blue:
                    myImgData.data[i + 2] > myImgData2.data[i + 2]
                        ? myImgData.data[i + 2]
                        : myImgData2.data[i + 2],
            };
            const or = {
                red:
                    myImgData.data[i] >= 127 || myImgData2.data[i] >= 127
                        ? pixel.red
                        : 0,
                green:
                    myImgData.data[i + 1] >= 127 ||
                    myImgData2.data[i + 1] >= 127
                        ? pixel.green
                        : 0,
                blue:
                    myImgData.data[i + 2] >= 127 ||
                    myImgData2.data[i + 2] >= 127
                        ? pixel.blue
                        : 0,
            };
            myImgData.data[i] = or.red; //czerwony
            myImgData.data[i + 1] = or.green; //zielony
            myImgData.data[i + 2] = or.blue; //niebieski
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    const operationXOR = () => {
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        const myImgData2 = ctx2.getImageData(0, 0, image.width, image.height);

        for (let i = 0; i < myImgData.data.length; i += 4) {
            const pixel = {
                red:
                    myImgData.data[i] > myImgData2.data[i]
                        ? myImgData.data[i]
                        : myImgData2.data[i],
                green:
                    myImgData.data[i + 1] > myImgData2.data[i + 1]
                        ? myImgData.data[i + 1]
                        : myImgData2.data[i + 1],
                blue:
                    myImgData.data[i + 2] > myImgData2.data[i + 2]
                        ? myImgData.data[i + 2]
                        : myImgData2.data[i + 2],
            };

            const xor = {
                red:
                    (myImgData.data[i] >= 127) ^ (myImgData2.data[i] >= 127)
                        ? pixel.red
                        : 0,
                green:
                    (myImgData.data[i + 1] >= 127) ^
                    (myImgData2.data[i + 1] >= 127)
                        ? pixel.green
                        : 0,
                blue:
                    (myImgData.data[i + 2] >= 127) ^
                    (myImgData2.data[i + 2] >= 127)
                        ? pixel.blue
                        : 0,
            };

            const whitePixel = {
                red: xor.red,
                green: xor.green,
                blue: xor.blue,
            };
            myImgData.data[i] = whitePixel.red; //czerwony
            myImgData.data[i + 1] = whitePixel.green; //zielony
            myImgData.data[i + 2] = whitePixel.blue; //niebieski
        }
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.putImageData(myImgData, 0, 0);
        setHistogram(createHistogram(ctx, image));
        refreshPage();
    };

    return (
        <div
            className={`${style.canvas_window_wrapper} ${
                activeBookmark === id ? style.active : ""
            }`}
        >
            <div className={style.canvas_wrapper}>
                {isLoadedImage ? (
                    <OptionPanel
                        id={id}
                        image={image}
                        clickDuplicate={clickDuplicate}
                    />
                ) : (
                    <input
                        className={style.load_image}
                        type="file"
                        name="image"
                        id="select_image"
                        onChange={(e) => loadImage(e)}
                    />
                )}
                {isLoadedImage ? (
                    <input
                        className={style.load_image}
                        type="file"
                        name="image2"
                        id="select_image2"
                        onChange={(e) => loadImage2(e)}
                    />
                ) : null}

                <canvas
                    width="1200"
                    height="800"
                    className={style.canvas}
                    ref={myRef}
                ></canvas>
                <canvas
                    width="1200"
                    height="900"
                    className={style.canvas}
                    ref={myRef2}
                ></canvas>
            </div>
            {isLoadedImage ? (
                <OperationPanel
                    reversColor={reversColor}
                    grayscale={grayscale}
                    stretchHistogram={stretchHistogram}
                    histogram={histogram}
                    threshholdBinary={threshholdBinary}
                    threshholdWithSlider={threshholdWithSlider}
                    limiColorLevels={limiColorLevels}
                    limit={limit}
                    setLimit={setLimit}
                    max={max}
                    min={min}
                    setMax={setMax}
                    setMin={setMin}
                    equalizeHistogram={equalizeHistogram}
                    stretchHistogramWithRange={stretchHistogramWithRange}
                    p1={p1}
                    p2={p2}
                    q3={q3}
                    q4={q4}
                    setP1={setP1}
                    setP2={setP2}
                    setQ3={setQ3}
                    setQ4={setQ4}
                    operationAND={operationAND}
                    operationOR={operationOR}
                    operationXOR={operationXOR}
                />
            ) : null}
        </div>
    );
};

export default CanvasWindow;
