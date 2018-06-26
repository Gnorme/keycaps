var snapTargets = [{}]
interact('.resize-drag')
	.draggable({
		onmove: window.dragMoveListener,
		snap: {
			targets: snapTargets,
			range:30,
		    relativePoints: [
		      //{ x: 0  , y: 0   }  // snap relative to the element's top-left,
		      { x: 0.5, y: 0.5 }   // to the center
		      // { x: 1  , y: 1   }    // and to the bottom-right
		    ]			
		},
		restrict: {
			restriction: {
				x:20,
				y:20,
				width:150,
				height:150
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
					x:20,
					y:20,
					width:150,
					height:150
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
		target.style.width = newWidth + 'px'
		snapTargets = [
			{x:32+(newWidth / 2), y:28 + (newWidth / 2)},
			{x:70 + 32,y:28 + (newWidth / 2)},
			{x:178 - (newWidth / 2),y:28 + (newWidth / 2)},
			{x:32+(newWidth / 2), y:98},
			{x:70 + 32,y:98},
			{x:178 - (newWidth / 2),y:98},
			{x:32+(newWidth / 2), y:150 + 28 - (newWidth / 2) },
			{x:70 + 32,y:150 + 28 -(newWidth / 2)},
			{x:178 - (newWidth / 2),y:150 + 28 - (newWidth / 2)},			
		]
		interact('.resize-drag').options.drag.snap.targets = snapTargets		
		//placeImage()
	});	
function dragMoveListener (event) {
	var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	// translate the element
	target.style.webkitTransform =
	target.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
function shadeBlend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
}
function changeColor(el) {
	var top = document.getElementById("top")
	var bottom = document.getElementById("bottom")
	var front = document.getElementById("front")
	var color = el.style.backgroundColor
	console.log(color)
	top.style.fill = color
	front.style.fill = color
	bottom.style.fill = shadeBlend(-0.2,color)
}


