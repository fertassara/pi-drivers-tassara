const { getByName } = require("../controllers/getByNameController");

const getByNameHandler = async (req, res)=>{
    const { name } = req.query;
    
    try {
        const response = await getByName(name);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({ error: error.message })  
    };
};

module.exports = { getByNameHandler };