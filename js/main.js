'strict'



var input = document.getElementById("myInput");

function init() {

    getAns(renderNames)
    
    
}

function initWorldCup(){
    getTeam(renderTeams)

}
function renderNames(list) {
    var elTable = document.querySelector('.container')

    const htmls = list.map(line => {
        return `<div class="card" >

            <ul class="header">
            ${line.fname}, ${line.lname}

            </ul>
            <div class="content">
            <div class="img-user">
            <img src="https://robohash.org/${line.fname}" alt="">
            </div>
                <div class="user-details">
                    <ul class="reg-line">phone number: ${line.pnumber} </ul>
                    <ul class="reg-line">phone city: ${line.city} </ul>
                    <ul class="reg-line">phone state: ${line.state} </ul>
                    <ul class="reg-line">phone zip: ${line.zip} </ul>
                    <ul class="reg-line">phone address: ${line.address} </ul>
                </div>
                </div>
        </div>`
    })


    elTable.innerHTML = htmls.join('')


}


$(".myInput").on('keyup', function (e) {
    if (e.key === 'Enter' ) {

        getAns(renderAns)



        // Do something
    }
});


function renderAns(ans){

    var elImgAns = document.querySelector('.section')

    elImgAns.innerHTML = `
    <h2 class="align">${ans.answer}</h2>
    <img class="align" src="${ans.image}" alt="">
    `

    if(ans.answer === 'yes') getJoke(renderJoke)
    else if(ans.answer === 'no') getDog(renderDog)




}

function renderJoke(ans){
    var elJoke = document.querySelector('.jokedog-section')
    elJoke.innerHTML = `
    <h2 class="align">${ans.value.joke}</h2> `

}
function renderDog(ans){
    var elJoke = document.querySelector('.jokedog-section')
    elJoke.innerHTML = `
    <img class="align" src="${ans.message}" alt="">`

}

function renderTeams(teams){
    
    elTeamsContainer = document.querySelector('.teams-container')
    

    for (let team in teams){
        elTeamsContainer.innerHTML += `<ul onclick="onCountryClicked(this)"
        class="teams-ul" data-country-code="${teams[team].fifa_code}">${teams[team].country}</ul>`

    }

}

function onCountryClicked(countryName){

    const elCountryHeader = document.querySelector('.country-details')
    elCountryHeader.innerHTML = countryName.innerText



    const countryCode = countryName.getAttribute("data-country-code")

    // console.log('countryCode:', )
    getmatches(countryCode, renderMaches)

}

function renderMaches(teamData){
    //show the team games: Time, venue, result.
    console.log('teamData',teamData)

    elMatcehs = document.querySelector('.matches-container')
    elMatcehs.innerHTML = ''


    for(let idx in teamData){

        elMatcehs.innerHTML += `

        <div class="card">

        <ul>datetime: ${teamData[idx].datetime}</ul>
        <ul>Venue: ${teamData[idx].venue}</ul>
        <ul>home_team_country/goals: ${teamData[idx].home_team_country}/${teamData[idx].home_team.goals}</ul>
        <ul>away_team_country/goals: ${teamData[idx].away_team_country}/${teamData[idx].away_team.goals}</ul>
        </div>`


        //"home_team_country":"Argentina","away_team_country":"Japan","datetime":"2019-06-10T16:00:00Z"

       // console.log('teamData',teamData)
    }

}
