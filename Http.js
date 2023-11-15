const express = require('express')
const app = express()
const port = 8080
app.use(express.urlencoded({extended:true}))

app.get('/:productos?limit=', (req, res) => {
    const prodsParams = req.query.productos
  res.send('<h1 style="color:blue">holamundo<\h1>')
})
app.get('/:productos/:id', (req, res) => {
    const prodsParams = req.query.productos
    const idParams = req.query.id
  res.send('<h1 style="color:blue">holamundo<\h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})