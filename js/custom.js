(function () {
  "use strict";
  var A = window.Artloft, $ = function (i) { return document.getElementById(i); };
  document.addEventListener("DOMContentLoaded", function () {
    A.fillSelect($("c-type"), A.categories().concat(["Something else"]));
    $("custom-form").addEventListener("submit", function (e) {
      e.preventDefault(); var err = $("c-error"); A.hideError(err);
      var name = A.clean($("c-name").value, 60), type = A.clean($("c-type").value, 40), d = A.clean($("c-details").value, 600);
      if (name.length < 2) return A.showError(err, "Please enter your name.");
      if (d.length < 10) return A.showError(err, "Please describe your idea in a few words.");
      var r = A.whatsapp(["*Custom request - " + A.CFG.brand + "*", "", "Name: " + name, "Item: " + type, "", d]);
      if (r) A.showError(err, r);
    });
  });
})();
