Vue.component('color-picker',{
	props:['colors', 'setColor', 'selectedStyle','defaultStyle'],
	template:`
		<div id="colorPicker">
			<div v-for='color in colors'>
				<div class="colorChoice" :id="color.name" v-bind:style="{'background-color':color.color}" v-on:click="setColor(color)"></div>
			</div>
		</div>
	`
})
Vue.component('upload-btn',{
	props: ['onChange','filename'],
	template: `
		<div id="fileSelect">
			<input type="file" name="imgUpload" id="imgUpload" class="inputfile" v-on:change="onChange" accept=".jpg, .jpeg, .png"/>
			<label for="imgUpload"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span v-if="filename.length > 0">{{ filename }}</span><span v-else>Choose image&hellip;</span></label>
		</div>	
	`
})
Vue.component('viewer', {
	props:['img','text','currentView', 'transformText','transformImg','foregroundFill','backgroundFill'],
	template: `
		<div class="surface">
			<div class="moveableText" :style="transformText"> {{ text }} </div>
			<img :src="img" class="moveableImg" :style="transformImg"/>				
			<template v-if="currentView === 'topView'">
				<svg width="200" height="210">
					<rect stroke="#000" rx="20" id="bottom" height="197.5" width="181.99999" y="7.25" x="9.25" stroke-opacity="null" stroke-width="1.5" :fill="backgroundFill"/>
					<rect id="top" rx="20" height="150" width="150" y="15.5" x="19" stroke-width="1.5" stroke="#000" :fill="foregroundFill" class="restrictRect"/>
				</svg>						
			</template>
			<template v-else>				
				<svg width="215" height="220">
					<path stroke-width="1.5" stroke="#000" :fill="foregroundFill" d="M52.946,119.000 L148.054,119.000 C155.667,119.000 161.838,125.147 161.838,132.729 L177.000,186.271 C177.000,193.853 170.829,200.000 163.216,200.000 L37.784,200.000 C30.171,200.000 24.000,193.853 24.000,186.271 L39.162,132.729 C39.162,125.147 45.333,119.000 52.946,119.000 Z" class="keySurface"/>
      				<rect class="restrictRect" stroke-opacity="0" fill-opacity="0" x="45" y="120" width="110" height="80" />												
				</svg>
			</template>	
		</div>	
	`	
})
var keyViewer = new Vue({
	el:'#keyViewer',
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
			topView:{img:{x:'20',y:'16',value:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', filename:''},text:{x:'25',y:'15',value:'top'}},
			frontView:{img:{x:'50',y:'120',value:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', filename:''},text:{x:'50',y:'120',value:'front'}},
			leftView:{img:{x:'50',y:'120',value:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', filename:''},text:{x:'50',y:'120',value:'left'}},
			rightView:{img:{x:'50',y:'120',value:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', filename:''},text:{x:'50',y:'120',value:'right'}},
			backView:{img:{x:'50',y:'120',value:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', filename:''},text:{x:'50',y:'120',value:'back'}}					
		}
	},
	computed: {
		transformText () {
			x = this.surfaces[this.currentView].text.x
			y = this.surfaces[this.currentView].text.y
			return {transform: 'translate(' + x + 'px,' + y + 'px)'}
		},
		transformImg () {
			x = this.surfaces[this.currentView].img.x
			y = this.surfaces[this.currentView].img.y
			return {transform: 'translate(' + x + 'px,' + y + 'px)'}				
		}
	},
	updated: function () {
		this.$nextTick(function () {
			surface = document.querySelector('.restrictRect').getBoundingClientRect()
			interact('.moveableText').options.drag.restrict.restriction = {
				x:surface.x,
				y:surface.y,
				width:surface.width,
				height:surface.height					
			}
			interact('.moveableImg').options.drag.restrict.restriction = {
				x:surface.x,
				y:surface.y,
				width:surface.width,
				height:surface.height					
			}				
		})
	},
	methods: {
		setColor: function(color) {
			document.querySelector('#'+this.selectedColor.name).style.border = '1px solid #d4d4d4'
			document.querySelector('#'+color.name).style.border = '2px solid red'
			this.selectedColor = color
		},			
		changeView: function(ev) {
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
			console.log(document.querySelector('input[type=file]').value)
			reader.onloadend = function () {
				 target.value = reader.result
			}
			
			if (file) {
				target.filename = file.name
				reader.readAsDataURL(file); //reads the data as a URL

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
		var node = keyViewer.surfaces[keyViewer.currentView].text
	} else if (target.nodeName == "IMG") {
		var node = keyViewer.surfaces[keyViewer.currentView].img
	}

	node.x = (parseFloat(node.x) || 0) + event.dx,
	node.y = (parseFloat(node.y) || 0) + event.dy;
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;	

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
			range:30,
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