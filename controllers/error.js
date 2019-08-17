exports.get404 = (req, res, next) => {
    res.status(404).render('404', { 
        docTitle:'Error 404 - Page Not Found', 
        path:'404' 
    });
}