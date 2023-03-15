import { useState } from 'react'

const Blog = ({blog}) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  console.log(blog)

  if (showDetail) {
    return (
      <div className="blog">
        <div>
          {blog.title} {blog.author}
          &nbsp;
          <button onClick={toggleDetail}>hide details</button>
        </div>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div></div>
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