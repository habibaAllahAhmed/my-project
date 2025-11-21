
// go to page
$("nav ul li a").click (function(e){
    e.stopPropagation();
  localStorage.activeLink = this.href;
});

// change active of nav links
$("nav ul li a").each(function(){
  if(this.href === localStorage.activeLink){
    $("nav ul li a.active").removeClass("active");
    $(this).addClass("active");
  }
});

