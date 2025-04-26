import JWT from "jsonwebtoken" ; 

const secret = "laveesh@123"

function createTokenForUser(user){
    const payload = {

        _id : user._id , 
        name : user.fullName , 
        email : user.email , 
        profileImageUrl : user.profileImageUrl , 
        role : user.role , 

    } ; 
    const token = JWT.sign(payload , secret) ; 

    return token ; 

}

function validateToken(token) {
    if (!token || typeof token !== "string") {
        throw new Error("Invalid token: Token must be a non-empty string");
    }

    
    const payload = JWT.verify(token , secret ) ; 
    return payload ; 
}

export  {
    createTokenForUser ,
    validateToken , 
}