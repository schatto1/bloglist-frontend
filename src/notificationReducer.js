export const notificationReducer = (notification, action) => {
  switch (action.type) {
    case "ON":
      return action.notification
    case "OFF":
      return null
    default:
      return notification
  }
}