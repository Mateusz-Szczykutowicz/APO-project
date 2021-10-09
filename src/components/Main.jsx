import style from "../styles/Main.module.scss";
import CanvasWindow from "./CanvasWindow";
const Main = (props) => {
    const { bookmarkList, activeBookmark } = props;
    const listItem = bookmarkList.map((item) => (
        <CanvasWindow key={item} id={item} activeBookmark={activeBookmark} />
    ));
    return <main className={style.main}>{listItem}</main>;
};

export default Main;
