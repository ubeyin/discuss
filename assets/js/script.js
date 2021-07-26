
(function (window) {
    var resultBox = document.getElementById("main");
    var searchBox = document.getElementById("search");
    var searchBtn = document.getElementById("search-btn");

    searchBtn.onclick = function () {
        searchQuery(searchBox.value);
    }

})(window ? window : this);

function searchQuery(val) {
     XMLHttpRequests("https://ubeyin.000webhostapp.com/discuss/search.php?q="+val, function (data) {
         alert(data);
     }, function () {
         alert("Error")
     })
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
    console.log(xhr)
}