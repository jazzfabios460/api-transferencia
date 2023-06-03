import { rotaType } from "../types";
import autenticacaoRouter from "./antenticacaoRouter";
import contaRouter from "./contaRouter";
import usuarioRouter from "./usuarioRouter";

const router:rotaType[] = [
    {endopoint:"/usuario",route:usuarioRouter},
    {endopoint:"/conta",route:contaRouter},
    {endopoint:"/autenticacao",route:autenticacaoRouter}
]



export default router