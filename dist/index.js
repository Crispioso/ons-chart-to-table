const tableContainer = document.getElementById('table-container');
const form = document.getElementById('chart-input-form');
const formInput = form.querySelector('input');
const formInputContainer = document.querySelector('.form__input');

/* BIND EVENTS */
form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const chartURL = formData.get('chart-url').replace(/^(?:\/\/|[^\/]+)*\//, "").replace("/data", "");

    if (!chartURL) {
        formError.add("You must enter a chart's URL");
        return;
    }

    if (tableContainer.hasChildNodes()) {
        tableContainer.innerHTML = "";
    }

    loader.show();
    fetch(`https://www.ons.gov.uk/${chartURL}/data`).then(response => {
        loader.hide();
        switch (response.status) {
            case 400:
                {
                    formError.add('An unexpected error occurred. Please check the URL and try again.');
                    return;
                }
            case 404:
                {
                    formError.add('This chart could not be found. Please check that the URL is for an ONS chart.');
                    return;
                }
            case 500:
                {
                    formError.add('An unexpected error occurred. Please check the URL and try again.');
                    return;
                }
        }
        return response.json();
    }).then(responseJSON => {
        if (!responseJSON.type || responseJSON.type !== "chart") {
            formError.add('URL was for a page that is not an ONS chart.');
            return;
        }

        const tableHTML = document.createElement('div');
        tableHTML.innerHTML = `<h2>${responseJSON.title}</h2>
            <p class="table-subtitle">${responseJSON.subtitle}</p>
            ${createTable(responseJSON)}
            `;
        tableContainer.appendChild(tableHTML);
    }).catch(error => {
        loader.hide();
        console.error("An unexpected error occurred whilst trying to fetch chart data", error);
    });
});

formInput.addEventListener('input', () => {
    formError.empty();
});

/* TEMPLATES */
function createTable(data) {
    const headers = data.headers.map(header => {
        return `<th>${header}</th>`;
    }).join("");
    const body = data.data.map(row => {
        const cells = data.headers.map(header => {
            return `<td>${row[header]}</td>`;
        }).join("");
        return `<tr>${cells}</tr>`;
    }).join("");

    return `<div class="table-wrapper">
        <table>
            <thead>
                <tr scope="col">${headers}</tr>
            </thead>
            <tbody>
                ${body}
            </tbody>
        </table>
        </div>`;
}

/* RE-USABLE DOM INTERACTIONS */
class loader {
    static show() {
        if (document.getElementById('loader')) {
            console.warn("Attempt to add loader when it is already displayed");
            return;
        }
        const loaderHTML = document.createElement('div');
        loaderHTML.setAttribute('id', 'loader');
        tableContainer.appendChild(loaderHTML);
    }
    static hide() {
        const loader = document.getElementById('loader');
        if (!loader) {
            console.warn("Attempt to remove loader when it's not being displayed yet");
            return;
        }
        tableContainer.removeChild(loader);
    }
}

class formError {
    static add(errorMessage) {
        const error = document.createElement('span');
        error.classList.add('form__error');
        error.innerHTML = errorMessage;
        formInputContainer.appendChild(error);
        formInputContainer.classList.add('form__input--error');
    }
    static empty() {
        const error = document.querySelector('.form__error');
        if (!error) {
            return;
        }
        formInputContainer.classList.remove('form__input--error');
        form.querySelector('.form__input').removeChild(error);
    }
}
//# sourceMappingURL=index.js.map