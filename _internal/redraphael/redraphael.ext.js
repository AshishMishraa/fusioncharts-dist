import schedular,{priorityList}from'../schedular';import raphaelCSSApplicator from'./redraphael.css.js';import raphaelShadow from'./redraphael.shadow';import raphaelShapes from'./redraphael.shapes';import raphaelImageGrid from'./redraphael.imagegrid';import raphaelHTML from'./redraphael.html.js';import rapahelToSVG from'./redraphael.export';let OneInaframeOption={oneInAFrame:!0};export default{extension:function(a){var b=a.getDep('redraphael','plugin'),c={};b.fn._elementFromEvent=function(a){if(!a||this.removed)return null;var b=a.srcElement||a.target||(a=a.originalEvent)&&(a.srcElement||a.target)||c;return'tspan'===b.nodeName&&(b=b.parentNode),this.getById(b.raphaelid)},b.requestAnimFrame=schedular.addJob&&function(a){schedular.addJob(a,priorityList.animation,OneInaframeOption)},b.instantRequestAnimFrame=schedular.addJob&&function(a){schedular.addJob(a,priorityList.instant)},rapahelToSVG(b),raphaelCSSApplicator(b),raphaelShadow(b),raphaelShapes(b),raphaelImageGrid(b),raphaelHTML(b)},name:'redraphaelExt',type:'plugin',requiresFusionCharts:!0};