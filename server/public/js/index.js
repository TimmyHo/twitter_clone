const indexDataText = document.querySelector('#indexDataText')

const url = '/api'
fetch(url).then(response => {
    response.json().then(({ info }) => {
        indexDataText.innerHTML = info
    });
});
