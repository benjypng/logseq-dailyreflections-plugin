import '@logseq/libs'

import { settings } from './settings'
import { handleReflections } from './utils/handle-reflections'

const main = async () => {
  logseq.UI.showMsg('logseq-dailyreflections-plugin loaded')

  const gospelUrlProp = await logseq.Editor.getPage('gospel-url')
  if (!gospelUrlProp) {
    const gospelReflectionTag =
      await logseq.Editor.createTag('GospelReflection')
    if (!gospelReflectionTag) return
    const gospelUrlProperty = await logseq.Editor.upsertProperty('gospel-url', {
      type: 'default',
      cardinality: 'one',
    })
    if (!gospelUrlProperty) return
    await logseq.Editor.addTagProperty(
      gospelReflectionTag.uuid,
      gospelUrlProperty.uuid,
    )
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
