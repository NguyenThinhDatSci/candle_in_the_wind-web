import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
	createCommentAPI,
	updateCommentAPI,
	deleteCommentAPI
}
	from "../../services/commentService";

import "./comment.css"



export default function Comments(props) {
	const [backendComments, setBackendComments] = useState([]);

	useEffect(() => {
		setBackendComments(props.commentData)
	})

	// console.log(postId)

	const addComment = async (content) => {
		await createCommentAPI(content, props.currentUserId, props.postId).then((response) => {
			console.log(response)
		});
	};

	const updateComment = async (content, commentId) => {
		await updateCommentAPI(content, commentId).then((response) => {
			// const updatedBackendComments = backendComments.map((backendComment) => {
			// 	if (backendComment.id === commentId) {
			// 		return { ...backendComment, content: content };
			// 	}
			// 	return backendComment;
			// });
			// setBackendComments(updatedBackendComments);
			console.log(response)
		});
	}; 
	const deleteComment = async (commentId) => {
		console.log("is deleting!!")
		await deleteCommentAPI(commentId).then((response) => {
			// const updatedBackendComments = backendComments.filter(
			// 	(backendComment) => backendComment._id !== commentId
			// );
			// setBackendComments(updatedBackendComments);
			console.log(response)
		});
	};

	return (
		<div className="comments">
			<div className="comments-container">
				{backendComments.map((value) => (
					<Comment
						comment={value}
						deleteComment={deleteComment}
						updateComment={updateComment}
						currentUserId={props.currentUserId}
					/>
				))}
			</div>
			<CommentForm submitLabel="Write" handleSubmit={addComment} />
		</div>
	);
};