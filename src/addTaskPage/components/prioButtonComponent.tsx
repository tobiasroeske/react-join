import styles from '../addTaskPage.module.css'
import classNames from 'classnames'

type PrioButtonProps = {
  imgPath: string
  text: string
  isSelected: boolean
  classOnSelect: string
  onSelect: (prio: string) => void
}

function PrioButton({
  imgPath,
  text,
  isSelected,
  classOnSelect,
  onSelect
}: PrioButtonProps) {
  function handleSelect() {
    onSelect(text)
  }

  return (
    <div
      className={classNames(
        styles.prioBtn,
        isSelected && styles[classOnSelect]
      )}
      onClick={handleSelect}
    >
      <img src={imgPath} alt="" />
      {text}
    </div>
  )
}

export default PrioButton
