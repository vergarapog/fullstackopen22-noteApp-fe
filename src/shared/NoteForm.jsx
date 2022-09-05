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
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    })
    setNewNote("")
  }
  return (
    <form onSubmit={addNote} style={{ marginTop: "3em" }}>
      <label htmlFor="addNote">Add Note</label>
      <input onChange={handleNewNote} id={addNote} value={newNote} />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm
