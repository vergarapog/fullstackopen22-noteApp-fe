import React from "react"

const Note = ({ note, toggleImportance, handleDelete }) => {
  const label = note.important ? "make not important" : "make important"

  return (
    <li className={note.important ? "note important" : "note"}>
      {note.content}{" "}
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      <button onClick={() => handleDelete(note.id)}>delete</button>
    </li>
  )
}

export default Note
