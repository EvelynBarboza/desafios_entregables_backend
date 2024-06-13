const passport = require('passport');
//const local = require('passport-local');
const {  UserManagerMongo } = require('../dao/userManagerMongo.js')
const { createHash, isValidPassword } = require ('../utils/bcrypt.js');
const GithubStrategy = require('passport-github2')


//const localStrategy = local.Strategy;
const userService = new UserManagerMongo()

export const initPassport = () => {

//AUTENTICACION CON GITHUB (NUEVO) ( CLASE 22 AUT. POR TERCEROS)
passport.use('github', new GithubStrategy({
    clientID: 'Iv23li2JM2trQOq6wmfX',
    clientSecret: '79824b8773f326f12674a54ede7d21dd2014adec',
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
}, async (accesToken, refreshToken, profile, done) =>{
    try {
        console.log(profile)
        let user = await userService.getUserBy({email: profile._json.email})
        if (!user) {
            let newUser = {
                first_name: profile._json.name,
                last_name: profile._json. name,
                email: profile._json.email,
                password: ''
            }
            let result = await userService.createUser(newUser)
            done(null, result)
        } else {
            done(null, user)
        }

    } catch (error) {
        return done(error)
    }
}
))


//REGISTER CON PASSPORT (CLASE 21 AUTENTICAICON)
    passport.use('register', new localStrategy ({
        passReqToCallback: true,
        usernameField:'email'
    }, async (req, username, password, done)=> {
            const {first_name, last_name } = req.body
                try {
                    let useFound = await userService.getUserBy({email: username})
                    if (userFound) {
                        console.log8('El usuaruio ya existee')
                        return done(null, false)
                    } let newUser = {
                        first_name,
                        last_name,
                        email:username,
                        password: createHash(password)
                    }
                    let result = await userService.createUser(newUser)
                    return done(null, result)
                } catch (error) {
                    return done('Error al registrar el usuario' + error)
                }
        }))
 
//LOGIN CON PASSPORT   
    passport.use('login', new localStrategy ({
        usernameField : 'email'
    }, async (username, password, done)=> {
        try {
            const user = await userService.getUserBy({email: username})
            if(!user) {
                console.log('Usuario no encontrado')
                return done(null, false)
            }
            if (!isValidPassword(password, {password: user.password})) return donde(null, false)
                return done(null, user)
        } catch (error) {
            return done(error)
            }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser( async (id, done) =>{
        try {
            let user = await userService.getUserBy({_id:id})
            done(null, user)
        } catch (error ){
            done(error)
        }
    })
}

