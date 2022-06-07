import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import useNewCatFactMutation from '../../hooks/useAddCatFactMutation'
import { ICatFact } from '../../lib/interfaces/ICatFact'

function CatFactsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: addCatFact } = useNewCatFactMutation()
  const queryClient = useQueryClient()

  return (
    <div>
      <form onSubmit={handleSubmit((data) => addCatFact(data as ICatFact))}>
        <input
          type="text"
          {...register('fact', {
            required: 'Fill this field!!',
            minLength: {
              value: 5,
              message: 'The fact must be at least 5 characters long.',
            },
          })}
          placeholder="Enter a new cat fact"
        ></input>
        <ErrorMessage as={'span'} errors={errors} name="fact" />
        <input
          {...register('value', {
            pattern: {
              value: /^(0|[1-9][0-9]*)$/,
              message: 'Only numbers please.',
            },
          })}
          placeholder="Fact value"
        ></input>
        <ErrorMessage as={'span'} errors={errors} name="value" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default CatFactsForm
