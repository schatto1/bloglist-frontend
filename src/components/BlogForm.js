const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      title:&nbsp;
        <input
        type="text"
        value={title}
        name="Title"
        onChange={handleTitleChange}
        // onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:&nbsp;
        <input
        type="text"
        value={author}
        name="Author"
        onChange={handleAuthorChange}
        // onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:&nbsp;
        <input
        type="text"
        value={url}
        name="Url"
        onChange={handleUrlChange}
        // onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>      
)

export default BlogForm