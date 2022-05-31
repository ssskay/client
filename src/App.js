import { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
// const APP_URL =
//   process.env.REACT_APP_API_URL || "https://gpt3game.herokuapp.com";
const APP_URL = process.env.REACT_APP_API_URL;

// Creating our own theme
const theme = {
  background: "#C9FF8F",
  headerBgColor: "#197B22",
  headerFontSize: "20px",
  botBubbleColor: "#0F3789",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FF5733",
  userFontColor: "white",
};

function App() {
  const [steps, setSteps] = useState([
    {
      id: "0",
      message: "Welcome!",

      // This calls the next id
      // i.e. id 1 in this case
      trigger: "1",
    },
    {
      id: "1",

      // This message appears in
      // the bot chat bubble
      message: "Lets chat! Tell me something about yourself!",
      trigger: "2",
    },
    {
      id: "2",

      // Here we want the user
      // to enter input
      user: true,
      validator: async (value) => {
        const userInput = value;

        const data = await fetch(`${APP_URL}/user-responses/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userResponse: userInput,
            userId: localStorage.getItem("userId"),
          }),
        })
          .then((res) => res.json())
          .catch((error) => {
            window.alert(error);
            return;
          });
        console.log(data);
        setSteps([
          ...steps,
          {
            id: "4",
            options: [
              // When we need to show a number of
              // options to choose we create alist
              // like this
              { value: 1, label: "View Courses" },
              { value: 2, label: "Read Articles" },
            ],
            end: true,
          },
        ]);

        return true;
      },
      trigger: "3",
      end: true,
    },
    {
      id: "3",
      message: "Of these options, which response is the most-human like?",
      // trigger: "4"
    },
  ]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          // This appears as the header
          // text for the chat bot
          headerTitle="AI Buddy"
          steps={steps}
          // start={"3"}
          handleEnd={async ({ values }) => {
            // if (values.length == 1) {
            //   const userInput = values[0];
            //   const data = await fetch(`${APP_URL}/user-responses/add`, {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //       userResponse: userInput,
            //       userId: localStorage.getItem("userId"),
            //     }),
            //   })
            //     .then((res) => res.json())
            //     .catch((error) => {
            //       window.alert(error);
            //       return;
            //     });
            //   console.log(data);
            //   steps[steps.length - 1].trigger = "4";
            //   setSteps([
            //     ...steps,
            // {
            //   id: "4",
            //   options: [
            //     // When we need to show a number of
            //     // options to choose we create alist
            //     // like this
            //     { value: 1, label: "View Courses" },
            //     { value: 2, label: "Read Articles" },
            //   ],
            //   end: true,
            // },
            //   ]);
            // } else {
            //   // TODO: UPDATE...
            // }
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
