import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Blog = ({ blogs, handleLike, handleRemove, handleComment, currentUser }) => {
  const [comment, setComment] = useState("");

  const id = useParams().id
  const blog = blogs.find(b => b.id === id )

  if (!blog) {
    return null
  }

  const addComment = (event) => {
    event.preventDefault();

    const updatedComments = blog.comments
    updatedComments.push(comment)

    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      comments: updatedComments
    };

    handleComment(updatedBlog);
    setComment("");
  };

  const updateLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    handleLike(updatedBlog);
  };

  const removeBlog = () => {
    const blogToRemove = {
      ...blog,
      user: blog.user.id,
    };
    handleRemove(blogToRemove);
  };

  const userFullName = blog.user
    ? blog.user.name
      ? blog.user.name
      : blog.creator
    : "unknown user";

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <div><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></div>
      <div>
        <span id="likeCount">{blog.likes}</span>
        &nbsp;
        <button onClick={updateLike} id="likeButton">
          like
        </button>
      </div>
      <div>added by {userFullName}</div>
      {blog.user && blog.user.username === currentUser.username ? (
        <div>
          <button onClick={removeBlog} id="removeButton">
            remove
          </button>
        </div>
      ) : (
        ""
      )}
      <h3>comments</h3>
      <div>
        <form onSubmit={addComment}>
          <input
            type="text"
            value={comment}
            name="Comment"
            placeholder="Write a comment"
            onChange={({ target }) => setComment(target.value)}
            id="comment"
          />
          <button type="submit" id="comment">
            add comment
          </button>
        </form>
      </div>
      {blog.comments.length ? (
        <div>
          <ul>
            {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>no comments yet! Add a comment above.</p>
      )}
    </div>
  );
};

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Blog;
