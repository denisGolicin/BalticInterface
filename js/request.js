function sendRequest(xhr, url, type = "GET", formData){
    xhr.open(type, `${url}`);
    // xhr.setRequestHeader('pragma', 'no-cache');
	// xhr.setRequestHeader('cache-control', 'no-cache');

    if(type == "POST"){
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