require('dotenv').config();
const { inquirerMenu, pausaMenu, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
const main = async () => {
    let opt = '';
    const busquedas = new Busquedas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const search = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(search);
                const id = await listarLugares(lugares);
                if(id === '0') continue;
                const lugarSel = lugares.find(l=>l.id === id);              
                busquedas.agregarHistorial(lugarSel.nombre);
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                console.clear();
                console.log('\n***Información de ciudad***\n'.green);
                console.log('Ciudad:'.white, lugarSel.nombre);
                console.log('Lat:'.white, lugarSel.lat);
                console.log('Lng:'.white, lugarSel.lng);
                console.log('Temperatura:'.white, clima.temp);
                console.log('Minima:'.white, clima.min);
                console.log('Máxima:'.white, clima.max);
                console.log('Estado del Clima:'.white, clima.desc);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${lugar}`);
                });
            break;
        }

        if (opt !== 0) await pausaMenu();
    } while (opt !== 0);
}

main();