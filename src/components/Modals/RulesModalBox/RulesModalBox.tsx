import { useState } from 'react';
import './RulesModalBox.css';

const RulesModalBox = () => {
    const [visible, setVisible] = useState(true);
    const [isEnglish, setIsEnglish] = useState(true);

    const rules = {
        russian: {
            title: 'Правила игры',
            intro: 'Найдите убийцу раньше, чем он уничтожит слишком много персонажей.',
            steps: [
                'Каждый день выберите одно действие: проверьте группу из 4 персонажей или попробуйте арестовать убийцу.',
                'Кнопка «Проверить» подсвечивает квадрат 2×2. Кнопка «Арестовать» позволяет выбрать одного персонажа.',
                'После хода нажмите «Следующий день». Убийца убьёт одного из соседних персонажей и может переместить целую строку или колонку.',
                'Убийца может убивать только персонажей, которые находятся рядом с ним.',
                'Арестуйте убийцу до того, как погибнут 5 персонажей. Иначе вы проиграете.'
            ],
            close: 'Начать игру',
            translate: 'English'
        },
        english: {
            title: 'How to play',
            intro: 'Find the killer before too many characters are eliminated.',
            steps: [
                'Each day, choose one action: inspect a group of 4 characters or try to arrest the killer.',
                'Use “Inspect” to highlight a 2×2 group. Use “Arrest” to select one character.',
                'Press “Next day” after your move. The killer will eliminate one neighbor and may shift a whole row or column.',
                'The killer can only eliminate characters next to them.',
                'Arrest the killer before 5 characters are eliminated, or you lose.'
            ],
            close: 'Start game',
            translate: 'Русский'
        }
    };

    const currentRules = isEnglish ? rules.english : rules.russian;

    return (
        <>
            {visible && (
                <div className="overlay">
                    <div className="message-container" role="dialog" aria-modal="true" aria-labelledby="rules-title">
                        <p className="rules-eyebrow">{isEnglish ? 'FIND THE KILLER' : 'НАЙДИ УБИЙЦУ'}</p>
                        <h2 id="rules-title">{currentRules.title}</h2>
                        <p className="rules-intro">{currentRules.intro}</p>
                        <ol className="rules-list">
                            {currentRules.steps.map((rule) => (
                                <li key={rule}>{rule}</li>
                            ))}
                        </ol>
                        <div className="rules-actions">
                            <button className="close-button" type="button" onClick={() => setVisible(false)}>
                                {currentRules.close}
                            </button>
                            <button className="translate-button" type="button" onClick={() => setIsEnglish(!isEnglish)}>
                                {currentRules.translate}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RulesModalBox;