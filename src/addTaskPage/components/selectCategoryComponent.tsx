import styles from '../addTaskPage.module.css'
import classNames from 'classnames'

type SelectCategoryProps = {
  onCategorySelect: (category: string) => void
  selectedCategory: string
  showDropdown: boolean
  setShowDropdown: (show: boolean) => void
}

function SelectCategory({
  onCategorySelect,
  selectedCategory,
  showDropdown,
  setShowDropdown
}: SelectCategoryProps) {
  function toggleDropdownMenu(e: React.MouseEvent) {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  function handleCategorySelect(category: string, e: React.MouseEvent) {
    e.stopPropagation()
    onCategorySelect(category)
    setShowDropdown(false)
  }

  return (
    <>
      <div className="inputContainer">
        <label htmlFor="category" className={styles.label}>
          Category<span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Select task category"
          readOnly
          value={selectedCategory}
          onClick={toggleDropdownMenu}
          style={
            showDropdown
              ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
              : {}
          }
        />
        {showDropdown ? (
          <img
            src="/assets/icons/arrow_drop_down_close.svg"
            className={styles.dropwArrow}
            alt=""
          />
        ) : (
          <img
            src="/assets/icons/arrow_drop_down.png"
            alt=""
            className={styles.dropwArrow}
          />
        )}
        {showDropdown && (
          <div className={classNames(styles.dropdownMenu, styles.category)}>
            <div onClick={(e) => handleCategorySelect('Technical Task', e)}>
              Technical Task
            </div>
            <div onClick={(e) => handleCategorySelect('User Story', e)}>
              User Story
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SelectCategory
