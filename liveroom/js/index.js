(function () {
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
        /**
         * 视频类型播放优先级
         * mobile ：m3u8>mp4
         * PC ：RTMP>flv>m3u8>mp4
         */
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
