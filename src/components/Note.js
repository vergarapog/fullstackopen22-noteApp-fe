import React from "react"

const Note = ({ note, toggleImportance, handleDelete }) => {
  const label = note.important ? "make not important" : "make important"

  return (
    <li className={note.important ? "note important" : "note"}>
      <span>{note.content} </span>
      <button
        onClick={() => toggleImportance(note.id)}
        className="toggleImportance"
      >
        {label}
      </button>
      <button onClick={() => handleDelete(note.id)}>delete</button>
    </li>
  )
}

export default Note
