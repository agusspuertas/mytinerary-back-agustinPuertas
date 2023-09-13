import express from 'express';
import citiesController from '../controllers/cities.controller.js'
import passport from '../middlewares/passport.js';

const router = express.Router();

const {getCities, getCityById, createCities, updateCity, deleteCity } = citiesController

router.get('/',getCities )
router.post('/',passport.authenticate('jwt', {session: false}),createCities )

router.get('/:id',getCityById)

router.put('/:id',updateCity)

router.delete('/:id',deleteCity)


export default router; 