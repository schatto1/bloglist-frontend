import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Blog = ({ blogs, handleLike, handleRemove, currentUser }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id )

  if (!blog) {
    return null
  }

  console.log(blog.comments)

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
      {blog.comments.length ? (
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>no comments</h3>
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
