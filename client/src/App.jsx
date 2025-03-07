// eslint-disable-next-line no-unused-vars
import React from "react";
import NewComponent from "./NewComponent";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>🎉 Leap Year Birthday Celebration 🎉</h1>
      <p>Welcome to the <strong>S75 Special Occasion</strong> project!</p>
      <p>
        Dedicated to celebrating people born on February 29th, we make sure their
        birthdays are extra special. 🥳
      </p>
      <h2>Why Join Us?</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>🎈 Birthday Reminders & Special Surprises</li>
        <li>📜 Fun Facts & Historical Moments</li>
        <li>🎊 Exclusive Leap Year Events</li>
      </ul>
      <p>Join us in making Leap Year birthdays unforgettable! 🎂</p>
      <NewComponent/>
    </div>
  );
}

export default App;