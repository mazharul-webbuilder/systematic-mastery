const fs = require('fs');
const filename = 'storage.json';
const newObject = {
    name: 'Jane Doe',
    id: 67890,
    email: 'jane.doe@example.com'
};

fs.readFile(filename, 'utf8', (err, data) => {
    let fileData = [];

    if (err) {
        if (err.code === 'ENOENT') {
            console.log('File does not exist. Creating a new file.');
        } else {
            console.error('An unexpected error occurred reading the file:', err);
            return;
        }
    } else {
        // Handle empty or whitespace-only data
        if (data && data.trim().length > 0) {
            try {
                fileData = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON from file:', parseErr);
                return;
            }
        } else {
            console.log('File is empty or contains only whitespace. Starting with a new array.');
        }
    }

    if (!Array.isArray(fileData)) {
        console.warn('Existing file content is not a JSON array. Overwriting with a new one.');
        fileData = [];
    }

    fileData.push(newObject);

    const updatedJsonData = JSON.stringify(fileData, null, 2);

    fs.writeFile(filename, updatedJsonData, (writeErr) => {
        if (writeErr) {
            console.error('Error writing file:', writeErr);
        } else {
            console.log('Successfully appended new data to storage.json.');
        }
    });
});
