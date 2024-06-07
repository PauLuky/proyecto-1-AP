const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data.json");

function escribir(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(ruta, JSON.stringify(contenido, null, "\t"), "utf8", (error) => {
            if (error) reject(new Error("Error. No se puede escribir"));

            resolve(true);
        });
    });
}

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (error, result) => {
            if (error) reject(new Error("Error. No se puede leer"));

            resolve(JSON.parse(result));
        });
    });
}

function generarId(frutas) {
    let mayorId = 0;

    frutas.forEach((fruta) => {
        if (Number(fruta.id) > mayorId) {
            mayorId = Number(fruta.id);
        }
    });

    return mayorId + 1;
}

async function getOneById(id) {
    if (!id) throw new Error("Error. El Id no está definido.");

    const frutas = await leer();
    const fruta = frutas.find((element) => element.id === id);

    if (!fruta) throw new Error("Error. El Id de la fruta no existe.");

    return fruta;
}

async function getAll() {
    const frutas = await leer();
    return frutas;
}

async function create(fruta) {
    if (!fruta?.nombre || !fruta?.importe || !fruta?.stock) throw new Error("Error. Datos incompletos.");

    let frutas = await leer();
    const frutaConId = { id: generarId(frutas), ...fruta };

    frutas.push(frutaConId);
    await escribir(frutas);

    return frutaConId;
}

async function update(fruta) {
    if (!fruta?.id || !fruta?.nombre || !fruta?.importe || !fruta?.stock) throw new Error("Error. Datos incompletos.");

    let frutas = await leer();
    const indice = frutas.findIndex((element) => element.id === fruta.id);

    if (indice < 0) throw new Error("Error. El Id de la fruta no existe.");

    frutas[indice] = fruta;
    await escribir(frutas);

    return frutas[indice];
}

async function destroy(id) {
    if (!id) throw new Error("Error. El Id está indefinido.");

    let frutas = await leer();
    const indice = frutas.findIndex((element) => element.id === id);

    if (indice < 0) throw new Error("Error. El Id de la fruta no existe.");

    const fruta = frutas[indice];
    frutas.splice(indice, 1);
    await escribir(frutas);

    return fruta;
}

module.exports = { getOneById, getAll, create, update, destroy };