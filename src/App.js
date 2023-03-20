import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('successfully logged in, welcome!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(newBlog)
      const blogCreator  = returnedBlog.user.name ? returnedBlog.user.name : user.name
      returnedBlog.creator = blogCreator
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage('a new blog ' + title + ' by ' + author + ' added')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage('oops')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (updatedBlog) => {
    await blogService.update(updatedBlog)
    const updatedBlogs = [...blogs]
    const blogToUpdate = updatedBlogs.find((blog) => blog.id === updatedBlog.id)
    blogToUpdate.likes += 1
    setBlogs( updatedBlogs.sort((a, b) => b.likes - a.likes) )
  }

  const handleRemove = async (blogToRemove) => {
    const confirmRemoval = window.confirm(`Are you sure you want to remove "${blogToRemove.title}" by ${blogToRemove.author}?`)
    if (confirmRemoval) {
      try {
        await blogService.remove(blogToRemove)
        const lessBlogs = blogs.filter((blog) => blog.id !== blogToRemove.id)
        setBlogs(lessBlogs)
        setSuccessMessage(blogToRemove.title + ' by ' + blogToRemove.author + ' deleted')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('oops')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setSuccessMessage('successfully logged out, bye!')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:&nbsp;
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:&nbsp;
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification type="error" message={errorMessage} />
        <Notification type="success" message={successMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification type="error" message={errorMessage} />
      <Notification type="success" message={successMessage} />
      <p>
        {user.name} logged in
        &nbsp;
        <button type="submit" onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new note" ref={blogFormRef}>
        <BlogForm
          handleSubmit={createBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          currentUser={user}
        />
      )}
    </div>
  )
}

export default App