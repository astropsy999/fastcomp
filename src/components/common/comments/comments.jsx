import React from "react";
import CommentsList from "./commentsList.jsx";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm.jsx";
import { useComments } from "../../../hooks/useComments.jsx";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const handleRemoveComment = (id) => {
        removeComment(id);
        // API.comments.remove(id).then((id) => {
        //     setComments(comments.filter((c) => c._id !== id));
        // });
    };

    const handleSubmit = (data) => {
        createComment(data);
        // API.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>

            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Коментарі</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
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
