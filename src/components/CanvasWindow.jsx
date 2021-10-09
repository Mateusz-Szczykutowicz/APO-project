import style from "../styles/CanvasWindow.module.scss";
import { useState } from "react";

const CanvasWindow = (props) => {
    const { id, activeBookmark } = props;
    const [myImage, setMyImage] = useState();
    const loadImage = (e) => {
        console.log("e.target :>> ", e.target.files[0]);
        const fr = new FileReader();
        fr.onload = () => {
            console.log(">>>", fr.result);
            setMyImage(fr.result);
        };
        fr.readAsDataURL(e.target.files[0]);
    };
    return (
        <div
            className={`${style.canvas_wrapper} ${
                activeBookmark === id ? style.active : ""
            }`}
        >
            <h2>{id}</h2>
            <input
                type="file"
                name="image"
                id="select_image"
                onChange={(e) => loadImage(e)}
            />
            <img src={myImage} alt="MyImage" />
        </div>
    );
};

export default CanvasWindow;
