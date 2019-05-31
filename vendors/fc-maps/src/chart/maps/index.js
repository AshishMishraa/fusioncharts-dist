import MSCartesian from'../../../../fc-charts/src/chart/_internal/mscartesian';import{ComponentInterface}from'../../../../fc-core/src/component-interface';import*as defaultPaletteOption from'../../../../fc-charts/src/_internal/color-utils/chart-palette-colors';import domEvtHandler from'../../../../fc-core/src/dom-event';import{raiseWarning}from'../../../../fc-core/src/event-api';import{pluck,hasTouch,trimString,pluckNumber,getDashStyle,getMouseCoordinate,convertColor,extend2}from'../../../../fc-core/src/lib';import datasetFactory from'../../factories/maps-dataset';import canvasFactory from'../../../../fc-charts/src/factories/canvas';import createColorRangeManager from'../../../../fc-charts/src/factories/colorrange';import decideLegendCreation from'../../../../fc-charts/src/factories/legendmanager';let UNDEF,defaultPaletteOptions=extend2({foregroundcolor:'333333',foregroundalpha:'100',foregrounddarkcolor:'111111',foregrounddarkalpha:'100',foregroundlightcolor:'666666',foregroundlightalpha:'100',backgroundlightcolor:'FFFFFF',backgroundlightalpha:'100',backgroundlightangle:90,backgroundlightratio:'',backgroundcolor:'FFFFCC',backgroundalpha:'100',backgrounddarkcolor:'ffcc66',backgrounddarkalpha:'100',backgrounddarkangle:270,backgrounddarkratio:'',shadow:1},defaultPaletteOption),zeroCommaHundredStr='0,100',colorPaletteMapGlobal={basefontcolor:'foregroundcolor',bordercolor:'foregrounddarkcolor',borderalpha:'foregrounddarkalpha',bgcolor:'backgroundlightcolor',bgalpha:'backgroundlightalpha',bgangle:'backgroundlightangle',bgratio:'backgroundlightratio',canvasbordercolor:'foregrounddarkcolor',canvasborderalpha:'foregrounddarkalpha',canvasbgcolor:'backgroundlightcolor',canvasbgalpha:'backgroundlightalpha',canvasbgangle:'backgroundlightangle',canvasbgratio:'backgroundlightratio',tooltipbordercolor:'foregrounddarkcolor',tooltipborderalpha:'foregrounddarkalpha',tooltipbgcolor:'backgroundlightcolor',tooltipbgalpha:'backgroundlightalpha',tooltipfontcolor:'foregroundcolor',legendbordercolor:'foregrounddarkcolor',legendborderalpha:'foregrounddarkalpha',markerbordercolor:'foregroundlightcolor',markerborderalpha:'foregroundlightalpha',markerfillcolor:'backgrounddarkcolor',markerfillalpha:'backgrounddarkalpha',markerfillangle:'backgrounddarkangle',markerfillratio:'backgrounddarkratio',plotfillcolor:'backgroundcolor',plotfillalpha:'backgroundalpha',plotfillangle:'backgroundangle',plotfillratio:'backgroundratio',plothoverfillcolor:'backgrounddarkcolor',plothoverfillalpha:'backgrounddarkalpha',plothoverfillangle:'backgrounddarkangle',plothoverfillratio:'backgrounddarkratio',plotbordercolor:'foregroundcolor',plotborderalpha:'foregroundalpha',shadow:'shadow'},eiMethodsGlobal={getMapName:function(){let a=this,b=a.jsVars.instanceAPI,c=b.getName().toLowerCase();return c},getEntityList:function(){let a,b,c,d,e,f,g,h=this,j=h.jsVars.instanceAPI,k=j.getDatasets()||[],l=k.length,m=[];for(a=0;a<l;a++)if(c=k[a]||[],g=c.getName(),'entities'===g){b=c;break}for(a in d=b.components.data,l=d.length,d)d.hasOwnProperty(a)&&(e=d[a]||{},f=e.config||{},m.push({id:f.id,originalId:f.originalId||f.id,label:f.label,shortlabel:f.shortLabel,value:f.value,formattedValue:f.formattedValue,toolText:f.toolText}));return m},getMapAttribute:function(){let a=this;return raiseWarning(this,'12061210581','run','JavaScriptRenderer~getMapAttribute()','Use of deprecated "getMapAttribute()". Replace with "getChartAttribute()".'),a.getChartAttribute.apply(a,arguments)},exportMap:function(){let a=this;return raiseWarning(this,'12061210581','run','JavaScriptRenderer~exportMap()','Use of deprecated "exportMap()". Replace with "exportChart()".'),a.exportChart&&a.exportChart.apply(a,arguments)},addMarker:function(a){let b,c,d,e,f=this.jsVars.instanceAPI,g=f.getDatasets()||[],h=g.length;for(b=0;b<h;b++)if(c=g[b]||[],e=c.getName(),'markers'===e){d=c;break}d&&!d.addMarkerItem(a)&&raiseWarning(this,'1309264086','run','MapsRenderer~addMarker()','Failed to add marker. Check the options and try again.')},updateMarker:function(a,b){let c,d,e,f,g=this.jsVars.instanceAPI,h=g.getDatasets()||[],j=h.length;for(c=0;c<j;c++)if(d=h[c]||[],f=d.getName(),'markers'===f){e=d;break}e&&a&&(a=(a+BLANK).toLowerCase(),e.updateMarkerItem(a,b))},removeMarker:function(a){let b,c,d,e,f=this.jsVars.instanceAPI,g=f.getDatasets()||[],h=g.length;for(b=0;b<h;b++)if(c=g[b]||[],e=c.getName(),'markers'===e){d=c;break}a&&(a=(a+BLANK).toLowerCase(),d._removeMarkerItem(a))}},DASH_DEF='none',COMMASPACE=', ',BLANK='',POSITION_BOTTOM='bottom',SHAPE_CIRCLE='circle',math=window.Math,mathMin=math.min,mathMax=math.max,isWithinCanvas=function(a,b){let c=getMouseCoordinate(b.getFromEnv('chart-container'),a,b),d=c.chartX,e=c.chartY,f=b.config,g=f.canvasLeft,h=f.canvasTop,i=f.canvasLeft+f.canvasWidth,j=f.canvasHeight+f.canvasTop;return c.insideCanvas=!1,c.originalEvent=a,d>g&&d<i&&e>h&&e<j&&(c.insideCanvas=!0),c};class ColorPalette extends ComponentInterface{constructor(a,b){super(),this.subpalette='',this.key='',this.index=b;for(var c in a)this.subpalette=defaultPaletteOptions[a[c]],this[c]=this.subpalette instanceof Array?this.subpalette[b]:this.subpalette,this.key=c}}class Maps extends MSCartesian{constructor(){super(),this.friendlyName='Map',this.revision=1,this.hasCanvas=!0,this.standaloneInit=!1,this.defaultDatasetType='maps',this.defaultSeriesType='geo',this.fireGroupEvent=!0,this.legendposition='right',this.hasGradientLegend=!0,this.isMap=!0,this.defaultPaletteOptions={paletteColors:[['A6A6A6','CCCCCC','E1E1E1','F0F0F0'],['A7AA95','C4C6B7','DEDFD7','F2F2EE'],['04C2E3','66E7FD','9CEFFE','CEF8FF'],['FA9101','FEB654','FED7A0','FFEDD5'],['FF2B60','FF6C92','FFB9CB','FFE8EE']],bgColor:['FFFFFF','CFD4BE,F3F5DD','C5DADD,EDFBFE','A86402,FDC16D','FF7CA0,FFD1DD'],bgAngle:[270,270,270,270,270],bgRatio:[zeroCommaHundredStr,zeroCommaHundredStr,zeroCommaHundredStr,zeroCommaHundredStr,zeroCommaHundredStr],bgAlpha:['100','60,50','40,20','20,10','30,30'],toolTipBgColor:['FFFFFF','FFFFFF','FFFFFF','FFFFFF','FFFFFF'],toolTipBorderColor:['545454','545454','415D6F','845001','68001B'],baseFontColor:['555555','60634E','025B6A','A15E01','68001B'],tickColor:['333333','60634E','025B6A','A15E01','68001B'],trendColor:['545454','60634E','415D6F','845001','68001B'],plotFillColor:['545454','60634E','415D6F','845001','68001B'],borderColor:['767575','545454','415D6F','845001','68001B'],borderAlpha:[50,50,50,50,50]},this.colorPaletteMap=colorPaletteMapGlobal,this.eiMethods=eiMethodsGlobal,this.registerFactory('legend',decideLegendCreation,['canvas']),this.registerFactory('axis',()=>{},['canvas']),this.registerFactory('colormanager-decider',createColorRangeManager,['legend']),this.registerFactory('dataset',datasetFactory,['colormanager-decider']),this.registerFactory('canvas',canvasFactory)}_checkInvalidSpecificData(){return this.config.invalid=!1,!1}__setDefaultConfig(){super.__setDefaultConfig();var a=this.config;a.baseWidth||(a.baseWidth=400),a.baseHeight||(a.baseHeight=300),a.baseScaleFactor||(a.baseScaleFactor=1)}static getName(){return'maps'}static getType(){return'chartAPI'}getName(){return this.config.name||'GEO'}getType(){return'chartAPI'}configureAttributes(a){let b,c=this,d=c.getChildren('colorPalette')&&c.getChildren('colorPalette')[0];b=a.chart=a.chart||a.graph||a.map||{},c.jsonData=a,d||(d=new ColorPalette(this.colorPaletteMap,(0<b.palette&&6>b.palette?b.palette:pluckNumber(c.paletteIndex,1))-1),c.attachChild(d,'colorPalette')),c.config.skipCanvasDrawing=!0,super.configureAttributes(a),c._parseBackgroundCosmetics()}parseChartAttr(a){let b,c,d,e,f,g=this,h=g.jsonData,i=h.chart||h.map,j=h.markers,k=new ColorPalette(this.colorPaletteMap,(0<i.palette&&6>i.palette?i.palette:pluckNumber(g.paletteIndex,1))-1),l=pluck(i.entitybordercolor,i.bordercolor,k.plotbordercolor),m=pluck(i.entityfillcolor,i.fillcolor,k.plotfillcolor),n=pluck(i.entityfillalpha,i.fillalpha,k.plotfillalpha),o=pluck(i.entityfillratio,i.fillratio,k.plotfillratio),p=pluck(i.entityfillangle,i.fillangle,k.plotfillangle),q=pluck(i.nullentityfillcolor,i.nullentitycolor,m),r=pluckNumber(i.usevaluesformarkers,h.markers&&h.markers.items&&h.markers.items.length,!(h.markers&&h.markers.application&&h.markers.application.length&&h.markers.definition&&h.markers.definition.length));super.parseChartAttr(a),b=g.config,b.origMarginTop=pluckNumber(i.charttopmargin,i.maptopmargin,11),b.origMarginLeft=pluckNumber(i.chartleftmargin,i.mapleftmargin,11),b.origMarginBottom=pluckNumber(i.chartbottommargin,i.mapbottommargin,11),b.origMarginRight=pluckNumber(i.chartrightmargin,i.maprightmargin,11),b.labelsOnTop=pluckNumber(i.entitylabelsontop,1),f=b.style,c=f.inCancolor,d=f.inCanfontFamily,e=f.inCanfontSize,b.entityOpts={baseScaleFactor:b.baseScaleFactor,dataLabels:{style:{fontFamily:d,fontSize:e,lineHeight:f.inCanLineHeight,color:f.inCancolor}},fillColor:m,fillAlpha:n,fillRatio:o,fillAngle:p,borderColor:l,borderAlpha:pluck(i.entityborderalpha,i.borderalpha,g.borderAlpha,'100'),borderThickness:pluckNumber(i.showentityborder,i.showborder,1)?pluckNumber(i.entityborderthickness,i.borderthickness,1):0,scaleBorder:pluckNumber(i.scaleentityborder,i.scaleborder,0),hoverFillColor:pluck(i.entityfillhovercolor,i.hoverfillcolor,i.hovercolor,k.plothoverfillcolor),hoverFillAlpha:pluck(i.entityfillhoveralpha,i.hoverfillalpha,i.hoveralpha,k.plothoverfillalpha),hoverFillRatio:pluck(i.entityfillhoverratio,i.hoverfillratio,i.hoverratio,k.plothoverfillratio),hoverFillAngle:pluck(i.entityfillhoverangle,i.hoverfillangle,i.hoverangle,k.plothoverfillangle),hoverBorderThickness:pluck(i.entityborderhoverthickness,i.hoverborderthickness),hoverBorderColor:pluck(i.entityborderhovercolor,l,k.plotbordercolor),hoverBorderAlpha:pluck(i.entityborderhoveralpha,k.plotborderalpha),nullEntityColor:q,nullEntityAlpha:pluck(i.nullentityfillalpha,i.nullentityalpha,n),nullEntityRatio:pluck(i.nullentityfillratio,i.nullentityratio,o),nullEntityAngle:pluck(i.nullentityfillangle,i.nullentityangle,p),connectorColor:pluck(i.labelconnectorcolor,i.connectorcolor,c),connectorAlpha:pluck(i.labelconnectoralpha,i.connectoralpha,'100'),connectorThickness:pluckNumber(i.labelconnectorthickness,i.borderthickness,1),showHoverEffect:pluckNumber(i.showentityhovereffect,i.usehovercolor,i.showhovereffect,1),hoverOnNull:pluckNumber(i.hoveronnull,i.entityhoveronnull,1),labelPadding:pluckNumber(i.labelpadding,5),showLabels:pluckNumber(i.showlabels,1),labelsOnTop:pluckNumber(i.entitylabelsontop,1),includeNameInLabels:pluckNumber(i.includenameinlabels,1),includeValueInLabels:pluckNumber(i.includevalueinlabels,0),useSNameInTooltip:pluckNumber(i.usesnameintooltip,0),useShortName:pluckNumber(i.usesnameinlabels,1),labelSepChar:pluck(i.labelsepchar,COMMASPACE),showTooltip:pluckNumber(i.showentitytooltip,i.showtooltip,1),tooltipSepChar:pluck(i.tooltipsepchar,', '),tooltext:i.entitytooltext,hideNullEntities:pluckNumber(i.hidenullentities,0),showHiddenEntityBorder:pluckNumber(i.showhiddenentityborder,1),showNullEntityBorder:pluckNumber(i.shownullentityborder,1),hiddenEntityColor:pluck(i.hiddenentitycolor,i.hiddenentityfillcolor,i.hiddenentityalpha||i.hiddenentityfillalpha?q:'ffffff'),hiddenEntityAlpha:pluck(i.hiddenentityalpha,i.hiddenentityfillalpha,.001),shadow:pluckNumber(i.showshadow,g.defaultPlotShadow,k.shadow)},b.markerOpts={dataLabels:{style:{fontFamily:pluck(i.markerfont,d),fontSize:pluckNumber(i.markerfontsize,parseInt(e,10)),fontColor:pluck(i.markerfontcolor,c)}},showTooltip:pluckNumber(i.showmarkertooltip,i.showtooltip,1),showLabels:pluckNumber(i.showmarkerlabels,i.showlabels,1),showHoverEffect:pluckNumber(i.showmarkerhovereffect,1),labelPadding:pluck(i.markerlabelpadding,'5'),labelWrapWidth:pluckNumber(i.markerlabelwrapwidth,0),labelWrapHeight:pluckNumber(i.markerlabelwrapheight,0),fillColor:pluck(i.markerfillcolor,i.markerbgcolor,k.markerfillcolor),fillAlpha:pluck(i.markerfillalpha,k.markerfillalpha),fillAngle:pluck(i.markerfillangle,k.markerfillangle),fillRatio:pluck(i.markerfillratio,k.markerfillratio),fillPattern:pluck(i.markerfillpattern,k.markerbgpattern),hoverFillColor:i.markerfillhovercolor,hoverFillAlpha:i.markerfillhoveralpha,hoverFillRatio:i.markerfillhoverratio,hoverFillAngle:i.markerfillhoverangle,borderThickness:pluck(i.markerborderthickness,1),borderColor:pluck(i.markerbordercolor,k.markerbordercolor),borderAlpha:pluckNumber(i.markerborderalpha,k.markerborderalpha),hoverBorderThickness:i.markerborderhoverthickness,hoverBorderColor:i.markerborderhovercolor,hoverBorderAlpha:i.markerborderhoveralpha,radius:pluckNumber(i.markerradius&&trimString(i.markerradius),7),shapeId:pluck(i.defaultmarkershape,SHAPE_CIRCLE),labelSepChar:pluck(i.labelsepchar,COMMASPACE),tooltipSepChar:pluck(i.tooltipsepchar,', '),autoScale:pluckNumber(i.autoscalemarkers,0),tooltext:pluck(j&&j.tooltext,i.markertooltext),dataEnabled:r,valueToRadius:pluckNumber(i.markerradiusfromvalue,1),valueMarkerAlpha:pluck(i.valuemarkeralpha,'75'),hideNull:pluckNumber(i.hidenullmarkers,0),nullRadius:pluckNumber(i.nullmarkerradius,i.markerradius,7),adjustViewPort:pluckNumber(i.adjustviewportformarkers,0),startAngle:pluckNumber(i.markerstartangle,90),maxRadius:pluckNumber(i.maxmarkerradius,0),minRadius:pluckNumber(i.minmarkerradius,0),applyAll:pluckNumber(i.applyallmarkers,0),shadow:pluckNumber(i.showmarkershadow,i.showshadow,0)},b.connectorOpts={showHoverEffect:pluckNumber(i.showconnectorhovereffect,1),thickness:pluckNumber(i.connectorthickness,i.markerconnthickness,'2'),color:pluck(i.connectorcolor,i.markerconncolor,k.markerbordercolor),alpha:pluck(i.connectoralpha,i.markerconnalpha,'100'),hoverThickness:pluckNumber(i.connectorhoverthickness,i.connectorthickness,i.markerconnthickness,'2'),hoverColor:pluck(i.connectorhovercolor,i.connectorcolor,i.markerconncolor,k.markerbordercolor),hoverAlpha:pluck(i.connectorhoveralpha,i.connectoralpha,i.markerconnalpha,'100'),dashed:pluckNumber(i.connectordashed,i.markerconndashed,0),dashLen:pluckNumber(i.connectordashlen,i.markerconndashlen,3),dashGap:pluckNumber(i.connectordashgap,i.markerconndashgap,2),font:pluck(i.connectorfont,i.markerconnfont,d),fontColor:pluck(i.connectorfontcolor,i.markerconnfontcolor,c),fontSize:pluckNumber(i.connectorfontsize,i.markerconnfontsize,parseInt(e,10)),showLabels:pluckNumber(i.showconnectorlabels,i.showmarkerlabels,i.showlabels,1),labelBgColor:pluck(i.connectorlabelbgcolor,i.markerconnlabelbgcolor,k.plotfillcolor),labelBorderColor:pluck(i.connectorlabelbordercolor,i.markerconnlabelbordercolor,k.markerbordercolor),shadow:pluckNumber(i.showconnectorshadow,i.showmarkershadow,i.showshadow,0),showTooltip:pluckNumber(i.showconnectortooltip,i.showmarkertooltip,i.showtooltip,1),tooltext:pluck(j&&j.connectortooltext,i.connectortooltext),hideOpen:pluckNumber(i.hideopenconnectors,1)},b.adjustViewPortForMarkers=pluckNumber(i.adjustviewportformarkers,r)}_attachMouseEvents(){let a=this,b=a.getFromEnv('eventListeners'),c=a.getFromEnv('chart-container');b.push(domEvtHandler.listen(c,hasTouch?'touchstart':'click',Maps.searchMouseMove,a)),b.push(domEvtHandler.listen(window.document,hasTouch?'touchstart':'mousemove',Maps.searchMouseMove,a))}_dispose(){let a=this,b=a.getFromEnv('chart-container');hasTouch&&(domEvtHandler.unlisten(b,'touchstart',Maps.searchMouseMove),domEvtHandler.unlisten(window.document,'touchstart',Maps.searchMouseMove)),domEvtHandler.unlisten(b,'click',Maps.searchMouseMove),domEvtHandler.unlisten(window.document,'mousemove',Maps.searchMouseMove),super._dispose()}static searchMouseMove(a){let b,c=a.data,d=c.config,e=c.getDatasets(),f=e[1],g=f&&f.getFromEnv('toolTipController'),h=f&&f.config.currentToolTip,i=c.config.lastHoveredPoint,j={};c.getFromEnv('chart-container')&&c.config.lastInteractionEvent!==a.originalEvent&&(c.config.lastInteractionEvent=a.originalEvent,(b=isWithinCanvas(a,c))&&b.insideCanvas?(d.lastMouseEvent=a,j={x:b.chartX,y:b.chartY},c._searchNearestNeighbour(j,a)):(i&&f&&f.hoverOutFn(i.element),c.config.lastHoveredPoint=null,g&&g.hide(h)))}_searchNearestNeighbour(a,b){let c,d=this,e=d.getDatasets(),f=e[1];if(f){if(!f.components.kDTree)return;c=f.getElement(a),c?f.highlightPoint(c,b):f.highlightPoint(!1,b)}}_createLayers(){super._createLayers(),this._attachMouseEvents()}_parseBackgroundCosmetics(){let a,b=this,c=b.getChildren('background')[0],d=c.config,e=b.getChildren('colorPalette')[0],f=b.getFromEnv('chart-attrib');a=d.showBorder=pluckNumber(f.showcanvasborder,1),d.borderWidth=a?pluckNumber(f.canvasborderthickness,1):0,d.borderRadius=d.borderRadius=pluckNumber(f.canvasborderradius,0),d.borderDashStyle=d.borderDashStyle=pluckNumber(f.borderdashed,0)?getDashStyle(pluckNumber(f.borderdashlen,4),pluckNumber(f.borderdashgap,2)):DASH_DEF,d.borderAlpha=pluck(f.canvasborderalpha,e.borderAlpha),d.borderColor=d.borderColor=convertColor(pluck(f.canvasbordercolor,e&&e.borderColor),d.borderAlpha)}_getBackgroundCosmetics(){let a=this,b=a.getFromEnv('chart-attrib')||a.jsonData.map,c=a.getChildren('colorPalette')[0];return{FCcolor:{color:pluck(b.bgcolor,b.canvasbgcolor,c.bgcolor),alpha:pluck(b.bgalpha,b.canvasbgalpha,c.bgalpha),angle:pluck(b.bgangle,b.canvasbgangle,c.bgangle),ratio:pluck(b.bgratio,b.canvasbgratio,c.bgratio)}}}_parseCanvasCosmetics(){super._parseCanvasCosmetics();let a=this,b=a.config,c=a.getFromEnv('chart-attrib')||a.jsonData.map,d=a.getChildren('canvas')[0].config;b.origMarginTop=pluckNumber(c.maptopmargin,11),b.origMarginLeft=pluckNumber(c.mapleftmargin,11),b.origMarginBottom=pluckNumber(c.mapbottommargin,11),b.origMarginRight=pluckNumber(c.maprightmargin,11),b.origCanvasLeftMargin=pluckNumber(c.canvasleftmargin,0),b.origCanvasRightMargin=pluckNumber(c.canvasrightmargin,0),b.origCanvasTopMargin=pluckNumber(c.canvastopmargin,0),b.origCanvasBottomMargin=pluckNumber(c.canvasbottommargin,0),d.canvasBorderRadius=pluckNumber(c.canvasborderradius,0),d.origCanvasTopPad=pluckNumber(c.canvastoppadding,0),d.origCanvasBottomPad=pluckNumber(c.canvasbottompadding,0),d.origCanvasLeftPad=pluckNumber(c.canvasleftpadding,0),d.origCanvasRightPad=pluckNumber(c.canvasrightpadding,0)}preliminaryScaling(){let a,b,c,d=this,e=d.jsonData,f=e.markers&&e.markers.items||[],g=f&&f.length||0,h=1/0,j=1/0,k=-Infinity,l=-Infinity;for(;g--;)c=f[g],a=+c.x,b=+c.y,h=mathMin(h,a),j=mathMin(j,b),k=mathMax(k,a),l=mathMax(l,b);return{x:h,y:j,x1:k,y1:l}}getScalingParameters(a,b,c,d){let e,f,g=this,h=a/b,i=c/(a*g.config.baseScaleFactor),j=d/(b*g.config.baseScaleFactor),k=0,l=0;return i>j?(e=j,k+=(c-d*h)/2,f=200/(b*e)):(e=i,l+=(d-c/h)/2,f=200/(a*e)),{scaleFactor:e,strokeWidth:f,translateX:k,translateY:l}}calculateMarkerBounds(a,b,c){let d,e,f,g,h,j,k,l,m,n,o,p,q,s,t=this,u=t.config,v=u.markerOpts,w=t.getDatasets(),z=t.getDataLimits(),A=z.dataMin,B=z.dataMax,C=v.hideNull,D=v.nullRadius,E=v.valueToRadius,F=1/0,G=1/0,H=-Infinity,I=-Infinity;for(j=0,m=w.length;j<m;j++)l=w[j],k=l.getName(),'markers'===k&&(d=l);if(d)for(j in d.calculateMarkerRadiusLimits(),e=d.config||{},f=e.minRadius,g=e.maxRadius,h=d.components&&d.components.markerObjs||{},h){if(s=h[j],u=s.config,q=u.definition||{},null!==u.cleanValue)E&&q.radius===UNDEF&&(u.radius=f+(g-f)*(u.cleanValue-A)/(B-A));else{C?u.__hideMarker=!0:null===u.radius&&(u.radius=D);continue}p=+u.radius,n=(+q.x+b)*a,o=(+q.y+c)*a,F=mathMin(F,n-p),G=mathMin(G,o-p),H=mathMax(H,n+p),I=mathMax(I,o+p)}return{x:F,y:G,x1:H,y1:I}}_spaceManager(){let a,b,c,d,e,f,g,h,i,j=this,k=j.config,l=j.getChildren('legend')&&j.getChildren('legend')[0],m=l&&l.config.legendPos,n=j.getFromEnv('chart-attrib'),o=k.showBorder,p=k.origMarginLeft,q=k.origMarginTop,r=j.config.baseWidth,s=j.config.baseHeight,t={},u=0,v=0,w=k.markerOpts,x=k.borderWidth=o?pluckNumber(n.borderthickness,1):0;j._allocateSpace({top:x,bottom:x,left:x,right:x}),j._allocateSpace(j._manageActionBarSpace&&j._manageActionBarSpace(.225*k.availableHeight)||{}),h='right'===m?.3*k.canvasWidth:.3*k.canvasHeight,k.showLegend&&j._manageLegendSpace(h),a=m===POSITION_BOTTOM?.225*k.canvasHeight:.225*k.canvasWidth,i=j._manageChartMenuBar(a),c=k.canvasWidth,d=k.canvasHeight,w.dataEnabled?(k.adjustViewPortForMarkers?(t=j.preliminaryScaling(),t.x1>r&&(r=t.x1),0>t.x&&(r+=-t.x,u=-t.x),t.y1>s&&(s=t.y1),0>t.y&&(s+=-t.y,v=-t.y),b=j.getScalingParameters(r,s,c,d),t=j.calculateMarkerBounds(b.scaleFactor*j.config.baseScaleFactor,u,v),f=d,g=c,0>t.x&&(p+=-t.x,c+=t.x),0>t.y&&(q+=-t.y,d+=t.y),t.x1>g&&(c-=t.x1-g),t.y1>f&&(d-=t.y1-f)):(b=j.getScalingParameters(r,s,c,d),j.calculateMarkerBounds(b.scaleFactor*j.config.baseScaleFactor,u,v)),b=j.getScalingParameters(r,s,c,d),p+=u*b.scaleFactor*j.config.baseScaleFactor,q+=v*b.scaleFactor*j.config.baseScaleFactor):b=j.getScalingParameters(r,s,c,d),j.config.scalingParams=b,e=b.scaleFactor,b.translateX+=p,b.translateY=b.translateY+q+i.top||0,b.sFactor=100*(e*j.config.baseScaleFactor)/100,b.transformStr=['t',b.translateX,',',b.translateY,'s',e,',',e,',0,0'].join(''),j.config.annotationConfig={id:'Geo',showbelow:0,autoscale:0,grpxshift:b.translateX?b.translateX:0,grpyshift:b.translateY?b.translateY:0,xscale:100*(e?e*j.config.baseScaleFactor:1),yscale:100*(e?e*j.config.baseScaleFactor:1),scaletext:1,options:{useTracker:!0}}}getDataLimits(){let a,b,c,d=this,e=d.getDatasets(),f=e.length,g=+Infinity,h=-Infinity;for(c=0;c<f;c++)a=e[c],b=a.getDataLimits(),g=mathMin(g,b.min),h=mathMax(h,b.max);return{dataMin:g,dataMax:h}}getEntityPaths(a){let b,c={},d=this.config.entities;if(a){for(b in d)c[b]=d[b];return c}return d}checkComplete(){let a=this;a.config.entityFlag&&a.config.entitiesReady&&(a.config.entityFlag=!1,a.config.markersDrawn=!0,a.fireChartInstanceEvent('internal.mapdrawingcomplete',{renderer:a}))}}export default Maps;