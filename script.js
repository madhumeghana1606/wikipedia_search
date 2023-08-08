let inputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let load = document.getElementById("spinner");

function appendandcreateresult(result) {
    load.classList.add("d-none")
    searchResultsEl.classList.remove("d-none")
    let {
        title,
        link,
        description
    } = result
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displaysearchresult(searchresults) {

    for (let result of searchresults) {
        appendandcreateresult(result)
    }
}

function startSearch(event) {
    let inpValue = inputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + inpValue
    let options = {
        method: "GET"
    }
    if (event.key === "Enter") {
        load.classList.remove("d-none")
        searchResultsEl.classList.add("d-none")
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData
                displaysearchresult(search_results)
            })
    }
}
inputEl.addEventListener("keydown", startSearch);