import { useState } from "react";

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
      <form onSubmit={addBlog}>
        <div>
          title:&nbsp;
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="Enter blog title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author:&nbsp;
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="Enter blog author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url:&nbsp;
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="Enter blog URL"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
