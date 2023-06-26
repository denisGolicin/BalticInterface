function sendRequest(url, type = "GET", param = []){
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.open(type, `${url}`);
    xhr.setRequestHeader('pragma', 'no-cache');
	xhr.setRequestHeader('cache-control', 'no-cache');

    if(type == "POST"){
        for(let i = 0; i < param.length; i++){
            formData.append(param[i].key, param[i].value);
            //formData.append(param[i].key, JSON.stringify(text));
            
        }
        xhr.send(formData);
    } else {
        xhr.send();
    }

    xhr.onload = function() {
        if (xhr.status === 200) {

        } else {
            
        }
        hideLoader();
        
    };
}

const obj = [
    {
        "test":"sadad",
    },
    {
        "asdasd":"sadasd",
    },
    {
        "asdasd":"asdasd",
    }
];

sendRequest("https://litec-soft.ru/", "GET");