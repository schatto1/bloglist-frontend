import { useNotificationValue } from "../NotificationContext";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  if (!notification) {
    return null
  }

  return (
    <Alert style={style}>
      {notification}
    </Alert>
  )
}

export default Notification
