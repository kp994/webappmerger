import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import multer from 'multer';
import mergepdfs from './merge.mjs';
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static(__dirname + '/public'));//can download files directly from the server
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merger', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files);
    let d= await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf` )
});

app.listen(3000, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
