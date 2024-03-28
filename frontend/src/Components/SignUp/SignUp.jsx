import React, { useEffect, useState } from "react"
import "./SignUp.css"
import slotService from "../../Services/service.js"

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  const [authenticated, setAuthenticated] = useState(false)

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    retrieveUsers()
  }, [])

  const retrieveUsers = () => {
    slotService
      .getAllUsers()
      .then(response => {
        console.log(response.data.users)
        setUsers(response.data.users)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const foundUser = users.find(
      user => user.email === email && user.password === password
    )
    if (foundUser) {
      setAuthenticated(true)
      console.log("Authentication successful")
    } else {
      setAuthenticated(false)
      console.log("Authentication failed")
    }
    console.log(foundUser)
  }

  return (
    <div className="signup-container">
      <div className="wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="member">
        <a href="#">Forget password?</a>
      </div>
    </div>
    </div>
    
  )
}
export default SignUp
