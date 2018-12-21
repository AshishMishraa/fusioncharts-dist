import transpose from'ramda/es/transpose';import Line from'../components/dataset/line';import Column from'../components/dataset/column';import CandleStick from'../components/dataset/candlestick';import OHLC from'../components/dataset/ohlc';import StackGenerator from'../../../../fc-utils/src/stack-generator';import offsetDiverge from'../../../../fc-utils/src/stack-generator/offsets/diverge';import offsetNull from'../../../../fc-utils/src/stack-generator/offsets/null';import{UNDEF}from'../../../../fc-core/src/lib';const getDataset=a=>'column'===a?Column:'candlestick'===a?CandleStick:'ohlc'===a?OHLC:Line,getVisibility=a=>a?'visible':'hidden',isOHLC=a=>'ohlc'===a||'candlestick'===a,isPlotStackable=a=>'area'===a||'smooth-area'===a||'step-area'===a||'column'===a;export default(a=>{const b=a.getFromEnv('chart'),c=a.getFromEnv('legendMap'),d=a.config,e=a.getFromEnv('ordinalScale'),f=d.isContext?b.config.contextAxesX:b.config.focusAxesX,g=d.isContext?b.config.contextAxesY:b.config.focusAxesY,h=d.isContext;h&&d.plotConfigs.forEach(({plots:a})=>{a.forEach(a=>{isOHLC(a.plottype)?(a.value=a.close||[],a.plottype=a.typeinnavigator||'line'):'column'===a.plottype&&(a.plottype=a.typeinnavigator||(1<a.value.length?'area':'line'))})}),d.plotConfigs.forEach(b=>{const i=f[b.x],j=g[b.y],k=i.scale,l=j.scale;b.plots.forEach(b=>{let f,g,m=b.tableInfo,n=m.table,o=n.getData(),p=o.data,q=n.getTable(),r=i.timeFormatterFn;if(!h&&isOHLC(b.plottype)){let a=b.close||b.open||b.high||b.low;1<a.length&&(b.plottype='line',b.value=a)}if(f=b.plottype,g=getDataset(f),isOHLC(f)){const d=transpose([b.open,b.high,b.low,b.close].filter(a=>!!a));d.forEach(d=>{let h=a.attachChild(g,'dataset');q.on('resultFlushed',a=>{let b=c&&c[h.config.series].visibility;b===UNDEF&&(b=!0),h.setData({visibility:getVisibility(b),data:a.sender.getData().data},!0)}),h.configure({data:p,scaleX:k,scaleY:l,formatterFn:j.formatterFn,timeFormatterFn:r,prefix:j.formatLabelPrefix,suffix:j.formatLabelSuffix,indices:[q.indexOf(m.position)].concat(d.map(a=>q.indexOf(a))),primaryColor:!0,type:f,series:b.value}),h.addToEnv('xScale',k),h.addToEnv('yScale',l)})}else if(j.series&&isPlotStackable(f)){const h=q.indexOf(m.position),i=new StackGenerator().setValueAccessor((a,b)=>c[j.series][b.split(' - ')[0]].visibility?a[q.indexOf(b)]:0).setKeysAccessor(()=>b.value.filter(a=>0<=q.indexOf(a))).setOffset('log'===l.getType()?offsetNull:offsetDiverge);q.addColumns({name:`${b.value[0].split(' - ').slice(1).join(' - ')} - sum`,type:'number',calcFn:(a,d)=>b.value.reduce((b,e)=>c[j.series][e.split(' - ')[0]].visibility?b+a[d[e]]:b,0)});let n=i.generate(q.getData().data);q.on('resultFlushed',d=>{n=i.generate(d.sender.getData().data),n.forEach(d=>{let e=a.getChild(d.key,'dataset'),f=d.map(a=>[a.data[h],a[0],a[1],a.data[q.indexOf(`${b.value[0].split(' - ').slice(1).join(' - ')} - sum`)]]),g=e.config.series,i=c&&(j.series?c[j.series][g]:c[g]).visibility;i===UNDEF&&(i=!0),e.setData({visibility:getVisibility(i),data:f},!0)})}),n.forEach(c=>{let i=a.attachChild(g,'dataset',c.key),m=c.key.split(' - ')[0],n=c.map(a=>[a.data[h],a[0],a[1],a.data[q.indexOf(`${b.value[0].split(' - ').slice(1).join(' - ')} - sum`)]]);i.configure({data:n,scaleX:k,scaleY:l,timeFormatterFn:r,formatterFn:j.formatterFn,prefix:j.formatLabelPrefix,suffix:j.formatLabelSuffix,indices:[0,2,1,3],primaryColor:e.getRangeValue(m),type:f,series:m,enableMarkers:d.enableMarkers}),i.addToEnv('xScale',k),i.addToEnv('yScale',l)})}else b.value.forEach(b=>{let h=a.attachChild(g,'dataset'),i=b.split(' - ')[0];q.on('resultFlushed',a=>{let b=h.config.series,d=c&&(j.series?c[j.series][b]:c[b]).visibility;d===UNDEF&&(d=!0),h.setData({visibility:getVisibility(d),data:a.sender.getData().data},!0)}),h.configure({data:p,scaleX:k,scaleY:l,timeFormatterFn:r,formatterFn:j.formatterFn,prefix:j.formatLabelPrefix,suffix:j.formatLabelSuffix,indices:[q.indexOf(m.position),q.indexOf(b)],primaryColor:e.getRangeValue(i),type:f,series:i,enableMarkers:d.enableMarkers}),h.addToEnv('xScale',k),h.addToEnv('yScale',l)})})})});