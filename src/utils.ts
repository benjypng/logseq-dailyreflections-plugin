import axios from "axios";
import { convert } from "html-to-text";

export async function preferredDateFormat() {
  const userSettings = await logseq.App.getUserConfigs();
  return userSettings.preferredDateFormat;
}

async function getCreightonDate() {
  const currPage = await logseq.Editor.getCurrentPage();
  const strJournalDay = currPage!.journalDay.toString();
  return strJournalDay.slice(-4) + strJournalDay.slice(2, 4);
}

export async function parseText() {
  const response = await axios.get(
    `https://onlineministries.creighton.edu/CollaborativeMinistry/${await getCreightonDate()}.html`
  );
  const text = convert(response.data, {
    baseElements: { selectors: ["td.Reflection-text"] },
    wordwrap: false,
  });

  return text;
}

export function generateUniqueId() {
  const id: string = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");
  return id;
}
