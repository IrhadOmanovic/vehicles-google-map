
import classNames from "classnames"

import styles from "./Button.module.scss"

const Button =({...props}) => {
  return <input {...props} className={classNames(styles.button, props.className)} type="submit" />
}

export default Button