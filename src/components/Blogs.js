import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blog from "./Blog"

const Blogs = ({
  blogs,
  blogFormRef,
  createBlog,
  handleLike,
  handleRemove,
  userValue
}) => {
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm handleSubmit={createBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          currentUser={userValue}
        />
      ))}
    </div>
  )
}

export default Blogs