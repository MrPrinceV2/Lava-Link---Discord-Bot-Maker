module.exports = {
  name: "stopMusic",
  displayName: "Stop Music",
  section: "Music Control",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "Caio Sclavi",
    authorUrl: "https://ko-fi.com/caiozin",
  },
  fields: ["channel"],
  subtitle(data) {
    return ``;
  },
  variableStorage(data, varType) {
    return ``;
  },
  html(isEvent, data) {
    return `
      <div style="float: left; width: 60%;">
          Channel ID (only for disconnects):<br>
          <input id="channel" class="round" type="text">
      </div>
    `;
  },
  init() {},
  async action(cache) {
    try {
      const targetServer = await this.getServerFromData(0, null, cache);
      const client = this.getDBM().Bot.bot;
      const player = client.manager.get(targetServer.id);
      if (player) {
        player.queue.clear();
        player.stop();
        player.destroy();
      }
    } catch (error) {
      console.error("Error stopping music:", error);
    }
    this.callNextAction(cache);
  },
  mod() {},
};
