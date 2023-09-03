import express from "express"
import itinerariesController from '../controllers/itineraries.controller.js'

const router = express.Router()
const {getItineraries, createItinerary, getItineraryByCityId, getItineraryById, updateItinerary, deleteItinerary} = itinerariesController

router.get('/',getItineraries)
router.post('/',createItinerary)
router.get('/:cities',getItineraryByCityId)
router.get('/:id',getItineraryById)
router.put('/:id',updateItinerary)
router.delete('/:id',deleteItinerary)

export default router