
	var oHtml = document.getElementsByTagName("html")[0];
	var screenW = document.documentElement.offsetWidth || document.body.offsetWidth;
	oHtml.style.fontSize = 100 * screenW / 1024 + "px";
	
	 document.documentElement.addEventListener('touchstart', function (event) {
	  if (event.touches.length > 1) {
	    event.preventDefault();
	  }
	}, false);
	
	
	var lastTouchEnd = 0;
	document.documentElement.addEventListener('touchend', function (event) {
	  var now = Date.now();
	  if (now - lastTouchEnd <= 300) {
	    event.preventDefault();
	  }
	  lastTouchEnd = now;
	}, false);
	
	//提示弹框
	
	var dialog = {
		alert:()=>{
			var ohtml = `
				<div class="log_window common_box_center">
					<i class="iconfont close_window" style="position: absolute;">&#xe672;</i>
					<div style="margin-top: 0.3rem;">
						<i class="iconfont" style="font-size: 0.2rem;color: #FFC219;">&#xe678;</i> <span style="color: #FF9900 ;">提示</span>
					</div>
					<div style="font-size: 0.14rem;color: #666666;width: 2.24rem;height: 0.4rem;margin: 0 auto;margin-top: 0.22rem;">
							请点击【货品查询】按钮并勾选货品
		再进行该操作
						</div>
				</div>
			`
			$('#content_box').append(ohtml)
		},
		confirm:(txt,sure,cancel)=>{
			var ohtml = `
				<div class="log_window common_box_center">
					<i class="iconfont close_window" style="position: absolute;" onclick ='${cancel}'>&#xe672;</i>
					<p style="font-size: 0.2rem;color: #666666;margin-top: 0.33rem;">${txt}</p>
					<div style="font-size: 0.14rem;margin-top: 0.28rem;width: 100%;height: auto;">
						<span class = 'click_yes' style="background-color: #FFC219;color: #FFFFFF;width: 0.4rem;height: 0.26rem;border-radius: 2px;display: inline-block;text-align: center;line-height: 0.26rem;float: left;margin-left: 0.95rem;" onclick ='${sure}'>确定</span>
						<span class = 'click_no' style="background-color: #FFFFFF;color: #666666;width: 0.4rem;height: 0.26rem;border-radius: 2px;display: inline-block;text-align: center;line-height: 0.26rem;border: 1px solid #999999;margin-left: 0.1rem;float: left;" onclick ='${cancel}'>取消</span>
					</div>
				</div>
			`
			$('#content_box').append(ohtml)
		},
		page:(sure,cancel)=>{
			var ohtml = `
				<div class="log_window common_box_center">
					<i class="iconfont close_window" style="position: absolute;">&#xe672;</i>
					<div style="font-size: 0.14rem;color: #666666;margin-top: 0.25rem;">
						<span style="display: inline-block;float: left;margin-left: 0.28rem;">跳转至</span>
						<span style="display: inline-block;float: right;margin-right: 0.28rem;">共46页</span>				
					</div>
					<div style="width: 2.24rem;height: 0.36rem;border: 1px solid #999999;background-color: #FFFFFF;margin: auto;margin-top: 0.51rem;">
						<input type="text" style="width: 1.5rem;height: 0.33rem;border: none;float: left;outline: none; text-decoration: 0.1rem;font-size: 0.16rem;"/>
						<span style="font-size: 0.14rem;color: #666666;">页</span>
					</div>
					<div style="font-size: 0.14rem;margin-top: 0.1rem;width: 100%;height: auto;">
						<span class = 'click_yes' style="background-color: #FFC219;color: #FFFFFF;width: 0.4rem;height: 0.26rem;border-radius: 2px;display: inline-block;text-align: center;line-height: 0.26rem;float: left;margin-left: 0.95rem;" onclick ='${sure}'>确定</span>
						<span class = 'click_no' style="background-color: #FFFFFF;color: #666666;width: 0.4rem;height: 0.26rem;border-radius: 2px;display: inline-block;text-align: center;line-height: 0.26rem;border: 1px solid #999999;margin-left: 0.1rem;float: left;" onclick ='${cancel}'>取消</span>
					</div>
				</div>
			`
			$('#content_box').append(ohtml)
		},
		pageNum:()=>{
			var ohtml = `
				<div class="log_window common_box_center">
					<i class="iconfont close_window" style="position: absolute;">&#xe672;</i>
					<span style="display: block;margin-left: 0.28rem;font-size: 0.14rem;color: #666666;margin-top: 0.35rem;width: 1rem;text-align: left;">跳转至</span>				
					<div style="display: flex;width: 100%;padding: 0 0.2rem;margin-top: 0.2rem;" class="page_num">
						<div>1</div>
						<div>2</div>
						<div>3</div>
						<div>4</div>
						<div>5</div>
						<div>6</div>
						<div>7</div>
						<div>8</div>
						<div>9</div>
						<div>10</div>
					</div>
				</div>
			`
			$('#content_box').append(ohtml)
		},
		checkWindow:(stop,start)=>{
			var ohtml = `
				<div class="check_window common_box_center">
					<div class="title">批量操作
						<i class="iconfont" style="font-size: 0.16rem;float: right;margin-right: 0.1rem;">&#xe672;</i>
					</div>
					<div class="stop_all" onclick = '${stop}'>批量停用</div>
					<div class="start_all" onclick = '${start}'>批量启用</div>
				</div>
			`
			$('#content_box').append(ohtml)
		},
		changePrice:(close,sure)=>{
			var ohtml = `
				<div class="change_price common_box_center am-animation-scale-up">
					<div class="title">批量调价
						<span style="font-size: 0.12rem;margin-left: 0.04rem;">对前面界面勾选的货品进行调价</span>
						<i onclick = '${close}' class="iconfont" style="font-size: 0.16rem;float: right;margin-right: 0.1rem;">&#xe672;</i>
					</div>	
					<div class="form_box">
						<div style="margin-top: 0.2rem;">
							<span class="common_box_overflowhide">零批价</span>
							<input type="text"/>
						</div>
						<div>
							<span class="common_box_overflowhide">VIP价</span>
							<input type="text" />
						</div>
						<div>
							<span class="common_box_overflowhide">统一加减</span>
							<input type="text" />					
						</div>
						<p class="common_box_overflowhide">注：减用“-”号；如果填了该栏，上面的价格就会忽略</p>
						<div>
							<span class="common_box_overflowhide">统乘</span>
							<input type="text" />					
						</div>
						<p>注：0.8表示8折</p>
					</div>
					<div onclick = '${sure}' class="sure_click">确定</div>
				</div>
			`
			$('#content_box').append(ohtml)
		},
		addColorType:(txt,el,sure,cancel)=>{
			var ohtml = `
				<div class="add_color_type">
					<p class="title">${txt}</p>
					<input type="text" class="text_frame"/>
					<div class="add_color_sure" onclick = '${sure}'>确定</div>
					<div class="add_color_cancel" onclick = '${cancel}'>取消</div>
				</div>
			`
			$(el).append(ohtml)
		},
		indexBtnMore:()=>{
			var ohtml = `
				<ul class="more_list am-animation-slide-right">
					<li>库存调整单</li>
					<li>款号管理</li>
					<li class = 'warehouse_list'>仓位列表</li>
					<li style="color: #FF5959;border-color: #FF5959;">超储统计</li>
					<li style="color: #FF5959;border-color: #FF5959;">缺货统计</li>								
					
				</ul>
			`
			$('.more').append(ohtml)
		},
		indexBtnSet:()=>{
			var ohtml = `
				<ul class="set_list am-animation-slide-right">
					<li class = 'priceBtn'>价格名称</li>
					<li>货品类别</li>
					<li class = 'all_color'>所有颜色</li>
					<li class = 'all_size' style="color: #FF5959;border-color: #FF5959;">所有尺码</li>
					<li style="color: #FF5959;border-color: #FF5959;">所有品牌</li>								
					
				</ul>
			`
			$('.set').append(ohtml)
		}
		
	}
	
	
	
	var ip = 'http://192.168.10.243:80/' ;
	function Ajax(opt){
	    $.ajax({
	        url:ip+opt.url,//数据的接口的路径
	        dataType:'json',
	        type: opt.type||"post", //请求的方式  默认是get
	        data:opt.param||"", //请求的参数  默认是空
	        async:opt.async||true, //是否是异步，默认是异步
	        traditional:opt.traditional || false, //防止深度序列化，默认为false
	        success: function(res) {
	            opt.successCallback(res)
	     	},
	        error: function(res){
	            opt.errorCallback(res)
	        }
	    });
	}
	
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}



