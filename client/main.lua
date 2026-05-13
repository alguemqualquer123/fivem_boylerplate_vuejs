local uiReady = false
local hasFocus = false

local function debugPrint(...)
  if Config.Debug then
    print(('[%s]'):format(GetCurrentResourceName()), ...)
  end
end

local function sendUi(action, data)
  SendNUIMessage({
    action = action,
    data = data or {}
  })
end

local function setUiFocus(focus, cursor, keepInput)
  focus = focus == true
  cursor = focus and cursor ~= false
  keepInput = focus and keepInput == true

  SetNuiFocus(focus, cursor)
  SetNuiFocusKeepInput(keepInput)

  hasFocus = focus
end

local function openWindow(name, payload)
  sendUi('ui:openWindow', {
    name = name,
    payload = payload or {}
  })

  setUiFocus(true, true, false)
end

local function closeWindow(name)
  sendUi('ui:closeWindow', {
    name = name
  })
end

local function closeAll()
  sendUi('ui:closeAll', {})
  setUiFocus(false, false, false)
end

local function showToast(data)
  sendUi('ui:toast', data or {})
end

local function openDemo()
  openWindow('devPanel', {
    resource = GetCurrentResourceName(),
    uiReady = uiReady
  })
end

local function openTemplates()
  openWindow('templatePanel', {
    resource = GetCurrentResourceName()
  })
end

exports('SendUI', sendUi)
exports('OpenWindow', openWindow)
exports('CloseWindow', closeWindow)
exports('CloseAll', closeAll)
exports('ShowToast', showToast)
exports('SetUIFocus', setUiFocus)

RegisterNetEvent('boilerplate:client:sendUi', sendUi)
RegisterNetEvent('boilerplate:client:openWindow', openWindow)
RegisterNetEvent('boilerplate:client:closeWindow', closeWindow)
RegisterNetEvent('boilerplate:client:closeAll', closeAll)
RegisterNetEvent('boilerplate:client:toast', showToast)

RegisterCommand(Config.Commands.openUi, function()
  openDemo()
end, false)

RegisterCommand(Config.Commands.templates, function()
  openTemplates()
end, false)

RegisterCommand(Config.Commands.closeUi, function()
  closeAll()
end, false)

RegisterCommand(Config.Commands.toast, function()
  showToast({
    title = 'Teste NUI',
    description = 'Toast enviado pelo client.lua.',
    type = 'info'
  })
end, false)

RegisterKeyMapping(Config.Commands.openUi, 'Abrir boilerplate NUI', 'keyboard', Config.DefaultKey)

RegisterNUICallback('ui:ready', function(_, cb)
  uiReady = true
  debugPrint('NUI ready')

  for _, message in ipairs(Config.StartupMessages) do
    sendUi(message.action, message.data)
  end

  cb({
    ok = true,
    resource = GetCurrentResourceName(),
    focused = hasFocus
  })
end)

RegisterNUICallback('ui:focus', function(data, cb)
  data = data or {}

  local focus = data.hasFocus
  if focus == nil then
    focus = data.focus
  end

  local cursor = data.hasCursor
  if cursor == nil then
    cursor = data.cursor
  end

  setUiFocus(focus, cursor, data.keepInput)
  cb({ ok = true })
end)

RegisterNUICallback('ui:escape', function(_, cb)
  closeAll()
  cb({ ok = true })
end)

RegisterNUICallback('inventory:move', function(data, cb)
  debugPrint('inventory:move', json.encode(data or {}))
  cb({ ok = true })
end)

RegisterNUICallback('inventory:use', function(data, cb)
  debugPrint('inventory:use', json.encode(data or {}))
  cb({ ok = true })
end)

RegisterNUICallback('inventory:drop', function(data, cb)
  debugPrint('inventory:drop', json.encode(data or {}))
  cb({ ok = true })
end)

RegisterNUICallback('inventory:split', function(data, cb)
  debugPrint('inventory:split', json.encode(data or {}))
  cb({ ok = true })
end)

RegisterNUICallback('template:action', function(data, cb)
  debugPrint('template:action', json.encode(data or {}))
  cb({ ok = true })
end)

RegisterNUICallback('anticheat:getFlags', function(data, cb)
  debugPrint('anticheat:getFlags', json.encode(data or {}))
  cb({
    ok = true,
    flags = {
      { id = 1, player = 'Player 1', reason = 'speed_check', level = 'medium' },
      { id = 2, player = 'Player 2', reason = 'weapon_blacklist', level = 'high' }
    }
  })
end)

RegisterNUICallback('anticheat:getLogs', function(data, cb)
  debugPrint('anticheat:getLogs', json.encode(data or {}))
  cb({
    ok = true,
    logs = {
      { id = 1, message = 'Boilerplate log example', createdAt = os.date('%H:%M:%S') }
    }
  })
end)

RegisterNUICallback('anticheat:action', function(data, cb)
  debugPrint('anticheat:action', json.encode(data or {}))
  cb({ ok = true })
end)

CreateThread(function()
  while true do
    Wait(1000)

    if uiReady then
      local ped = PlayerPedId()
      local health = math.max(GetEntityHealth(ped) - 100, 0)
      local armor = GetPedArmour(ped)

      sendUi('hud:update', {
        health = health,
        armor = armor
      })
    end
  end
end)
