import { useState, useEffect } from 'react';
import styles from '../addTaskPage.module.css';

interface AddSubtaskProps {
    subtasks: string[];
    setSubtasks: (subtasks: string[]) => void;
}

function AddSubtask({ subtasks, setSubtasks }: AddSubtaskProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [editSubtaskValue, setEditSubtaskValue] = useState<string>('');
    const [inputSelected, setInputSelected] = useState<boolean>(false);
    const [editingSubtaskIndex, setEditingSubtaskIndex] = useState<number | null>(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function resetInput() {
        setInputValue('');
    }

    function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSubtask();
        }
    }

    function handleEditSubtask(index: number) {
        setEditingSubtaskIndex(index);
        setEditSubtaskValue(subtasks[index]);
    }

    function handleSubtaskInput(event: React.ChangeEvent<HTMLInputElement>) {
        setEditSubtaskValue(event.target.value);
    }

    function handleSaveEdit(index: number) {
        const updatedSubtasks = subtasks.map((subtask, i) =>
            i === index ? editSubtaskValue.trim() : subtask
        );
        setSubtasks(updatedSubtasks);
        setEditingSubtaskIndex(null);
        setEditSubtaskValue('');
    }

    function handleDeleteSubtask(index: number) {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        setSubtasks(updatedSubtasks);
        setEditingSubtaskIndex(null);
        setEditSubtaskValue('');
    }

    function addSubtask() {
        if (inputValue.trim()) {
            setSubtasks([...subtasks, inputValue.trim()]);
            resetInput();
        }
    }

    useEffect(() => {
        setInputSelected(inputValue.length > 0);
    }, [inputValue]);

    return (
        <>
            <div className="inputContainer">
                <label htmlFor="subtask" className={styles.label}>Subtasks</label>
                <input
                    type="text"
                    name="subtask"
                    id="subtask"
                    placeholder="Add new subtask"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                />
                {inputSelected ? (
                    <div className={styles.addIconContainer}>
                        <img
                            src="./assets/icons/addTask_close.svg"
                            alt="Reset"
                            onClick={resetInput}
                            className={styles.icon}
                        />
                        <span className={styles.seperatorSmall}></span>
                        <img
                            src="./assets/icons/addTask_check.svg"
                            alt="Add"
                            onClick={addSubtask}
                            className={styles.icon}
                        />
                    </div>
                ) : (
                    <img className={styles.addIcon} src="./assets/icons/add.svg" alt="Add Subtask" />
                )}
            </div>
            {subtasks.length > 0 && (
                <div className={styles.subtaskContainer}>
                    <ul className={styles.styledList}>
                        {subtasks.map((subtask, index) => (
                            editingSubtaskIndex === index ? (
                                <li key={index} className={styles.editingItem}>
                                    <input
                                        type="text"
                                        value={editSubtaskValue}
                                        onChange={handleSubtaskInput}
                                        onBlur={() => handleSaveEdit(index)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(index)}
                                        autoFocus
                                    />
                                    <div className={styles.editSubtaskContainer}>
                                        <img
                                            src="./assets/icons/addTask_delete.png"
                                            alt="Delete"
                                            className={styles.icon}
                                            onClick={() => handleDeleteSubtask(index)}
                                        />
                                        <div className={styles.seperatorSmall}></div>
                                        <img
                                            src="./assets/icons/addTask_check.svg"
                                            alt="Save"
                                            className={styles.icon}
                                            onClick={() => handleSaveEdit(index)}
                                        />
                                    </div>
                                </li>
                            ) : (
                                <li key={index} onClick={() => handleEditSubtask(index)}>
                                    <span className={styles.bullet}></span>
                                    <span className={styles.content}>{subtask}</span>
                                    <div className={styles.editSubtaskContainer}>
                                        <img
                                            src="./assets/icons/addTask_delete.png"
                                            alt="Delete"
                                            className={styles.icon}
                                            onClick={() => handleDeleteSubtask(index)}
                                        />
                                        <div className={styles.seperatorSmall}></div>
                                        <img
                                            src="./assets/icons/addTask_check.svg"
                                            alt="Edit"
                                            className={styles.icon}
                                        />
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default AddSubtask;
