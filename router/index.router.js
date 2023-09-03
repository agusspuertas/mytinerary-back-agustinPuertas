import express from 'express';
import cityRouter from './city.router.js'
import itineraryRouter from './itinerary.router.js'

const router = express.Router();

// req es el objeto solicitud
// res es el objeto respuesta
router.get('/', (req,res)=>{
    res.send('Hello Word')
});

router.use('/cities', cityRouter);
router.use('/itineraries',itineraryRouter)
export default router;