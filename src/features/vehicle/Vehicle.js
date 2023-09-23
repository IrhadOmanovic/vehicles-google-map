import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from 'react-redux';

import styles from './Vehicle.module.scss';
import { VehicleItem } from '../../components/vehicleItem';
import { addVehicle, deleteVehicle, editVehicle, fetchEnabledVehicles, fetchVehicles, selectEnabledVehicles, selectVehicles } from './vehicleSlice';
import Form from '../../components/form';

export function Vehicle() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState({});
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    dispatch(fetchVehicles())
    dispatch(fetchEnabledVehicles())
  }, [dispatch])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  //Center at Sarajevo
  const center = useMemo(() => ({ lat: 43.880247, lng: 18.252771 }), []);

  const vehicles = useSelector(selectVehicles);
  const enabledVehicles = useSelector(selectEnabledVehicles);

  const onMapClick = (e) => {
    setVehicleData({
      lat: e.latLng.lat(),
      lon: e.latLng.lng()
    });
    setIsOpen(true)
    setAddHeadline()
  };

  const setEditHeadline = () => {
    setHeadline('Edit Vehicle')
  }

  const setAddHeadline = () => {
    setHeadline('Add New Vehicle')
  };

  const onClose = () => setIsOpen(false);

  const handleSubmit = (data) => {
    headline === 'Edit Vehicle' && dispatch(editVehicle({
      model   : data.model,
      regId   : data.reg_id,
      lat     : data.lat,
      lon     : data.lon,
      enabled : data.enabled,
      id      : vehicleData.id
    }));

    'Add New Vehicle' === headline && dispatch(addVehicle({
      model   : data.model,
      regId   : data.reg_id,
      lat     : data.lat,
      lon     : data.lon,
      enabled : data.enabled,
    }));

    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.row, styles.maintext)}>
      <div className={classNames(styles.column, styles.vehiclesContainer)}>
        <div className={classNames(styles.maintext, styles.headline)}>Heading</div>
        {vehicles.map((vehicle => {
          const handleDeleteClick = () => dispatch(deleteVehicle(vehicle.id))
          const toggleVehicleVisibility = () => dispatch(editVehicle({ ...vehicle, enabled : !vehicle.enabled }))
          const onEditClick = () => {
            setIsOpen(true)
            setVehicleData(vehicle)
            setEditHeadline()
          }

          return (
            <VehicleItem
              onDeleteClick={handleDeleteClick} 
              toggle={toggleVehicleVisibility}
              onEditClick={onEditClick}
              enabled={vehicle.enabled}
              key={`${vehicle.id}-listItem`}
            >
              {vehicle.model}
            </VehicleItem>
          )
        }))}
      </div>
      <div className={classNames(styles.column)}>
        {isOpen && (
          <Form
            headline={headline}
            initModel={vehicleData.model}
            initRegistration={vehicleData.reg_id}
            initLat={vehicleData.lat}
            initLon={vehicleData.lon}
            initEnabled={vehicleData.enabled}
            onClose={onClose}
            onSubmit={handleSubmit}
          />
        )}
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName={'map'}
            center={center}
            zoom={12}
            onClick={onMapClick}
          >
            {enabledVehicles.map((vehicle => {
              const position = { lat : Number(vehicle.lat), lng : Number(vehicle.lon) };
              const labelOptions = { text : vehicle.model, className : styles.markerLabel };
              const onDragEnd = (e) => dispatch(editVehicle({ ...vehicle, lat: e.latLng.lat(), lon: e.latLng.lng() }));

              return (
                <MarkerF
                  draggable
                  options={{
                    label : labelOptions
                  }}
                  onDragEnd={onDragEnd}
                  visible={vehicle.enabled}
                  key={vehicle.id}
                  position={position}
                  icon={{ url: (require('../../components/icons/locationIcon.svg').default) }}
                />
              )
            }))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
