import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [username, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages([...messages, message]);
    });
    console.log(messages);
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageData = {
      message: newMessage,
      user: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    // if(!newMessage == ""){
    //   socket.emit("send-message", messageData);
    // }
    // else{
    //   alert("Message can  not be empty");
    // }

    !newMessage == ""
      ? socket.emit("send-message", messageData)
      : alert("Message can't be empty");

    setNewMessage("");

    // socket.emit("send-message", messageData);
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-gray-100
      flex justify-center items-center
      "
      >
        {chatActive ? (
          <div
            className="rounded-md w-full md:w-[80vw] lg:w-[40vw] 
            mx-auto"
          >
            <h1 className="text-center font-bold text-lx my-2 uppercase">
              WhatsApp chat
            </h1>
            <div>
              <div className="overflow-y-scroll h-[80vh] lg:h-[60vh]">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex rounded-md shadow-md my-5 w-fit
                     ${username === message.user && "ml-auto"}`}
                    >
                      <div
                        className="bg-green-400 flex
                      justify-center items-center rounded-md"
                      >
                        <h3 className="font-bold text-lg px-2">
                          {message.user.charAt(0).toUpperCase()}
                        </h3>
                      </div>

                      <div className="px-2 bg-white rounded-md">
                        <span className="text-sm">{message.user}</span>
                        <h3 className="font-bold">{message.message}</h3>
                        <h3 className="text-xs text-right">{message.time}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div></div>
              <form
                className="flex gap-2 md:gap-4 justify-between"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  className=" w-full rounded-md border-2 outline-none
                px-3 py-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-green-500 text-white
                rounded-md font-bold outline-none"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div
            className="w-screen h-screen flex justify-center
          items-center gap-2"
          >
            <input
              type="text"
              name=""
              id=""
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="text-center px-3 py-1 outline-none border-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md font-bold px-3 py-1"
              onClick={() => !username == "" && setChatActive(true)}
            >
              Start chat
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
