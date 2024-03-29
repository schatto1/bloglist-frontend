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
import Blog from "./components/Blog";
import userService from "./services/users"
import { Form, Button, Navbar, Nav } from "react-bootstrap";

const App = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const userValue = useUserValue();

  const navBarStyling = {
    padding: 5,
    background: "lightBlue"
  }

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

  const handleComment = async (updatedBlog) => {
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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </Form.Group>
      <Button type="submit" id="login-button" variant="success">
        login
      </Button>
    </Form>
  );

  if (userValue === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    );
  }


  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" style={navBarStyling}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={navBarStyling} to="/blogs">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={navBarStyling} to="/blogs">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={navBarStyling} to="/users">users</Link>
              </Nav.Link>
            </Nav>
            <span style={navBarStyling}>
              {userValue.user.name} logged in &nbsp;
              <button type="submit" onClick={handleLogout}>
                logout
              </button>
            </span>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <h2>blogs app</h2>
          <Notification />
        </div>
        <Routes>
          <Route path="/blogs" element={<Blogs blogs={blogs}
                                                blogFormRef={blogFormRef}
                                                createBlog={createBlog}/>} />
          <Route path="/users" element={<Users users={users}/>} />
          <Route path="/users/:id" element={<User users={users}/>} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs}
                                                  handleLike={handleLike}
                                                  handleRemove={handleRemove}
                                                  handleComment={handleComment}
                                                  currentUser={userValue.user}/>} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>  
      </Router>
    </div>
  );
};

export default App;
