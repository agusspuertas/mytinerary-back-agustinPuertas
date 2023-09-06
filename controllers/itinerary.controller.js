import Itinerary from "../models/Itinerary.js";
import Cities from "../models/Cities.js";

const controller = {

    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.find()
            
            if ( itineraries.length ) {
                return res.status(200).json({
                    success:true,
                    itineraries,
                })
            }
            return res.status(404).json({
                success:false,
                message: 'Error founding itineraries'
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: 'Error at getting the itineraries'
            })
        }
    },
 
    getItineraryById: async (req, res) => {
        try {
            const itinerary = await Itinerary.findById(req.params.id)
            
            if ( itinerary ) {
                return res.status(200).json({
                    success:true,
                    itinerary
                })
            }
            return res.status(404).json({
                success:false,
                message: 'itinerario no encontrado'
            })

        } catch (error) {
            return res.status(500).json({
                success:false,
                message: 'error al obtener el itinerario'
            })
        }
    },


    getItineraryByCity: async (req, res) => {

        try {
          const { cityId } = req.params;
          const itinerary = await Itinerary.find({ city: cityId });
          if (!itinerary)
            return res.status(404).json({ message: "itinerario no encontrado" });
          res.json(itinerary).status(200);
        } catch (error) {
          res
            .json({ message: error.message || "error al obtener el itinerario" })
            .status(500);
        }
      },

    createItinerary: async (req, res) => {
        try {
            const newItinerary = await Itinerary.create(req.body)

            return res.status(201).json({
                success: true,
                message: 'Itinerario creado'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'No se creo el itinerario'
            })
        }
    },
    updateItinerary: async (req, res) => {
        try {
            await Itinerary.updateOne({ _id: req.params.id }, req.body)

            return res.status(200).json({
                success: true,
                message: 'Itinerario actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'No se pudo actualizar el itinerario'
            })
        }
    },
    deleteItinerary: async (req, res) => {
        try {
            await Itinerary.deleteOne({ _id: req.params.id })

            return res.status(201).json({
                success: true,
                message: 'Itinerario eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'No se pudo eliminar el itinerario'
            })
        }
    }


}

export default controller