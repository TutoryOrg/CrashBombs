import { userReducer } from "./user";
import { useDispatch } from "react-redux";
import { type ThunkDispatch, configureStore, combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
	user: userReducer,
});

export const emptyStore = configureStore({ reducer: rootReducer });

const _getDispatch = () => emptyStore.dispatch;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof _getDispatch>;

export const useAppDispatch = (): ThunkDispatch<RootState, void, any> => useDispatch<AppDispatch>();
