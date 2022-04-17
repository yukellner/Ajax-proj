'strict'

function getAns(cb) {
    $.get('https://yesno.wtf/api',cb)
}

function getJoke(cb){
    $.get('http://api.icndb.com/jokes/random',cb)
}

function getDog(cb){
    $.get('https://dog.ceo/api/breeds/image/random',cb)
}