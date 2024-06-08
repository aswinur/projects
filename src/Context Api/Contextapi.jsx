import React, { createContext, useState } from 'react'
// import App from '../App'


export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function Contextapi({ children }) {
  const [addProjectResponse, setAddProjectResponse] = useState("")
  const [editProjectResponse, setEditProjectResponse] = useState("")
  return (
    <>
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>

          {children}

        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  )
}

export default Contextapi