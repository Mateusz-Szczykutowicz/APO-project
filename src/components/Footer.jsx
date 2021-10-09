import style from "../styles/Footer.module.scss";
import Bookmark from "./Bookmark";

const Footer = (props) => {
    const { bookmarkList, addBookmark, removeBookmark, activateBookmark } =
        props;

    const listItem = bookmarkList.map((item) => (
        <Bookmark
            key={item}
            id={item}
            removeBookmark={removeBookmark}
            activateBookmark={activateBookmark}
        />
    ));

    return (
        <footer>
            <button className={style.add_new_bookmark} onClick={addBookmark}>
                +
            </button>
            <div className={style.bookmarks}>{listItem}</div>
        </footer>
    );
};

export default Footer;
