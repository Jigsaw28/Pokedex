import { Formik } from 'formik'
import { useState } from 'react'

export const AppBar = ({onSubmit}) => {
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    onSubmit(form.name.value)
    form.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pokemon name, number or type"
        />
        <button type="submit">Search</button>
      </form>
    </>
  )
}
