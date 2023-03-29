import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'
import { handleLike, handleRemove, user } from '../App.js'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open Author'
  }

  render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} currentUser={user} />)

  const testTitle = screen.getByText('Component testing is done with react-testing-library')
  expect(testTitle).toBeDefined()

  const testAuthor = screen.getByText('Full Stack Open Author')
  expect(testAuthor).toBeDefined()
})