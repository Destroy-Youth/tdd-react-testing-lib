import { screen, waitFor } from '@testing-library/react'

import CatFacts from './CatFacts'
import { renderWithClient } from '../../utils/tests'
import { server } from '../../setupTests'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'


test('Renders CatFacts component', async () => {
  const result = renderWithClient(<CatFacts />)

  let catFacts = await waitFor(() => result.getAllByTestId(/cat-fact/i))

  expect(catFacts.length).toBeGreaterThan(1)
})

test('should show hidden div and then it should go away on click', async () => {
  const result = renderWithClient(<CatFacts />)

  let catFact = await waitFor(() => result.getByTestId('cat-fact-0'))
  userEvent.click(result.getByTestId('cat-fact-0'))
  let hiddenDiv = await result.getByText(/if true show/i)
  expect(hiddenDiv).toBeInTheDocument()
  userEvent.click(result.getByTestId('cat-fact-0'))
  expect(hiddenDiv).not.toBeInTheDocument()
})

test('fact should change css class on click', async () => {
  const result = renderWithClient(<CatFacts />)

  let catFact = await waitFor(() => result.getByTestId('cat-fact-0'))
  expect(catFact.className).toBe('fact')
  userEvent.click(result.getByTestId('cat-fact-0'))
  expect(catFact.className).toBe('change')
  userEvent.click(result.getByTestId('cat-fact-0'))
  expect(catFact.className).toBe('fact')
})

test('should see error section if the request fails', async () => {
  server.use(
    rest.get('*', (requ, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  const result = renderWithClient(<CatFacts />)

  expect(await result.findByText(/Error!!/)).toBeInTheDocument()
})
