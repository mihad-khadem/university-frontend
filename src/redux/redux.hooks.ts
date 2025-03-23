// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "./store";

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// useAppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useAppSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
