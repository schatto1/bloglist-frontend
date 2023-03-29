import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open Author'
  }

  const testUser = {
    username: 'tester',
    name: 'Testy McTesterson'
  }

  render(<Blog
    blog={blog}
    handleLike={() => console.log('like')}
    handleRemove={() => console.log('remove')}
    currentUser={testUser}
  />)

  const testTitle = screen.getByText('Component testing is done with react-testing-library')
  expect(testTitle).toBeDefined()

  const testAuthor = screen.getByText('Full Stack Open Author')
  expect(testAuthor).toBeDefined()
})

test('clicking the button shows blog URL and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open Author',
    url: 'this-is-an-url',
    likes: 30,
  }

  const testUser = {
    username: 'tester',
    name: 'Testy McTesterson'
  }

  const mockHandler = jest.fn()

  render(<Blog
    blog={blog}
    handleLike={() => console.log('like')}
    handleRemove={() => console.log('remove')}
    currentUser={testUser}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const testUrl = screen.getByText('this-is-an-url')
  expect(testUrl).toBeDefined()

  const testLikes = screen.getByText('30')
  expect(testLikes).toBeDefined()
})

// test('clicking the like button increments likes by two', async () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'Full Stack Open Author',
//     url: 'this-is-an-url',
//     likes: 30,
//   }

//   const mockHandler = jest.fn()

//   render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} currentUser={user} />)

//   const testUser = userEvent.setup()
//   const viewButton = screen.getByText('view')
//   await testUser.click(viewButton)

//   const likeButton = screen.getByText('like')
//   await testUser.click(likeButton)
//   await testUser.click(likeButton)

//   expect(mockHandler.mock.calls).toHaveLength(2)
// })

test('placeholder', async () => {

})