import { BlockUUID } from "@logseq/libs/dist/LSPlugin.user";
import { parseText } from "./utils";

export async function insertCreighton(rendererBlock: BlockUUID) {
  await logseq.Editor.updateBlock(rendererBlock, `[[MornRef ☀️]]`);

  // Insert Reflections
  const creightonBlk = await logseq.Editor.insertBlock(
    rendererBlock,
    `[[Creighton Daily Reflections]]
${await parseText()}`,
    {
      before: false,
      sibling: false,
    }
  );

  const wordCountBlk = await logseq.Editor.insertBlock(
    creightonBlk!.uuid,
    "[[My Reflections]] {{renderer :wordcount_dailyreflections}}",
    {
      before: false,
      sibling: true,
    }
  );

  // Insert empty block
  const editBlock = await logseq.Editor.insertBlock(wordCountBlk!.uuid, "", {
    before: false,
    sibling: false,
  });

  // Insert habit-tracker
  await logseq.Editor.insertBlock(
    wordCountBlk!.uuid,
    "TODO write daily #habit-tracker",
    {
      before: false,
      sibling: true,
    }
  );

  // Set edit cursor to empty block
  await logseq.Editor.editBlock(editBlock!.uuid);
}
