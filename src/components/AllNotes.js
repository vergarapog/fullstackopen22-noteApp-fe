import React, { useState, useEffect } from "react"
import Note from "./Note"

const AllNotes = ({ notesToShow, toggleImportance, handleDelete }) => {
  const [label, setLabel] = useState("")

  useEffect(() => {
    let errorTimer = setTimeout(() => {
      setLabel("Error. Please Refresh page.")
    }, 3000)
    return () => {
      clearTimeout(errorTimer)
    }
  }, [])

  if (notesToShow.length === 0) {
    return <div>{label}</div>
  }
  return (
    <>
      {notesToShow.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportance}
            handleDelete={handleDelete}
          />
        )
      })}
    </>
  )
}

export default AllNotes
