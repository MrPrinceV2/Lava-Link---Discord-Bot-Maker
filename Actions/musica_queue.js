module.exports = {
  name: "playerMusic",
  displayName: "Store Player",
  section: "Music Control",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "Caio Sclavi",
    authorUrl: "https://ko-fi.com/caiozin",
  },
  subtitle(data) {
    return `Return the player queue in ${data.varName2}`;
  },
  variableStorage(data, varName2) {
    const type = parseInt(data.storage, 10);
    if (type !== varName2) return;
    const dataType = "Player";
    return [data.varName2, dataType];
  },
  fields: ["storage", "varName2", "info"],
  html(isEvent, data) {
    return `
      <div style="float: left; width: 60%;">
          player.(write which value of the player you need) (blank for player):<br>
          <input id="info" class="round" type="text">
      </div><br><br><br><br><br>

      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },
  async action(cache) {
    const data = cache.actions[cache.index];
    const client = this.getDBM().Bot.bot;
    const targetServer = await this.getServerFromData(0, null, cache);
    const player = client.manager.get(targetServer.id);

    if (player) {
      const info = this.evalMessage(data.info, cache);
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);

      let valueToStore;
      if (info) {
        valueToStore = getValue(player, info);
      } else {
        valueToStore = player;
      }

      this.storeValue(valueToStore, storage, varName2, cache);
    }

    this.callNextAction(cache);
  },
};

function getValue(obj, expr) {
  const parts = expr.split(".");
  let result = obj;

  for (let part of parts) {
    result = result[part];
  }

  return result;
}
