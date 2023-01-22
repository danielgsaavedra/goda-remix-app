import { Form, useTransition, useActionData } from '@remix-run/react'
import { redirect, json } from '@remix-run/node'
import { db } from '../../services/db.js'

const badRequest = data => {
  return json(data, { status: 400 })
}

export const action = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const description = form.get('description')

  const fieldErrors = {
    title: title.length < 3 ? 'El titulo debe tener al menos 3 carácteres' : null,
    description: description.length < 10 ? 'La descripción debe tener al menos 10 carácteres' : null
  }

  const hasErrors = (Object.values(fieldErrors).some(Boolean))
  const fields = { title, description }

  if (hasErrors) {
    return badRequest({ fieldErrors, fields })
  }

  await new Promise(resolve => setTimeout(resolve, 2000))

  await db.post.create({ data: fields })

  return redirect('/posts')
}

export const ErrorBoundary = ({ error }) => {
  return (
    <div>
      <strong>Algo salio mal 😞</strong>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

const CreatePost = () => {
  const { state } = useTransition()
  const actionData = useActionData()

  const { fieldErrors } = actionData ?? {}
  const { title: titleError, description: descriptionError } = fieldErrors ?? {}

  const isSubmitting = state === 'submitting'
  return (
    <>
      <h2>Crear Post</h2>
      <Form method="post" disabled={isSubmitting}>
        <div>
          <label htmlFor="title">Titulo</label>
          <input type="text" id="title" placeholder="Titulo" name="title"/>
          {titleError && <small style={{ color: 'red' }}>{titleError}</small>}
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea type="text" id="description" placeholder="Descripción" name="description"/>
          {descriptionError && <small style={{ color: 'red' }}>{descriptionError}</small>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear Post'}
        </button>
      </Form>
    </>
  )
}

export default CreatePost
