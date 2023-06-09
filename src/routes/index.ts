import { rotaType } from "../types";
import autenticacaoRouter from "./antenticacaoRouter";
import contaRouter from "./contaRouter";
import transacoesRouter from "./transacoesRouter";
import usuarioRouter from "./usuarioRouter";

const router:rotaType[] = [
    {endopoint:"/usuario",route:usuarioRouter},
    {endopoint:"/conta",route:contaRouter},
    {endopoint:"/autenticacao",route:autenticacaoRouter},
    {endopoint:"/transacoes",route:transacoesRouter}

]



export default router