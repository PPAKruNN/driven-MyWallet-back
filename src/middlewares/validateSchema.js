
function validateSchema(schema) {
    return (req, res, next) => {
        data = { ...req.body, ...req.headers}

        const result = schema.validate(data, {abortEarly: false});
        
        if(!result.error) {
            console.log("JOI validation sucessfully complete!")
            next();
        } else {
            console.log("Error during validation!")
            return res.statusCode.send(result.error);
        }
    }
}

export default validateSchema;