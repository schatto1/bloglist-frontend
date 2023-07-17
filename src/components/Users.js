import { useQuery } from "react-query";
import userService from '../services/users'

const UserList = ({users}) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td key={user.name}>{user.name}</td>
            <td key={user.blogs}>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

const Users = () => {
  const { data: users = [] } = useQuery('users', userService.getUsers)
  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <UserList users={users} />
    </div>
  )
}

export default Users