let fullpage = null;
function addZero(num) {
    return num < 10 ? "0" + num : num;
}
loadClock("../data/bigbang.json");
$("#gnb .gnbList li").on("click", function () {
    const url = $(this).data("url");
    $(this).addClass("on").siblings("li").removeClass("on");
    loadClock(`../data/${url}.json`);
    return false;
});
function loadClock(_url) {
    $.ajax({
        url: _url,
        success: function (res) {
            // console.log("res", res);
            const clockList = [...res.clock];
            // console.log("clockList", clockList);
            let output = "";
            const total = clockList.length;
            $.each(clockList, function (i, item) {
                output += ` <div class="section" id="clock${addZero(i)}" style="background-image:url(${item.bg})" data-splitting>
                            <div class="info">
                                <p class="category">${item.category}</p>
                                <p class="title">
                                    ${item.title}
                                </p>
                                <p class="depth">
                                    ${item.depth}MM
                                </p>
                                <p class="price">
                                    CHF ${item.price}
                                </p>
                            </div>
                        </div>`;
            });
            $("#main").html(output);
            Splitting();
            $("#indicator .num").text(`${addZero(1)}/${total}`);
            if (fullpage !== null) $.fn.fullpage.destroy("all");
            fullpage = $("#main").fullpage({
                scrollBar: true,
                onLeave: function (origin, destination, direction) {
                    gsap.set(`.section:nth-child(${destination.index + 1}) .char`, {
                        y: -200,
                        opacity: 0,
                    });
                    $("#indicator .num").text(`${addZero(destination.index + 1)}/${total}`);
                },
                afterLoad: function (origin, destination, direction) {
                    gsap.to(`.section:nth-child(${destination.index + 1}) .char`, {
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: "bounce",
                        stagger: {
                            amount: 0.1,
                            from: "random",
                        },
                    });
                },
            });
        },
    });
}

particlesJS.load("bg", "../data/particlesjs-config.json");
