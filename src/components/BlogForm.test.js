import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

test("BlogForm calls event handler it received as props with right details", async () => {
  const testBlog = {
    title: "Test blog",
    author: "Test author",
    url: "test-url",
  };

  const user = userEvent.setup();

  const mockHandler = jest.fn();

  render(<BlogForm handleSubmit={mockHandler} />);

  const blogTitle = screen.getByPlaceholderText("Enter blog title");
  const blogAuthor = screen.getByPlaceholderText("Enter blog author");
  const blogUrl = screen.getByPlaceholderText("Enter blog URL");

  const createButton = screen.getByText("create");

  await user.type(blogTitle, testBlog.title);
  await user.type(blogAuthor, testBlog.author);
  await user.type(blogUrl, testBlog.url);
  await user.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);

  const calledTitle = mockHandler.mock.calls[0][0].title;
  const calledAuthor = mockHandler.mock.calls[0][0].author;
  const calledUrl = mockHandler.mock.calls[0][0].url;

  expect(calledTitle).toBe(testBlog.title);
  expect(calledAuthor).toBe(testBlog.author);
  expect(calledUrl).toBe(testBlog.url);
});
