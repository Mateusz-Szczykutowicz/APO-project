import { useState } from "react";
import style from "../styles/App.module.scss";
import Footer from "./Footer";
import Main from "./Main";

const App = () => {
    const [activeBookmark, setActiveBookmark] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);
    const clickAddNewBookmark = () => {
        setBookmarkList(
            bookmarkList.concat(
                bookmarkList.length === 0
                    ? 0
                    : bookmarkList[bookmarkList.length - 1] + 1
            )
        );
    };
    const clickBookmarkRemove = (id) => {
        setBookmarkList(bookmarkList.filter((item) => item !== id));
    };

    const activateBookmark = (id) => {
        setActiveBookmark(id);
    };

    return (
        <>
            <div className={style.wrapper}>
                <header>
                    <h1>APO - Projekt</h1>
                </header>
                <Main
                    bookmarkList={bookmarkList}
                    activeBookmark={activeBookmark}
                />
                <Footer
                    addBookmark={clickAddNewBookmark}
                    removeBookmark={clickBookmarkRemove}
                    bookmarkList={bookmarkList}
                    activateBookmark={activateBookmark}
                />
            </div>
        </>
    );
};

export default App;
