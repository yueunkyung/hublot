function addZero(num) {
    return num < 10 ? "0" + num : num;
}

$.ajax({
    url: "../data/bigbang.json",
    success: function (res) {
        // console.log("res", res);
        const clockList = [...res.clock];
        // console.log("clockList", clockList);
        let output = "";
        $.each(clockList, function (i, item) {
            if (i === 0) {
            }
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
        $("#main").fullpage({
            scrollBar: true,
            onLeave: function (origin, destination, direction) {
                gsap.from(`.section:nth-child(2) .char`, {
                    y: -200,
                    opacity: 0,
                    duration: 1.5,
                    ease: "bounce",
                    stagger: { amount: 1, from: "random" },
                });
            },
        });
    },
});
particlesJS.load("bg", "../data/particlesjs-config.json");
