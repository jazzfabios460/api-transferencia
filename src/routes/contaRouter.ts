import { Router } from "express";
import { transferencia, criar, deletar, listaPorId, listar } from "../controllers/contaControllers";

const contaRouter =  Router()
contaRouter.get("/",listar)
contaRouter.post("/",criar)
contaRouter.put("/transferencia",transferencia)
contaRouter.delete("/:id",deletar)
contaRouter.get("/:id",listaPorId)

export default contaRouter