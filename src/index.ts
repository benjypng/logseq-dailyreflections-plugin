import '@logseq/libs'

import { settings } from './settings'
import { handleReflections } from './utils/handle-reflections'

const main = async () => {
  logseq.UI.showMsg('logseq-dailyreflections-plugin loaded')

  const gospelReflectionTag = await logseq.Editor.getTag('GospelReflection')
  if (!gospelReflectionTag) {
    const tag = await logseq.Editor.createTag('GospelReflection')
    const prop = await logseq.Editor.upsertProperty('gospel-url', {
      type: 'url',
      cardinality: 'one',
      hide: false,
      public: false,
    })
    const propBlock = await logseq.Editor.getBlock(prop.id)
    if (!tag || !propBlock) return
    await logseq.Editor.addTagProperty(tag.uuid, propBlock.uuid)
  }

  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const uuid = payload.uuid
    const [type] = payload.arguments

    // Assumes that a template was used to created {{renderer :dailyreflections_}}
    if (!type || !type.startsWith(':dailyreflections_')) return

    await handleReflections(uuid)
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
