import Express from 'express'
import router from './src/routes'
const app =  Express()
app.use(Express.json())

router.forEach(r=>{
    return app.use(r.endopoint, r.route)
})
app.listen(4000,()=>console.log('rodando na porta 4000'))