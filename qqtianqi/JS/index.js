// document.write(" < script language = javascript src = 'animate.js' >< / script>");
$(function () {
    var foo = document.querySelector('footer');
    var html = document.querySelector('html');
    var startX = 0;
    var startY = 0;
    var x = 0;
    var y = 0;
    var move = 0;


    foo.addEventListener('touchstart', function (e) {
        // console.log(e);
        // console.log(e.targetTouches[0]);
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
        // console.log("按下", startX, startY);
        x = this.offsetLeft;
        // y = this.offsetTop;
    });


    foo.addEventListener('touchmove', function (e) {

        width = html.clientWidth;

        var moveX = e.targetTouches[0].pageX - startX;
        move = moveX;
        if ((x + moveX) >= 0) {
            this.style.left = 0;
        } else if ((x + moveX) <= -width) {
            this.style.left = -width;
        } else {
            this.style.left = x + moveX + 'px';
        }
        e.preventDefault();


    });


    //左负

    foo.addEventListener('touchend', function (en) {
        var e = en;

        if (move < 0) {
            if ((move + x) > -width / 2) {
                animate(this, 0);
            } else if ((move + x) < -width / 2) {
                $(".point").find("li").eq(1).css("background-color", "rgb(125, 124, 124)");
                $(".point").find("li").eq(0).css("background-color", "#ccc");
                animate(this, -width);
            }
        }
        if (move > 0) {
            if ((move + x) < -width / 2) {
                animate(this, -width);
            } else if ((move + x) > -width / 2) {
                $(".point").find("li").eq(0).css("background-color", "rgb(125, 124, 124)");
                $(".point").find("li").eq(1).css("background-color", "#ccc");
                animate(this, 0);
            }
        }


    });


    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer)
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        })
    }
    // 空气质量
    var air = document.querySelector('.air');
    var aqi = document.querySelector('.aqi');
    var flag = 0;
    air.addEventListener('touchstart', function () {

        $(".aqi").stop().slideDown(500);
        $(".cover").stop().show();

        flag = 1;

    });
    x = document.querySelector(".x");
    x.addEventListener('touchstart', function () {
        $(".aqi").stop().slideUp(500);
        $(".cover").stop().hide();
    });


    // 点击遮罩,取消弹窗
    cover = document.querySelector('.cover');
    cover.addEventListener('touchend', function () {
        $(".detail").stop().slideUp(500);
        $(".aqi").stop().slideUp(500);
        $(".share").stop().slideUp(500);
        $(".cover").stop().hide();
        flag = 0;
        setTimeout(function () {
            $("footer").css("pointer-events", "auto");
            $(".icon-zhuanfa").css("pointer-events", "auto");

        }, 400);

    })

    // 取消页面
    $('.know').click(function () {

        $('.detail').stop().slideUp(500);
        $(".cover").stop().hide();
        flag = 0;
        $("footer").css("pointer-events", "auto");
    })

    // 提示细节

    var color = ["pink", "purple", "rgb(129,199,132)",
        "rgb(181,230,168)", "rgb(231,220,164)", "rgb(222,178,167)",
        "purple", "rgb(242,212,143)", "rgb(120,144,156)", "rgb(77,182,172)",
        "rgb(240,98,146)", "rgb(166,186,204)", "skyblue",
        "rgb(230,116,115)", "rgb(121,134,203)", "rgb(255,138,101)"
    ];
    //var tips = document.querySelector('.tips');


    $(".tips").click(function () {
        for (let i = 0; i < 16; i++) {
            if ($(".tips")[i] == this) {
                $(".detail").find("span").css("background-color", color[i]);
                $(".know").css("background-color", color[i]);
                 
                break;
            }
        }
        if (flag == 0) {

            $('.detail').slideDown(500);
            $(".cover").show();
            $("footer").css("pointer-events", "none");
            flag = 1;
        } else {
            $('.detail').slideUp(500);
            $(".cover").hide();
            $("footer").css("pointer-events", "auto");
            flag = 0;
        }
    });

    // 转发页面
    $(".icon-zhuanfa").click(function () {
        $(".share").stop().slideDown(500);
        $(".cover").stop().show();
        $(".icon-zhuanfa").css("pointer-events", "none");
    });
    // 分享取消
    // var cancle = document.querySelector("#cancle-share");
    // cancle.addEventListener("touchend",function(){
    //     $(".share").stop().slideUp(500);
    //     $(".cover").stop().hide();
    //     $(".icon-zhuanfa").css("pointer-events", "auto");
    // });
    $("#cancle-share").click(function () {
        $(".share").stop().slideUp(500);
        $(".cover").stop().hide();
        $(".icon-zhuanfa").css("pointer-events", "auto");
    })
    //   点击搜索框 
    $("input").click(function () {
        if (document.activeElement.id === "city") {
            $(".blank").stop().hide();
        }
    })
    // 点击空白退出输入，显示城市
    $(".location").click(function () {
        $(".blank").stop().show();
    })
    // 退出搜索页面
    $("#cancle").click(function () {
        $(".search").stop().slideUp(300);
        setTimeout(function () {
            $(".blank").stop().show();
        }, 400);

    })
    //进入搜索
    $("#current-location").click(function () {
        $(".search").stop().slideDown(300);
    })
    //  退出搜索的函数
    var cancle_search = function () {

        $(".search").stop().slideUp(300);
        setTimeout(function () {
            $(".blank").stop().show();
        }, 400);

    };
    //切换句子
    $(".sentence").eq(0).click(function () {

        $(this).hide();
        $(".sentence").eq(1).show();
    })
    $(".sentence").eq(1).click(function () {

        $(this).hide();
        $(".sentence").eq(0).show();
    })



    //    ajax
    // $('#city').keydown(function(e){
    //     if(e.keyCode == 13){

    //         return false;
    //     }

    // })
    //点击搜索图标搜索
    $(".sousuo").click(function () {
        sea();
        cancle_search();
    });
    var city;
    var location = "贵州, 贵阳";
    var weathers;
    //默认搜索贵阳
    get_weather(location);
    var sea = function () {
        var data = {};
        t = $('#search').serializeArray();
        console.log(t);
        $.each(t, function () {
            data[this.name] = this.value;
        });
        console.log(data);
        city = data.city;
        if (city) {
            get_city(city);
        }
        return false;
    }
    $('#search').submit(function () {
        var data = {};

        t = $(this).serializeArray();
        console.log(t);
        $.each(t, function () {
            data[this.name] = this.value;
        });
        var city = data.city;
        if (city) {
            get_city(city);
        }
        cancle_search();
        return false;
    });

    function get_city(city, source = 'pc') {
        $.post(
            "https://wis.qq.com/city/like", {
                source: source,
                city: city
            },


            function (res) {
                if (res.status == 200 && res.data) {

                    for (var key in res.data) {
                        get_weather(res.data[key]);
                        location = res.data[key];

                    }
                }
            },
            'jsonp'
        )
    }

    function get_weather(data, source = 'pc', weather_type = 'observe|forecast_1h|forecast_24h|index|alarm|limit|tips|air|rise') {
        let address = data.split(',');
        let province = address[0],
            city = address[1],
            county = address[2] || '';
        $.ajax({
            url: 'https://wis.qq.com/weather/common',
            type: 'get',
            data: {
                source: source,
                weather_type: weather_type,
                province: province,
                city: city,
                county: county
            },
            dataType: 'jsonp',
            success: function (res) {
                if (res.status == 200 && res.data) {

                    weathers = res.data;
                }
                console.log(city);
                console.log(location);
                console.log(weathers);
                var loca = location.split(',');

                // 搜索位置
                if (loca.length == 2) {
                    $("#current-location").text(loca[0] + loca[1]);
                } else if (loca.length == 3) {
                    $("#current-location").text(loca[1] + loca[2]);
                } else {
                    $("#current-location").text(loca[0]);
                }
                //空气质量
                var air = weathers.air;
                // console.log(air);

                $(".content").children("p").eq(0).text(air.aqi);
                $(".content").children("p").eq(1).text(air.aqi_name);
                $(".num").children("p").eq(1).text(air.aqi);
                $(".level").text(air.aqi_name);
                var key = new Array(10);
                var i = 0;
                for (var k in air) {

                    key[i] = air[k];
                    i++;
                }
                $(".index").find("p").eq(0).text(key[7]);
                $(".index").find("p").eq(2).text(key[6]);
                $(".index").find("p").eq(4).text(key[8]);
                $(".index").find("p").eq(6).text(key[4]);
                $(".index").find("p").eq(8).text(key[5]);
                $(".index").find("p").eq(10).text(key[3]);

                // 天气
                $(".middle").find("p").eq(0).text(weathers.observe.degree + '°');
                $(".middle").find("p").eq(1).text(weathers.observe.weather);
                $(".middle").find("p").eq(2).text(weathers.forecast_1h[0].wind_direction + weathers.forecast_1h[0].wind_power + "级");
                $(".middle").find("p").eq(3).text(weathers.tips.observe[0]);
                $(".middle").find("p").eq(4).text(weathers.tips.observe[1]);

                //今天的天气
                $(".today-1").find("p").eq(1).text(weathers.forecast_24h[1].day_weather + "转" + weathers.forecast_24h[1].night_weather)
                $(".today-2").find("span").eq(0).text(weathers.forecast_24h[1].max_degree + '°' + "/" + weathers.forecast_24h[1].min_degree + '°');
                //明天的天气
                $(".tomarrow-1").find("p").eq(1).text(weathers.forecast_24h[2].day_weather + "转" + weathers.forecast_24h[2].night_weather)
                $(".tomarrow-2").find("p").eq(0).text(weathers.forecast_24h[2].max_degree + '°' + "/" + weathers.forecast_24h[2].min_degree + '°');
                var weather = ["icon-tq_01qing", "icon-tq_03duoyun", "icon-tq_05yin",
                    "icon-tq_07zhenyu", "icon-tq_23leizhenyu", "", "icon-tq_27yujiaxue",
                    "icon-tq_11xiaoyu", "icon-tq_13zhongyu",
                    "icon-tq_15dayu", "icon-tq_15dayu", "icon-tq_17baoyu", "icon-tq_19dabaoyu", ""
                ];

                $(".today-2").find("span").eq(1).addClass(weather[parseInt(weathers.forecast_24h[1].day_weather_code)]);
                $(".tomarrow-2").find("span").eq(0).addClass(weather[parseInt(weathers.forecast_24h[2].day_weather_code)]);
                var hour = weathers.forecast_1h;
                //一天的天气
                for (let n = 0; n < 24; n++) {
                    $(".hour").find("li").eq(n).find("p").eq(0).text(hour[n].update_time.slice(8, 10) + ":00");
                    $(".hour").find("li").eq(n).find("span").addClass(weather[parseInt(hour[n].weather_code)]);
                    $(".hour").find("li").eq(n).find("p").eq(1).text(hour[n].degree + "°");
                }
                //一周的天气
                var week = ["昨天", "今天", "明天", "后天",
                    "周一", "周二", "周三", "周四", "周五", "周六", "周日"
                ];
                var date = new Date();
                var days = weathers.forecast_24h;
                console.log(days);
                for (let n = 0; n < 8; n++) {
                    $(".week").find("li").eq(n).find("p").eq(0).text(week[n]);
                    $(".week").find("li").eq(n).find("p").eq(1).text(days[n].time.slice(5, 7) + "/" + days[0].time.slice(8, 10));
                    $(".week").find("li").eq(n).find("p").eq(2).text(days[n].day_weather);
                    $(".week").find("li").eq(n).find("span").eq(0).addClass(weather[parseInt(days[n].day_weather_code)]);
                    $(".week").find("li").eq(n).find("span").eq(1).addClass(weather[parseInt(days[n].night_weather_code)]);
                    $(".week").find("li").eq(n).find("p").eq(3).text(days[n].night_weather);
                    $(".week").find("li").eq(n).find("p").eq(4).text(days[n].night_wind_direction);
                    $(".week").find("li").eq(n).find("p").eq(5).text(days[n].night_wind_power + "级");
                }
                var index = weathers.index;
                console.log(index[0]);
                $(".item").eq(0).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(0).find("p").eq(0).text(index.clothes.info);
                $(".item").eq(0).find("p").eq(2).text(index.clothes.detail);
                $(".item").eq(0).find("span").text(index.clothes.name + "指数");

                $(".item").eq(1).find("p").eq(1).text(index.umbrella.name);
                $(".item").eq(1).find("p").eq(0).text(index.umbrella.info);
               

                $(".item").eq(2).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(2).find("p").eq(0).text(index.clothes.info);
                

                $(".item").eq(3).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(3).find("p").eq(0).text(index.clothes.info);
               

                $(".item").eq(4).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(4).find("p").eq(0).text(index.clothes.info);
              

                $(".item").eq(5).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(5).find("p").eq(0).text(index.clothes.info);
               

                $(".item").eq(6).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(6).find("p").eq(0).text(index.clothes.info);
             
                
                $(".item").eq(7).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(7).find("p").eq(0).text(index.clothes.info);
               
                
                $(".item").eq(8).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(8).find("p").eq(0).text(index.clothes.info);
              

                $(".item").eq(9).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(9).find("p").eq(0).text(index.clothes.info);
              

                $(".item").eq(10).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(10).find("p").eq(0).text(index.clothes.info);
              

                $(".item").eq(11).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(11).find("p").eq(0).text(index.clothes.info);
             

                $(".item").eq(12).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(12).find("p").eq(0).text(index.clothes.info);
              

                $(".item").eq(13).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(13).find("p").eq(0).text(index.clothes.info);
          

                $(".item").eq(14).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(14).find("p").eq(0).text(index.clothes.info);
               

                $(".item").eq(15).find("p").eq(1).text(index.clothes.name);
                $(".item").eq(15).find("p").eq(0).text(index.clothes.info);
               



            }
        })
    };







});