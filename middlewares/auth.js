

export const check_register = async(req,res,next) => {
    try{
        const {username, email, password, number} = req.body;

        if(!username) return res.send("username is required");
        if(!email) return res.send("email is required");
        if(!password) return res.send("password is required");
        if(!number) return res.send("number is required");
        if(number.length < 10) return res.send("contact number must be of 10 digits");
        if(password.length < 8 ) return res.send("password should be minimum of 8 digit");
    
        next();
    }catch(err){
        return res.send(err);
    }
    
}