import { Request, Response, NextFunction } from "express"
import { prisma } from "../metodosGerais"


export const listar = async (req:Request, res:Response, next:NextFunction)=>{
    const usuario =await prisma.transacao.findMany({
      include:{
         contaCreditada:{
          include:{
            usuario:{
              select:{
                id:true,
                email:true,
                nome:true
              }
            }
          }
         },
         contaDebitada:{
          include:{
            usuario:{
              select:{
                id:true,
                email:true,
                nome:true
              }
            }
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
      const saldoDoPagador:any = await prisma.conta.findFirst({
        where:{
          id:id_conta_pagador
        },
        select:{
          saldo:true
        }
      })
      if (saldoDoPagador?.saldo < valorDaTransacao) {
        res.json("saldo insuficiente!")
      }else{
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
      }
    } catch (error) {
      res.status(400).json(error)
    }
}

export const deletar = async (req:Request, res:Response, next:NextFunction)=>{
   try {
    const id = req.params.id
    await prisma.transacao.delete({
      where:{
        id
      }
    })
    res.json("Transação deletada com sucesso!")
   } catch (error) {
    res.status(400).json({erro:"falha ao deletar transação",motivo:error})
   }
}