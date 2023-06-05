import Express from 'express'
import router from './src/routes'
import cors from 'cors'
import  swaggerUI from 'swagger-ui-express'
import  swaggerDocument from './swagger.json'
const app =  Express()
app.use(cors())
app.use(Express.json())
router.forEach(r=>{
    return app.use(r.endopoint, r.route)
})

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.listen(4000,()=>console.log('rodando na porta 4000'))