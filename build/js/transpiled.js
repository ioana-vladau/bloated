"use strict";

console.log("this is the menu file");
window.addEventListener("load", function () {
    var items = ["home", "about"];
    var parent = document.createElement("ul");
    var menu = document.querySelector("#menu");

    var _loop = function _loop(i) {
        var el = document.createElement("li");
        var link = document.createElement("a");
        link.textContent = items[i];
        var path = "./";
        if (items[i] != "home") {
            path = items[i];
        }

        link.setAttribute("href", path);
        link.addEventListener('click', function (e) {
            e.preventDefault();

            history.pushState({}, items[i], path);
        });
        el.classList.add("mui--text-black-54", "mui--text-body2");
        el.appendChild(link);
        parent.appendChild(el);
    };

    for (var i = 0; i < items.length; i++) {
        _loop(i);
    }
    menu.appendChild(parent);
});
"use strict";

window.addEventListener("load", startThisStuff);
var template = void 0;
function startThisStuff() {
    template = document.querySelector("#postTemplate").content;

    fetch("data/posts.json").then(function (e) {
        return e.json();
    }).then(showPosts);
    function showPosts(data) {
        data.forEach(function (dataElement, index) {
            var clone = template.cloneNode(!false);
            clone.querySelector(".header").textContent = dataElement.header;
            clone.querySelector(".name").textContent = dataElement.name;
            clone.querySelector(".body").textContent = dataElement.body;
            clone.querySelector(".when").textContent = dataElement.when;
            addMedia(clone.querySelector(".media"), dataElement.media);
            if (dataElement.pinned) {
                document.querySelector("#featured").appendChild(clone);
            } else {
                document.querySelector("#posts").appendChild(clone);
            }
        });
    }

    function addMedia(element, media) {
        console.log(element);
        console.table(media);
        media.forEach(function (media, index) {
            var el = void 0;
            switch (media.type) {
                case "img":
                    el = document.createElement("img");
                    el.setAttribute("src", media.path);
                    break;
                case "svg":
                    el = document.createElement("div");
                    fetch(media.path).then(function (e) {
                        return e.text();
                    }).then(function (data) {
                        return el.innerHTML = data;
                    });
                    break;
            }
            el.classList.add("media-item");
            element.appendChild(el);
        });
    }
}
