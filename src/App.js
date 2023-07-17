import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotificationDispatch } from "./NotificationContext";
import { useUserDispatch, useUserValue } from "./UserContext";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import userService from "./services/users"

const App = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const dispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const userValue = useUserValue();

  const setNotification = (message) => {
    dispatch({
      type: 'ON',
      notification: message
    })
    setTimeout(() => {
      dispatch({type: 'OFF'})
    }, 5000)
  }

  const setUser = (user) => {
    userDispatch({
      type: 'SET_USER',
      user: user
    })
  }

  const blogFormRef = useRef();

  const queryClient = useQueryClient()
  const { data: blogs = [] } = useQuery('blogs', blogService.getAll)
  const { data: users = [] } = useQuery('users', userService.getUsers)

  const createMutation = useMutation((newBlog) => blogService.create(newBlog), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs')
      blogFormRef.current.toggleVisibility()
      const successMessage = `a new blog ${data.title} by ${data.author} added`
      setNotification(successMessage)
    },
    onError: () => {
      const errorMessage = 'oops'
      setNotification(errorMessage)
    },
  })

  const updateMutation = useMutation((updatedBlog) => blogService.update(updatedBlog), {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )

  const removeMutation = useMutation((blog) => blogService.remove(blog), {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const createBlog = async (newBlog) => {
    try {
      await createMutation.mutateAsync(newBlog)
    } catch (exception) {
      console.error(exception)
    }
  };

  const handleLike = async (updatedBlog) => {
    await updateMutation.mutateAsync(updatedBlog)
  };

  const handleRemove = async (blogToRemove) => {
    const confirmRemoval = window.confirm(
      `Are you sure you want to remove "${blogToRemove.title}" by ${blogToRemove.author}?`,
    );
    if (confirmRemoval) {
      try {
        await removeMutation.mutateAsync(blogToRemove)
        const successMessage = blogToRemove.title + " by " + blogToRemove.author + " deleted"
        setNotification(successMessage)
      } catch (exception) {
        const errorMessage = "oops"
        setNotification(errorMessage)
      }
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      setUser(user)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      const successMessage = "successfully logged in, welcome!"
      setNotification(successMessage)
    } catch (exception) {
      const errorMessage = "wrong credentials"
      setNotification(errorMessage)
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    userDispatch({type: "CLEAR_USER"});
    setUsername("");
    setPassword("");
    setNotification("successfully logged out, bye!");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:&nbsp;
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password:&nbsp;
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  if (userValue === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    );
  }


  return (
    <Router>
      <div>
        {/* <Link  to="/">home</Link> */}
        <Link  to="/blogs">blogs</Link>
        <Link  to="/users">users</Link>
      </div>
      <div>
        <h2>blogs app</h2>
        <Notification />
        <p>
          {userValue.user.name} logged in &nbsp;
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
        </p>
      </div>
      <Routes>
        <Route path="/blogs" element={<Blogs blogs={blogs}
                                                  blogFormRef={blogFormRef}
                                                  createBlog={createBlog}
                                                  handleLike={handleLike}
                                                  handleRemove={handleRemove}
                                                  userValue={userValue}/>} />
        <Route path="/users" element={<Users users={users}/>} />
        <Route path="/users/:id" element={<User users={users}/>} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
      
    </Router>
  );
};

export default App;
