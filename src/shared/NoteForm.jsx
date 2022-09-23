import { useState } from "react"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("")

  const handleNewNote = (e) => {
    setNewNote(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: false,
    })
    setNewNote("")
  }
  return (
    <form onSubmit={addNote} style={{ marginTop: "3em" }}>
      <label htmlFor="noteInput">Add Note</label>
      <input onChange={handleNewNote} id="noteInput" value={newNote} />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm
