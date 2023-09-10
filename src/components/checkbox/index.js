import classNames from "classnames"
import { useState } from "react"

import styles from "./Checkbox.module.scss"
import Checked from "../icons/Checked"

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
      {checked ? <Checked className={styles.checkboxIcon} /> : <div className={classNames(styles.checkbox)}/>}
      {labelText}
    </label>
  )
}

export default Checkbox