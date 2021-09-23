const inquirer = require('inquirer');
require('colors');
const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        { value: 1, name: `${'1.'.yellow} ${'Buscar ciudad'.white}` },
        { value: 2, name: `${'2.'.yellow} ${'Historial'.white}` },
        { value: 0, name: `${'0.'.red} ${'Salir'.white}\n` }
    ]
}];
const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('==========================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}
const pausaMenu = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `${'Presione'.white} ${'ENTER'.green} ${'para continuar'.white}\n`
        }
    ];
    console.log('\n');
    await inquirer.prompt(questions);
}
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar,i)=>{
    const idx = `${i + 1}`.green;
    return {
        value: lugar.id,
        name: `${idx}. ${lugar.nombre}`.white}
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'.white
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async (message)=>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`.white,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausaMenu,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}