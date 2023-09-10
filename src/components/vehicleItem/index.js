import React from 'react';
import styles from './VehicleItem.module.scss';
import PenIcon from '../icons/PenIcon';
import EyeIcon from '../icons/EyeIcon';
import TrashIcon from '../icons/TrashIcon';
import ClosedEyeIcon from '../icons/ClosedEyeIcon';

export function VehicleItem({
  enabled,
  onEditClick,
  onDeleteClick,
  toggle,
  ...props
}) {

  return (
    <div {...props} className={styles.row}>
      <div>{props.children}</div>
      <div className={styles.iconsContainer}>
        <PenIcon onClick={onEditClick} />
        {!enabled ? <ClosedEyeIcon onClick={toggle} /> : <EyeIcon onClick={toggle} />}
        <TrashIcon onClick={onDeleteClick} />
      </div>
    </div>
  )
}
