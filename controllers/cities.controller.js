import Cities from "../models/Cities.js"


const controller = {
    getCities: async (req, res) => {

        const queries = {}

        if (req.query.nombre) {
            const nombreSinEspacios = req.query.nombre.replace(/\s+/g, '').split('').join('.*');
            queries.nombre = new RegExp(`^${nombreSinEspacios}`, 'i');
        }

        try {

            const cities = await Cities.find(queries)
            return res.status(200).json({
                succes: true,
                cities: cities
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error al obtener las ciudadades'
            })
        }



    },


    getCityById: async (req, res) => {
        try {
            const oneCity = await Cities.findById(req.params.id)
            if (oneCity) {
                return res.status(200).json({
                    success: true,
                    city: oneCity
                })
            }
            return res.status(404).json({
                success: false,
                message: 'No se pudo encontrar la ciudad'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: ' Error al obtener la ciudad'
            })
        }
    },


    createCities: async (req, res) => {

        try {
            const newCity = await Cities.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'City created'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error al crear la ciudades'
            })
        }

    },

    updateCity: async (req, res) => {
        try {
            await Cities.updateOne({ _id: req.params.id }, req.body)

            return res.status(200).json({
                success: true,
                message: 'La ciudad se actualizo con exito'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar la ciudad'
            })
        }
    },

    deleteCity: async (req, res) => {
        try {

            await Cities.deleteOne({ _id: req.params.id })

            return res.status(200).json({
                success: true,
                message: 'La ciudad se elimino con exito'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar la ciudad'
            })

        }
    }
    
}       

 export default controller