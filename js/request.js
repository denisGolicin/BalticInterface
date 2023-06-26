function sendRequest(xhr, url, type = "GET", param = []){
    const formData = new FormData();
    xhr.open(type, `${url}`);
    // xhr.setRequestHeader('pragma', 'no-cache');
	// xhr.setRequestHeader('cache-control', 'no-cache');

    if(type == "POST"){
        for(let i = 0; i < param.length; i++){
            formData.append(param[i].key, param[i].value);
            //formData.append(param[i].key, JSON.stringify(text));
            
        }
        xhr.send(formData);
    } else {
        xhr.send();
    }
}

// const obj = [
//     {
//         "test":"sadad",
//     },
//     {
//         "asdasd":"sadasd",
//     },
//     {
//         "asdasd":"asdasd",
//     }
// ];

// const xhr = new XMLHttpRequest();
// sendRequest(xhr, "https://litec-soft.ru/", "GET");
// xhr.onload = function() {
//     if (xhr.status === 200) {
//         alert(xhr.responseText);
//     } else {
//         alert("Ошибка");
//     }
    
// };