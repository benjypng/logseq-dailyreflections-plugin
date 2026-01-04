import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'

import { getGospel } from './get-gospel'
import { writeToLogseq } from './write-to-logseq'

export const handleReflections = async (uuid: BlockUUID) => {
  try {
    const block = await logseq.Editor.getBlock(uuid)
    if (!block) return

    const page = await logseq.Editor.getPage(block.page.id) //Expected to always be on a journal page
    if (!page) return

    const pageDate = page.journalDay
    if (!pageDate) return

    const gospel = await getGospel(pageDate)
    await writeToLogseq(uuid, gospel)
  } catch (error) {
    logseq.UI.showMsg(
      `Error getting Gospel reflections: ${String(error)}`,
      'error',
    )
  }
}
