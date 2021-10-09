import style from "../styles/Bookmark.module.scss";

const Bookmark = (props) => {
    const { activateBookmark, removeBookmark, id } = props;
    return (
        <>
            <div
                className={style.bookmark}
                onClick={() => activateBookmark(id)}
            >
                <div>{props.title ? props.title : "Nie wybrano"}</div>
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
