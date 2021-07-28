(function (window) {
    var account;
    var tagg = [];
    var indx = 0;

    /* On window change */
    window.onload = function () {
        /* Check logged in */
        if (getCookie("logged") == null || getCookie("logged") != 1) {
            document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Join";
            document.querySelectorAll(".ninquiry")[0].style.display = "none";
        } else {
            document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Menu";
            document.querySelectorAll(".ninquiry")[0].style.display = "block";
            accountData();
        }

    }

    /* Handled Functions */
    /* Nav option */
    document.querySelectorAll(".navbar .list .option")[0].onclick = function () {
        if (getCookie("logged") == null || getCookie("logged") != 1) {
            /* If not logged in */
            document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Join";
            /**/
            if (document.querySelectorAll(".join")[0].style.display == "none") {
                document.querySelectorAll(".popup")[0].style.display = "block";
                document.querySelectorAll(".join")[0].style.display = "block";
                document.querySelectorAll(".navbar .list .option")[0].disabled = true;
                setTimeout(() => {
                    document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Close";
                    document.querySelectorAll(".navbar .list .option")[0].disabled = false;
                    document.getElementsByClassName("login")[0].style.display = "block";
                    document.getElementsByClassName("signup")[0].style.display = "none";
                    document.getElementsByClassName("loading")[0].style.display = "none";

                }, 2000);
            } else if (document.querySelectorAll(".join")[0].style.display == "block") {
                document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Join";
                document.querySelectorAll(".popup")[0].style.display = "none";
                document.querySelectorAll(".join")[0].style.display = "none";
                document.getElementsByClassName("login")[0].style.display = "none";
                document.getElementsByClassName("signup")[0].style.display = "none";
                document.getElementsByClassName("loading")[0].style.display = "block";
            }
            document.querySelectorAll(".menu")[0].style.display = "none";
        } else {
            /* If logged in */
            document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Menu";
            accountData();
            /**/
            if (document.querySelectorAll(".menu")[0].style.display == "none") {
                home();
                document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Close";
                document.querySelectorAll(".popup")[0].style.display = "block";
            } else if (document.querySelectorAll(".menu")[0].style.display == "block") {
                document.querySelectorAll(".menu")[0].style.display = "none";
                document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Menu";
                document.querySelectorAll(".popup")[0].style.display = "none";
            }
        }
    }
    document.querySelectorAll(".navbar .list .option")[1].onclick = function () {

    }
    function home() {
        document.querySelectorAll(".join")[0].style.display = "block";
        document.querySelectorAll(".menu")[0].style.display = "none";
        document.getElementsByClassName("login")[0].style.display = "none";
        document.getElementsByClassName("signup")[0].style.display = "none";
        document.getElementsByClassName("loading")[0].style.display = "block";
        document.querySelectorAll(".navbar .list .option")[0].disabled = true;
        setTimeout(() => {
            document.querySelectorAll(".navbar .list .option")[0].disabled = false;
            document.querySelectorAll(".join")[0].style.display = "none";
            document.getElementsByClassName("login")[0].style.display = "block";
            document.getElementsByClassName("signup")[0].style.display = "none";
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.querySelectorAll(".menu")[0].style.display = "block";
        }, 2000);
        accountData();
        if (getCookie("logged") == null || getCookie("logged") != 1) {
            document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Join";
            document.querySelectorAll(".ninquiry")[0].style.display = "none";
        } else {
            document.querySelectorAll(".navbar .list .option")[0].innerHTML = "Menu";
            document.querySelectorAll(".ninquiry")[0].style.display = "block";
            accountData();
        }
    }
    function accountData() {
        if (getCookie("email") && getCookie("username")) {
            document.querySelectorAll(".menu .title")[0].innerHTML = getCookie("username");
            document.querySelectorAll(".menu .text")[0].innerHTML = getCookie("email");
        }
    }
    /* Switch menu */
    document.querySelectorAll(".menu .list div")[0].onclick = function () {
        document.querySelectorAll(".home")[0].style.display = "block";
        document.querySelectorAll(".inquiry")[0].style.display = "none";
        document.querySelectorAll(".menu .list div")[0].className = "active";
        document.querySelectorAll(".menu .list div")[1].className = "";
        document.querySelectorAll(".menu .list div")[2].className = "";
        if (getCookie("logged") == 1) {
            document.querySelectorAll(".ninquiry")[0].style.display = "block";
        }
    }
    document.querySelectorAll(".menu .list div")[1].onclick = function () {
        document.querySelectorAll(".home")[0].style.display = "none";
        document.querySelectorAll(".inquiry")[0].style.display = "block";
        document.querySelectorAll(".menu .list div")[0].className = "";
        document.querySelectorAll(".menu .list div")[1].className = "active";
        document.querySelectorAll(".menu .list div")[2].className = "";
        if (getCookie("logged") == 1) {
            document.querySelectorAll(".ninquiry")[0].style.display = "block";
        }
    }
    document.querySelectorAll(".menu .list div")[2].onclick = function () {
        document.querySelectorAll(".home")[0].style.display = "none";
        document.querySelectorAll(".inquiry")[0].style.display = "none";
        document.querySelectorAll(".menu .list div")[0].className = "";
        document.querySelectorAll(".menu .list div")[1].className = "";
        document.querySelectorAll(".menu .list div")[2].className = "active";
        document.querySelectorAll(".ninquiry")[0].style.display = "none";
    }
    document.querySelectorAll(".menu .list div")[3].onclick = function () {
        account = "";
        removeCookie("email");
        removeCookie("username");
        removeCookie("logged");
        window.location.reload();
    }
    /* Login */
    document.querySelectorAll(".login .submit")[0].onclick = function () {
        var url = "email=" + encodeURIComponent(document.getElementById("login-email").value) + "&password=" + encodeURIComponent(document.getElementById("login-pass").value);
        /**/
        loading(1);
        /**/
        new Ajax("https://ubeyin.000webhostapp.com/discuss/account/login.php?" + url, function (txt) {
            if (txt == "SUCCESS") {

                new Ajax("https://ubeyin.000webhostapp.com/discuss/account/data.php?" + url, function (txt) {
                    if (txt != "FAILED" && txt != "ERROR") {
                        var data = JSON.parse(txt);
                        account = data;
                        setCookie("email", data["email"], 1000000000);
                        setCookie("username", data["username"], 1000000000);
                        setCookie("logged", 1, 1000000000);
                        home();
                        setTimeout(() => {
                            document.querySelectorAll(".menu")[0].style.display = "none";
                            document.querySelectorAll(".popup")[0].style.display = "none";
                        }, 2050);
                    } else {
                        displayAlert("Data Error", "Failed to load data, please try again!");
                        loading(0, "block", "none");
                    }
                }, function () {
                    displayAlert("Connection error", "Please check your internet connection!");
                    loading(0, "block", "none");
                });

            } else if (txt == "FAILED") {
                displayAlert("Login Error", "Failed to login, email/password are invalid!");
                loading(0, "block", "none");
            } else if (txt == "ERROR") {
                displayAlert("Login Error", "Failed to login, server not connected!");
                loading(0, "block", "none");
            } else if (txt == "UNAVAILABLE") {
                displayAlert("Login Error", "Failed to login, the user does not exist!");
                loading(0, "block", "none");
            } else {
                displayAlert("Login Error", "Failed to login, " + txt);
                loading(0, "block", "none");
            }
        }, function () {
            displayAlert("Connection Error", "Please check your internet connection!");
            loading(0, "block", "none");
        });
    }
    /* Signup*/
    document.querySelectorAll(".signup .submit")[0].onclick = function () {
        var url = "name=" + encodeURIComponent(document.getElementById("signup-name").value) + "&email=" + encodeURIComponent(document.getElementById("signup-email").value) + "&password=" + encodeURIComponent(document.getElementById("signup-pass").value);
        /**/
        loading(1);
        /**/
        new Ajax("https://ubeyin.000webhostapp.com/discuss/account/signup.php?" + url, function (txt) {
            if (txt == "SUCCESS") {

                new Ajax("https://ubeyin.000webhostapp.com/discuss/account/data.php?" + url, function (txt) {
                    if (txt != "FAILED" && txt != "ERROR") {
                        var data = JSON.parse(txt);
                        account = data;
                        setCookie("email", data["email"], 1000000000);
                        setCookie("username", data["username"], 1000000000);
                        setCookie("logged", 1, 1000000000);
                        home();
                        setTimeout(() => {
                            document.querySelectorAll(".menu")[0].style.display = "none";
                            document.querySelectorAll(".popup")[0].style.display = "none";
                        }, 2050);

                    } else {
                        displayAlert("Data Error", "Failed to load data, please try again!");
                        loading(0, "none", "block");

                    }
                }, function () {
                    displayAlert("Connection Error", "Please check your internet connection!");
                    loading(0, "none", "block");

                });

            } else if (txt == "FAILED") {
                displayAlert("Signup Error", "Failed to signup, an unknown error occured!");
                loading(0, "none", "block");

            } else if (txt == "AVAILABLE") {
                displayAlert("Signup Error", "Failed to signup, current email is available!");
                loading(0, "none", "block");

            } else if (txt == "ERROR") {
                displayAlert("Signup Error", "Failed to signup, server not connected!");
                loading(0, "none", "block");

            } else {
                displayAlert("Signup Error", "Failed to signup, " + txt);
                loading(0, "none", "block");
            }
        }, function () {
            displayAlert("Connection Error", "Please check your internet connection!");
            loading(0, "none", "block");
        });
    }
    /* Search */
    document.querySelectorAll(".search .submit")[0].onclick = function () {
        document.querySelectorAll(".section .title")[0].style.display = "block";
        document.querySelectorAll(".section .main .result")[0].innerHTML = "";
        document.querySelectorAll(".search .submit")[0].disabled = true;
        document.querySelectorAll(".search .input")[0].disabled = true;
        new Ajax("https://ubeyin.000webhostapp.com/discuss/que/search.php?q=" + document.querySelectorAll(".search .input")[0].value, function (data) {
            if (data != "FAILED" && data != "ERROR") {
                document.querySelectorAll(".section .main .result")[0].innerHTML = data;
                document.querySelectorAll(".search .submit")[0].disabled = false;
                document.querySelectorAll(".search .input")[0].disabled = false;
            } else {
                document.querySelectorAll(".section .main .result")[0].innerHTML = "<article class='col-5'><h3>No results found.</h3></article>";
                document.querySelectorAll(".search .submit")[0].disabled = false;
                document.querySelectorAll(".search .input")[0].disabled = false;
            }
        }, function () {
            document.querySelectorAll(".section .main .result")[0].innerHTML = "<article class='col-5'><h3>Please check your internet connection!</h3></article>";
            document.querySelectorAll(".search .submit")[0].disabled = false;
            document.querySelectorAll(".search .input")[0].disabled = false;
        })
    }

    /* Inquiry */
    document.querySelectorAll(".ninquiry")[0].onclick = function () {
        document.querySelectorAll(".popup")[0].style.display = "block";
        document.querySelectorAll(".menu")[0].style.display = "none";
        document.querySelectorAll(".ainquiry")[0].style.display = "block";
    }
    document.querySelectorAll(".ainquiry button")[0].onclick = function () {
        addQue(document.getElementById("queTitle").value, tagg, function () {
            displayAlert("Question", "Your question has been successfully added to 'request' folder.");
            cancelQue();
        }, function (data) {
            displayAlert("Question", "Failed! " + data);
        });
        function addQue(title, tag, success, error) {
            if (getCookie("logged") == 1) {
                var tags = "";
                for (let index = 0; index < tag.length; index++) {
                    tags += "<span>" + tag[index] + "</span>  ";
                }

                new Ajax("https://ubeyin.000webhostapp.com/discuss/que/insert.php?title=" + title + "&tags=" + tags + "&email=" + getCookie("email") + "&username=" + getCookie("username") + "&date=" + new Date().toLocaleString(), function (data) {
                    if (data == "SUCCESS" && success) {
                        return success();
                    }
                    else if (data == "ERROR" || data == "FAILED" && error) {
                        return error(data);
                    } else {
                        return error(data);
                    }
                }, function () {
                    displayAlert("Please check your internet connection!");
                });
            }
        }
    }
    document.querySelectorAll(".ainquiry .tag")[0].onsubmit = function () {
        if (indx <= 2 && document.getElementById("queTag").value.trim() != "") {
            indx++;
            document.getElementById("viewTag").innerHTML += "<span>" + document.getElementById("queTag").value + "</span>  ";
            tagg = [...tagg, document.getElementById("queTag").value.trim()];
            document.getElementById("queTag").value = "";
        }
        return false;
    }
    document.querySelectorAll(".ainquiry button")[1].onclick = function cancelQue() {
        document.querySelectorAll(".ainquiry")[0].style.display = 'none';
        document.querySelectorAll(".popup")[0].style.display = 'none';
        document.getElementById('queTitle').value = '';
        document.getElementById('queTag').value = '';
        document.getElementById('viewTag').innerHTML = '';
        indx = 0;
        tagg = [];
    }

    /* More */
    function loading(n, k, l) {
        if (n == 0) {
            document.getElementsByClassName("login")[0].style.display = k;
            document.getElementsByClassName("signup")[0].style.display = l;
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.querySelectorAll(".menu .list div").disabled = false;
        } else if (n == 1) {
            document.getElementsByClassName("login")[0].style.display = "none";
            document.getElementsByClassName("signup")[0].style.display = "none";
            document.getElementsByClassName("loading")[0].style.display = "block";
            document.querySelectorAll(".menu .list div")[0].disabled = true;
        }
    }
    function displayAlert(y, t) {
        document.querySelectorAll(".alert")[0].style.display = "block";
        document.querySelectorAll(".alert .text")[0].innerHTML = t;
        document.querySelectorAll(".alert .title")[0].innerHTML = y;
        setTimeout(() => {
            document.querySelectorAll(".alert")[0].style.display = "none";
        }, 9000);
    }


    /* PHP Functions */
    /*--Login*/
    /*--Signup*/
    /*--Search*/
    /*--Inquiry*/

    /* Ajax Functions */
    function Ajax(urls, success, error) {
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
                    if (success) return success(this.responseText, urls);
                }
            }
            xhr.onerror = function () {
                if (error) return error();
            }
        }
        xhr.send(0);
    }

    /* Cookie Functions */
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
    function removeCookie(cname) {
        const d = new Date();
        d.setTime(d.getTime() + (100000000 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=;" + expires + ";path=/";
    }

})(window ? window : this);
