import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const updateLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    handleLike(updatedBlog)
  }

  const userFullName  = blog.user
                        ? (blog.user.name ? blog.user.name : blog.creator)
                        : "User unknown"

  if (showDetail) {
    return (
      <div className="blog">
        <div>
          {blog.title} {blog.author}
          &nbsp;
          <button onClick={toggleDetail}>hide details</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          &nbsp;
          <button onClick={updateLike}>like</button>
        </div>
        <div>{userFullName}</div>
      </div>
    )
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      &nbsp;
      <button onClick={toggleDetail}>view</button>
    </div>
  )
}

export default Blog