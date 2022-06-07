import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

/**
 * API mock
 */
export const handlers = [
  rest.get('*/facts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          fact: 'A group of cats is called a “clowder”',
          id: 38,
          value: 10,
        },
        {
          fact: 'A cat can’t climb head first down a tree because every claw on a cat’s paw points the same way. To get down from a tree, a cat must back down.',
          id: 142,
          value: 10,
        },
      ])
    )
  }),
  rest.post('*/facts', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(req.body))
  }),
]

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })


export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
}
