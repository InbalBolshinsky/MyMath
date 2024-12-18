import React from 'react'
import { useState } from 'react'

const LoginForm = ({onSubmit}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(email, password);
    }

    return (
    <form className = "handleSubmit" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">userName:</label>
        <input
          type="userName"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={() => alert("Is it your first time in MyMath? Sign Up here!")}>
        Sign Up
      </button>
    </form>
  );

}

export default LoginForm