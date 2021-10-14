import style from "../styles/Footer.module.scss";
import Bookmark from "./Bookmark";

const Footer = (props) => {
    const {
        bookmarkList,
        addBookmark,
        removeBookmark,
        activateBookmark,
        activeBookmark,
        titleBookmark,
    } = props;

    const listItem = bookmarkList.map((item) => (
        <Bookmark
            key={item.id}
            id={item.id}
            removeBookmark={removeBookmark}
            activateBookmark={activateBookmark}
            activeBookmark={activeBookmark}
            title={item.title ? item.title : titleBookmark[item.id]}
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
