import style from "../styles/Main.module.scss";
import CanvasWindow from "./CanvasWindow";
const Main = (props) => {
    const { bookmarkList, activeBookmark, setTitle, clickDuplicate } = props;
    const listItem = bookmarkList.map((item) => (
        <CanvasWindow
            key={item.id}
            id={item.id}
            activeBookmark={activeBookmark}
            setTitle={setTitle}
            clickDuplicate={clickDuplicate}
            isLoaded={item.isLoaded ? item.isLoaded : false}
            imageProps={item.image}
        />
    ));
    return <main className={style.main}>{listItem}</main>;
};

export default Main;
