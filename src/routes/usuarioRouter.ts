import { Router } from "express";
import { atualizar, criar, deletar, listaPorId, listar } from "../controllers/usuarioController";

const usuarioRouter =  Router()
usuarioRouter.get("/listar",listar)
usuarioRouter.post("/criar",criar)
usuarioRouter.put("/:id",atualizar)
usuarioRouter.delete("/:id",deletar)
usuarioRouter.get("/:id",listaPorId)

export default usuarioRouter