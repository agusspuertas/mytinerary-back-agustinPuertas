import User from "../models/User.js"

const controller={
    getUser: async(req,res)=>{
        try {
            const users = await User.find()
            if(users.length > 0) {
                return res.status(200).json({
                    success: true,
                    users: users
                })
            }
            return res.status(404).json({
                success: false,
                message: 'Not found'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error'
            })
        }
    },
    createUser: async(req,res)=>{
        try {
            const newUser = await User.create(req.body)

        return res.status(201).json({
            success: true,
            message:'Usuario creado'
        })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error'
            })
        }
    },
    deleteUser: ()=>{},
}

export default controller