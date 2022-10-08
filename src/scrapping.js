const puppeter = require('puppeteer');

const getData = async () => {
   const browser = await puppeter.launch();
   const urlPage = 'https://www.cgeonline.com.ar/informacion/apertura-de-citas.html'

   const page = await browser.newPage();
   await page.goto(urlPage);

   const enlaces = await page.evaluate(() => {
      const tabla = document.querySelectorAll('.table tbody tr');

      const data = []

      for (const tablaElemento of tabla) {
         let unElemento = tablaElemento
         let tdDelElemento = unElemento.querySelectorAll('td')

         const servicioSeleccionado = {
            servicio: tdDelElemento[0].innerHTML,
            ultimaApertura: tdDelElemento[1].innerHTML,
            proximaApertura: tdDelElemento[2].innerHTML,
         }

         data.push(servicioSeleccionado)
      }

      const servicioFiltrado = data.find(s => s.servicio === "Registro Civil-Conservación nacionalidad española")

      return {
         servicioFiltrado,
         data
      }
   })

   await browser.close();
   return enlaces
}

module.exports = getData