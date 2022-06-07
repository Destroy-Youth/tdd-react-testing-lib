import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { ICatFact } from '../lib/interfaces/ICatFact'
import { BASE_URL } from '../utils/consts'

const createCatFact = async (fact: ICatFact) => {
  const opt = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const { data } = await axios.post(BASE_URL, fact, opt)

  return data
}

export default function useAddCatFactMutation() {
  const queryClient = useQueryClient()

  return useMutation(createCatFact, {
    onSuccess: (data) => {
      queryClient.setQueryData('catFacts', (prevState) =>  [...prevState as ICatFact[], data])
    }
  })
}
