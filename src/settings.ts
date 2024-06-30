import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'parent',
    title: 'Parent Block',
    description: 'Indicate the name to assign to the parent block',
    type: 'string',
    default: 'Daily Reflections',
  },
]
