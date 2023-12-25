const fs = require('fs');
const path = require('path');

const folderName = process.argv[2];

if (!folderName) {
    console.error('Please provide a folder name.');
    process.exit(1);
}
const files = [
    { name: `${folderName}.controller.ts`, content: '/* Controller content */' },
    { name: `${folderName}.interface.ts`, content: '/* Interface content */' },
    { name: `${folderName}.middleware.ts`, content: '/* Middleware content */' },
    { name: `${folderName}.model.ts`, content: '/* Model content */' },
    { name: `${folderName}.route.ts`, content: '/* Route content */' },
    { name: `${folderName}.schema.ts`, content: '/* Schema content */' },
    { name: `${folderName}.service.ts`, content: '/* Service content */' },
];

const folderPath = path.join(__dirname, 'src', 'modules', folderName);

if (fs.existsSync(folderPath)) {
    console.error(`Folder '${folderPath}' already exists.`);
    process.exit(1);
}


fs.mkdirSync(folderPath);

files.forEach(file => {
    const filePath = path.join(folderPath, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`Created file: ${filePath}`);
});

console.log(`Folder and files created successfully for '${folderName}'.`);
