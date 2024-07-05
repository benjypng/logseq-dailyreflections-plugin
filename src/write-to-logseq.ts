import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'
import { Creighton, Gospel } from './handle-reflections'

export const writeToLogseq = async (
  uuid: BlockUUID,
  creighton: Creighton,
  gospel: Gospel,
) => {
  console.log('WRITING TO LOGSEQ')

  // Update renderer block with header block
  await logseq.Editor.updateBlock(uuid, `[[${logseq.settings!.parent}]]`)

  if (gospel) {
    // Create Gospel Block
    const gospelBlk = await logseq.Editor.insertBlock(
      uuid,
      `[[Daily Gospel]]
reading:: ${gospel.reading}
source:: ${gospel.url}`,
      {
        before: false,
      },
    )
    // Insert Gospel
    await logseq.Editor.insertBlock(gospelBlk!.uuid, gospel.passage, {
      sibling: false,
    })
  }

  if (creighton) {
    // Create Creighton Block
    const creightonBlk = await logseq.Editor.insertBlock(
      uuid,
      `[[Creighton Reflection]]
source:: ${creighton.url}`,
      {
        before: false,
      },
    )
    // Insert creighton
    await logseq.Editor.insertBlock(creightonBlk!.uuid, creighton.reflections, {
      sibling: false,
    })
  }
}
