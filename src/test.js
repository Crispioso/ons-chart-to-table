const testContainer = document.getElementById('test-results');
const mockData = {
    headers: [
        "",
        "header 1",
        "header 2",
        "header 3"
    ],
    data: [
        {
            "": "Row 1 - Value 1",
            "header 1": "Row 1 - Value 2",
            "header 2": "Row 1 - Value 3",
            "header 3": "Row 1 - Value 4"
        },
        {
            "": "Row 2 - Value 1",
            "header 1": "Row 2 - Value 2",
            "header 2": "Row 2 - Value 3",
            "header 3": "Row 2 - Value 4"
        },
        {
            "": "Row 3 - Value 1",
            "header 1": "Row 3 - Value 2",
            "header 2": "",
            "header 3": "Row 3 - Value 4"
        }
    ]
}
const tableSnapshot = `<div class="table-wrapper">
<table>
    <thead>
        <tr scope="col"><th>Sex</th><th>Count</th></tr>
    </thead>
    <tbody>
        <tr><td>Male</td><td>65</td></tr><tr><td>Female</td><td>100</td></tr>
    </tbody>
</table>
</div>`
const test1 = {
    mockData: {
        headers: [
            "Sex",
            "Count"
        ],
        data: [
            {
                "Sex": "Male",
                "Count": "65"
            },
            {
                "Sex": "Female",
                "Count": "100"
            }
        ]
    },
    description: "Returned HTML string matches stored snapshot",
    run: HTMLOutput => {
        if (HTMLOutput.replace(/\s/g, "") === tableSnapshot.replace(/\s/g, "")) {
            return true;
        }

        console.log("Expected string of table HTML to match: \n" + tableSnapshot + "\n Instead got: \n", HTMLOutput);
        return false;
    }
}
const test2 = {
    mockData,
    description: "Empty headers still render as table header",
    run: HTMLOutput => {
        const DOMNode = document.createRange().createContextualFragment(HTMLOutput);
        if (DOMNode.querySelectorAll('thead th').length === 4) {
            return true;
        }

        console.log("Expected length of headers to be 4, instead got ", DOMNode.querySelectorAll('thead th').length);
        return false;
    }
}
const test3 = {
    mockData,
    description: "Empty cell renders as empty table cell",
    run: HTMLOutput => {
        const DOMNode = document.createRange().createContextualFragment(HTMLOutput);
        const tableRow3 = DOMNode.querySelectorAll('tbody tr')[2];
        if (tableRow3.querySelectorAll('td')[2].textContent === "" && tableRow3.querySelectorAll('td')[1].textContent === "Row 3 - Value 2") {
            return true;
        }

        console.log("Expected text on empty cell to be empty string, instead got '" + tableRow3.querySelectorAll('td')[2].textContent + "'");
        return false;
    }
}
const tests = [test1, test2, test3];

tests.forEach((test, index) => {
    const output = createTable(test.mockData);
    const HTML = document.createElement('div');
    const hasPassed = test.run(output); 
    HTML.innerHTML = (
        `<h2>Test ${index+1} - ${hasPassed? "passed": "failed"}</h2>
        <p>${test.description}</p>
        <details>
            <summary>HTML output</summary>
            <pre>${output}</pre>
        </details>
        `
    )
    testContainer.appendChild(HTML);
});