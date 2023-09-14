import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { verify } from '../helpers/google-verify.js'


const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await User.create(req.body)

            return res.status(201).json({
                succes: true,
                message: 'User registered! '
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error'
            })
        }
    },
    signin: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    foto: user.foto
                },
                process.env.SECRET,
                {expiresIn: '10h'}
            )

            user.password = null;

            return res.status(200).json({
                succes: true,
                message: 'User logged in correctly',
                response: {
                    token,
                    user
                }
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error authenticating user'
            })
        }
    },
    googleSignIn: async (req, res, next) => {
        const {token_id} = req.body;
        
        try {
         const {given_name,family_name,email, photo} = await verify(token_id)

         let user = await User.findOne({ email })

 

         if(!user){
             
             const data = {
                 nombre: given_name,
                 apellido: family_name,
                 email,
                 foto: photo,
                 password: bcryptjs.hashSync(process.env.STANDARD_PASS,10),
                 google: true,
                 verified_code: crypto.randomBytes(10).toString('hex')
                }

             user = await User.create(data)
         }

         user.online=true
         await user.save()
         const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                foto: user.foto
            },
            process.env.SECRET,
            {expiresIn: '10h'}
        )

         res.status(200).json({
            succes: true,
            message: 'User logged in correctly with Google',
            response: {
                token,
                user
            }            
         })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error authenticating user'
            })
        }
    },
    signout: async (req, res, next) =>{
        try {
            const user = await User.findOneAndUpdate(
                {email: req.user.email},
                {online: false},
                {new: true}
            )

            return res.status(200).json({
                succes: true,
                message: 'Logged out user'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error authenticating user'
            })
        }
    },
    token: async(req, res, next) => {
        const {user} = req
        try {
            return res.status(200).json({
                // token,
                user
            })
        } catch (error) {
            next(error)
        }
    }
}
export default controller