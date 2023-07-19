import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Blogs = ({
  blogs,
  blogFormRef,
  createBlog,
}) => {
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm handleSubmit={createBlog} />
      </Togglable>
      <Table striped>
        <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </td>
            <td>
              {blog.author}
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      {/* {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}><span>{blog.title}</span> <span>{blog.author}</span></Link>
          &nbsp;
        </div>
      ))} */}
    </div>
  )
}

export default Blogs