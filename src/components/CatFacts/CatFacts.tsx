import { UseQueryResult } from 'react-query'
import { ICatFact } from '../../lib/interfaces/ICatFact'
import useCatFactQuery from '../../hooks/useCatFactQuery'

import styled from 'styled-components'
import { useState } from 'react'

const Fact = styled.p`
  padding: 5px;
  color: white;
  &:hover {
    color: orange;
    background-color: rgba(117, 106, 106, 0.5);
    border-radius: 8px;
  }
`

function CatFacts() {
  const { isLoading, error, data }: UseQueryResult<ICatFact[], Error> =
    useCatFactQuery()

  const [show, setShow] = useState(false)

  if (!!error) return <p>Error!!</p>

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <>
        {show && <div style={{ color: 'white' }}>if true show</div>}

        {/* 2da iteracion */}
        {data?.map((item, i) => (
          <div className="fact" key={item.fact}>
            <p
              className={show ? 'change' : 'fact'}
              data-testid={`cat-fact-${i}`}
              key={`${item.fact}i`}
              onClick={() => setShow(!show)}
            >
              {item.fact} | value: {item.value || 0}
            </p>
          </div>
        ))}
      </>
    </div>
  )
}


export default CatFacts
