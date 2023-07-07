
function validateBodySchema(schema) {
    return (req, res, next) => {
        const data = { ...req.body}

        const result = schema.validate(data, {abortEarly: false});
        
        if(!result.error) {
            // console.log("JOI validation sucessfully complete!")
            next();
        } else {
            // console.log("Error during validation!")
            return res.status(422).send(result.error);
        }
    }
}

export default validateBodySchema;