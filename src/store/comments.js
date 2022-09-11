import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const commentsCreateRequested = createAction("comments/commentCreateRequested");
const commentsRemoveRequested = createAction("comments/commentRemoveRequested");
const commentsCreateFailed = createAction("comments/commentCreateFailed");

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecieved,
    commentsRequestFiled,
    commentCreated,
    commentRemoved
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());

    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const getComments = () => (state) => {
    return state.comments.entities;
};

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(commentsCreateRequested(payload));
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getCurrentUserId()(getState())
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsCreateFailed(error.message));
    }
};

export const removeComment = (payload) => async (dispatch) => {
    console.log("payload: ", payload);
    dispatch(commentsRemoveRequested());
    try {
        const { content } = await commentService.removeComment(payload);
        if (content === null) {
            dispatch(commentRemoved(payload));
        }
    } catch (error) {
        dispatch(commentsCreateFailed(error.message));
    }
};

export default commentsReducer;
