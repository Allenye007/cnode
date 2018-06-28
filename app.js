const express = require('express');


const app =  express();


app.get('/', (req, res) => {
    res.send('laile')
})



app.listen(3000, () => {
    console.log('服务器启动了')
})