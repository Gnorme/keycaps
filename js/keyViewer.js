Vue.component('color-picker',{
	props:['colors', 'setColor', 'selectedStyle','defaultStyle'],
	template:`
		<div class="colorPicker" id="keyColorPicker">
			<div id="color-container">
				<div v-for='color in colors' class="colorChoice keyPicker" :data-color="color.name" v-bind:style="{'background-color':color.color}" v-on:click="setColor(color)"></div>
			</div>
		</div>
	`
})
Vue.component('upload-btn',{
	props: ['onChange','filename'],
	template: `
		<div id="fileSelect">
			<input type="file" name="imgUpload" id="imgUpload" class="inputfile" v-on:change="onChange" accept=".jpg, .jpeg, .png"/>
			<label for="imgUpload"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span v-if="filename.length > 0" style="font-family:Lato">{{ filename }}</span><span v-else>Choose image&hellip;</span></label>
		</div>	
	`
})
Vue.component('viewer', {
	props:['img','text','currentView', 'transformText','transformImg','foregroundFill','backgroundFill', 'strokeColor', 'selectedKey'],
	template: `
		<div class="surface">
			<div class="moveableText" :style="transformText"> {{ text }} </div>
			<img v-if="img == ''" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width='0' height='0' class="moveableImg"/>
			<img v-else :src="img" class="moveableImg" :style="transformImg"/>
			<template v-if="currentView === 'topView'">				
				<svg width="260" height="210" preserveAspectRatio="xMidYMid meet" :viewBox="selectedKey.sides.topView.viewbox">
					<rect class="keySurface" :x="selectedKey.sides.topView.body.x" :y="selectedKey.sides.topView.body.y" :width="selectedKey.sides.topView.body.width" :height="selectedKey.sides.topView.body.height" :rx="selectedKey.sides.topView.body.rx" :ry="selectedKey.sides.topView.body.ry" :fill="backgroundFill"/>
					<rect class="restrictRect" :x="selectedKey.sides.topView.face.x" :y="selectedKey.sides.topView.face.y" :width="selectedKey.sides.topView.face.width" :height="selectedKey.sides.topView.face.height" :rx="selectedKey.sides.topView.face.rx" :ry="selectedKey.sides.topView.face.ry" :fill="foregroundFill" :stroke="strokeColor" stroke-width="4px" vector-effect="non-scaling-stroke"/>				
				</svg>
			</template>					
			<template v-else>	
				<svg width="260" height="210" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" :viewBox="selectedKey.sides.topView.viewbox">
					<path stroke-width="1" :stroke="backgroundFill" :fill="foregroundFill" class="keySurface" :d="selectedKey.sides[currentView].path" vector-effect="non-scaling-stroke"/>
					<rect class="restrictRect" fill-opacity="0" :height="selectedKey.sides[currentView].restrict.height" stroke-opacity="0" :width="selectedKey.sides[currentView].restrict.width" :x="selectedKey.sides[currentView].restrict.x" :y="selectedKey.sides[currentView].restrict.y"/>
				</svg>						
			</template>	
		</div>	
	`	
})

Vue.component('key-picker',{
	props: ['keys'],
	template:`
		<div>
			Select a key  -  <span style="font-style:italic;text-decoration:underline">Why the row matters</span><br>
			<svg style="background-color:black; margin-top:5px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="616" height="205" viewBox="0 0 616 205">
				<g v-for="key in keys">
					<rect :x="key.body.x" :y="key.body.y" :width="key.body.width" :height="key.body.height" rx="2" ry="2" :style="{fill:key.body.color}" :name="key.name" class="key-body"/>
					<rect :x="key.face.x" :y="key.face.y" :width="key.face.width" :height="key.face.height" rx="4" ry="4" :style="{fill:key.face.color,stroke:key.face.stroke}" :name="key.name" class="key-face"/>
				</g>
			</svg>
		</div>
	`
})
var customKey = new Vue({
	el:'#customKey',
	data: {
		currentView:'topView',
		selectedColor: {name:'white',color:'#ffffff'},
		colors: [
			{name:'black', color:'#1a1a1a'},
			{name:'white',color:'#ffffff'},
			{name:'gray', color:'#d0ccc0'},
			{name:'dark-gray', color:'#96938e'},
			{name:'graphite', color:'#60605b'},
			{name:'charcoal', color:'#373534'},
			{name:'pink', color:'#fbbbc9'},
			{name:'red', color:'#c13828'},
			{name:'maroon', color:'#5f3032'},
			{name:'blue', color:'#5eb1e7'},
			{name:'royal-blue', color:'#0046ad'},	
			{name:'navy', color:'#002e5f'},
			{name:'mint', color:'#8ed7b0'},	
			{name:'green', color:'#1db63a'},
			{name:'olive', color:'#53682b'},	
			{name:'yellow', color:'#f8d615'},	
			{name:'orange', color:'#f67f00'},	
			{name:'graybrown', color:'#766e54'},	
			{name:'brown', color:'#6f4c23'},	
			{name:'purple', color:'#ac97d8'},	
			{name:'aubergine', color:'#43165e'}					
		],
		viewOptions: [
			{name:'Top',value:'topView'},
			{name:'Front',value:'frontView'},
			{name:'Left side',value:'leftView'},
			{name:'Right side',value:'rightView'},
			{name:'Back',value:'backView'}				
		],
		surfaces: {
			topView:{img:{x:'20',y:'16',value:'', filename:''},text:{x:'25',y:'15',value:''}},
			frontView:{img:{x:'50',y:'120',value:'', filename:''},text:{x:'50',y:'120',value:''}},
			leftView:{img:{x:'50',y:'120',value:'', filename:''},text:{x:'50',y:'120',value:''}},
			rightView:{img:{x:'50',y:'120',value:'', filename:''},text:{x:'50',y:'120',value:''}},
			backView:{img:{x:'50',y:'120',value:'', filename:''},text:{x:'50',y:'120',value:''}}					
		},
		keys:{},
		selectedKey:{
			type:"square",
			sides:{
				topView:{body:{x:0,y:0,width:39,height:39,rx:2,ry:2},face:{x:5.5,y:3,width:28,height:31,rx:4,ry:4},viewbox:"0 0 39 39"},			
				frontView:{path:"m61.946,119l95.108,0c6.613,0 14.784,5.147 16.784,13.729l12.162,53.542c2,8.582 -3.171,13.729 -13.784,13.729l-125.432,0c-8.613,0 -16.784,-4.147 -13.784,-13.729l12.162,-51.542c2,-8.582 9.171,-15.729 16.784,-15.729z", restrict:{height:80,width:110,x:51,y:60}},
				leftView:{path:"m61.946,119l95.108,0c6.613,0 14.784,5.147 16.784,13.729l12.162,53.542c2,8.582 -3.171,13.729 -13.784,13.729l-125.432,0c-8.613,0 -16.784,-4.147 -13.784,-13.729l12.162,-51.542c2,-8.582 9.171,-15.729 16.784,-15.729z", restrict:{height:80,width:110,x:51,y:60}},
				rightView:{path:"m61.946,119l95.108,0c6.613,0 14.784,5.147 16.784,13.729l12.162,53.542c2,8.582 -3.171,13.729 -13.784,13.729l-125.432,0c-8.613,0 -16.784,-4.147 -13.784,-13.729l12.162,-51.542c2,-8.582 9.171,-15.729 16.784,-15.729z", restrict:{height:80,width:110,x:51,y:60}},
				backView:{path:"m61.946,119l95.108,0c6.613,0 14.784,5.147 16.784,13.729l12.162,53.542c2,8.582 -3.171,13.729 -13.784,13.729l-125.432,0c-8.613,0 -16.784,-4.147 -13.784,-13.729l12.162,-51.542c2,-8.582 9.171,-15.729 16.784,-15.729z", restrict:{height:80,width:110,x:51,y:60}}				
			}
		},
		sides:{},
		active:false,
		mainStyle:{
			pointerEvents:'none',
			opacity:0.3
		}
	},
	computed: {
		transformText () {
			x = this.surfaces[this.currentView].text.x
			y = this.surfaces[this.currentView].text.y
			return {transform: 'translate(' + x + 'px,' + y + 'px)',fontSize:'26px'}
		},
		transformImg () {
			x = this.surfaces[this.currentView].img.x
			y = this.surfaces[this.currentView].img.y
			return {transform: 'translate(' + x + 'px,' + y + 'px)'}				
		}
	},
    mounted: function () {
	    var self = this;
	    fetch('https://us-central1-hotsguide-188315.cloudfunctions.net/function-1', {
	    	mode:"cors",
	    	headers: {
	    		"Content-Type": "application/json: charset=uts-8",
	    	},
	    	body:JSON.stringify({board:'keyboard-61', sides:true})
	    })
	    .then(function(response){
	    	var res = response.json()
	    	self.keys = res.keys;
	    	self.sides = res.sides
	    });
		// $.ajax({
		// 	url: 'https://us-central1-hotsguide-188315.cloudfunctions.net/function-1',	//read comments in search.php for more information usage
		// 	type: 'GET',
		// 	data: {board: 'keyboard-61', sides:true},
		// 	dataType: 'json',
		// 	success: function(json) {
		// 		self.keys = json.keys;
		// 		self.sides = json.sides;
		// 	}
		// });			
    },	
	methods: {
		addToCart: function() {
			var key = {name:this.selectedKey.name,color:this.selectedColor.name,surfaces:this.surfaces}
			$.ajax({
			    type: "POST",
			    url: "http://localhost:3000/customKeyboard",
			    processData: false,
			    contentType: 'application/json',			    
			    data: JSON.stringify(this.keyboard.keys),
			    success: function(res) {
					console.log(res)
			    }
			});	
		},
		setColor: function(color) {
			document.querySelector('.keyPicker[data-color="'+this.selectedColor.name+'"]').style.removeProperty('border')
			document.querySelector('.keyPicker[data-color="'+color.name+'"]').style.border = '2px solid red'
			this.selectedColor = color
		},			
		changeView: function(ev) {
			document.activeElement.blur();
			this.currentView = ev.target.selectedOptions[0].value
			var fileInput = document.querySelector('input[type=file]')
			var textInput = document.querySelector('input[type=text]')
			if (this.surfaces[this.currentView].img.filename == ''){
				fileInput.value = ''
				if(!/safari/i.test(navigator.userAgent)){
				  fileInput.type = ''
				  fileInput.type = 'file'
				}
			}
			textInput.value = this.surfaces[this.currentView].text.value
			this.updateSnapPoints()
		},
		updateSnapPoints: function () {
			Vue.nextTick(function () {
				surface = document.querySelector('.restrictRect').getBoundingClientRect()
				var imgWidth = document.querySelector('.moveableImg').width
				var textWidth = document.querySelector('.moveableText').style.width
				var textHeight = document.querySelector('.moveableText').style.height

				interact('.moveableText').options.drag.snap.targets = calcSnapTargets(surface,textWidth,textHeight)
				interact('.moveableText').options.drag.restrict.restriction = {
					x:surface.x,
					y:surface.y,
					width:surface.width,
					height:surface.height					
				}

				interact('.moveableImg').options.drag.snap.targets = calcSnapTargets(surface,imgWidth,imgWidth)
				interact('.moveableImg').options.drag.restrict.restriction = {
					x:surface.x,
					y:surface.y,
					width:surface.width,
					height:surface.height					
				}
			})
		},
		changeKey: function(name) {
				var prevKey = this.selectedKey.name
				var color = '#ffffff'
				var keyType = JSON.parse(JSON.stringify(this.keys[name].type))
				if (!this.active) {
					this.active = true
					this.mainStyle.pointerEvents = 'auto'
					this.mainStyle.opacity = 1
					Vue.nextTick(function () {
						addInteractive()
					})
				}
				if (prevKey){
					this.keys[prevKey].body.color = '#0f0f0f'
					this.keys[prevKey].face.stroke = '#272727'	
					this.keys[prevKey].face.color = '#1a1a1a'						
				}

				this.selectedKey.sides = this.sides[keyType]
				this.selectedKey.type = keyType
				this.selectedKey.name = name

				this.keys[name].body.color = this.shadeBlend(-0.25, color)
				this.keys[name].face.stroke = this.shadeBlend(0.065, color)	
				this.keys[name].face.color = color

				//this.selectedKey.topView.viewbox = "0 0 " + this.selectedKey.topView.body.width + " " + this.selectedKey.topView.body.height
				this.updateSnapPoints()
		},
		updateText: function(text) {
			this.surfaces[this.currentView].text.value = text
			surface = document.querySelector('.restrictRect').getBoundingClientRect()
			var newWidth = document.querySelector('.moveableText').style.width
			var newHeight = document.querySelector('.moveableText').style.height
			interact('.moveableText').options.drag.snap.targets = calcSnapTargets(surface, newWidth, newHeight)
		},
		shadeBlend: function(p,c0,c1) {
		    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
		    if(c0.length>7){
		        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
		        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
		    }else{
		        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
		        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
		    }
		},
		previewImg: function() {
			var file = document.querySelector('input[type=file]').files[0]; //sames as here
			var label = document.querySelector( '.inputfile' ).nextElementSibling
			var target = this.surfaces[this.currentView].img
			var reader  = new FileReader();
			var surface = document.querySelector('.restrictRect').getBoundingClientRect()
			var width = document.querySelector('.moveableImg').width

			reader.onloadend = function () {
				 target.value = reader.result
			}
			
			if (file) {
				target.filename = file.name
				reader.readAsDataURL(file); //reads the data as a URL
				interact('.moveableImg').options.drag.snap.targets = calcSnapTargets(surface,width,width)
			} else {
				target.value = "";
			}				
		}							
	}
})

function calcSnapTargets(surface, width, height){
	var left = surface.left+(width / 2)
	var center = surface.left + (surface.width / 2)
	var right = surface.left + surface.width - (width / 2)
	var top = surface.top + (height / 2)
	var middle = surface.top + (surface.height / 2)
	var bottom = surface.top + surface.height - (height / 2)
	var snapTargets = [
		{x:left, y:top},
		{x:center,y:top},
		{x:right,y:top},
		{x:left, y:middle},
		{x:center,y:middle},
		{x:right,y:middle},
		{x:left, y:bottom},
		{x:center,y:bottom},
		{x:right,y:bottom},			
	]
	return snapTargets		
}

function dragMoveListener (event) {
	var target = event.target

	if (target.nodeName == "DIV"){
		var node = customKey.surfaces[customKey.currentView].text
	} else if (target.nodeName == "IMG") {
		var node = customKey.surfaces[customKey.currentView].img
	}

	node.x = (parseFloat(node.x) || 0) + event.dx,
	node.y = (parseFloat(node.y) || 0) + event.dy;
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;	

function addInteractive() {
	var surface = document.querySelector('.restrictRect').getBoundingClientRect()
	interact('.moveableText')
		.draggable({
			onmove: window.dragMoveListener,
			snap: {
				targets: [{}],
				range:20,
			    relativePoints: [
			      //{ x: 0  , y: 0   }  // snap relative to the element's top-left,
			      { x: 0.5, y: 0.5 }   // to the center
			      // { x: 1  , y: 1   }    // and to the bottom-right
			    ]			
			},
			restrict: {
				restriction: {
					x:surface.x,
					y:surface.y,
					width:surface.width,
					height:surface.height
				},
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			},
		})	
	interact('.moveableImg')
		.draggable({
			onmove: window.dragMoveListener,
			snap: {
				targets: [{}],
				range:10,
			    relativePoints: [
			      //{ x: 0  , y: 0   }  // snap relative to the element's top-left,
			      { x: 0.5, y: 0.5 }   // to the center
			      // { x: 1  , y: 1   }    // and to the bottom-right
			    ]			
			},
			restrict: {
				restriction: {
					x:surface.left,
					y:surface.top,
					width:surface.width,
					height:surface.height
				},
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			},
		})
		.resizable({
			// resize from all edges and corners
			edges: {right: true, bottom: true, left: true, top:true},

			// keep the edges inside the parent
			restrictEdges: {
				outer:{
						x:surface.x,
						y:surface.y,
						width:surface.width,
						height:surface.height
					},
			},

			// minimum size
			restrictSize: {
			min: { width: 50, height: 50 },
			},

			inertia: true,
		})
		.on('resizemove', function (event) {
			var target = event.target
			var newWidth = event.rect.width
			var newHeight = event.rect.height
			target.style.width = newWidth + 'px'

			interact('.moveableImg').options.drag.snap.targets = calcSnapTargets(surface, newWidth, newHeight)		
			//placeImage()
		});	
}

document.body.addEventListener('click', function(e) {
    var target = e.target;
    if (target.className){
		if (target.classList.contains('key-face')) {
			customKey.changeKey(target.getAttribute('name'))
		}   	
    }
    e.stopPropagation()
});	