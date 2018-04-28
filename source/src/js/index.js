$(function(){
	
	$(".stock_type li").click(function(){  //头部导航
		var index = $(this).index() ;
		if(index == 4){
			$(".stock_manage .add_border_li").addClass('add_border') ;
			$('.batch_price').on('click',function(){
				alert(1)
			})
		}else{
			$(".stock_manage .add_border_li").removeClass('add_border') ;
			$('.batch_price').off('click')
		}
		$(".type_box .btns_type"+ (index+1)).siblings().addClass('hide')
		$(".type_box .btns_type"+ (index+1)).removeClass('hide').siblings('type_box_child').addClass('hide')
		$(this).addClass('stock_type_active').siblings('li').removeClass("stock_type_active") ;
	})
	
	//颜色名称模糊查询
	var colorNameOptions = {
		url : 'goods/color/namesuggestlist.json' ,
		successCallback : function(res){
			if(res['status']==200 && res['success']==true){
				var ohtml = '' ;
				var data = res['colorList'] ;
				if(data.length>0){
					for(var i = 0,len = data.length; i<len ;i++){
						ohtml +='<option value="'+ data[i]['colorName'] +'">'+ data[i]['colorName'] +'</option>'
					}
				}else{
					ohtml = '<option disabled>暂无数据...</option>'
				}
				
				$('#colorName').append(ohtml)
			}else if(res['status']==200 && res['success']==false){
				alert(res['errMsg'])
			}
		},
		errorCallback : function(res){
			alert('网络错误')
		}
	}
	Ajax(colorNameOptions)
	
	
	//尺码模糊查询
	var sizeNameOptions = {
		url : 'goods/size/namesuggestlist.json' ,
		successCallback : function(res){
			if(res['status']==200 && res['success']==true){
				var ohtml = '' ;
				var data = res['sizeList'] ;
				for(var i = 0,len = data.length; i<len ;i++){
					ohtml +='<option value="'+ data[i]['sizeName'] +'">'+ data[i]['sizeName'] +'</option>'
				}				
			}else {
				ohtml = '<option disabled>暂无数据...</option>'
			}
			$('#sizeName').append(ohtml)
		},
		errorCallback : function(res){
			
		}
	}
	Ajax(sizeNameOptions)  
	
	
	//按钮更多
	$('.more').on('click', function() {
		if(event.target == this) {
			$('.more').addClass('click_class')		
			if($('.set_list').length > 0){
				$('.set_list').remove();
				$('.set').removeClass('click_class')
			}
			if($('.set').hasClass('click_class')){
				$('.set').removeClass('click_class')
			}
			if($('.more_list').length > 0) {
				$('.more').removeClass('click_class')
				$('.more_list').remove();
			}else {
				dialog.indexBtnMore();
			}
		}
	})
	
	//按钮基本设置
	$('.set').on('click', function() {
		if(event.target == this) {			
			$('.set').addClass('click_class')
			if($('.more_list').length > 0){
				$('.more').removeClass('click_class')
				$('.more_list').remove();
			}
			if($('.more').hasClass('click_class')){
				$('.more').removeClass('click_class')
			}
			if($('.set_list').length > 0) {
				$('.set').removeClass('click_class')
				$('.set_list').remove();
			} else {
				dialog.indexBtnSet();
			}
		}
	})
	
	
	$('.set').on('click','.all_color',function(){
		$('.set_list').remove();
		$(".btns_type6").removeClass('hide').siblings('.type_box_child').addClass('hide') ;
	})
	$('.set').on('click','.all_size',function(){
		$('.set_list').remove();
		$(".btns_type7").removeClass('hide').siblings('.type_box_child').addClass('hide') ;
	})
	$('.btns_type6 .add_list_btn').click(function(){
		window.location.href = 'src/html/add_color.html'
	})
	$('.btns_type7 .add_list_btn').click(function(){
		window.location.href = 'src/html/add_size.html'
	})
	$('.btns_type8 .add_list_btn').click(function(){
		window.location.href = 'src/html/add_warehouse.html'
	})
	$(".stock_addGoods").click(function(){
		window.location.href = 'src/html/add_goods.html'
	})
	
	
	//基本设置-价格名称
	$('.set').on('click','ul .priceBtn',function(){
		$('.set_list').remove();
		$(".type_box_child").addClass('hide') ;
		var priceName = {
		url : 'goods/price/list.json' ,
			successCallback : function(res){
				if(res['status']==200 && res['success']==true){
					var data = res['priceResultList'] ;
					var ohtml = `
						<div class="set_priceName_title lists">
							<div>序号</div>
							<div>名称</div>
							<div>启用</div>
							<div>进货价比例</div>
							<div style = 'border-right:1px solid #DDD'>起批数量</div>
						</div>
					`
					var ohtmlItem = '';
					var useState = 0 ;
					data.forEach(function(value,key){
						ohtmlItem+=`
							<div data-id = '${value['id']}' class="lists set_priceName_item ${value['useState']==1? "addYellow":""}">
								<div>${key}</div>
								<div>${value['name']}</div>
								<div>${value['useState']==0? "启用":"未启用"}</div>
								<div>${value['importPriceRatio']}</div>
								<div style = 'border-right:1px solid #DDD'>${value['amountBatch']}</div>
							</div>
						`
					})
					var ohtmlBottom = `
						<div class="list_bottom_info">
							<div class="list_bottom_left">
								<span style="color: #FF9900;">黄色已停用  请从红线（如存在）分隔处开始滚动</span>
							</div>
							<div class="list_bottom_right">
								<span>共 ${data.length} 条</span>
								<span>1/1</span>
							</div>
						</div>
					`
					var ohtmlNull = `
						<div class = 'lists set_priceName_item nullItem'>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					`
					$('.list_box').html(ohtml+ohtmlItem+ohtmlNull+ohtmlBottom)
					$('.set_priceName_item:last').addClass('set_priceName_lastItem')
				}
			},
			errorCallback : function(res){
				alert('网络错误')
			}
		}
	Ajax(priceName)
		
	})
	$('.list_box').on('click','.set_priceName_item ',function(){
		var priceId = $(this).attr('data-id') ;
		window.location.href = "src/html/price_info.html?priceId="+ priceId +""
	})

	//更多-仓位列表
	
	$('.more').on('click','ul .warehouse_list',function(){
		var warehouse_page = 1 ;
		$('.more_list').remove();
		$(".btns_type8").removeClass('hide').siblings('.type_box_child').addClass('hide') ;
		var warehouseObj = {
			url : 'goods/warehouse/querylist.json' ,
			param : {
				currentPage : warehouse_page ,
				pageSize : 12
			},
			successCallback : function(res){
				if(res['status']==200 && res['success']==true){
					wareHouseList(res)
				}
			},
			errorCallback : function(res){
				alert('网络错误')
			}
		}
		Ajax(warehouseObj)
		
		//仓位名称下拉
		var warehouseName = {
			url : 'goods/warehouse/namelist.json',
			successCallback : function(res){
				var ohtml = '' ;
				if(res['status']==200 && res['success']==true){
					var data = res['nameList'] ;
					$.each(data,function(key,value){
						ohtml +=`<option value = '${value['id']}'>${value['name']}</option>`
					})
				}
				$('#btns_type8_select').append(ohtml)
			}
		}
		Ajax(warehouseName)
	})
	//仓位查询
	$(".btns_type8 .seach").click(function(){
		var id = $('#btns_type8_select').val() ;
		var seach = {
			url : 'goods/warehouse/querylist.json' ,
			param : {
				id : id
			},
			successCallback : function(res){
				wareHouseList(res)
			}
		}
		Ajax(seach)
	})
	
	function wareHouseList(oData){
		var data = oData['list'];
				var ohtml = `
					<div class="set_warehouse_title">
						<div>序号</div>
						<div>名称</div>
					</div>
				`
				var ohtmlItem = '';
				var useState = 0 ;
				data.forEach(function(value,key){
					ohtmlItem+=`
						<div data-id = '${value['id']}' class="lists set_warehouse_item ${value['useState']==1? "addYellow":""}">
							<div>${key}</div>
							<div>${value['name']}</div>
						</div>
					`
				})
				var ohtmlBottom = `
					<div class="list_bottom_info">
						<div class="list_bottom_left">
							<span style="color: #FF9900;">黄色已停用  请从红线（如存在）分隔处开始滚动</span>
						</div>
						<div class="list_bottom_right">
							<span>共 ${oData['total']} 条</span>
							<span>1/${oData['total']%12==0? 1:parseInt((oData['total']/12)+1)}</span>
						</div>
					</div>
				`
				//${res['total']%12==0? 1:((res['total']%12)+1)}
				var ohtmlNull = `
					<div class = 'lists set_warehouse_item nullItem'>
						<div></div>
						<div></div>
					</div>
				`
				$('.list_box').html(ohtml+ohtmlItem+ohtmlNull+ohtmlBottom)
				$('.set_warehouse_item:last').addClass('set_warehouse_lastItem')
	}
	
	
})
