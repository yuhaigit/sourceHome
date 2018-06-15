$(document).click(function(event){
	$('.goods-box').fadeOut() ;	
	$('#video-discuss-form').fadeOut()
	$('.video-discuss-pane').css('display','block');
})

$('.goods-box').on('click',function(e){
	e.stopPropagation() ;
})
$('#video-discuss-form').on('click',function(e){
	e.stopPropagation() ;
})


$('.bag').click(function(e){
	$('.goods-box').fadeIn() ;
	e.stopPropagation() ;
})


//进场，关注，拿货
var timerout;
var tip = {
	follow:function(txt){
		clearTimeout(timerout)
		$('.tip-box').html("")
		var ohtml = `
			<div class="in-tip animated fadeInLeft">
	    		<div class="tip-icon">
	    			<img src="img/follow-logo.png" />
	    		</div>
	    		<span>${txt}</span>
	    		进入了直播间
	    	</div>
		`
		$('.tip-box').append(ohtml)
		timerout = setTimeout(function(){
			$('.tip-box').html("")
		},2000)
	},
	enter:function(){
		clearTimeout(timerout)
		$('.tip-box').html("")
		var ohtml = `
			<div class="take-tip animated fadeInLeft">
	    		<div class="tip-icon">
	    			<img src="img/follow-logo.png" />
	    		</div>
	    		<span>美少女星星</span>
	    		正在拿货
	    	</div>
		`
		$('.tip-box').append(ohtml)
		timerout = setTimeout(function(){
			$('.tip-box').html("")
		},2000)
	},
	take:function(){
		clearTimeout(timerout)
		$('.tip-box').html("")
		var ohtml = `
			<div class="follow-tip animated fadeInLeft">
	    		<div class="tip-icon">
	    			<img src="img/follow-logo.png" />
	    		</div>
	    		<span>美少女星星</span>
	    		关注了主播
	    	</div>
		`
		$('.tip-box').append(ohtml)
		timerout = setTimeout(function(){
			$('.tip-box').html("")
		},2000)
	}
}

//款爷来了
var timerout1;
$('.hot').click(function(){
	clearTimeout(timerout1);
	$('.big-log-box').html("")
	var ohtml = `
		<div class="big-logo">
			<div class="big-log-1">
				<img src="img/kuanye.png" />
				<p>******鱼已拿货超过5件,达到撒旦撒旦撒</p>
			</div>
		</div>
	`
	$('.big-log-box').append(ohtml);
	console.log($('.big-log-1').width())
	timerout1 = setTimeout(function(){
		$('.big-log-box').html("")
	},6000)
})


//关注
$(".follow").click(function(){
	$.toptip('关注成功', 'success');
	$('.follow').remove() ;
})



//评论
$('.ic-chat').click(function(event){
	$('.video-discuss-pane').css('display','none');
	$('.video-discuss-form').fadeIn() ;
	event.stopPropagation();
})


//主播@回复
function reply(name,content){
	let timer;
	clearTimeout(timer)
	$('.reply-box').html("")
	let ohtml = `<div class="reply"><i>主播回复@${name}:</i>${content}</div>`
	$('.reply-box').html(ohtml)
	timer =  setTimeout(function(){
		$('.reply-box').fadeOut()
	},2000)
}

/*$('.user-img').click(function(){
	$('.reply-box').fadeIn()
	reply('小明','你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀')
})*/


//热门商品推荐轮播
$('.user-img').click(function(){	
	$('.scroll-now-goods').find('.now-g-item').eq(1).remove()
	$('.scroll-now-goods').find('.now-g-item').eq(0).animate({left:'0.54rem'},"fast",function(){
		let ohtml = `
			<div class="now-g-item">
				<div class="ic-num-bg">
					32
				</div>
				<div class="now-g-price ellip">￥60.00起</div>
			</div>
		`
		let aaa = $("<div class='now-g-item'>"+ ohtml +"</div>")
		$('.scroll-now-goods').prepend(aaa)	
	})
})





/*(function () {
        function getParams(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        }

        function getPathParams() {
            var path = location.pathname.split('/');
            if (path[1] == 'vod-player') {
                return {
                    'path': location.origin + path.slice(0, 4).join('/'),
                    'appid': path[2],
                    'fileid': path[3]
                }
            } else {
                return null;
            }
        }

        var rtmp = getParams('rtmp'),
            flv = getParams('flv'),
            m3u8 = getParams('m3u8'),
            mp4 = getParams('mp4'),
            live = (getParams('live') == 'true' ? true : false),
            coverpic = getParams('coverpic'),
            width = getParams('width'),
            height = getParams('height'),
            volume = getParams('volume'),
            flash = (getParams('flash') == 'true' ? true : false),
            h5_flv = (getParams('h5_flv') == 'true' ? true : false),
            autoplay = (getParams('autoplay') == 'true' ? true : false),
            flashUrl = (function () {
                var params = getPathParams();
                if (params) {
                    return params.path + '/player/release/QCPlayer.swf';
                }
                return '//imgcache.qq.com/open/qcloud/video/player/release/QCPlayer.swf'
            })(),
            log = getParams('log');
        **
         * 视频类型播放优先级
         * mobile ：m3u8>mp4
         * PC ：RTMP>flv>m3u8>mp4
         
        var options = {
            rtmp: rtmp,
            flv: flv ,
            m3u8: m3u8 ,
            mp4: mp4 || 'img/test.mp4',
            autoplay: autoplay,
            live: live,
            width: width || '100%',
            height: height || '100%',
            volume: volume || 0.5,
            flash: flash,
            flashUrl: flashUrl,
            h5_flv: h5_flv,
            controls : 'none',
            x5_type:'h5',
            x5_fullscreen :'true' ,
            coverpic : {"style":"default","src":"img/back-img2.png"},
            systemFullscreen:true,
            wording: {
                2032: '请求视频失败，请检查网络',
                2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
            },
            listener: function (msg) {

            }
        };
        window.tcplayer = new TcPlayer('video-container', options);
    })();
*/