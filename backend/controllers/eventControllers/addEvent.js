
const addEvent = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const fileName = `${Date.now()}_${req.file.originalname}`;
  
      const fileStream = req.bucket.file(fileName).createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
  
      fileStream.on('error', (err) => {
        console.error('Error uploading to Firebase Storage:', err);
        res.status(500).send('Internal Server Error');
      });
  
      fileStream.on('finish', () => {
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${req.bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
res.status(200).send(`File uploaded successfully. Download URL: ${downloadUrl}`);

        // const downloadUrl = `https://storage.googleapis.com/${req.bucket.name}/${fileName}`;
        // res.status(200).send(`File uploaded successfully. Download URL: ${downloadUrl}`);
      });
  
      fileStream.end(req.file.buffer);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
export default addEvent
  