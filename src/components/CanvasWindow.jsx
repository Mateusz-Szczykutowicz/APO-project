import style from "../styles/CanvasWindow.module.scss";
import { createRef, useEffect, useState } from "react";
import OptionPanel from "./OptionPanel";
import OperationPanel from "./OpertionPanel";

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
    const [ctx, setCtx] = useState();
    const [image] = useState(new Image());
    const [isLoadedImage, setIsLoadedImage] = useState(isLoaded);
    const [myCanvas, setMyCanvas] = useState();
    const [refresh, setRefresh] = useState(false);
    const [histogram, setHistogram] = useState([]);
    const drawImage = (imageVar) => {
        image.src = imageVar;
    };
    useEffect(() => {
        setCtx(myRef.current.getContext("2d"));
        setMyCanvas(myRef.current);
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

    image.addEventListener("load", () => {
        if (ctx) {
            ctx.drawImage(image, 0, 0);
            createHistogram();
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
            createHistogram();
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
        createHistogram();
    };

    const createHistogram = () => {
        const myImgData = ctx.getImageData(0, 0, image.width, image.height);
        const newHistogram = [];
        for (let i = 0; i < myImgData.data.length; i += 4) {
            newHistogram.push({
                red: myImgData.data[i],
                green: myImgData.data[i + 1],
                blue: myImgData.data[i + 2],
            });
        }
        setHistogram(newHistogram);
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

                <canvas
                    width="1200"
                    height="800"
                    className={style.canvas}
                    ref={myRef}
                ></canvas>
            </div>
            <OperationPanel
                reversColor={reversColor}
                grayscale={grayscale}
                histogram={histogram}
            />
        </div>
    );
};

export default CanvasWindow;
