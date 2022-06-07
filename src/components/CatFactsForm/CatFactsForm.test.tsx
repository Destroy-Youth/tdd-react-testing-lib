import { fireEvent, getByRole, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { renderWithClient } from '../../utils/tests'
import CatFacts from '../CatFacts/CatFacts'
import CatFactsForm from './CatFactsForm'

test('should register a new fact and show it', async () => {
  const result = renderWithClient(
    <>
      <CatFactsForm />
      <CatFacts />
    </>
  )

  const factInput = await result.findByPlaceholderText('Enter a new cat fact')
  expect(factInput).toHaveValue('')
  fireEvent.change(factInput, {
    target: {
      value: 'Cats does not have soul',
    },
  })
  expect(factInput).toHaveValue('Cats does not have soul')

  const valueInput = await result.findByPlaceholderText('Fact value')
  expect(valueInput).toHaveValue('')
  fireEvent.change(valueInput, {
    target: {
      value: 20,
    },
  })
  expect(valueInput).toHaveValue('20')

  const button = result.getByRole('button', { name: /submit/i })
  await act(() => userEvent.click(button))

  expect(
    await screen.findByText(/Cats does not have soul/i)
  ).toBeInTheDocument()
})

test('should show error with a fact less than 5 chars in length', async () => {
  const result = renderWithClient(<CatFactsForm />)

  const input = await result.findByPlaceholderText('Enter a new cat fact')
  expect(input).toHaveValue('')
  fireEvent.change(input, {
    target: {
      value: 'nice',
    },
  })
  expect(input).toHaveValue('nice')
  const button = result.getByRole('button', { name: /submit/i })
  await act(() => userEvent.click(button))

  expect(
    await result.getByText(/The fact must be at least 5 characters long\./i)
  ).toBeInTheDocument()
})

test('should show error with a non numerical value', async () => {
  const result = renderWithClient(<CatFactsForm />)

  const input = await result.findByPlaceholderText('Fact value')
  expect(input).toHaveValue('')
  fireEvent.change(input, {
    target: {
      value: 'wot',
    },
  })
  expect(input).toHaveValue('wot')
  const button = result.getByRole('button', { name: /submit/i })
  await act(() => userEvent.click(button))
  expect(await result.getByText(/Only numbers please\./i))
})
