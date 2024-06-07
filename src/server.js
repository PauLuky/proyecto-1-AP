const express = require("express");
const {
  getOneById,
  getAll,
  create,
  update,
  destroy,
} = require("./database/data.manager.js");

require("dotenv").config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/frutas", (req, res) => {
  getAll()
    .then((frutas) => res.status(200).send(frutas))
    .catch((error) => res.status(400).send(error.message));
});

server.get("/frutas/:id", (req, res) => {
  const { id } = req.params;

  getOneById(Number(id))
    .then((coche) => res.status(200).send(coche))
    .catch((error) => res.status(400).send(error.message));
});

server.post("/frutas", (req, res) => {
  const { nombre, importe, stock } = req.body;

  create({ nombre, importe, stock })
    .then((frutas) => res.status(201).send(frutas))
    .catch((error) => res.status(400).send(error.message));
});

server.put("/frutas/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, importe, stock } = req.body;

  update({ id: Number(id), nombre, importe, stock })
    .then((fruta) => res.status(200).send(fruta))
    .catch((error) => res.status(400).send(error.message));
});

server.delete("/frutas/:id", (req, res) => {
  const { id } = req.params;

  destroy(Number(id))
    .then((fruta) => res.status(200).send(fruta))
    .catch((error) => res.status(400).send(error.message));
});

server.use("*", (req, res) => {
  res
    .status(404)
    .send(
      `<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`
    );
});

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    `Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/frutas`
  );
});
