import PropTypes from "prop-types"
import { useState } from "react"

import styles from "./Form.module.scss"
import Input from "../input"
import Checkbox from "../checkbox"
import Button from "../button"
import Close from "../icons/Close"
// import { floatNumberRegex } from "../../lib/utils/regex"

const Form =({
  headline,
  initModel,
  initRegistration,
  initLat,
  initLon,
  initEnabled,
  onClose,
  onSubmit
}) => {
  const [model, setModel] = useState(initModel)
  const [reg_id, setRegistration] = useState(initRegistration)
  const [lat, setLat] = useState(Number(initLat))
  const [lon, setLon] = useState(Number(initLon))
  const [enabled, setEnabled] = useState(initEnabled)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ reg_id, lon, lat, model, enabled })
  }

  const handleModelOnChange = (e) => {
    setModel(e.target.value)
  }

  const handleLatOnChange = (e) => {
    const value = e.target.value
    setLat(value)
  }

  const handleLngOnChange = (e) => {
    const value = e.target.value
    setLon(value)
  }

  const handleRegistrationOnChange = (e) => {
    setRegistration(e.target.value)
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.headerContainer}>
          <div className={styles.headline}>{headline}</div>
          <Close className={styles.close} onClick={() => onClose?.()} />
        </div>
        <Input value={model} onChange={handleModelOnChange} labelText="Vehicle Model"/>
        <Input value={reg_id} onChange={handleRegistrationOnChange} labelText="Vehicle reg_id ID"/>
        <div className={styles.latLenContainer}>
          <Input value={lat} onChange={handleLatOnChange} labelClassName={styles.label} labelText="Latitude"/>
          <Input value={lon} onChange={handleLngOnChange} labelClassName={styles.label} labelText="Longitude"/>
        </div>
        <Checkbox enabled={initEnabled} onClick={setEnabled} labelText="Enabled" />
        <Button className={styles.button} value="Save" />
      </form>
    </div>
  )
}

Form.propTypes = {
  headline          : PropTypes.string,
  initModel         : PropTypes.string,
  initRegistration  : PropTypes.string,
  initLat           : PropTypes.number,
  initLon           : PropTypes.number,
  initEnabled       : PropTypes.bool,
  onSubmit          : PropTypes.func
}

Form.defaultProps = {
  initModel         : '',
  initRegistration  : '',
  initEnabled       : false
}

export default Form