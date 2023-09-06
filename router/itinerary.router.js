import express from "express"
import itineraryController from '../controllers/itinerary.controller.js'

const router = express.Router()
const {getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary} = itineraryController

router.route("/city/:cityId").get(itineraryController.getItineraryByCity);
router.get('/',getItineraries)
router.post('/',createItinerary)
router.get('/:id',getItineraryById)
router.put('/:id',updateItinerary)
router.delete('/:id',deleteItinerary)
export default router