'strict'


function getAns(onSucsess) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE &&
            xhr.status === 200) {
            const answer = JSON.parse(xhr.responseText)

            onSucsess(answer)

            // console.log('answer',answer)

            // gNames = answer

             

        //     if (answer.answer.toLowerCase() !== 'maybe') {
        //         console.log(answer.answer)
        //      getAns(cb)
        //         return
        //     } 

        //     cb(answer)
        }
    }
    xhr.open("GET", "http://filltext.com/?rows=6&fname={firstName}&lname={lastName}&pnumber={phone|format}$city={city}&state={usState|abbr}&zip={zip}&address={streetAddress}", true);
    xhr.send();

}