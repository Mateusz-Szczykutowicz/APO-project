import style from "../styles/OptionPanel.module.scss";

const OptionPanel = (props) => {
    const { clickDuplicate, id, image } = props;
    return (
        <>
            <button
                className={style.duplicate_button}
                onClick={() => clickDuplicate(id, true, image)}
            >
                Duplikuj
            </button>
        </>
    );
};

export default OptionPanel;
