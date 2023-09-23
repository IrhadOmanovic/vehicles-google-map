import classNames from 'classnames'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Vehicle.module.scss';
import { fetchSingleVehicle, selectStatus, selectVehicle } from './vehicleSlice';
import { useParams } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const VehiclePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchSingleVehicle(id))
  }, [])

  const vehicle = useSelector(selectVehicle);
  const status = useSelector(selectStatus)
  console.log(status)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if(status !== 'idle') {
    return (
      <div>
        <div className={classNames(styles.pageContainer)}>
          <div className={classNames(styles.row, styles.largerText)}>{`LOADING ...`}</div>
        </div>
      </div>
    )
  }

  if(!vehicle.id) {
    return (
      <div>
        <div className={classNames(styles.pageContainer)}>
          <div className={classNames(styles.row, styles.largerText)}>{`NO VEHICLE PRESENT WITH ID: ${id}`}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={classNames(styles.pageContainer)}>
        <div className={classNames(styles.row, styles.largerText)}>Vehicle Model: {vehicle.model}</div>
        <div className={classNames(styles.row)}>Vehicle ID: {vehicle.id}</div>
        <div className={classNames(styles.row)}>Vehicle Registration ID: {vehicle.reg_id}</div>
      </div>

      {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName={'map'}
            center={{ lat : Number(vehicle.lat), lng : Number(vehicle.lon) }}
            zoom={12}
            mapContainerStyle={{
              width : "50vw",
              height : "50vh",
              display: 'flex',
              justifyContent: "center",
              transform: "translate(50%, 0)"
            }}
          >
            <MarkerF
              visible={vehicle.enabled}
              key={vehicle.id}
              position={{ lat : Number(vehicle.lat), lng : Number(vehicle.lon) }}
            />
          </GoogleMap>
        )}
    </div>
  );
}

export default VehiclePage