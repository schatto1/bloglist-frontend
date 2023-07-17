import { useQuery } from "react-query";
import userService from '../services/users'

const Users = () => {
  const { data: users = [] } = useQuery('blogs', userService.getUsers)
  console.log(users)
}

export default Users