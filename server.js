const express = require('express')
const app = express()
const {join} = require('path')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




app.listen(process.env.PORT || 3000)
