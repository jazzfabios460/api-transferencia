import { Request, Response, NextFunction } from "express"
import { prisma } from "../metodosGerais"


export const listar = async (req:Request, res:Response, next:NextFunction)=>{
    const usuario =await prisma.transacao.findMany({
      include:{
         contaCreditada:{
          include:{
            usuario:true
          }
         },
         contaDebitada:{
          include:{
            usuario:true
          }
         }
      }
    })
    try {
      res.json(usuario)
    } catch (error) {
      res.status(400).json(error)
    }
}

export const transferencia = async (req:Request, res:Response, next:NextFunction)=>{
    let {valor_query, idPagador_query, idCobrador_query}:any = req.query 
    let { valorDaTransacao, id_conta_pagador, id_conta_recebidor} = req.body 
    if (valor_query && idCobrador_query && idPagador_query) {
      valorDaTransacao = parseFloat(valor_query)
      id_conta_recebidor = idCobrador_query
      id_conta_pagador = idPagador_query
    }
    let resposta:any = ""
    try {
      await prisma.transacao.create({
        data:{
            valorDaTransacao,
            id_conta_pagador,
            id_conta_recebidor
        }
      })
      await prisma.conta.update({
        where:{
            id:id_conta_pagador
        },
        data:{
            saldo:{
                decrement:valorDaTransacao
            }
        }
      })
      await prisma.conta.update({
        where:{
            id:id_conta_recebidor
        },
        data:{
            saldo:{
                increment:valorDaTransacao
            }
        }
      })
      res.json("Transação concluida com sucesso!")
    } catch (error) {
      res.status(400).json(error)
    }
}
