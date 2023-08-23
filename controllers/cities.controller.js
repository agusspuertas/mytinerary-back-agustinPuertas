import Cities from "../models/Cities.js"


const controller = {
    getCities: async (req, res) => {

        try{
            
            const cities = await Cities.find()

            return res.status(200).json({
                succes: true,
                cities: cities
            })

        }catch (error) {
            console.log(error)
           return res.status(500).json({
                success: false,
                message: 'Error al obtener las ciudadades'
            })
        }



    },
    createCities: async (req, res) => {
        
        try{
            const newCity = await Cities.create(req.body);
    
          return res.status(201).json({
            success: true,
            message: 'City create'
          })
        }catch (error) {
            console.log(error)
           return res.statu(500).json({
                success: false,
                message: 'Error al crear la ciudades'
            })
        }
        
    }
}

export default controller