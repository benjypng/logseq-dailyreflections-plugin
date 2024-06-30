import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'

export const writeToLogseq = async (
  uuid: BlockUUID,
  creighton: { url: string; reflections: string },
  gospel: { reading: string; url: string; passage: string },
) => {
  console.log('WRITING TO LOGSWQ')

  // Update renderer block with header block
  await logseq.Editor.updateBlock(uuid, `[[${logseq.settings!.parent}]]`)

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
