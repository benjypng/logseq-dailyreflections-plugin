import { BlockUUID } from "@logseq/libs/dist/LSPlugin.user";
import { getGospel, parseText } from "./utils";

export async function insertCreighton(rendererBlock: BlockUUID) {
  // Insert Reflections
  await logseq.Editor.updateBlock(rendererBlock, `[[Daily Reflections]]`);

  await logseq.Editor.insertBlock(rendererBlock, `${await getGospel()}`, {
    sibling: false,
    before: false,
  });

  await logseq.Editor.insertBlock(rendererBlock, `${await parseText()}`, {
    sibling: false,
    before: false,
  });
}
