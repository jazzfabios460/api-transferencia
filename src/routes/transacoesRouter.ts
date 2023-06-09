import { Router } from "express";
import { transferencia, listar } from "../controllers/transacoes";

const transacoesRouter =  Router()
transacoesRouter.get("/",listar)
transacoesRouter.put("/transferencia",transferencia)

export default transacoesRouter