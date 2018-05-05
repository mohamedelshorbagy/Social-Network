


const errorJSON = (err , res) => {
    return res.status(500).json({
        success: false,
        error: err
    })
}




module.exports = {
    errorJSON
}
