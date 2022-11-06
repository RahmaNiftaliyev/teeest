import { getOrganizationInfo } from "../services/OrganizationInfo";
import { salonBranchesApi } from "../services/SalonBranchesApi";
import { configureStore } from "@reduxjs/toolkit";
import { treatmentsApi } from "../services/TreatmentsApi";
import { blockTimesApi } from "../services/BlockTimesApi";
import { sendEventsApi } from "../services/SendEventsApi";
import { statisticApi } from "../services/StatisticApi";
import { getClientApi } from "../services/ClientInfoApi";
import { employeeApi } from "../services/EmployeeApi";
import { loginSlice } from "../services/LoginApi";
import { branchesApi } from "../services/BranchApi";
import { salonsApi } from "../services/SalonsApi";
import { authApi } from "../services/AuthApi";

import searchSlice from "../features/searchSlice";
import loaderSlice from "../features/loaderSlice";
import loginReducer from "../features/loginSlice";
import loadingSpinnerReducer from "../features/loadingSpinnerSlice";
import langReducer from "../features/langSlice";
import bookingSlice from '../features/bookingSlice'
import languageReducer from "../features/languageSlice";


const store = configureStore({
  reducer: {
    [loginSlice.reducerPath]: loginSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [salonsApi.reducerPath]: salonsApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer,
    [salonBranchesApi.reducerPath]: salonBranchesApi.reducer,
    [treatmentsApi.reducerPath]: treatmentsApi.reducer,
    [blockTimesApi.reducerPath]: blockTimesApi.reducer,
    [sendEventsApi.reducerPath]: sendEventsApi.reducer,
    [getClientApi.reducerPath]: getClientApi.reducer,
    [branchesApi.reducerPath]: branchesApi.reducer,
    [getOrganizationInfo.reducerPath]: getOrganizationInfo.reducer,
    login: loginReducer,
    search: searchSlice,
    loading: loaderSlice,
    loadingSpinner: loadingSpinnerReducer,
    lang: langReducer,
    bookingSlice: bookingSlice,
    language: languageReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      employeeApi.middleware,
      salonsApi.middleware,
      statisticApi.middleware,
      salonBranchesApi.middleware,
      treatmentsApi.middleware,
      blockTimesApi.middleware,
      sendEventsApi.middleware,
      branchesApi.middleware,
      getClientApi.middleware,
      getOrganizationInfo.middleware
    );
  },
});

export default store;
