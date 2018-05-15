


const errorJSON = (err , res) => {
    return res.json({
        success: false,
        error: err
    })
}




module.exports = {
    errorJSON
}
