import { Router } from "express";
import {autenticar, autorizacao } from "../controllers/autenticacaoController";

const autenticacaoRouter =  Router()
autenticacaoRouter.post("/login",autenticar)
autenticacaoRouter.get("/autorizacao",autorizacao)

export default autenticacaoRouter