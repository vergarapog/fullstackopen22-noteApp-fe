import { useState } from "react"
import loginService from "../services/login"
import notesService from "../services/notes"

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      notesService.setToken(user.token)
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      setErrorMessage("Wrong Credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3500)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
