import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professions.service";
import { isOutdated } from "../utils/isOutdated";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload;
            // state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecieved, professionsRequestFiled } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());

        try {
            const { content } = await professionService.get();
            dispatch(professionsRecieved(content));
        } catch (error) {
            dispatch(professionsRequestFiled(error.message));
        }
    }
};
export const getProfessions = () => (state) => {
    return state.professions.entities;
};

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionById = (professionId) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((p) => p._id === professionId);
    }
};

export default professionsReducer;
