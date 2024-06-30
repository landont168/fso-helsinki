const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  if (type === "message") {
    return <div className="message">{message}</div>;
  }
  return <div className="error">{message}</div>;
};

export default Notification;
