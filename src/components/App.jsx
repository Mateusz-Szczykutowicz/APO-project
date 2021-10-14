import { useState } from "react";
import style from "../styles/App.module.scss";
import Footer from "./Footer";
import Main from "./Main";

const App = () => {
    const [refresh, setRefresh] = useState(false);
    const [activeBookmark, setActiveBookmark] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);
    const [titleBookmark, setTitleBookmark] = useState({});
    const createNewBookmark = (title, isLoaded, image) => {
        setBookmarkList(
            bookmarkList.concat(
                bookmarkList.length === 0
                    ? { id: 0, title }
                    : {
                          id: bookmarkList[bookmarkList.length - 1].id + 1,
                          title,
                          isLoaded,
                          image,
                      }
            )
        );
    };
    const clickAddNewBookmark = () => {
        createNewBookmark(undefined);
    };
    const clickBookmarkRemove = (id) => {
        titleBookmark[id] = undefined;
        setTitleBookmark(titleBookmark);
        setRefresh(!refresh);
        setBookmarkList(bookmarkList.filter((item) => item.id !== id));
    };

    const activateBookmark = (id) => {
        setActiveBookmark(id);
    };

    const setTitle = (id, title) => {
        titleBookmark[id] = title;
        setTitleBookmark(titleBookmark);
        setRefresh(!refresh);
    };

    const clickDuplicate = (id, isLoaded, image) => {
        createNewBookmark(titleBookmark[id], isLoaded, image);
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
                    setTitle={setTitle}
                    clickDuplicate={clickDuplicate}
                />
                <Footer
                    addBookmark={clickAddNewBookmark}
                    removeBookmark={clickBookmarkRemove}
                    bookmarkList={bookmarkList}
                    activateBookmark={activateBookmark}
                    activeBookmark={activeBookmark}
                    titleBookmark={titleBookmark}
                />
            </div>
        </>
    );
};

export default App;
