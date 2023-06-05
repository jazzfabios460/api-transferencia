import Express from 'express'
import router from './src/routes'
import cors from 'cors'
import  swaggerUI from 'swagger-ui-express'
import  swaggerDocument from './swagger.json'
const CSS_URL:any = " https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ";
const app =  Express()
app.use(cors())
app.use(Express.json())
router.forEach(r=>{
    return app.use(r.endopoint, r.route)
})

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument,CSS_URL))
app.listen(4000,()=>console.log('rodando na porta 4000'))