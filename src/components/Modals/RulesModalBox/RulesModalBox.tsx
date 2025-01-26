import { useState } from 'react';
import './RulesModalBox.css';

const RulesModalBox = () => {
    const [visible, setVisible] = useState(true);
    const [isEnglish, setIsEnglish] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    const handleTranslate = () => {
        setIsEnglish(!isEnglish);
    };

    const rules = {
        russian: [
            "Нужно найти убийцу.",
            "В свой ход вы можете либо провести проверку 4 персон, либо арестовать убийцу",
            "Убийца убивает каждый день одну персону и чтобы вас запутать меняет местами персон",
            "Он может переместить либо ряд, либо строку в любую сторону",
            "Убийца может убивать только своих соседей",
            "Арестуйте убийцу, пока он не убил 5 персон, иначе вы проиграли"
        ],
        english: [
            "You need to find the killer",
            "On your turn, you can either check 4 characters or arrest the killer",
            "The killer kills one character each day and to confuse you, swaps characters",
            "He can move either a row or a column in any direction",
            "A killer can only kill his neighbors",
            "Arrest the killer before they kill 5 characters, or you lose"
        ]
    };

    return (
        <>
            {visible && (
                <div className="overlay">
                    <div className="message-container">
                    <h2>{isEnglish ? "Rules of the game" : "Правила игры"} </h2>
                        <ul>
                            {(isEnglish ? rules.english : rules.russian).map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                        <div className='buttons-wrapper'>
                        <button className="close-button" onClick={handleClose}>
                            Start
                        </button>
                        <button className="translate-button" onClick={handleTranslate}>
                            {isEnglish ? 'Перевести' : 'Translate'}
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RulesModalBox;