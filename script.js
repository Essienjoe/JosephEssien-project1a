(function () {
  "use strict";

  $("nav ul li a").click(function () {
    const thisSection = $(this).attr("href");
    const thisLink = $(this);
    $("html, body")
      .stop()
      .animate(
        { scrollTop: $(thisSection).offset().top - 200 },
        800,
        "easeOutCirc"
      );
    return false;
  });
  $(window).on("load", function () {
    const allLinks = $("nav ul li a");
    let posts = $("section");
    let pageTop;
    let postPos;
    let counter = 0;
    let prevCounter = 0;

    let doneResizeing;
    let postTops = [];
    resetPagePosition();
    //console.log(postTops);

    $(window).scroll(function () {
      pageTop = $(window).scrollTop() + 210;
      if (pageTop > postTops[counter + 1]) {
        counter++;
        //console.log("scrolling down $(counter)");
      } else if (counter > 0 && pageTop < postTops[counter]) {
        counter--;
        //console.log("scrolling up$(counter)");
      }
      if (counter != prevCounter) {
        $(allLinks).removeAttr("class");
        $("nav ul li a").eq(counter).addClass("selected");
        prevCounter = counter;
      }
    });
    $(window).on("resize", function () {
      clearTimeout(doneResizeing);
      doneResizeing = setTimeout(function () {
        resetPagePosition();
      }, 500);
    });
    function resetPagePosition() {
      postTops = [];

      posts.each(function () {
        postTops.push(Math.floor($(this).offset().top));
      });

      let pagePosition = $(window).scrollTop() + 210;
      counter = 0;
      for (let i = 0; i < postTops.length; i++) {
        if (pagePosition > postTops[i]) {
          counter++;
        }
        counter--;
        $(allLinks).removeAttr("class");
        $("nav ul li a").eq(counter).addClass("selected");
      }
    }
  });
})();
