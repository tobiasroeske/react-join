import { useState } from "react";
import styles from '../addTaskPage.module.css';
import classNames from "classnames";

type SelectCategoryProps = {
    onCategorySelect: (category: string) => void,
    selectedCategory: string,
}

function SelectCategory({onCategorySelect, selectedCategory}: SelectCategoryProps) {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
   

    function toggleDropdownMenu() {
        setShowDropdown(!showDropdown);
    }

    function handleCategorySelect(category:string) {
        onCategorySelect(category);
        setShowDropdown(false);
    }

    return (
        <>
            <div className="inputContainer">
                <label htmlFor="category" className={styles.label}>Category<span className={styles.required}>*</span></label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Select task category"
                    readOnly
                    value={selectedCategory}
                    onClick={toggleDropdownMenu} />
                <img src="" alt="" />
                {showDropdown ? (
                    <img src="/assets/icons/arrow_drop_down_close.svg" className={styles.dropwArrow} alt="" />
                ) : (
                    <img src="/assets/icons/arrow_drop_down.png" alt="" className={styles.dropwArrow} />
                )}
                {showDropdown &&
                    <div className={classNames(styles.dropdownMenu, styles.category)}>
                        <div onClick={() => handleCategorySelect('Technical Task')}>Technical Task</div>
                        <div onClick={() => handleCategorySelect('User Story')} >User Story</div>
                    </div>}
            </div>

        </>

    );
}

export default SelectCategory;