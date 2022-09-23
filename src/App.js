/* eslint-disable indent */
import { useState, useEffect, useRef } from "react"
import notesService from "./services/notes"

import ErrorMessage from "./components/ErrorMessage"

//components
import AllNotes from "./components/AllNotes"
import LoginForm from "./shared/LoginForm"
import NoteForm from "./shared/NoteForm"
import Toggleable from "./components/Toggleable"

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    notesService.getAll().then((res) => {
      setNotes(res.data)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      notesService.setToken(user.token)
    }
  }, [])

  const createNote = (newNote) => {
    noteFormRef.current.toggleVisibility()
    notesService
      .create(newNote)
      .then((res) => {
        setNotes(notes.concat(res))
      })
      .catch((err) => {
        setErrorMessage(`${err.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem("loggedNoteappUser")
    setUser(null)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important === true
      })

  const handleShowImportant = () => {
    setShowAll(!showAll)
  }

  const handleDelete = (id) => {
    notesService.destroy(id)
    setNotes(
      notes.filter((note) => {
        return note.id !== id
      })
    )
  }

  const toggleImportance = (id) => {
    const note = notes.find((note) => {
      return id === note.id
    })

    const changedNote = { ...note, important: !note.important }

    notesService
      .update(id, changedNote)
      .then((res) => {
        setNotes(
          notes.map((note) => {
            return note.id !== id ? note : res.data
          })
        )
      })
      .catch(() => {
        setErrorMessage(
          `The note "${changedNote.content}" was not saved to the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setNotes(
          notes.filter((note) => {
            return note.id !== id
          })
        )
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      {user ? (
        <div>
          <p>{user.name} logged in</p>
          <Toggleable buttonLabel={"Add Note"} ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Toggleable>
          <form onSubmit={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      ) : (
        <Toggleable buttonLabel={"Login"}>
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </Toggleable>
      )}
      <div>
        <input
          type="checkbox"
          checked={!showAll}
          onChange={handleShowImportant}
        />
        Show Important Only
        <button
          onClick={() => setShowAll(!showAll)}
          style={{ marginLeft: "1em" }}
        >
          {showAll ? "All Displayed" : "Important Displayed"}
        </button>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <ul>
        <AllNotes
          notesToShow={notesToShow}
          toggleImportance={toggleImportance}
          handleDelete={handleDelete}
          user={user}
        />
      </ul>
    </div>
  )
}

export default App
