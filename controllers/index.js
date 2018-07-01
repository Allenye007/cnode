exports.showIndex = (req, res) => {
    // res.send('home page')
     // 渲染index.html页面    并把session渲染到页面
    res.render('../views/index.html', {
        user: req.session.userData
    }); 
    
}
