import style from "../styles/App.module.scss";
import Footer from "./Footer";
import Main from "./Main";

const App = () => {
    return (
        <>
            <div className={style.wrapper}>
                <header>
                    <h1>APO - Projekt</h1>
                </header>
                <Main />
                <Footer />
            </div>
        </>
    );
};

export default App;
