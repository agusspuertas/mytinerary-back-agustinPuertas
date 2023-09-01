import express from 'express';
import citiesController from '../controllers/cities.controller.js'

const router = express.Router();

const {getCities, getCityById, createCities, updateCity, deleteCity } = citiesController

router.get('/',getCities )
router.post('/',createCities )

router.get('/:id',getCityById)

router.put('/:id',updateCity)

router.delete('/:id',deleteCity)


export default router; 