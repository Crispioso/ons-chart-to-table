const client = require('./index.js');

const mockData = {
    data: [{
        "": "Column 1 - Cell 1",
        "Header 2": "Column 1 - Cell 2",
        "Header 3": "Column 1 - Cell 3",
        "Header 4": "Column 1 - Cell 4"
    }, {
        "": "Column 2 - Cell 2",
        "Header 2": "Column 2 - Cell 2",
        "Header 3": "Column 2 - Cell 3",
        "Header 4": "Column 2 - Cell 4"
    }, {
        "": "Column 3 - Cell 3",
        "Header 2": "Column 3 - Cell 2",
        "Header 3": "Column 3 - Cell 3",
        "Header 4": "Column 3 - Cell 4"
    }, {
        "": "Column 4 - Cell 4",
        "Header 2": "Column 4 - Cell 2",
        "Header 3": "Column 4 - Cell 3",
        "Header 4": "Column 4 - Cell 4"
    }],
    headers: ["", "Header 2", "Header 3", "Header 4"]
};

console.log(clint.createTable(mockData));
//# sourceMappingURL=index.test.js.map