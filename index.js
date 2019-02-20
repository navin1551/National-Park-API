'use strict';

//function for when user inputs state and clicks search button
function searchButtonHandle() {
    $('#search-form').on('submit', event => {
        event.preventDefault();
        const stateSearch = $('#state-select').val();
        const numLimit = $('#limit-select').val() -1;
        getParkInfo(stateSearch, numLimit);
    })
}



//function to construct query parameters for URL
const apiKey = 'EeDOxICEgmJhZSYmhjtvagsr3uuF1w0ZlFs5xn9X';

const baseUrl = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItemsConstruct = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItemsConstruct.join('&');
}

//function to retrieve data using parameters 
function getParkInfo(query, limit) {
    const params = {
        stateCode: query,
        key: apiKey,
        limit
    };
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString;

    fetch(url)
        .then(response => {
            console.log(response.statusText);
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            console.log(responseJson) 
            displayResults(responseJson)
        })
        .catch(err => {
            $('#error-message').text('NOT FOUND');
        });
}



//function to display search results to DOM
function displayResults(responseJson) {
    $('.results-list').empty();
    $('#error-message').empty();
    if (responseJson.data.length > 0 && responseJson.total !== 496) {
        for (let i = 0; i < responseJson.data.length; i++) {
            $('.results-list').append(
                `<li><h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href= "${responseJson.data[i].url}" target="_blank">Link</a>
                </li>`);
        $('.results-area').show();
    }}
    else{
        $('#error-message').text('RESULTS NOT FOUND');
    }
   };


$(searchButtonHandle)