import{pluckNumber,pluck,BLANKSTRING,touchEnabled}from'../lib/lib';import{convertColor}from'../lib/lib-graphics';import{ToolBarFactoryHelper}from'./toolBarFactoryHelper';import{ToolbarFactory}from'./toolbarFactory';import ComponentPool from'./componentPool';import{SymbolStore}from'./helper';import ComponentInterface from'../../core/component-interface';import{btnSpecAttr,scrollerSpecAttr,contextMenuSpecAttr}from'./default-attrs';let componentInstanceCount=0;class Toolbox extends ComponentInterface{getICount(){return this.config._iCount}getName(){return'toolbox'}getType(){return'horizontalToolbox'}configure(a){var b,c,d,e,f,g,h=this.config;h.onceInitialized||(h.onceInitialized=!1),h.ALIGNMENT_HORIZONTAL=parseInt('0',2),h.ALIGNMENT_VERTICAL=parseInt('1',2),h.POSITION_TOP=parseInt('00',2),h.POSITION_RIGHT=parseInt('01',2),h.POSITION_BOTTOM=parseInt('10',2),h.POSITION_LEFT=parseInt('11',2),this.getDefaultConfiguration=function(){return btnSpecAttr},h.onceInitialized||(h._options=a,h._chart=a.chart,h._iCount=++componentInstanceCount,h.onceInitialized=!0,h.chartId=a.chart.getFromEnv('chartInstance').id),e=h._chart,f=e.getFromEnv('dataSource').chart,btnSpecAttr.scale=pluckNumber(f.toolbarbuttonscale,1.15),btnSpecAttr.width=pluckNumber(f.toolbarbuttonwidth,touchEnabled?20:15),btnSpecAttr.height=pluckNumber(f.toolbarbuttonheight,touchEnabled?20:15),btnSpecAttr.radius=pluckNumber(f.toolbarbuttonradius,touchEnabled?4:2),btnSpecAttr.spacing=pluckNumber(f.toolbarbuttonspacing,5),btnSpecAttr.fill=convertColor(pluck(f.toolbarbuttoncolor,'ffffff')),btnSpecAttr.labelFill=convertColor(pluck(f.toolbarlabelcolor,'cccccc')),btnSpecAttr.symbolFill=convertColor(pluck(f.toolbarsymbolcolor,'ffffff')),btnSpecAttr.hoverFill=pluck(f.toolbarbuttonhovercolor),btnSpecAttr.stroke=convertColor(pluck(f.toolbarbuttonbordercolor,'bbbbbb')),btnSpecAttr.symbolStroke=convertColor(pluck(f.toolbarsymbolbordercolor,'9a9a9a')),btnSpecAttr.strokeWidth=pluckNumber(f.toolbarbuttonborderthickness,1),btnSpecAttr.symbolStrokeWidth=pluckNumber(f.toolbarsymbolborderthickness,1),g=btnSpecAttr.symbolPadding=pluckNumber(f.toolbarsymbolpadding,5),btnSpecAttr.symbolHPadding=pluckNumber(f.toolbarsymbolhpadding,g),btnSpecAttr.symbolVPadding=pluckNumber(f.toolbarsymbolvpadding,g),b=btnSpecAttr.position=pluck(f.toolbarposition,'tr').toLowerCase();b='tr'===b||'rt'===b||'top right'===b||'right top'===b?'tr':'br'===b||'rb'===b||'bottom right'===b||'right bottom'===b?'br':'tl'===b||'lt'===b||'top left'===b||'left top'===b?'tl':'bl'===b||'lb'===b||'bottom left'===b||'left bottom'===b?'bl':'tr';c=btnSpecAttr.hAlign='left'===(BLANKSTRING+f.toolbarhalign).toLowerCase()?'l':b.charAt(1),d=btnSpecAttr.vAlign='bottom'===(BLANKSTRING+f.toolbarvalign).toLowerCase()?'b':b.charAt(0),btnSpecAttr.hDirection=pluckNumber(f.toolbarhdirection,'r'===c?-1:1),btnSpecAttr.vDirection=pluckNumber(f.toolbarvdirection,'b'===d?-1:1),btnSpecAttr.vMargin=pluckNumber(f.toolbarvmargin,6),btnSpecAttr.hMargin=pluckNumber(f.toolbarhmargin,10),f.toolbary&&f.toolbarx?(btnSpecAttr.x=pluckNumber(f.toolbarx),btnSpecAttr.y=pluckNumber(f.toolbary),delete btnSpecAttr.spaceNotHardCoded):btnSpecAttr.spaceNotHardCoded=!0,scrollerSpecAttr.color=f.scrollcolor&&convertColor(f.scrollcolor),scrollerSpecAttr.padding=pluckNumber(f.scrollpadding,0),scrollerSpecAttr.height=pluckNumber(f.scrollheight,12),scrollerSpecAttr.width=pluckNumber(f.scrollwidth,12),scrollerSpecAttr.displayFlat=pluckNumber(f.flatscrollbars,0),scrollerSpecAttr.scrollBar3DLighting=pluckNumber(f.scrollbar3dlighting,1),scrollerSpecAttr.startPercent=Math.min(1,Math.max(0,parseFloat(f.scrolltoend)||0)),scrollerSpecAttr.showButtons=!!pluckNumber(f.scrollshowbuttons,1),scrollerSpecAttr.buttonPadding=pluckNumber(f.scrollbtnpadding,0),contextMenuSpecAttr.baseFontFamily=pluck(f.basefont,'Verdana,sans'),contextMenuSpecAttr.baseFontSize=pluckNumber(f.basefontsize,10),contextMenuSpecAttr.baseFontColor=pluck(f.basefontcolor,'595959')}getAPIInstances(a){var b,c=this.config,d=c._chart,e={},f=c.componentPool=new ComponentPool;switch(f.configure(d,c._iCount),ToolBarFactoryHelper.setComponentPool(f,c.chartId),ToolBarFactoryHelper.setOptions(c._options,c.chartId),b=ToolbarFactory.getAPIInstances(),a){case c.ALIGNMENT_HORIZONTAL:e.Toolbar=b.HorizontalToolbar;break;case c.ALIGNMENT_VERTICAL:}return e.ComponentGroup=b.ComponentGroup,e.Symbol=b.Symbol,e.Scroller=b.Scroller,e.SymbolWithContext=b.SymbolWithContext,e.SymbolStore=SymbolStore,e.CheckboxSymbol=b.CheckboxSymbol,e}clean(){var a=this.config;a.componentPool.hideRecursive(a._iCount)}}export default Toolbox;