const validateTitle = (req, res, next) => {
    const { body } = req;
    if (body.title === undefined){
        res.status(400).json({ messsage: "Campo titulo é obrigatorio"});
    }
    if (body.title === ''){ 
        res.status(400).json({ messsage: "Campo titulo NÃO PREENCHIDO" });
    }
    
    next();
};
const validateStatus = (req, res, next) => {
    const { body } = req;
    if (body.status === undefined){
        res.status(400).json({ messsage: "Campo status é obrigatorio"});
    }
    if (body.status === ''){ 
        res.status(400).json({ messsage: "Campo status NÃO PREENCHIDO" });
    }
    
    next();
};

module.exports = {
    validateTitle,
    validateStatus
}