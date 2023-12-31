import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchVehicles as fetchVehiclesAPI,
  addVehicle as addVehicleAPI,
  editVehicle as editVehicleAPI,
  deleteVehicle as deleteVehicleAPI,
  fetchEnabledVehicles as fetchEnabledVehiclesAPI,
  fetchSingleVehicle as fetchSingleVehicleAPI,
} from './vehicleAPI';

const initialState = {
  error: null,
  vehicles : [],
  vehicle : {},
  enabledVehicles: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await fetchVehiclesAPI();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchEnabledVehicles = createAsyncThunk(
  'vehicles/fetchEnabledVehicles',
  async () => {
    const response = await fetchEnabledVehiclesAPI();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async ({ model, regId, lat, lon, enabled }) => {
    const response = await addVehicleAPI({ model, lat, lon, enabled, 
      reg_id : regId,
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const editVehicle = createAsyncThunk(
  'vehicles/editVehicle',
  async (data) => {
    const { model, regId, lat, lon, enabled, id } = data
    const response = await editVehicleAPI({ model, lat, lon, enabled, id, 
      reg_id : regId,
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async (id) => {
    const response = await deleteVehicleAPI(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchSingleVehicle = createAsyncThunk(
  'vehicles/fetchSingleVehicle',
  async (id) => {
    const response = await fetchSingleVehicleAPI(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.vehicles = action.payload.vehicles;
        state.error = action.payload.error
      })
      .addCase(fetchEnabledVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnabledVehicles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.enabledVehicles = action.payload.enabledVehicles;
        state.error = action.payload.error
      })
      .addCase(addVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        if(!action.payload.error) {
          state.vehicles.push(action.payload.vehicle)
          action.payload.vehicle.enabled && state.enabledVehicles.push(action.payload.vehicle)
        }
        
        state.status = 'idle';
        state.error = action.payload.error
      })
      .addCase(editVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editVehicle.fulfilled, (state, action) => {
        let vehicleIndex
        let enabledVehicleIndex

        if(!action.payload.error) {
          const vehicleId = action.payload.vehicle.id
          const enabled = action.payload.vehicle.enabled

          vehicleIndex = state.vehicles.findIndex(vehicle => vehicle.id === vehicleId)
          enabledVehicleIndex = state.enabledVehicles.findIndex(vehicle => vehicle.id === vehicleId)

          //Vehicle is changing from visible to hidden
          if(!enabled && enabledVehicleIndex !== -1) {
            state.enabledVehicles.splice(enabledVehicleIndex, 1)
          } if(enabled && enabledVehicleIndex === -1) { //From hidden to visible
            state.enabledVehicles.push(action.payload.vehicle)
          } else if (enabledVehicleIndex !== -1) {
            // Vehicle was visible and remains visible
            state.enabledVehicles[enabledVehicleIndex] = action.payload.vehicle;
          }
        }
        
        state.status = 'idle';
        state.vehicles[vehicleIndex] = action.payload.vehicle;
        state.error = action.payload.error
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        let vehicleIndex
        let enabledVehicleIndex
        const newVehiclesArray = [...state.vehicles]
        const newEnabledVehiclesArray = [...state.enabledVehicles]
        if(!action.payload.error) {
          const vehicleId = action.payload.id
          vehicleIndex = state.vehicles.findIndex(vehicle => vehicle.id === vehicleId)
          enabledVehicleIndex = state.enabledVehicles.findIndex(vehicle => vehicle.id === vehicleId)
          newVehiclesArray.splice(vehicleIndex, 1)
          enabledVehicleIndex && newEnabledVehiclesArray.splice(vehicleIndex, 1)
        }
        
        state.status = 'idle';
        state.vehicles = newVehiclesArray;
        state.enabledVehicles = newEnabledVehiclesArray;
        state.error = action.payload.error
      })
      .addCase(fetchSingleVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleVehicle.fulfilled, (state, action) => {
        state.status = 'idle';
        if(!action.payload.error) {
          state.vehicle = action.payload.vehicle;
        }
        state.error = action.payload.error
      });
  },
});

// export const { increment, decrement, incrementByAmount } = vehicleSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectVehicles = (state) => state.vehicles.vehicles;
export const selectEnabledVehicles = (state) => state.vehicles.enabledVehicles;
export const selectVehicle = (state) => state.vehicles.vehicle;
export const selectStatus = (state) => state.vehicles.status;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default vehicleSlice.reducer;
