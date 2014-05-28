(function(g){"use strict";var s=g.sap;var c=g.console;s.ui.model.json.JSONModel.extend("sap.ushell.renderers.fiori2.search.SearchModel",{searchInit:function(){var a=this;if(a.searchInitialized){return}a.searchInitialized=true;a.searchRequestID=0;a.searchDataSource=new s.bc.ina.api.impl.inav2.filter.DataSource({objectName:"$$ALL$$",packageName:"ABAP",type:"Category",label:"All"});a.searchDataSource.level=0;a.searchTerm="";a.searchCategoryTree=[];a.searchTop=5;a.searchSkip=0},searchGetGenericResults:function(r){function a(d){var v={imageUrl:'',name:''};for(var p in d){if(d[p].label&&d[p].value){if(d[p].value&&jQuery.type(d[p].value)==='string'&&(d[p].value.split('.').pop()==='jpg'||d[p].value.split('.').pop()==='png')){v.imageUrl=d[p].value;v.name=p;return v}}}return v}var m=function(w,y){var l=w.length;while(l--){if(w[l].labelRaw===y.labelRaw&&y!==undefined){y.value=w[l].value;w.splice(l,1)}}};var b=[];for(var i=0;i<r.length;i++){var d=r[i];var u='';var e=d.$$RelatedActions$$;for(var f in e){if(e[f].type==="Navigation"){u=e[f].uri}}var w=d.$$WhyFound$$||[];var h=[];var j=[];var t='';for(var p in d){if(d[p].label&&d[p].value){var k=d[p].$$MetaData$$.presentationUsage||[];if(k&&k.length>0){if(d[p].$$MetaData$$.isTitle===true){m(w,d[p]);t=t+" "+d[p].value}else if(k.indexOf("Summary")>-1){h.push(p)}else if(k.indexOf("Detail")>-1){j.push(p)}}}}var n=h.concat(j);var o=1;var q={};var v=a(d);q.imageUrl=v.imageUrl;q.dataSourceName=d.$$DataSourceMetaData$$.label;q.uri=u;q.$$Name$$='';for(var z=0;z<n.length;z++){var x=n[z];if(x!==v.name){m(w,d[x]);q["attr"+o+"Name"]=d[x].label;q["attr"+o]=d[x].value;o=o+1}}q.$$Name$$=t.trim();q.numberofattributes=o;q.title=d.title;q.whyfounds=w;b.push(q)}return b},searchPrepareResultList:function(r,a){var b=this;var d={};d.type="title";d.title=s.ushell.resources.i18n.getText("searchResults")+" ("+r.getSearchResultSet().totalcount+")";var e;if(a){b.resultsForList.pop();e=b.resultsForList}else{e=[];e.push(d)}var f=r.getSearchResultSet().getElements();e=e.concat(b.searchGetGenericResults(f));if(f.length===this.searchTop){var h={};h.type="footer";e.push(h)}b.resultsForList=e;var m=b;m.setProperty("/results",{});m.setProperty("/results",e);if(window.f2p)window.f2p.add(window.f2p.m.endSearch,{st:""})},searchLoadedResultset:function(r,a){var b=this;b.searchPrepareResultList(r,a);b.searchPrepareCategoryFacet(r)},searchWithObjectName:function(a,o){var b=this;var d=null;if(o){d=new s.bc.ina.api.impl.inav2.filter.DataSource({objectName:o,packageName:"",type:""})}b.setQuery(a,d)},setDataSource:function(d){var a=this;a.searchInit();a.searchDataSource=d;a.searchSkip=0;s.ui.getCore().getEventBus().publish("searchDataSourceChange",d);a.searchFireQuery()},setSearchTerm:function(a){var b=this;b.setQuery(a,null)},setQuery:function(a,d){var b=this;b.searchInit();if(a!==null){b.searchTerm=a}if(d!==null){b.searchDataSource=d}b.searchSkip=0;b.searchFireQuery()},searchAppendNextPage:function(){var a=this;a.searchInit();a.searchSkip+=a.searchTop;a.searchFireQuery()},searchFireQuery:function(){var a=this;var b=s.ushell.Container.getService("Search").getSina();if(!b){jQuery.sap.log.info("Current Search adapter does not support Sina queries");return}var q=b.createPerspectiveQuery();q.top(a.searchTop);q.skip(a.searchSkip);q.setSearchTerms(a.searchTerm);q.dataSource(a.searchDataSource);q.filter.addFilterCondition('$$RenderingTemplatePlatform$$','=','html','','',false);q.filter.addFilterCondition('$$RenderingTemplateTechnology$$','=','Tempo','','',false);q.filter.addFilterCondition('$$RenderingTemplateVariant$$','=','','','',false);q.filter.addFilterCondition('$$RenderingTemplateType$$','=','ItemDetails','','',false);q.filter.addFilterCondition('$$RenderingTemplateType$$','=','ResultItem','','',false);a.searchRequestID=a.searchRequestID+1;var d=a.searchRequestID;q.getResultSet(function(r){if(d!==a.searchRequestID){c.log("Searchrequest deprecated");return}a.searchLoadedResultset(r,a.searchSkip!==0)})}})})(window);