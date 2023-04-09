//Checks to see if user has logged in already 
const requiresLogin = (req, res, next) => {
    if(!req.session.account) {
        return res.redirect('/'); 
    }
    return next(); 

}

//Checks to see if user has logged out
const requiresLogout = (req, res, next) => {
    if(req.session.account) {
        return res.redirect('/maker'); 
    }
    return next(); 
}

//Checks for secure actions 
const requiresSecure = (req, res, next) => {
    //checks to see if request was secure 
    if(req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`); 
    }
    return next(); 
}

//Bypasses request check for local testing 
const bypassSecure = (req, res, next) => {
    next();
}

module.exports.requiresLogin = requiresLogin; 
module.exports.requiresLogout = requiresLogout; 

//Chooses production based on environment 
if(process.nextTick.NODE_ENV === 'production') {
    module.exports.requiresSecure = requiresSecure; 
} else{
    module.exports.requiresSecure = bypassSecure; 
}
