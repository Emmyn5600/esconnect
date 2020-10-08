/* eslint-disable node/no-unsupported-features/es-syntax */
import multer from 'multer';
import path from 'path'

// specify the storage engine

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()  }_${  file.originalname}`)
    }
})

// File validation

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb({ message: 'Unsupported File Format' }, false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter
})

export default upload
