import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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
    }
}
export default controller