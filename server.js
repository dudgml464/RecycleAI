// Modules
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises;
const jpeg = require('jpeg-js');
const ort = require('onnxruntime-node');
const bodyParser = require('body-parser');
const sharp = require('sharp');
const mongoose = require('mongoose');

// Configurations
const app = express();
const port = 3000;
const labelsDictionary = require('./models/label_mapping.json');
const uri = 'mongodb://127.0.0.1:27017/RecyclingAppDB';
let session;

app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));

// Middlewares
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Schemas and Models
const imgUploadsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    icon: String,
    disposal: String
});
const imgUploads = mongoose.model('imgUploads', imgUploadsSchema, 'imgUploads');

const imageSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'imgUploads' },
    imageData: String
});
const ImageModel = mongoose.model('Image', imageSchema, 'images');

// MongoDB Connection
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB => RecyclingAppDB"))
  .catch((err) => console.log(err));

// Routes
app.get('/items', async (req, res) => {
    try {
        res.json(await imgUploads.find({}));
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

const labelToItemNameMap = {
    "boxes": "플라스틱",
    "glass bottles": "유리",
    "soda cans": "캔",
    "crushed soda cans": "캔",
    "water bottles": "플라스틱"
};

app.post('/upload', multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/'),
        filename: (req, file, cb) => cb(null, file.originalname)
    })
}).single('image'), async (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).send({
            message: "Image upload failed",
            status: 'failure'
        });
    }

    try {
        const imageBuffer = await fs.readFile(req.file.path);
        const label = await predictLabel(imageBuffer);
        const itemName = labelToItemNameMap[label];
        const itemInfo = await imgUploads.findOne({ name: itemName });
   
        if (!itemInfo) {
            console.error(`No item found with label: ${label}`);
            return res.status(500).send({
                message: `Item with label ${label} not found in the database`,
                status: 'failure'
            });
        }

        const newImage = new ImageModel({
            itemId: itemInfo._id,
            imageData: imageBuffer.toString('base64')
        });
        await newImage.save();

        res.send({
            message: "upload success",
            status: 'success',
            data: {
                file: req.file.path,
                predictedLabel: label,
                itemDetails: itemInfo
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            message: "Error during processing",
            status: 'failure'
        });
    } finally {
        await fs.unlink(req.file.path);
    }
});

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    labelMapping = JSON.parse(await fs.readFile('./models/label_mapping.json', 'utf-8'));
    session = await ort.InferenceSession.create('./models/model.onnx');
});

async function preprocessImage(imageBuffer) {
    // Resize the image to 32x32 using sharp
    const resizedImageBuffer = await sharp(imageBuffer)
        .resize(32, 32)
        .jpeg()
        .toBuffer();

    const pixels = jpeg.decode(resizedImageBuffer, true);

    console.log(`Resized Image Dimensions: ${pixels.width} x ${pixels.height}`);

    const tensorDims = [1, 3, 32, 32];

    // Extract RGB values and normalize
    const data = new Float32Array(32 * 32 * 3);
    let idx = 0;
    for(let i = 0; i < pixels.data.length; i += 4) {
        data[idx++] = pixels.data[i] / 255.0;     // R
        data[idx++] = pixels.data[i+1] / 255.0;   // G
        data[idx++] = pixels.data[i+2] / 255.0;   // B
    }

    return {
        data: data,
        dims: tensorDims
    };
}

async function predictLabel(imageBuffer) {
    console.log("Model's expected input names:", session.inputNames);

    const processedImage = await preprocessImage(imageBuffer);
    const inputName = session.inputNames[0];

    const feeds = {};
    feeds[inputName] = new ort.Tensor('float32', processedImage.data, processedImage.dims);

    const outputMap = await session.run(feeds);

    console.log("Output Map:", outputMap);
    console.log("Type of outputMap:", typeof outputMap);

    const outputData = outputMap['19'].data;
    const predictedClass = outputData.indexOf(Math.max(...outputData));

    console.log("Predicted Class Index:", predictedClass);

    const label = labelsDictionary[predictedClass];
    console.log("Predicted Label:", label);

    return label;
}