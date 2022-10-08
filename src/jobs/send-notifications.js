const { Telegraf } = require('telegraf')
const { BOT_TOKEN } = require('../utils/variables');
const getData = require('../scrapping')

const bot = new Telegraf(BOT_TOKEN)

const schedule = require('node-schedule');

schedule.scheduleJob('*/2 * * * *', async function () {
   const { servicioFiltrado } = await getData()

   let proximaFecha = servicioFiltrado.proximaApertura

   if (servicioFiltrado.proximaApertura === 'fecha por confirmar') {
      proximaFecha = 'La fecha de apertura de citas esta por confirmar'
   }

   bot.telegram.sendMessage(1781962868, `Recordatorio de la ciudadania Española: \n\n${proximaFecha} \n \nLa ultima apertura fue el: ${servicioFiltrado.ultimaApertura}`)
});

schedule.scheduleJob('*/10 * * * *', async function () {
   console.log('Server is running')
})