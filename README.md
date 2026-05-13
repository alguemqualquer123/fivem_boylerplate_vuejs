# FiveM Vue NUI Boilerplate

Boilerplate para criar interfaces NUI no FiveM usando Vue 3, Pinia, Tailwind CSS e Vite.

Este resource ja vem com uma ponte Lua <-> Vue pronta, exemplos de callbacks NUI, comandos de teste, exports para outros resources e componentes template reutilizaveis para montar paineis rapidamente.

## Stack

- FiveM `cerulean`
- Lua 5.4
- Vue 3
- Pinia
- Tailwind CSS
- Vite
- pnpm/npm

## Estrutura

```txt
boylerplate_vuejs/
  fxmanifest.lua
  client/
    main.lua
  server/
    main.lua
  shared/
    config.lua
  ui/
    index.html
    package.json
    vite.config.js
    src/
      App.vue
      main.js
      services/
        nui.js
      stores/
        uiManager.js
      registry/
        windows.js
        modals.js
      components/
        templates/
  build/
    index.html
    assets/
```

## Instalacao

Entre na pasta da UI:

```bash
cd ui
```

Instale as dependencias:

```bash
pnpm install
```

Se preferir npm:

```bash
npm install
```

Gere o build usado pelo FiveM:

```bash
pnpm run build
```

ou:

```bash
npm run build
```

No `server.cfg`, adicione:

```cfg
ensure boylerplate_vuejs
```

## Scripts da UI

```bash
pnpm run dev
pnpm run build
pnpm run preview
```

- `dev`: abre o Vite para desenvolvimento no navegador.
- `build`: gera `../build`, que e carregado pelo FiveM.
- `preview`: testa o build localmente.

## Comandos no FiveM

- `/bpui`: abre o painel demo.
- `F2`: atalho padrao para abrir o painel demo.
- `/bptemplates`: abre a tela de componentes template.
- `/bpclose`: fecha janelas abertas e remove foco da NUI.
- `/bptoast`: envia um toast pelo client.
- `/bptoastall <mensagem>`: envia um toast pelo server.

Os nomes dos comandos ficam em `shared/config.lua`.

## Exports client

Use estes exports em outros resources client-side:

```lua
exports['boylerplate_vuejs']:SendUI('hud:update', {
  kills = 10,
  deaths = 2
})

exports['boylerplate_vuejs']:OpenWindow('templatePanel', {
  title = 'Minha janela'
})

exports['boylerplate_vuejs']:CloseWindow('templatePanel')

exports['boylerplate_vuejs']:ShowToast({
  title = 'Aviso',
  description = 'Mensagem enviada por outro resource.',
  type = 'success'
})

exports['boylerplate_vuejs']:SetUIFocus(true, true, false)
```

## Eventos client

```lua
TriggerEvent('boilerplate:client:sendUi', 'hud:update', {
  arena = 'Arena 1'
})

TriggerEvent('boilerplate:client:openWindow', 'templatePanel', {
  source = 'outro_resource'
})

TriggerEvent('boilerplate:client:closeWindow', 'templatePanel')

TriggerEvent('boilerplate:client:closeAll')

TriggerEvent('boilerplate:client:toast', {
  title = 'Info',
  description = 'Evento local recebido.',
  type = 'info'
})
```

## Eventos recebidos pelo Vue

O Vue escuta mensagens enviadas com `SendNUIMessage`.

Formato:

```lua
SendNUIMessage({
  action = 'ui:openWindow',
  data = {
    name = 'templatePanel',
    payload = {}
  }
})
```

Acoes ja suportadas:

- `ui:openWindow`
- `ui:closeWindow`
- `ui:toggleWindow`
- `ui:closeAll`
- `ui:openModal`
- `ui:closeModal`
- `ui:showOverlay`
- `ui:hideOverlay`
- `ui:toast`
- `ui:setHudVisible`
- `hud:update`
- `killfeed:add`
- `loading:set`

## Callbacks NUI

Callbacks ja registrados em `client/main.lua`:

- `ui:ready`
- `ui:focus`
- `ui:escape`
- `inventory:move`
- `inventory:use`
- `inventory:drop`
- `inventory:split`
- `template:action`
- `anticheat:getFlags`
- `anticheat:getLogs`
- `anticheat:action`

No Vue, chame callbacks com `nuiCallback`:

```js
import { nuiCallback } from './services/nui'

await nuiCallback('template:action', {
  action: 'save',
  payload: {
    id: 1
  }
})
```

No Lua, registre o callback:

```lua
RegisterNUICallback('template:action', function(data, cb)
  print(json.encode(data or {}))
  cb({ ok = true })
end)
```

## Componentes template

Os componentes base ficam em:

```txt
ui/src/components/templates/
```

Componentes incluidos:

- `TemplatePanel.vue`: estrutura de painel com header, descricao e slot de acoes.
- `TemplateButton.vue`: botao com variantes `primary`, `neutral`, `success` e `danger`.
- `TemplateStatCard.vue`: card de estatistica.
- `TemplateStatusPill.vue`: badge/status pequeno.
- `TemplateTable.vue`: tabela simples com slots por coluna.
- `TemplateEmptyState.vue`: estado vazio.
- `TemplateShowcase.vue`: tela de exemplo usando todos os templates.

Exemplo:

```vue
<template>
  <TemplatePanel title="Minha tela" description="Descricao curta da janela.">
    <template #actions>
      <TemplateButton @click="save">Salvar</TemplateButton>
    </template>

    <TemplateStatCard label="Online" :value="128" tone="emerald" />
  </TemplatePanel>
</template>

<script setup>
import { TemplateButton, TemplatePanel, TemplateStatCard } from './templates'

const save = () => {}
</script>
```

## Criando uma nova janela

Crie um componente:

```txt
ui/src/components/MyWindow.vue
```

Exemplo:

```vue
<template>
  <TemplatePanel title="Minha Window">
    <p class="text-sm text-slate-300">Conteudo da janela.</p>
  </TemplatePanel>
</template>

<script setup>
import TemplatePanel from './templates/TemplatePanel.vue'

defineProps({
  payload: {
    type: Object,
    default: () => ({})
  }
})
</script>
```

Registre em `ui/src/registry/windows.js`:

```js
import MyWindow from '../components/MyWindow.vue'

export const windows = {
  myWindow: MyWindow
}
```

Abra pelo Lua:

```lua
exports['boylerplate_vuejs']:OpenWindow('myWindow', {
  example = true
})
```

## Criando um modal

Crie o componente do modal e registre em `ui/src/registry/modals.js`:

```js
import MyModal from '../components/MyModal.vue'

export const modals = {
  myModal: MyModal
}
```

Abra com:

```lua
exports['boylerplate_vuejs']:SendUI('ui:openModal', {
  name = 'myModal',
  payload = {
    title = 'Confirmar'
  }
})
```

## Desenvolvimento no navegador

Durante `pnpm run dev`, o arquivo `ui/src/hooks/debugData.js` simula eventos NUI no browser. Isso permite testar a UI sem abrir o FiveM.

O servico `ui/src/services/nui.js` tambem faz mock de callbacks quando `GetParentResourceName` nao existe, evitando erro no navegador.

## Build para producao

Sempre rode:

```bash
cd ui
pnpm run build
```

O Vite gera os arquivos em:

```txt
build/
  index.html
  assets/index.js
  assets/index.css
```

O `fxmanifest.lua` ja aponta para:

```lua
ui_page 'build/index.html'
```

## Configuracao

Edite `shared/config.lua` para alterar:

- comandos
- tecla padrao
- dados iniciais do HUD
- inventario mock
- mensagens iniciais da UI
- modo debug

Exemplo:

```lua
Config.Debug = false
Config.DefaultKey = 'F3'
Config.Commands.openUi = 'menu'
```

## Troubleshooting

Se a UI nao abrir:

- confirme que `ensure boylerplate_vuejs` esta no `server.cfg`;
- rode `pnpm run build` dentro de `ui`;
- confirme que `build/index.html` existe;
- veja o console F8 do FiveM;
- veja se o nome do resource no export esta correto.

Se callbacks nao responderem:

- confirme que existe `RegisterNUICallback` com o mesmo nome chamado no Vue;
- sempre chame `cb(...)` no final do callback Lua;
- confira se o `nuiCallback` esta usando o evento correto.

Se o foco travar:

- use `/bpclose`;
- pressione `Esc`;
- chame `exports['boylerplate_vuejs']:SetUIFocus(false, false, false)`.

## Licenca

Use e adapte livremente para seus resources FiveM.
