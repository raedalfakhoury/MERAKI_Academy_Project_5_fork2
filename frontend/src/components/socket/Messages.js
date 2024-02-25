import React, { useEffect, useState } from "react";

function Messages({ data }) {
  const [all_message, set_all_message] = useState([]);

  const [data_message, setDate_message] = useState({
    message: "",
    to: "",
    from: data.id,
  });

  const ReserveMessage = (dataM) => {
    console.log(dataM);
    set_all_message([...all_message, dataM]);
  };

  useEffect(() => {
    data.socket.on("message", ReserveMessage);
    return () => {
      data.socket.off("message", ReserveMessage);
    };
  }, [all_message]);

  const sendMessage = () => {
    data.socket.emit("message", {
      to: data_message.to,
      from: data_message.from,
      message: data_message.message,
    });
  };

  return (
    <div>
      <h1>message</h1>
      <textarea
        type="text"
        placeholder="message"
        onChange={(e) => {
          setDate_message({ ...data_message, message: e.target.value });
        }}
      />
      <textarea
        type="text"
        placeholder="to"
        onChange={(e) => {
          setDate_message({ ...data_message, to: e.target.value });
        }}
      />
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send
      </button>
      {all_message.length > 0 &&
        all_message.map((mess, index) => {
          return (
            <>
              <p>
                form : {mess.from} {mess.message}
              </p>
            </>
          );
        })}
    </div>
  );
}

export default Messages;
