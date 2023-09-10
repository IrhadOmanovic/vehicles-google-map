import classNames from "classnames"

import styles from "./Input.module.scss"

const Input =({
  labelText,
  labelClassName,
  ...props
}) => {
  return (
    <label className={classNames(styles.label, labelClassName)}>
      {labelText}
      <input {...props} className={classNames(styles.input, props.className)}/>
    </label>
  )
}

export default Input