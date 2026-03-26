import { getGospel } from './get-gospel'
import { writeToLogseq } from './write-to-logseq'

export const handleReflections = async (pageTitle: string) => {
  const loadingMsg = await logseq.UI.showMsg('Getting Gospel')
  try {
    const page = await logseq.Editor.getPage(pageTitle) //Expected to always be on a journal page
    if (!page) return

    const pageDate = page.journalDay
    if (!pageDate) return

    const gospel = await getGospel(pageDate)
    await writeToLogseq(pageTitle, gospel)
    logseq.UI.closeMsg(loadingMsg)
  } catch (error) {
    logseq.UI.showMsg(
      `Error getting Gospel reflections: ${String(error)}`,
      'error',
    )
  }
}
