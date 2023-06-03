import { rotaType } from "../types";
import contaRouter from "./contaRouter";
import usuarioRouter from "./usuarioRouter";

const router:rotaType[] = [
    {endopoint:"/usuario",route:usuarioRouter},
    {endopoint:"/conta",route:contaRouter}
]



export default router