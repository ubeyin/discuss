var account;
var tagg = [];
var indx = 0;

(function (window) {
    var resultBox = document.getElementById("main");
    var searchBox = document.getElementById("search");
    var searchBtn = document.getElementById("search-btn");

    searchBtn.onclick = function () {
        document.getElementById("h").style.display = "block";
        document.getElementById("main").innerHTML = "";
        searchQuery(searchBox.value);
    }

    if (getCookie("logged") == null || getCookie("logged") != 1) {
        document.getElementById("joins").innerHTML = "Join";
    } else {
        document.getElementById("joins").innerHTML = "Menu";
        accountData();

    }

})(window ? window : this);

function searchQuery(val) {
    XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/que/search.php?q=" + val, function (data) {
        document.getElementById("main").innerHTML += data;
    }, function () {

    })
}

function gologin() {
    document.getElementsByClassName("login")[0].style.display = "block";
    document.getElementsByClassName("signup")[0].style.display = "none";
}

function gosignup() {
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("signup")[0].style.display = "block";
}

function login() {

    var url = "email=" + encodeURIComponent(document.getElementById("login-email").value) + "&password=" + encodeURIComponent(document.getElementById("login-pass").value);

    XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/account/login.php?" + url, function (txt) {
        if (txt == "SUCCESS") {

            XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/account/data.php?" + url, function (txt) {
                if (txt !== "FAILED") {
                    var data = JSON.parse(txt);
                    account = data;
                    setCookie("email", data["email"], 1000000000);
                    setCookie("username", data["username"], 1000000000);
                    setCookie("logged", 1, 1000000000);
                    home();
                } else {
                    alert("Failed to load data, please try again!");
                }
            });

        } else if (txt == "FAILED") {
            alert("Failed to login, email/password are invalid!");
        } else if (txt == "ERROR") {
            alert("Failed to login, server not connected!");
        }
    }, function () {
        /* "Failed to signup, try again!" */
    });
}

function signup() {
    var url = "name=" + encodeURIComponent(document.getElementById("signup-name").value) + "&email=" + encodeURIComponent(document.getElementById("signup-email").value) + "&password=" + encodeURIComponent(document.getElementById("signup-pass").value);

    XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/account/signup.php?" + url, function (txt) {
        if (txt == "SUCCESS") {

            XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/account/data.php?" + url, function (txt) {
                if (txt !== "FAILED") {
                    var data = JSON.parse(txt);
                    account = data;
                    setCookie("email", data["email"], 1000000000);
                    setCookie("username", data["username"], 1000000000);
                    setCookie("logged", 1, 1000000000);
                    home();
                } else {
                    alert("Failed to load data, please try again!");
                }
            });

        } else if (txt == "FAILED") {
            alert("Failed to signup, an unknown error occured!");
        } else if (txt == "AVAILABLE") {
            alert("Failed to signup, current email is available!");
        } else if (txt == "ERROR") {
            alert("Failed to signup, server not connected!");
        }
    }, function () {
        /* "Failed to signup, try again!" */
    });
}

function joins() {
    if (getCookie("logged") == null || getCookie("logged") != 1) {
        document.getElementById("joins").innerHTML = "Join";
        if (document.getElementById("join-form").style.display == "none") {
            document.getElementById("join-form").style.display = "block";
            document.getElementById("lay").style.display = "block";
            document.getElementById("joins").disabled = true;
            setTimeout(() => {
                document.getElementById("joins").disabled = false;
                document.getElementsByClassName("login")[0].style.display = "block";
                document.getElementsByClassName("signup")[0].style.display = "none";
                document.getElementsByClassName("loading")[0].style.display = "none";

            }, 2000);
        } else if (document.getElementById("join-form").style.display == "block") {
            document.getElementById("lay").style.display = "none";
            document.getElementById("join-form").style.display = "none";
            document.getElementsByClassName("login")[0].style.display = "none";
            document.getElementsByClassName("signup")[0].style.display = "none";
            document.getElementsByClassName("loading")[0].style.display = "block";
        }
        document.getElementById("join-tool").style.display = "none";
    } else {
        accountData();
        document.getElementById("joins").innerHTML = "Menu";
        if (document.getElementById("join-tool").style.display == "none") {
            home();
            document.getElementById("lay").style.display = "block";
        } else if (document.getElementById("join-tool").style.display == "block") {
            document.getElementById("join-tool").style.display = "none";
            document.getElementById("lay").style.display = "none";
        }
    }
}


function home() {
    document.getElementById("join-form").style.display = "block";
    document.getElementById("join-tool").style.display = "none";
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("signup")[0].style.display = "none";
    document.getElementsByClassName("loading")[0].style.display = "block";
    document.getElementById("joins").disabled = true;
    setTimeout(() => {
        document.getElementById("joins").disabled = false;
        document.getElementById("join-form").style.display = "none";
        document.getElementsByClassName("login")[0].style.display = "block";
        document.getElementsByClassName("signup")[0].style.display = "none";
        document.getElementsByClassName("loading")[0].style.display = "none";
        document.getElementById("join-tool").style.display = "block";
    }, 2000);
    accountData();
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function XMLHttpRequests(urls, success, error) {
    let xhr = new XMLHttpRequest();
    if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xhr = false;
        }
    } else {
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = false;
        }
    }

    if (!xhr) {
        return error();
    } else {
        xhr.open("GET", urls);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (success) return success(this.responseText);
            } else {
                if (error) return error();
            }
        }
    }
    xhr.send(0);
}

function accountData() {
    if (getCookie("email") && getCookie("username")) {
        document.getElementById("acc-name").innerHTML = getCookie("username");
        document.getElementById("acc-email").innerHTML = getCookie("email");
    }
}

function addQue(title, tag, success, error) {
    if (getCookie("logged") == 1) {
        var tags = "";
        for (let index = 0; index < tag.length; index++) {
            tags += "<span>" + tag[index] + "</span>  ";
        }
        console.log("https://ubeyin.000webhostapp.com/discuss/que/insert.php?title=" + title + "&tags=" + tags + "&email=" + getCookie("email") + "&username=" + getCookie("username") + "&date=" + new Date().getFullYear()+"");

        XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/que/insert.php?title=" + title + "&tags=" + tags + "&email=" + getCookie("email") + "&username=" + getCookie("username") + "&date=" + new Date().toLocaleString(), function (data) {
            if (data == "SUCCESS" && success) {
                return success();
            }
            else if (data == "ERROR" || data == "FAILED" && error) {
                return error();
            }
        });
    }
}

function addQuestion() {
    document.getElementById("lay").style.display = "block";
    document.getElementById("join-tool").style.display = "none";
    document.getElementById("newque").style.display = "block";
}

function sendQuestion() {
    addQue(document.getElementById("queTitle").value, tagg, function () {
        alert("Added!");
        cancelQue();
    }, function () {
        alert("Failed!");
    })
}

function addQueTag() {
    if (indx <= 2 && document.getElementById("queTag").value.trim() != "") {
        indx++;
        document.getElementById("viewTag").innerHTML += "<span>" + document.getElementById("queTag").value + "</span>  ";
        tagg = [...tagg, document.getElementById("queTag").value.trim()];
        document.getElementById("queTag").value = "";
    }
}

function cancelQue() {
    document.getElementById('newque').style.display = 'none';
    document.getElementById('lay').style.display = 'none';
    document.getElementById('queTitle').value = '';
    document.getElementById('queTag').value = '';
    document.getElementById('viewTag').innerHTML = '';
    indx = 0;
    tagg = [];
}