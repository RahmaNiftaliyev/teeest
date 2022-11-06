import { createSlice, nanoid } from '@reduxjs/toolkit';


const initialState = {
  branch: null,
  treatment: null,
  category: null,
  pricingOption: null,
  employee: null,
  date: null,
  time: null,
  duration: null,
  eventTreatments: [],
  totalServices: [{
    id: nanoid(),
    status: 'PENDING',
    branch: null,
    treatment: null,
    category: null,
    pricingOption: null,
    employee: null,
    date: null,
    time: null,
    duration: null,
  }]
};

const bookingSlice = createSlice({
  name: 'bookingSlice',
  initialState,
  reducers: {
    selectBranch: (state, action) => {
      state.branch = action.payload;
    },
    selectTreatment: (state, action) => {
      state.treatment = action.payload;
    },
    selectCategory: (state, action) => {
      state.category = action.payload;
    },
    selectPricingOption: (state, action) => {
      state.pricingOption = action.payload;
    },
    selectEmployee: (state, action) => {
      state.employee = action.payload;
    },
    selectDate: (state, action) => {
      state.date = action.payload;
    },
    selectTime: (state, action) => {
      state.time = action.payload;
    },
    selectDuration: (state, action) => {
      state.duration = action.payload;
    },
    addEventTreatments: (state, action) => {
      let treatment = {
        id: nanoid(),
        treatmentName: state.treatment.name,
        selectedBranch: state.branch.name,
        employeeId: state.employee.id,
        employeeName: state.employee.name,
        employeeSurname: state.employee.surname,
        pricingOptionId: state.pricingOption.id,
        reserveTime: state.time,
        reserveDate: state.date,
        treatmentId: state.treatment.id,
        price: state.pricingOption.price,
        specialPrice: state.pricingOption.specialPrice,
        priceType: state.pricingOption.priceType,
        duration: state.duration,
      };

      const individualPricingEmployeeIds = state.pricingOption.employees.map((emp) => emp.employeeId);

      if (individualPricingEmployeeIds.includes(state.employee.id)) {
        const index = state.pricingOption.employees.findIndex(
          (poe) => poe.employeeId === state.employee.id,
        );
        treatment = {
          ...treatment,
          price: state.pricingOption.employees[index].price,
          specialPrice: state.pricingOption.employees[index].specialPrice,
          priceType: state.pricingOption.employees[index].priceType,
          duration: state.pricingOption.employees[index].duration,
        };
      }

      state.eventTreatments = [...state.eventTreatments, treatment]
    },
    deleteTreatment: (state, action) => {
      state.eventTreatments = state.eventTreatments.filter(event => event.id !== action.payload);
    }, 
    addEventsToTotal: (state, action) => {
      let emptyValue = {
        id: nanoid(),
        status: 'PENDING',
        branch: state.branch,
        treatment: null,
        category: null,
        pricingOption: null,
        employee: null,
        date: null,
        time: null,
        duration: null,
      }

      let propertyName = action.payload[0];
      let propertyValue = action.payload[1];

      let statuses = state.totalServices.map(services => services.status);

      let totalServs = state.totalServices.map((service) => {
        if (service.status === 'PENDING') {
          return { ...service, [propertyName]: propertyValue }
        }
        return service;
      });

      state.totalServices = totalServs;

      if (!statuses.includes('PENDING')) {
        state.totalServices = [...state.totalServices, emptyValue];
      }
    },
    resetStates: (state) => {
      state.branch = null;
      state.treatment = null;
      state.category = null;
      state.pricingOption = null;
      state.employee = null;
      state.date = null;
      state.time = null;
      state.duration = null;
      state.eventTreatments = [];
      state.totalServices = [{
        id: nanoid(),
        status: 'PENDING',
        branch: null,
        treatment: null,
        category: null,
        pricingOption: null,
        employee: null,
        date: null,
        time: null,
        duration: null,
      }]
    }
  },
})


export const {
  selectBranch,
  selectCategory,
  selectTreatment,
  selectPricingOption,
  selectEmployee,
  selectDate,
  selectTime,
  selectDuration,
  addEventTreatments,
  addEventsToTotal,
  resetStates,
  deleteTreatment
} = bookingSlice.actions;

export default bookingSlice.reducer