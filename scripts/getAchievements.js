const achievement = document.getElementById("titles")
const loader = document.getElementById("spinner")
const button = document.getElementById("addMore")

//function creates a paragraph element with a name
// and adds it to the title container
let numberofRows = 1;

function showAchievement(name, icon) {
    let row = achievement.insertRow(numberofRows);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    const img = document.createElement("img");
    img.src = `https://xivapi.com${icon}`;
    cell0.appendChild(img);
    cell1.innerText = name;
    numberofRows += 1
}
//Load more results
let pageNumber = 1
function nextPage() {
    pageNumber += 1;
    getAchievements()
}

//spinner to show/hide
function showSpinner(isLoading) {
    if (isLoading == true) {
        loader.style.visibility = "visible";
    } else {
        loader.style.visibility = "hidden";
    }
}

//Hide button when error
function hideButton() {
        button.style.visibility = "hidden";
}

//Hide Button when 
function shouldHideButton(){
    return pageNumber == 18;
}

//fetch function
function getAchievements() {
    showSpinner(true);
    fetch(`https://xivapi.com/search?indexes=achievement&page=${pageNumber}`)
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            console.log(json)
            showSpinner(false)
            json.Results.forEach((item) => {
                showAchievement(item.Name, item.Icon);
            if (shouldHideButton()) {
                hideButton();
            }
            })
        })
        .catch((error) => {
            console.log("Error")
            showSpinner(false);
            hideButton();

        })
}

getAchievements()