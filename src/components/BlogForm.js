import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    handleSubmit(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="Title"
            placeholder="Enter blog title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="Author"
            placeholder="Enter blog author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="Url"
            placeholder="Enter blog URL"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
          <Button variant="success" type="submit" id="create">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
