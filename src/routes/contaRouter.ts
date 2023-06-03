import { Router } from "express";
import { transferencia, listaPorId, listar } from "../controllers/contaControllers";

const contaRouter =  Router()
contaRouter.get("/",listar)
contaRouter.put("/transferencia",transferencia)
contaRouter.get("/:id",listaPorId)

export default contaRouter