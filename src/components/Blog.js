import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
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

  const removeBlog = () => {
    const blogToRemove = {
      ...blog,
      user: blog.user.id
    }
    handleRemove(blogToRemove)
  }

  const userFullName  = blog.user
    ? (blog.user.name ? blog.user.name : blog.creator)
    : 'User unknown'

  if (showDetail) {
    return (
      <div className="blog">
        <div>
          <span>{blog.title}</span> <span>{blog.author}</span>
          &nbsp;
          <button onClick={toggleDetail}>hide details</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <span id='likeCount'>{blog.likes}</span>
          &nbsp;
          <button onClick={updateLike} id='likeButton'>like</button>
        </div>
        <div>{userFullName}</div>
        {blog.user && blog.user.username === currentUser.username ?
          <div>
            <button onClick={removeBlog}>remove</button>
          </div>
          : ''}
      </div>
    )
  }

  return (
    <div className="blog">
      <span>{blog.title}</span> <span>{blog.author}</span>
      &nbsp;
      <button onClick={toggleDetail} id='viewButton'>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog