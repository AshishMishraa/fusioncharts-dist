var lib={init:function(a){var b=a.document,c=a.navigator,d=c.userAgent,e=Math.ceil,f=Math.floor;return lib={win:a,containerClass:'fusioncharts-smartlabel-container',classNameWithTag:'fusioncharts-smartlabel-tag',classNameWithTagBR:'fusioncharts-smartlabel-br',maxDefaultCacheLimit:1e3,classNameReg:/\bfusioncharts-smartlabel-tag\b/,classNameBrReg:/\bfusioncharts-smartlabel-br\b/,spanAdditionRegx:/(<[^<\>]+?\>)|(&(?:[a-z]+|#[0-9]+);|.)/ig,spanAdditionReplacer:'$1<span class="fusioncharts-smartlabel-tag">$2</span>',spanRemovalRegx:/\<span[^\>]+?fusioncharts-smartlabel-tag[^\>]{0,}\>(.*?)\<\/span\>/ig,xmlTagRegEx:/<[^>][^<]*[^>]+>/i,brRegex:/({br[ ]*})|(<br[ ]*>)|(<br[ ]*\/>)|(<BR[ ]*\/>)|(<br\>)/g,ltgtRegex:/&lt;|&gt;/g,htmlSpecialEntityRegex:/&amp;|&quot;|&lt;|&gt;/g,brReplaceRegex:/<br\/>/ig,testStrAvg:'WgI',parentContainerStyle:{position:'absolute',top:'-9999em',whiteSpace:'nowrap',padding:'0px',width:'1px',height:'1px',overflow:'hidden'},supportedStyle:{font:'font',fontFamily:'font-family',"font-family":'font-family',fontWeight:'font-weight',"font-weight":'font-weight',fontSize:'font-size',"font-size":'font-size',lineHeight:'line-height',"line-height":'line-height',fontStyle:'font-style',"font-style":'font-style'},getDocumentSupport:function(){var c,e,f;return b.getElementsByClassName?(c='getElementsByClassName',e='fusioncharts-smartlabel-tag',f=!0):(c='getElementsByTagName',e='span',f=!1),{isIE:/msie/i.test(d)&&!a.opera,hasSVG:!!(a.SVGAngle||b.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure','1.1')),isHeadLess:/ HtmlUnit/.test(d),isWebKit:/ AppleWebKit\//.test(d),childRetriverFn:c,childRetriverString:e,noClassTesting:f}},createContainer:function(a){var c,d;if(a&&(a.offsetWidth||a.offsetHeight)){if(a.appendChild)return a.appendChild(d=b.createElement('DIV')),d.className='fusioncharts-smartlabel-container',d.setAttribute('aria-hidden','true'),d.setAttribute('role','presentation'),d;}else if(c=b.getElementsByTagName('body')[0],c&&c.appendChild)return d=b.createElement('DIV'),d.className='fusioncharts-smartlabel-container',d.setAttribute('aria-hidden','true'),d.setAttribute('role','presentation'),c.appendChild(d),d},getNearestBreakIndex:function(a,b,c){if(!a||!a.length)return 0;var d,g=c._getWidthFn(),h=0,i=0,j=g(a),k=j/a.length;if(d=b,h=e(b/k),j<b)return a.length-1;for(h>a.length&&(d=b-j,h=a.length);0<d;)if(d=b-g(a.substr(0,h)),i=f(d/k),i)h+=i;else return h;for(;0>d;)if(d=b-g(a.substr(0,h)),i=f(d/k),i)h+=i;else return h;return h},setLineHeight:function(a){var b=a.fontSize=a.fontSize||a['font-size']||'12px';return a.lineHeight=a.lineHeight||a['line-height']||1.2*parseInt(b,10)+'px',a},_getCleanHeight:function(a){return a=a.replace(/px/g,''),+a},_getDimentionUsingDiv:function(a='',b){var c=b._container;return a instanceof Array&&(a=a.join('')),c.innerHTML=a,{width:c.offsetWidth,height:c.offsetHeight}},_getDimentionUsingCanvas:function(a='',b){var c=b.ctx,d=b.style,e=lib._getCleanHeight(d.lineHeight);return a instanceof Array?(a=a.join(''),a=a.replace(/<br \/>/g,'')):a=a.replace(/<br \/>/g,''),{width:c.measureText(a).width,height:e}},_hasOnlyBRTag:function(a=''){var b,c=a.replace(lib.brRegex,'<br />'),d=c.split('<br />'),e=d.length;for(b=0;b<e;b++)if(lib.xmlTagRegEx.test(d[b]))return!1;return 1<e},_getDimentionOfMultiLineText:function(a='',b){var c,d,e,f=Math.max,g=a.replace(lib.brRegex,'<br />'),h=lib._getTextArray(g),j=0,k=0,l=b._getWidthFn(),m=lib._getCleanHeight(b.style.lineHeight),n=m,o={};for(c=0,d=h.length;c<d;c++)'<br />'===h[c]?(k=f(k,j),j=0,n+=m):(e=l(h[c]),j+=e,o[h[c]]=e);return k=f(k,j),{height:n,width:k,detailObj:o}},_getTextArray:function(a=''){var b,c,d,e,f,g,h=[];for(f=a.split('<br />'),d=f.length,b=0;b<d;b++){for(g=f[b].split(''),e=g.length,c=0;c<e;c++)h.push(g[c]);b!==d-1&&h.push('<br />')}return h},_findLastIndex:function(a=[],b){var c,d=a.length;for(c=d-1;0<=c;c--)if(a[c]===b)return c;return-1}},lib}};export default lib;