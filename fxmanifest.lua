fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'boylerplate_vuejs'
author 'PvP Shelby'
description 'Boilerplate FiveM com Vue 3, Pinia, Tailwind e Vite para NUI.'
version '1.0.0'

ui_page 'build/index.html'

files {
  'build/index.html',
  'build/assets/*.js',
  'build/assets/*.css',
  'build/assets/*'
}

shared_scripts {
  'shared/config.lua'
}

client_scripts {
  'client/main.lua'
}

server_scripts {
  'server/main.lua'
}
