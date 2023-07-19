import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>full name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td key={user.name}><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td key={user.blogs}>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users