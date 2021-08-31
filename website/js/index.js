const submitBtn = document.querySelector('#submit-btn');


function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function urlSubmitHandler() {
    event.preventDefault()

    console.log("dfgdg");
    // check if text input is a vaild url
    let textUrl = document.getElementById('input-url').value

    if(validURL(textUrl)) {

    postData('/api', {url: textUrl})

    .then(function(res) {
        document.getElementById("agreement").textContent = `${res.agreement}`;
        document.getElementById("subjectivity").textContent = `${res.subjectivity}`;
        document.getElementById("confidence").textContent = `${res.confidence}`;
        document.getElementById("irony").textContent = `${res.irony}`;
        document.getElementById('polarity').textContent = `${res.score_tag}`;
        console.log("@@@@@@@@@@@@@@@@");
    })
    
    } else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};



