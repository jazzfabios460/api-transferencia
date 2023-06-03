import { Request, Response, NextFunction } from "express"
import { prisma } from "../metodosGerais"

export const criar = async (req:Request, res:Response, next:NextFunction)=>{
   const {nome, email, senha} = req.body 
   try {
     res.json({nome, email})
   } catch (error) {
    res.json(error)
   }
}

export const listar = async (req:Request, res:Response, next:NextFunction)=>{
    const usuario =await prisma.conta.findMany({
      include:{
        usuario:true
      }
    })
    try {
      res.json(usuario)
    } catch (error) {
     res.json(error)
    }
}

export const listaPorId = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    try {
      res.json("criar")
    } catch (error) {
     res.json(error)
    }
}

export const transferencia = async (req:Request, res:Response, next:NextFunction)=>{
    
    const {valor, idPagador, idCobrador} = req.body 
    let resposta:any = ""
    try {
      const saldo = await prisma.usuario.findUnique({
        where:{
          id:idPagador
        },
        select:{
          conta:{
            select:{
              saldo:true
            }
          }
        }
      })

      if ( valor <= 0 || !valor || valor === "") {
        resposta = "não pode enviar valores negativos ou nulos!"
      }else{
        if (saldo?.conta[0].saldo && saldo.conta[0].saldo < valor) {
          resposta =  "saldo insuficiente, seu saldo atual é de " + saldo.conta[0].saldo 
        } else {
          let pagador = await prisma.usuario.findUnique({
            where:{
              id:idPagador
            },
            include:{
              conta:{
                select:{
                  id:true
                }
              }
            }
          })
          let idDaContaPagador =   pagador?.conta[0].id || "" 
          
          let cobrador = await prisma.usuario.findUnique({
            where:{
              id:idCobrador
            },
            include:{
              conta:{
                select:{
                  id:true
                }
              }
            }
          })
          let idDaContaCobrador =   cobrador?.conta[0].id || ""   
          await prisma.conta.update({
            where:{
              id:idDaContaCobrador
            },
            data:{
              saldo:{
                increment:valor
              }
            }
          })
          await prisma.conta.update({
            where:{
              id:idDaContaPagador
            },
            data:{
              saldo:{
                decrement:valor
              }
            }
          })
          resposta = "transferência comcluida com sucesso!"
        }
      }
      res.json(resposta)
    } catch (error) {
     res.json(error)
    }
}

export const deletar = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    try {
      res.json("criar")
    } catch (error) {
     res.json(error)
    }
}