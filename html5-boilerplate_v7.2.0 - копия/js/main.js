$.ajax({
    url: `http://localhost:3000/users`,
    method: 'GET',
    error: (e) => {
        console.log(e);
    },
    success: (data) => {
        console.log(data);
    }
});



var data = {
  name: 'Виктор',
  surname: 'Цой'
};
var boundary = String(Math.random()).slice(2);
var boundaryMiddle = '--' + boundary + '\r\n';
var boundaryLast = '--' + boundary + '--\r\n'
var body = ['\r\n'];
for (var key in data) {
  // добавление поля
  body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
}
body = body.join(boundaryMiddle) + boundaryLast;
// Тело запроса готово, отправляем
var xhr = new XMLHttpRequest();
xhr.open('POST', `http://localhost:3000/users`, true);
xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;
  alert( this.responseText );
}
xhr.send(body);
