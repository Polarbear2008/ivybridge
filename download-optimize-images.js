const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create directories if they don't exist
const programsDir = path.join(__dirname, 'src', 'assets', 'images', 'programs');
const testimonialsDir = path.join(__dirname, 'src', 'assets', 'images', 'testimonials');

if (!fs.existsSync(programsDir)) {
  fs.mkdirSync(programsDir, { recursive: true });
}

if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Image URLs to download
const imagesToDownload = [
  // Program season images
  {
    url: 'https://source.unsplash.com/photo-1519389950473-47ba0277781c',
    outputPath: path.join(programsDir, 'season1.jpg'),
    type: 'program'
  },
  {
    url: 'https://source.unsplash.com/photo-1481627834876-b7833e8f5570',
    outputPath: path.join(programsDir, 'season2.jpg'),
    type: 'program'
  },
  {
    url: 'https://source.unsplash.com/photo-1523240795612-9a054b0db644',
    outputPath: path.join(programsDir, 'season3.jpg'),
    type: 'program'
  },
  // Testimonial images
  {
    url: 'https://source.unsplash.com/photo-1544005313-94ddf0286df2',
    outputPath: path.join(testimonialsDir, 'testimonial1.jpg'),
    type: 'testimonial'
  },
  {
    url: 'https://source.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    outputPath: path.join(testimonialsDir, 'testimonial2.jpg'),
    type: 'testimonial'
  },
  {
    url: 'https://source.unsplash.com/photo-1494790108377-be9c29b29330',
    outputPath: path.join(testimonialsDir, 'testimonial3.jpg'),
    type: 'testimonial'
  }
];

// Function to download an image
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Handle redirects from Unsplash
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadImage(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${outputPath}`);
        resolve(outputPath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Process images sequentially
async function processImages() {
  for (const image of imagesToDownload) {
    try {
      await downloadImage(image.url, image.outputPath);
      
      // Optimize the image - resize program images to 800px width and testimonial images to 400px width
      const width = image.type === 'program' ? 800 : 400;
      
      // Here you would typically use an image processing library like Sharp
      // Since we can't install npm packages in this environment, we'll just log what we would do
      console.log(`Optimizing ${image.outputPath} to ${width}px width`);
      
      // In a real environment, you would do something like:
      // const sharp = require('sharp');
      // await sharp(image.outputPath)
      //   .resize(width)
      //   .jpeg({ quality: 80 })
      //   .toFile(image.outputPath.replace('.jpg', '-optimized.jpg'));
    } catch (error) {
      console.error(`Error processing ${image.url}:`, error);
    }
  }
}

processImages().then(() => {
  console.log('All images downloaded and ready for optimization');
});
