// This is a Node.js script that you'd run before building your Docusaurus site.
// You might run this script as part of a "prebuild" script in your package.json.
// import fs from 'fs';
// import sizeOf from 'image-size';
// import path from 'path';

const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');

// Replace with your actual image directory path.
const IMAGES_DIR = path.resolve(__dirname, 'docs/assets');

// // Get a list of all image files. You might want to add more extensions.
// const imageFiles = fs
// 	.readdirSync(IMAGES_DIR)
// 	.filter((file) => file.endsWith('.png') || file.endsWith('.jpg'));
// console.log(imageFiles);
// const imageDimensions = {};

// for (const imageFile of imageFiles) {
// 	const dimensions = sizeOf(path.join(IMAGES_DIR, imageFile));
// 	imageDimensions[imageFile] = dimensions;
// }

// // Now write the dimensions object to a JSON file.
// fs.writeFileSync(
// 	path.resolve(__dirname, './imageDimensions.json'),
// 	JSON.stringify(imageDimensions, null, 2)
// );

// RECURSIVE VERSION

const imageDimensions = {};

// This function recursively scans a directory for image files.
function scanDir(directory) {
	const entries = fs.readdirSync(directory, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			scanDir(fullPath);
		} else if (entry.isFile() && (entry.name.endsWith('.png') || entry.name.endsWith('.jpg'))) {
			const dimensions = sizeOf(fullPath);
			// We'll use the full path, relative to IMAGES_DIR, as the key in the JSON file.
			const key = path.relative(IMAGES_DIR, fullPath);
			imageDimensions[key] = dimensions;
		}
	}
}

// Start scanning from the base directory.
scanDir(IMAGES_DIR);

// Write the dimensions object to a JSON file.
fs.writeFileSync(
	path.resolve(__dirname, './imageDimensions.json'),
	JSON.stringify(imageDimensions, null, 2)
);
