import classNames from "classnames"
import { useState } from "react"

import styles from "./Checkbox.module.scss"

const Checkbox =({
  labelText,
  labelClassName,
  onClick,
  enabled
}) => {
  const [checked, setIsChecked] = useState(enabled)

  const toggleChecked = () => {
    onClick?.(!checked)
    setIsChecked(!checked)
  }

  return (
    <label onClick={toggleChecked} className={classNames(styles.label, labelClassName)}>
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={checked} onChange={toggleChecked} className={classNames(styles.checkbox)}/>
      </div>
      {labelText}
    </label>
  )
}

export default Checkbox