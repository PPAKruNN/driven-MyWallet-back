
function validateBodySchema(schema) {
    return (req, res, next) => {
        const data = { ...req.body, ...req.headers, ...req.params, ...req.query}

        const result = schema.options({allowUnknown: true}).validate(data, {abortEarly: false});
        
        if(!result.error) {
            // console.log("JOI validation sucessfully complete!")
            next();
        } else {
            // console.log("Error during validation!")
            return res.status(422).send(result.error.details.map((curr) => curr.message));
        }
    }
}

export default validateBodySchema;