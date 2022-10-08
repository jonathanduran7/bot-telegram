require('dotenv').config()
const { Telegraf } = require('telegraf')
const getData = require('./scrapping')
const actionsBot = require('./utils/actions-bot')
const { BOT_TOKEN } = require('./utils/variables')

const bot = new Telegraf(BOT_TOKEN)

bot.start(async(ctx) => {
   console.log(await (await ctx.getChat()).id)
   ctx.reply('Elige las servicios que quieras consultar', {
      reply_markup: {
         inline_keyboard: [
            [{ text: 'Ciudadania Española', callback_data: 'consultar-ciudadania' }, { text: 'Mas servicios', callback_data: 'mostrar-servicios' }],
         ]
      }
   })
})

bot.action('consultar-ciudadania', async (ctx) => {
   const { servicioFiltrado } = await getData()

   let proximaFecha = servicioFiltrado.proximaApertura

   if (servicioFiltrado.proximaApertura === 'fecha por confirmar') {
      proximaFecha = 'La fecha de apertura de citas esta por confirmar'
   }

   ctx.reply(`${proximaFecha} \n \nLa ultima apertura fue el: ${servicioFiltrado.ultimaApertura}`)
})

bot.action('mostrar-servicios', (ctx) => {
   ctx.reply('Elige las servicios que quieras consultar', {
      reply_markup: {
         inline_keyboard: actionsBot
      }
   })
})

bot.launch()