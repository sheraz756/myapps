import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    avatar: '',
    email:'',
    dob:'',
    jobtitle:'',
    // department:'',
    // organization:'',
    // country:'',
    // workloction:''
};

export const activateSlice = createSlice({
    name: 'activate',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setDOB: (state, action) => {
            state.dob = action.payload;
        },
        setJobTitle: (state, action) => {
            state.jobtitle = action.payload;
        },
        setDepartment: (state, action) => {
            state.department = action.payload;
        },
        setOrganizaion: (state, action) => {
            state.organization = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        // setWrokLocation: (state, action) => {
        //     state.workloction = action.payload;
        //  },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
    },
});

export const { setName, setAvatar ,setEmail ,setDOB,setJobTitle,setDepartment,setOrganizaion,setCountry} = activateSlice.actions;

export default activateSlice.reducer;