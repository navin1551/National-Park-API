'use strict';

//function for when user inputs state and clicks search button
function searchButtonHandle() {
    $('#search-form').on('submit', event => {
        event.preventDefault();
        const stateSearch = $('#state-select').val();
        const numLimit = $('#limit-select').val();
        getParkInfo(stateSearch,numLimit);
        $('.results-area').show();
    })
}





//function to construct query parameters for URL
const apiKey = 'EeDOxICEgmJhZSYmhjtvagsr3uuF1w0ZlFs5xn9X';

const baseUrl = 'http://api.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItemsConstruct = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItemsConstruct.join('&');
}

//function to retrieve data using parameters 
function getParkInfo(query, limit=10) {
    const params = {
        api_key: apiKey,
        q: query,
        limit
    };
    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(reponseJson => console.log(JSON.stringify(reponseJson)))
        .catch(err => {
            $('#error-message').text('Not found');
        });
}







/*function to display search results to DOM
function displayResults() {
    $('#search-form').empty();
    for (let i = 0; i < )
}*/




$(searchButtonHandle);