import '@logseq/libs'

import { handleReflections } from './handle-reflections'
import { settings } from './settings'

const main = async () => {
  console.log('Creighton Daily Reflections Plugin loaded')

  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const uuid = payload.uuid
    const [type] = payload.arguments

    // Assumes that a template was used to created {{renderer :dailyreflections_}}
    if (!type || !type.startsWith(':dailyreflections_')) return

    await handleReflections(uuid)
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
