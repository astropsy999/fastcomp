import React, { useEffect } from "react";
import CommentsList from "./commentsList.jsx";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../../store/comments.js";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>

            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Коментарі</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Зачекайте..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    comments: PropTypes.array
};

export default Comments;
