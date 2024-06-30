import axios from 'axios'
import { convert } from 'html-to-text'

export async function getCreightonDate() {
  const currPage = await logseq.Editor.getCurrentPage()
  const strJournalDay = currPage!.journalDay.toString()
  return strJournalDay.slice(-4) + strJournalDay.slice(2, 4)
}

export async function parseText() {
  const response = await axios.get(
    `https://onlineministries.creighton.edu/CollaborativeMinistry/${await getCreightonDate()}.html`,
  )
  const text = convert(response.data, {
    baseElements: { selectors: ['td.Reflection-text'] },
    wordwrap: false,
  })

  return text
}

export const getGospel = async () => {
  const bibleResponse = await axios.get(
    `https://bible.usccb.org/bible/readings/${await getCreightonDate()}.cfm`,
  )
  const text = convert(bibleResponse.data, {
    baseElements: {
      selectors: ['h3[name=Gospel]'],
    },
    wordwrap: false,
  })
  const regex = /GOSPEL\n\n(.*?)\[/g.exec(text)
  if (!regex || !regex[1]) return
  const reading = regex[1].trim()

  const passageResponse = await axios.get(
    `https://api.esv.org/v3/passage/text/?q=${reading}`,
    {
      headers: {
        Authorization: `Token ${logseq.settings!.api}`,
      },
    },
  )

  return passageResponse.data.passages[0]
}

export function generateUniqueId() {
  const id: string = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
  return id
}
