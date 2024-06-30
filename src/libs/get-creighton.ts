import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { convert } from 'html-to-text'

export const getCreighton = async (
  date: Dayjs,
): Promise<{
  url: string
  reflections: string
} | void> => {
  const url = `https://onlineministries.creighton.edu/CollaborativeMinistry/${dayjs(
    date,
  ).format('MMDDYY')}.html`

  const response = await axios.get(url)
  const reflections = convert(response.data, {
    baseElements: { selectors: ['td.Reflection-text'] },
    wordwrap: false,
  })
  return { url, reflections }
}
