import { configureStore } from '@reduxjs/toolkit';
import Slicers from './Slicer'; 

export type RootState = ReturnType<typeof StoreComponent.getState>;
export type AppDispatch = typeof StoreComponent.dispatch;

const StoreComponent = configureStore({
  reducer: {
    Ajio: Slicers,
  },
});

export default StoreComponent;
