var modal = document.getElementById("modal");
var back = document.getElementById("back");
var enter = document.getElementById("c");
var plate = document.getElementById("plate");
var peepnis;
//open modal when vlccivk button
enter.onclick = () => {
    plate.style.display = "block";
    //back.style.display = "block";
    setTimeout(() => {
        modal.style.display = "block";
    }, 800);
}

//When the user clicks anywhere outside of the modal close
window.onclick = (event) => {
    if (event.target == modal) {
        plate.style.display = "none";
        modal.style.display = "none";
        back.style.display = "none";
    };
};

$("#form").submit(function (event) {
    event.preventDefault();
    var thingin = document.getElementById('thingin').value;
    var jsonArr = [];

    //validating input
    console.log("1st check: " + thingin);
    if (thingin == null || thingin == "") {
        console.log("invalid input");
        return;
    };

    //putting input into json to send
    jsonArr.push({
        input: thingin
    });

    //validating input in json
    console.log("2nd check:\nStringified: " + JSON.stringify(jsonArr) + "\nraw: " + jsonArr);

    $.ajax({
        type: "post",
        dataType: 'json',
        url: "/thing",
        data: { "input": thingin },
        success: function (data, jqXHR) {
            console.log(data);
            console.log(JSON.stringify(arguments[2].status));
            console.log("jq: " + jqXHR);
            console.log('oooooo' + JSON.stringify(data)); // the [{...}] object
            console.log('title: ' + data.title);
            document.getElementById("modal-title").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + data.title;
            console.log('author: ' + data.author);
            document.getElementById("modal-author").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + data.author;
            console.log('when: ' + data.when);
            document.getElementById("modal-when").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;when " + data.when;
            console.log('long: ' + data.long);
            var vidoLengthHour = Math.floor(data.long / 360);
            var vidoLengthMin = Math.floor(data.long / 60);
            var vidoLengthSec = data.long % 60;
            document.getElementById("modal-long").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;length: " + vidoLengthHour + ":" + vidoLengthMin + ":" + vidoLengthSec;
            console.log('status: ' + data.private + ' ' + data.unlisted);
            document.getElementById("modal-status").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;private: " + data.private + ' unlisted: ' + data.unlisted;
            console.log('poopnis ' + JSON.parse(JSON.stringify(data.thumbs[3].url)));
            document.getElementById("modal-thumb").src = JSON.parse(JSON.stringify(data.thumbs[3].url));
        },
        error: function (data, jqXHR) {
            console.log("\n\n\n\n\n\ ");
            console.log(data);
            console.log(JSON.stringify(arguments[2].status));
            console.log("jq: " + jqXHR);
            console.log("point of error");
            window.location.replace("./poopnis/failed-404.html");
        },
    });
});