import { Router } from "express";
import { transferencia, listar, deletar } from "../controllers/transacoes";

const transacoesRouter =  Router()
transacoesRouter.get("/",listar)
transacoesRouter.put("/transferencia",transferencia)
transacoesRouter.delete("/deletar/:id",deletar)

export default transacoesRouter