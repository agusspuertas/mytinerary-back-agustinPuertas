import Itineraries from "../models/Itineraries";

const controller = {

    getItineraries: async (req,res)=>{
        try {
            const itineraries = await Itineraries.find()
            if(itineraries.length > 0) {
                return res.status(200).json({
                    success: true,
                    itineraries: itineraries
                })
            }
            return res.status(404).json({
                success: false,
                message: 'Error al obtener lo itinerarios'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error'
            })
        }
    },
    getItineraryByCityId: async (req,res)=>{
        try {
            const aItinerary = await Itineraries.findOne(req.query.city)

            return res.status(200).json({
                success: true,
                Itinerary: aItinerary
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error'
            })
        }
    },
    getItineraryById: async (req,res)=>{
        try {
            const aItinerary = await Itineraries.findById(req.params.id);
    
            if (!aItinerary) {
                return res.status(404).json({
                    success: false,
                    message: 'Error al obtener el itinerario'
                });
            }
    
            return res.status(200).json({
                success: true,
                Itinerary: aItinerary
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error'
            });
        }
    },
    createItinerary: async (req,res)=>{
        try {
            const newItinerary = await Itineraries.create(req.body)

        return res.status(201).json({
            success: true,
            message:'Itinerario creado'
        })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'No se creo el itinerario'
            })
        }
    },
    updateItinerary: async (req,res)=>{
        try {
            await Itineraries.updateOne({_id:req.params.id},req.body)

            return res.status(200).json({
                success: true,
                message:'Itinerario actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'No se pudo actualizar el itinerario'
            })
        }
    },
    deleteItinerary: async (req,res)=>{
        try {
            await Itinerary.deleteOne({_id:req.params.id})

            return res.status(201).json({
                success: true,
                message:'Itinerario eliminado'
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