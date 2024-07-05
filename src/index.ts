import '@logseq/libs'

import { getDateForPageWithoutBrackets } from 'logseq-dateutils'

import { handleReflections } from './handle-reflections'
import { settings } from './settings'

const preferredDateFormat = async () => {
  const userSettings = await logseq.App.getUserConfigs()
  return userSettings.preferredDateFormat
}

const main = async () => {
  console.log('Creighton Daily Reflections Plugin loaded')

  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const uuid = payload.uuid
    const [type] = payload.arguments
    // Assumes that a template was used to created {{renderer :dailyreflections_}}
    if (!type || !type.startsWith(':dailyreflections_')) return

    // Goto today's page
    logseq.App.pushState('page', {
      name: getDateForPageWithoutBrackets(
        new Date(),
        await preferredDateFormat(),
      ),
    })

    await handleReflections(uuid)
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
