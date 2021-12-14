import '@logseq/libs';

const main = async () => {
  console.log('Creighton Daily Reflections Plugin loaded');

  // Function to insert Creighton Block, and edit block after
  const insertCreighton = async (currentPage: object) => {
    const currPage: any = currentPage;

    // Extract date from journal page in Creighton's format
    const todaysDate = () => {
      const strJournalDay = currPage.journalDay.toString();
      return strJournalDay.slice(-4) + strJournalDay.slice(2, 4);
    };

    try {
      // Set template array to be inserted
      const batchBlkArr = [
        {
          content: `[[Creighton Daily Reflections]]
@@html: <iframe src="https://onlineministries.creighton.edu/CollaborativeMinistry/${todaysDate()}.html" height="500"></iframe>@@`,
        },
        { content: `[[What am I grateful for]]` },
        { content: `[[Prayer list]]` },
        { content: `[[Brain dump]]` },
      ];

      // Insert block for template array to be inserted under
      const targetBlock = await logseq.Editor.insertBlock(
        currPage.name,
        `[[MornRef ☀️]]`,
        { isPageBlock: true }
      );

      // Insert template array
      await logseq.Editor.insertBatchBlock(targetBlock.uuid, batchBlkArr, {
        before: false,
        sibling: false,
      });

      // Insert empty block under reflection block
      const reflectionBlock = await logseq.Editor.getBlock(targetBlock.uuid, {
        includeChildren: true,
      });

      // Insert empty block
      const targetBlock2 = await logseq.Editor.insertBlock(
        reflectionBlock.children[0]['uuid'],
        '',
        {
          before: false,
          sibling: false,
        }
      );

      // Set edit cursor to empty block
      await logseq.Editor.editBlock(targetBlock2.uuid);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrdinalNum = (n) => {
    return (
      n +
      (n > 0
        ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : '')
    );
  };

  const getDateForPage = () => {
    const getYear = new Date().getFullYear();
    const getMonth = new Date().toString().substring(4, 7);
    const getDate = new Date().getDate();

    return `${getMonth} ${getOrdinalNum(getDate)}, ${getYear}`;
  };

  const insertReflection = async () => {
    // Goto today's page
    logseq.App.pushState('page', { name: getDateForPage() });

    // Get current page
    const currPage = await logseq.Editor.getCurrentPage();

    // Insert iframe
    insertCreighton(currPage);
  };

  // Provide logseq model
  logseq.provideModel({
    insertReflection,
  });

  // register keyboard
  logseq.App.registerCommandPalette(
    {
      key: 'logseq-dailyreflections-plugin',
      label: 'Execute daily reflections',
      keybinding: {
        binding: 'd r',
      },
    },
    () => {
      insertReflection();
    }
  );

  // Register UI
  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-dailyreflections-plugin',
    template: `
      <a data-on-click="insertReflection"
        class="button">
        <i class="ti ti-medical-cross"></i>
      </a>
`,
  });
};

logseq.ready(main).catch(console.error);
