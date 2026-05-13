local resourceName = GetCurrentResourceName()

local function debugPrint(...)
  if Config.Debug then
    print(('[%s:server]'):format(resourceName), ...)
  end
end

RegisterNetEvent('boilerplate:server:log', function(action, payload)
  local source = source
  debugPrint(('source=%s action=%s payload=%s'):format(source, action or 'unknown', json.encode(payload or {})))
end)

RegisterCommand('bptoastall', function(source, args)
  local message = table.concat(args, ' ')

  if message == '' then
    message = 'Toast enviado pelo server.lua.'
  end

  TriggerClientEvent('boilerplate:client:toast', source == 0 and -1 or source, {
    title = 'Servidor',
    description = message,
    type = 'info'
  })
end, false)
