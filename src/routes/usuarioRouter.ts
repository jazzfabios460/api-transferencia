import { Router } from "express";
import { atualizar, criar, deletar, listaPorId, listar } from "../controllers/usuarioController";

const usuarioRouter =  Router()
usuarioRouter.get("/listar",listar)
usuarioRouter.post("/criar",criar)
usuarioRouter.put("/atualizar/:id",atualizar)
usuarioRouter.delete("/deletar/:id",deletar)
usuarioRouter.get("/listarporid/:id",listaPorId)

export default usuarioRouter