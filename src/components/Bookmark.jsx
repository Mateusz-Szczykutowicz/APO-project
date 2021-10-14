import style from "../styles/Bookmark.module.scss";

const Bookmark = (props) => {
    const { activateBookmark, activeBookmark, removeBookmark, id, title } =
        props;
    return (
        <>
            <div
                className={`${style.bookmark} ${
                    activeBookmark === id ? style.active : ""
                }`}
                onClick={() => activateBookmark(id)}
            >
                <div>{title ? title : "Nie wybrano"}</div>
                <button
                    className={style.bookmarkRemove}
                    onClick={(e) => {
                        e.stopPropagation();
                        removeBookmark(id);
                    }}
                >
                    X
                </button>
            </div>
        </>
    );
};

export default Bookmark;
