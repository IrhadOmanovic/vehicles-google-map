import axiosInstance from '../../lib/axiosInstance';

// A mock function to mimic making an async request for data
export const fetchVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles')

    return { error : null, vehicles : response.data }
  } catch (error) {
    return { error }
  }
}

export const fetchEnabledVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles?enabled=true')

    return { error : null, enabledVehicles : response.data }
  } catch (error) {
    return { error }
  }
}

export const addVehicle = async ({ model, reg_id, lat, lon, enabled }) => {
  try {
    const response = await axiosInstance.post(`/vehicles`, { model, reg_id, lat, lon, enabled })

    return { error : null, vehicle : response.data }
  } catch (error) {
    return { error }
  }
}

export const editVehicle = async ({ model, reg_id, lat, lon, enabled, id }) => {
  try {
    const response = await axiosInstance.patch(`/vehicles/${id}`, { model, reg_id, lat, lon, enabled, id })

    return { error : null, vehicle : response.data }
  } catch (error) {
    return { error }
  }
}

export const deleteVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vehicles/${id}`)

    return { error : null, vehicle : response.data, id }
  } catch (error) {
    return { error }
  }
}

export const fetchSingleVehicle = async (id) => {
  try {
    const response = await axiosInstance.get(`/vehicles/${id}`)

    return { error : null, vehicle : response.data, id }
  } catch (error) {
    return { error }
  }
}