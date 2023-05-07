import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../../../contexts";

const MessageForm = ({ nameList }) => {
  const { sendChatMessage, roomData } = useContext(RoomContext);
  const { client, ownPlayer } = roomData
  const [message, setMessage] = useState("");
  const [selectedName, setSelectedName] = useState(nameList[0] || null);

  useEffect(() => {
    if (selectedName == null && nameList.length > 0) {
      setSelectedName(nameList[0]);
    }
  }, [nameList]);

  const handleSubmit = (e) => {
      e.preventDefault();

      if (!message || /^\s*$/.test(message)) {
        return;
      }

      const data = {
        message: message.trim(),
        written_as: selectedName,
        user_id: ownPlayer.user,
      };

      sendChatMessage({ client, data });
      setMessage("");
    }

  return (
    <form
      className="row py-2 bg-light"
      style={{ position: "absolute", bottom: "0" }}
      onSubmit={handleSubmit}
    >
      <div className="col-12 mb-3 mb-0">
        <input
          className="form-control"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="col-6">
        <select
          className="form-select"
          value={selectedName || ""}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          {nameList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6">
        <button className="btn btn-primary w-100">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
