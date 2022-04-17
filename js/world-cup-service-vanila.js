'strict'

const CACHING_TIME = 10 * 1000 // ms
const STORAGE_KEY_TEAMS = 'teamsDB'
const STORAGE_KEY_MATCHES = 'matchesDB'
var gTeams = loadFromStorage(STORAGE_KEY_TEAMS) || {}

function getTeam(onSucsess) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE &&
            xhr.status === 200) {
            const teams = JSON.parse(xhr.responseText)

            // console.log('teams',teams)
            onSucsess(teams)
            saveToStorage(STORAGE_KEY_TEAMS, teams)
            gTeams = teams


            
        }
    }
    xhr.open("GET", "https://worldcup.sfg.io/teams/", true);
    xhr.send();

}

function getmatches(countrycode,onSucsess) {

    
    var idx = gTeams.findIndex(team => team.fifa_code === countrycode)
    


    const currTime = Date.now()

    // for(let idx in gTeams){
    //     if(countrycode === gTeams[idx].fifa_code) {
    //         var currTeam = {
    //             lastReq: gTeams[idx].lastReq,
    //             idx: idx
    //     }
    // }
   
   

    if (gTeams[idx].fifa_code === countrycode && currTime - gTeams[idx].lastReq <= CACHING_TIME) {
        console.log('FROM CACHE')
       // console.log('gTeams[currTeam.idx]',gTeams[currTeam.idx])
        onSucsess(gTeams[idx].matches)
        return
    }
    console.log('FROM AJAX')



    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE &&
            xhr.status === 200) {
            const matches = JSON.parse(xhr.responseText)

            onSucsess(matches)
            

            for(idx in gTeams){

                

                if(gTeams[idx].fifa_code === countrycode) {
                    gTeams[idx].matches = matches
                    var lastReq = Date.now()
                    gTeams[idx].lastReq = lastReq
                }
            }

            
            saveToStorage(STORAGE_KEY_TEAMS, gTeams)


            
        }
    }
    xhr.open("GET", `https://worldcup.sfg.io/matches/country?fifa_code=${countrycode}`, true);
    xhr.send();

}

