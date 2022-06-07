import { useQuery } from 'react-query'
import axios from 'axios'
import { ICatFact } from '../lib/interfaces/ICatFact'
import { BASE_URL } from '../utils/consts'

const getCatFact = async () => {
  const { data } = await axios.get(BASE_URL)

  return data
}

export default function useCatFactQuery() {
  return useQuery<ICatFact[], Error>('catFacts', () => getCatFact())
}