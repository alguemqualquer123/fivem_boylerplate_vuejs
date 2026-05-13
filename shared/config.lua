Config = {}

Config.Debug = true

Config.Commands = {
  openUi = 'bpui',
  templates = 'bptemplates',
  closeUi = 'bpclose',
  toast = 'bptoast'
}

Config.DefaultKey = 'F2'

Config.DefaultHud = {
  arena = 'Lobby',
  kills = 0,
  deaths = 0,
  ping = 0,
  fps = 0,
  health = 100,
  armor = 0,
  weight = 7.5,
  maxWeight = 30
}

Config.MockInventory = {
  slots = 40,
  maxWeight = 30,
  data = {
    [1] = { name = 'Pistola', amount = 1 },
    [2] = { name = 'Municao 9mm', amount = 48 },
    [5] = { name = 'Colete', amount = 2 }
  }
}

Config.StartupMessages = {
  {
    action = 'hud:update',
    data = Config.DefaultHud
  },
  {
    action = 'ui:toast',
    data = {
      title = 'Boilerplate carregado',
      description = 'Use /bpui ou F2 para abrir o painel.',
      type = 'success'
    }
  }
}
