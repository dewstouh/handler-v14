<div align="center">
 <a href="https://discord.gg/MBPsvcphGf" target="_blank"><img src="https://img.shields.io/maintenance/yes/2023?style=for-the-badge&label=MANTENIDO" /></a>
 <a href="https://discord.gg/MBPsvcphGf" target="_blank"><img src="https://img.shields.io/discord/879397504075063297?color=blue&label=soporte&style=for-the-badge&logoColor=white" /></a>
 <a href="https://www.postgresql.org" target="_blank"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/></a>
 <a href="https://www.nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/></a>
</div>

# Handler Bot de Discord | V14 

El handler que necesitas para tu bot de Discord!
> 👤 *Creado por **`dewstouh`***

> <img src="https://cdn.discordapp.com/icons/879397504075063297/a_36490f721aa5fd41f84422ba9942a855.png" width="16" style="border-radius: 50%;"></img> [El Mundo de Niby](https://discord.com/invite/MBPsvcphGf)

# 📋 Tabla de Contenidos

- [Handler Bot de Discord | V14](#handler-bot-de-discord--v14)
- [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [✍ Configuración](#-configuración)
    - [☑️ Requisitos](#️-requisitos)
    - [📋 Instalación](#-instalación)
    - [⚙️ Configuración](#️-configuración)
    - [🔨 Creación de Comandos](#-creación-de-comandos)
      - [💬 Comandos de Prefijo](#-comandos-de-prefijo)
      - [(/) Comandos Slash](#-comandos-slash)
  - [💪 Características](#-características)
  - [💛 Contribuciones](#-contribuciones)
  - [🔰 Soporte](#-soporte)

## ✍ Configuración
### ☑️ Requisitos
- Crear un bot en el [Portal de Developers de Discord](https://discord.com/developers/applications) y activarle los intentos de: Contenido de Mensaje **(obligatorio)**, Miembros de Servidores y Presencia **(opcionales)**.
- Tener [NodeJS](https://nodejs.org) instalado en el equipo.
⚠️ Se recomienda instalar la versión LTS `16.x.x` para evitar posibles errores. ⚠️
- Un [cluster de MongoDB](https://www.mongodb.com/es/cloud/atlas/) para conectar la base de datos.
- Es recomendable hostearlo en un VPS o una Raspberry PI para dejar tu bot 24/7 encendido.

### 📋 Instalación
```git
git clone https://github.com/dewstouh/handler-v14
npm install
```

### ⚙️ Configuración
Encontrarás un archivo llamado `example.env`, renómbralo a `.env` e introduce los datos que se solicitan para el funcionamiento del bot.

*⚠️ Nunca compartas el contenido de tu `.env` con nadie*

```
BOT_TOKEN = "El Token de tu Bot"
MONGO_URL = "La url de tu Cluster de MongoDB"

PREFIX = "Prefijo del Bot"
STATUS = "Texto de Estado del Bot"
STATUS_TYPE = "Tipo de Estado"
LANGUAGE = "Idioma por defecto del Bot"
COLOR = "el color del embed (HEX)"
OWNER_IDS = "La ID de los propietarios del bot separado con espacios"
```

Cuando tengas el bot configurado y con sus módulos instalados, puedes encenderlo usando ```node .```

### 🔨 Creación de Comandos
#### 💬 Comandos de Prefijo
En el contenido de `/src/comandos`, podrás encontrar las categorías de los comandos, para crear una categoría, es tan sencillo como crear una carpeta dentro de esta ruta, por ejemplo:

- `/src/comandos/Prueba`

Para crear comandos dentro de esta categoría, tendrás que crear un archivo con el nombre del comando con formato `.js`, por ejemplo:

- `/src/comandos/Prueba/ping.js`

Después, tendrás que crear la estructura (objeto) del comando con la siguiente plantilla:

```js
module.exports = {
    DESCRIPTION: "Sirve para ver el ping del bot", //descripción del comando
    ALIASES: ["botping", "pingbot"] //alias del nombre del comando
    PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permisos que necesitará el usuario para ejecutar el comando
    BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permisos que necesitará el bot para ejecutar el comando
    OWNER: true, //Solo los dueños del bot podrán ejecutar el comando
    execute(client, message, args, prefix, GUILD_DATA){
        //ejecución del comando
        return message.reply(`\`${client.ws.ping}ms\``);
    }
}
```

⌚ No es necesario especificar el nombre del comando. El nombre del comando será igual al nombre del archivo.

Para ejecutar el comando que hayamos creado, es tan sencillo como ejecutar en nuestro bot `<Prefijo>ping`

*⚠️ Si creas dos comandos con el mismo nombre, el bot solo ejecutará uno de ellos. ⚠️*
#### (/) Comandos Slash
En el contenido de `/src/slashCommands`, podrás encontrar las categorías de los comandos, para crear una categoría, es tan sencillo como crear una carpeta dentro de esta ruta, por ejemplo:

- `/src/slashCommands/Prueba`

Para crear comandos dentro de esta categoría, tendrás que crear un archivo con el nombre del comando con formato `.js`, por ejemplo:

- `/src/slashCommands/Prueba/ping.js`

Después, tendrás que crear la estructura (objeto) del comando con la siguiente plantilla:

```js
const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Sirve para ver el ping del bot"), //descripción del comando
    //puedes encontrar más métodos en https://discordjs.guide/creating-your-bot/slash-commands.html

    PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permisos que necesitará el usuario para ejecutar el comando
    BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permisos que necesitará el bot para ejecutar el comando
    OWNER: true, //Solo los dueños del bot podrán ejecutar el comando
    execute(client, interaction, prefix, GUILD_DATA){
        //ejecución del comando
        return interaction.reply(`\`${client.ws.ping}ms\``);
    }
}
```

⌚ No es necesario especificar el nombre del comando. El nombre del comando será igual al nombre del archivo.

Para ejecutar el comando que hayamos creado, es tan sencillo como ejecutar en nuestro bot `/ping`

*⚠️ Si creas dos comandos con el mismo nombre, el bot solo ejecutará uno de ellos. ⚠️*

## 💪 Características

- ✅ Escalable
- ✅ Organizado
- ✅ Base de Datos MongoDB
- ✅ Comandos Slash y Comandos de Prefijo
- ✅ Recarga el bot sin tener que reiniciar, evitando posibles spams a la API de Discord

## 💛 Contribuciones
Gracias por usar este código! Si quieres apoyarnos puedes hacerlo realizando una [donación a través de PayPal](https://paypal.me/mfdewstouh).

Todas las donaciones serán utilizadas para mejorar el servicio, los bots, la calidad de los videos y su contenido. ¡Gracias!

## 🔰 Soporte
Si necesitas ayuda, puedes acudir a nuestro <img src="https://cdn.discordapp.com/icons/879397504075063297/a_36490f721aa5fd41f84422ba9942a855.png" width="16" style="border-radius: 50%;"></img> [Servidor de Soporte](https://discord.gg/MBPsvcphGf) y podrás encontrar canales de ayuda en la sección de `🖥️ Programación`.

***Testeado y funcionando correctamente en la versión NodeJS `16.11.0` y npm `8.0.0`***
