import express from "express"
import itineraryController from '../controllers/itinerary.controller.js'

const router = express.Router()
const {getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary} = itineraryController

router.get('/',getItineraries)
router.post('/',createItinerary)
router.get('/:id',getItineraryById)
router.put('/:id',updateItinerary)
router.delete('/:id',deleteItinerary)
router.route("/city/:cityId").get(itineraryController.getItineraryByCity);
export default router