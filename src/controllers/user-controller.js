const user = require('../models').user

async function get(req, res) {
    const data = await user.findAll()

    res.send(data)
}

async function create(req, res) {
    await user.create(req.body)

    res.json({
        'status': 'succes',
        'message': 'Berhasil menambah data'
    })
}

module.exports = {
    get,
    create
}