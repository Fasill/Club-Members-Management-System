const uploadFile = async (req) => {
    return new Promise((resolve, reject) => {
      try {
        if (!req.file) {
          reject('No file uploaded.');
          return;
        }
  
        const fileName = `${Date.now()}_${req.file.originalname}`;
  
        const fileStream = req.bucket.file(fileName).createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
  
        fileStream.on('error', (err) => {
          console.error('Error uploading to Firebase Storage:', err);
          reject('Internal Server Error');
        });
  
        fileStream.on('finish', () => {
          const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${req.bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
          resolve(downloadUrl);
        });
  
        fileStream.end(req.file.buffer);
      } catch (error) {
        console.error('Error:', error);
        reject('Internal Server Error');
      }
    });
  };
  
  // Example usage:
  try {
    const imageUrl = await uploadFile(req);
    console.log('File uploaded successfully. Download URL:', imageUrl);
    // Now you can use imageUrl as needed in your code
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately
  }

export default uploadFile;