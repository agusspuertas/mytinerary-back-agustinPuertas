import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO)
.then(()=> console.log('Database Connected'))
.catch((err) => console.log(err))