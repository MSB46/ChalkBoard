function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  localStorage.getItem('courseId')
    localStorage.getItem('cnumber')
    localStorage.getItem('cname')
    localStorage.getItem('meet')
    localStorage.getItem('roster')
    localStorage.getItem('sem')