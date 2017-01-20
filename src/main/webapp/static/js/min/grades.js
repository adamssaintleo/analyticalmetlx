var Grades=function(){var f={},v={},n={},y={},B={},C={},D={},k=[],l=function(){},c=function(b,c){$(b).prop("disabled",c);$(".grades.blocker").toggle(c)},z=function(){v={};n={};l()},m=function(b,c){try{if("type"in b){switch(b.type){case "grade":var w=v[b.id];if(void 0==w||w.timestamp<b.timestamp)v[b.id]=b,!c&&w&&"visible"in w&&0==w.visible&&"visible"in b&&1==b.visible&&getHistory(Conversations.getCurrentSlideJid());break;case "numericGradeValue":case "booleanGradeValue":case "textGradeValue":var f=
n[b.gradeId]||{};n[b.gradeId]=f;var k=f[b.gradedUser];if(!k||k.timestamp<b.timestamp)f[b.gradedUser]=b,Progress.call("gradeValueReceived",[b])}c||l()}}catch(h){console.log("Grades.stanzaReceived",h)}};Progress.onConversationJoin.Grades=z;Progress.historyReceived.Grades=function(c){try{"type"in c&&"history"==c.type&&(z(),_.forEach(c.grades,function(c){m(c,!0)}),_.forEach(c.gradeValues,function(c){m(c,!0)}),l())}catch(f){console.log("Grades.historyReceivedFunction",f)}};Progress.stanzaReceived.Grades=
m;$(function(){$.getJSON("/getExternalGradebooks",function(c){k=c});console.log("Conv state:",Conversations.getCurrentConversationJid(),Conversations.shouldModifyConversation(),Conversations.getCurrentConversation());var b=function(){f=$("#gradesDatagrid");B=f.find(".gradeActionsContainer").clone();C=f.find(".gradeEditContainer").clone();D=f.find(".gradeAssessContainer").clone();f.empty();y=$("#createGradeButton");var b=function(c){jsGrid.Field.call(this,c)};b.prototype=new jsGrid.Field({sorter:function(c,
e){return new Date(c)-new Date(e)},itemTemplate:function(c){return(new Date(c)).toLocaleString()},insertTemplate:function(c){return""},editTemplate:function(c){return""},insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=b;var b=[{name:"name",type:"text",title:"Name",readOnly:!0,sorting:!0},{name:"description",type:"text",title:"Description",readOnly:!0,sorting:!0},{name:"location",type:"text",title:"Location",readOnly:!0,sorting:!0},{name:"timestamp",type:"dateField",
title:"When",readOnly:!0,itemTemplate:function(c){return 0==c?"":moment(c).format("MMM Do YYYY, h:mm a")}}],m=[{name:"gradeType",type:"text",title:"Type",readOnly:!0,sorting:!0},{name:"identity",type:"text",title:"Actions",readOnly:!0,sorting:!1,itemTemplate:function(b,e){if(e.author==UserSettings.getUsername()){var f=B.clone(),a=_.cloneDeep(e),p=function(){var e=_.uniqueId(),b=$("<div/>",{id:e}),f=$.jAlert({title:"Edit grade",width:"50%",content:b[0].outerHTML}),g=C.clone(),b=sprintf("gradeName_%s",
e),h=g.find(".gradeNameInputBox");h.attr("id",b).on("blur",function(d){a.name=h.val()}).val(a.name);g.find(".gradeNameLabel").attr("for",b);var b=sprintf("gradeDesc_%s",e),n=g.find(".gradeDescriptionInputBox");n.attr("id",b).on("blur",function(d){a.description=n.val()}).val(a.description);g.find(".gradeDescriptionLabel").attr("for",b);var b=sprintf("gradeType_%s",e),m=g.find(".gradeTypeSelect"),r=g.find(".numericMinTextbox"),t=g.find(".numericMaxTextbox"),q=sprintf("numericMin_%s",e),E=sprintf("numericMax_%s",
e);g.find(".numericMinLabel").attr("for",q);g.find(".numericMaxLabel").attr("for",E);r.on("blur",function(d){"numeric"==a.gradeType?a.numericMinimum=parseFloat(t.val()):delete a.numericMinimum}).attr("id",q);t.on("blur",function(d){"numeric"==a.gradeType?a.numericMaximum=parseFloat(t.val()):delete a.numericMaximum}).attr("id",E);var l=function(){switch(a.gradeType){case "numeric":g.find(".numericOptions").show();void 0===a.numericMinimum&&(a.numericMinimum=0);void 0===a.numericMaximum&&(a.numericMaximum=
100);r.val(a.numericMinimum);t.val(a.numericMaximum);break;default:g.find(".numericOptions").hide()}};m.attr("id",b).on("change",function(){a.gradeType=m.val();l()}).val(a.gradeType);l();g.find(".gradeTypeLabel").attr("for",b);b=sprintf("gradeVisible_%s",e);g.find(".gradeVisibleLabel").attr("for",b);var F=g.find(".gradeVisibleCheckbox");F.attr("id",b).prop("checked",a.visible).on("change",function(d){a.visible=F.prop("checked")});var G=void 0,u=void 0,A=void 0,x=function(){var d=g.find(".associateController");
c(d,!1);if("foreignRelationship"in a){d.find(".createAssociation").hide();var b=a.foreignRelationship.sys,e=a.foreignRelationship.key.split("_"),t=e[0],q=e[1];d.find(".associationSystem").text(b);d.find(".associationOrgUnit").text(t);d.find(".associationGradeId").text(q);d.find(".requestRefreshAssociation").unbind("click").on("click",function(){c(d,!0);$.getJSON(sprintf("/getExternalGrade/%s/%s/%s",b,t,q),function(d){a.description=d.description;a.name=d.name;a.gradeType=d.gradeType;a.numericMinimum=
d.numericMinimum;a.numericMaximum=d.numericMaximum;f.closeAlert();p();c(this,!1)}).fail(function(b,a,e){c(d,!1);console.log(a,e);alert(sprintf("Error: %s \r\n %s",a,e))})});d.find(".refreshAssociation").show()}else d.find(".refreshAssociation").hide(),d.find(".createAssociation").show(),d.find(".associationPhase").hide(),void 0===G?(d.find(".requestAssocPhase1").show(),d.find(".requestAssociation").unbind("click").on("click",function(){G=!0;1==k.length&&(u=k[0].id);x()})):void 0==u?(u=k[0].id,d.find(".chooseGradebook").html(_.map(k,
function(d){return $("<option/>",{value:d.id,text:d.name})})).unbind("change").on("change",function(d){u=$(this).val()}),d.find(".commitGradebook").unbind("click").on("click",function(){c(this,!0);x()}),d.find(".requestAssocPhase2").show()):void 0===A?(c(d,!0),$.getJSON(sprintf("/getExternalGradebookOrgUnits/%s",u),function(b){console.log("requestedOrgUnits:",b);b&&b.length?(A=b[0].foreignRelationship.key,d.find(".chooseOrgUnit").html(_.map(b,function(d){return $("<option/>",{value:d.foreignRelationship.key,
text:d.name})})).unbind("change").on("change",function(d){A=$(this).val()}),d.find(".commitOrgUnit").unbind("click").on("click",function(){x()}),d.find(".requestAssocPhase3").show()):(console.log("found no data:",b),d.text("No gradebooks found"));c(d,!1)}).fail(function(b,a,e){c(d,!1);console(sprintf("error: %s \r\n %s",a,e));alert(sprintf("error: %s \r\n %s",a,e))})):(d.find(".requestAssocPhase4").show(),d.find(".createGrade").unbind("click").on("click",function(){c(d,!0);$.ajax({type:"POST",url:sprintf("/createExternalGrade/%s/%s",
u,A),data:JSON.stringify(a),success:function(d){console.log("createdGrades:",a,d);a.foreignRelationship={sys:d.foreignRelationship.sys,key:d.foreignRelationship.key};sendStanza(a);x();c(this,!1)},contentType:"application/json",dataType:"json"}).fail(function(b,a,e){c(d,!1);alert("Could not create remote grade.  Please ensure that the grade has a non-blank name which will be unique within the remote system")})}))};x();g.find(".cancelGradeEdit").on("click",function(){f.closeAlert()});g.find(".submitGradeEdit").on("click",
function(){sendStanza(a);f.closeAlert()});$("#"+e).append(g)};f.find(".editGradeButton").on("click",p);f.find(".assessGradeButton").on("click",function(){var b=_.uniqueId(),a=$("<div/>",{id:b});$.jAlert({title:"Assess grade",width:"auto",content:a[0].outerHTML,onClose:function(){l()}});var f={},g=D.clone();$("#"+b).append(g);c(g,!0);var h=g.find(".gradebookDatagrid"),f=g.find(".gradeValueEditPopup").clone();h.find(".gradeUserContainer").clone();h.empty();var m=function(b){var a=n[e.id];void 0==a&&
(n[e.id]={},a={});var f=sprintf("%sGradeValue",e.gradeType),h=Participants.getPossibleParticipants();if("foreignRelationship"in e){var m=e.foreignRelationship.sys,r=e.foreignRelationship.key.split("_")[0];$.getJSON(sprintf("/getExternalGradebookOrgUnitClasslist/%s/%s",m,r),function(c){_.forEach(c,function(a){a=a.UserName;void 0!==a&&h.push(a)});h=_.uniq(h);_.forEach(h,function(b){void 0==a[b]&&(a[b]={type:f,gradeId:e.id,gradedUser:b,gradePrivateComment:"",gradeComment:"",author:e.author,timestamp:0,
audiences:[]})});console.log("possibleParticipants:",h,a);a=_.values(a);a=_.filter(a,function(a){return a.type==f});b(a)}).fail(function(a,b,e){c(g,!1);console.log("error",b,e)})}else _.forEach(h,function(b){void 0==a[b]&&(a[b]={type:f,gradeId:e.id,gradedUser:b,author:e.author,gradePrivateComment:"",gradeComment:"",timestamp:0,audiences:[]})}),a=_.values(a),a=_.filter(a,function(a){return a.type==f}),b(a)},r=function(a){var b=function(a){var b=sprintf("changeGvPopup_%s",_.uniqueId()),c=$("<div/>",
{id:b});console.log("gvPopup",a);var g=$.jAlert({type:"modal",content:c[0].outerHTML,title:sprintf("Change score for %s",a.gradedUser)}),b=$("#"+b),c=f.clone(),d=c.find(".changeGradeContainer"),h=d.find(".numericScore"),l=d.find(".booleanScore"),p=d.find(".booleanScoreLabel"),n=d.find(".textScore"),k=_.cloneDeep(a);switch(e.gradeType){case "numeric":d=function(a){k.gradeValue=parseFloat(h.val())};h.val(a.gradeValue).attr("min",e.numericMinimum).attr("max",e.numericMaximum).on("blur",d);l.remove();
p.remove();n.remove();break;case "text":h.remove();d=function(a){k.gradeValue=n.val()};n.val(a.gradeValue).on("blur",d);p.remove();l.remove();break;case "boolean":h.remove();var q=sprintf("booleanScoreId_%s",_.uniqueId()),d=function(a){k.gradeValue=l.prop("checked")};l.on("change",d).prop("checked",a.gradeValue).attr("id",q);p.attr("for",q);n.remove();break;default:h.remove(),l.remove(),p.remove(),n.remove()}p=sprintf("privateComment_%s",_.uniqueId);c.find(".gradeValueCommentTextbox").val(a.gradeComment).attr("id",
p).on("blur",function(){k.gradeComment=$(this).val()});c.find(".gradeValueCommentTextboxLabel").attr("for",p);p=sprintf("privateComment_%s",_.uniqueId);c.find(".gradeValuePrivateCommentTextbox").val(a.gradePrivateComment).attr("id",p).on("blur",function(){k.gradePrivateComment=$(this).val()});c.find(".gradeValuePrivateCommentTextboxLabel").attr("for",p);c.find(".submitGradeValueChange").on("click",function(){sendStanza(k);a.gradeValue=k.gradeValue;a.gradeComment=k.gradeComment;a.gradePrivateComment=
k.gradePrivateComment;console.log("sending:",k);g.closeAlert();m(r)});c.find(".cancelGradeValueChange").on("click",function(){g.closeAlert()});b.append(c)},q=[{name:"gradedUser",type:"text",title:"Who",readOnly:!0,sorting:!0},{name:"timestamp",type:"dateField",title:"When",readOnly:!0,itemTemplate:function(a){return 0==a?"":moment(a).format("MMM Do YYYY, h:mm a")}},{name:"gradeValue",type:"text",title:"Score",readOnly:!0,sorting:!0},{name:"gradeComment",type:"text",title:"Comment",readOnly:!0,sorting:!0},
{name:"gradePrivateComment",type:"text",title:"Private comment",readOnly:!0,sorting:!0}];"foreignRelationship"in e&&q.push({name:"remoteGrade",type:"text",title:"Remote score",readOnly:!0,sorting:!0},{name:"remoteComment",type:"text",title:"Remote comment",readOnly:!0,sorting:!0},{name:"remotePrivateComment",type:"text",title:"Remote private comment",readOnly:!0,sorting:!0});h.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,rowClick:function(a){b(a.item)},noDataContent:"No gradeable users",
controller:{loadData:function(b){if("sortField"in b){var c=_.sortBy(a,function(a){return a[b.sortField]});"sortOrder"in b&&"desc"==b.sortOrder&&(c=_.reverse(c));return c}return a}},pageLoading:!1,fields:q});h.jsGrid("loadData");h.jsGrid("sort",{field:"gradedUser",order:"desc"});if("foreignRelationship"in e){var l=e.foreignRelationship.sys,q=e.foreignRelationship.key.split("_"),p=q[0],k=q[1];g.find(".getRemoteData").on("click",function(){var a=this;c(a,!0);$.getJSON(sprintf("/getExternalGradeValues/%s/%s/%s",
l,p,k),function(b){m(function(e){_.forEach(e,function(e){var d=_.find(b,function(a){return a.gradedUser==e.gradedUser});void 0!==d&&(e.remoteGrade=d.gradeValue,e.remoteComment=d.gradeComment,e.remotePrivateComment=d.gradePrivateComment);c(a,!1)});return r(e)})}).fail(function(b,e,f){c(a,!1);console.log("error",e,f)})});g.find(".sendGradesToRemote").on("click",function(){var a=this;c(a,!0,function(a){return $(a).find("span")});var b=_.filter(n[e.id],function(a){return void 0!=a.gradeValue});$.ajax({type:"POST",
data:JSON.stringify(b),dataType:"json",success:function(b){m(function(e){_.forEach(e,function(a){var c=_.find(b,function(b){return b.gradedUser==a.gradedUser});void 0!==c&&(a.remoteGrade=c.gradeValue,a.remoteComment=c.gradeComment,a.remotePrivateComment=c.gradePrivateComment)});c(a,!1);return r(e)})},url:sprintf("/updateExternalGradeValues/%s/%s/%s",l,p,k),contentType:"application/json"}).fail(function(b,e,d){c(a,!1);console.log("error",e,d)})})}else g.find(".gradeSyncActions").remove();c(g,!1)};
m(r)});return f}return $("<span/>")}}],z=[{name:"myGradeValue",type:"text",title:"Score",readOnly:!0,sorting:!0},{name:"myGradeComment",type:"text",title:"Comment",readOnly:!0,sorting:!0}],b=Conversations.shouldModifyConversation()?_.concat(b,m):_.concat(b,z);f.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No grades",controller:{loadData:function(b){var c=Conversations.shouldModifyConversation(),f=_.map(_.filter(v,function(a){return c||a.visible}),
function(a){var b=n[a.id];void 0!==b&&(b=b[UserSettings.getUsername()],void 0!==b&&(a.myGradeValue=b.gradeValue,a.myGradeComment=b.gradeComment));return a});"sortField"in b&&(f=_.sortBy(f,function(a){return a[b.sortField]}),"sortOrder"in b&&"desc"==b.sortOrder&&(f=_.reverse(f)));return f}},pageLoading:!1,fields:b});f.jsGrid("sort",{field:"timestamp",order:"desc"});l=function(){WorkQueue.enqueue(function(){f.jsGrid("loadData");var b=f.jsGrid("getSorting");"field"in b&&f.jsGrid("sort",b);y.unbind("click");
Conversations.shouldModifyConversation()?y.on("click",function(){console.log("clicked createButton");if(Conversations.shouldModifyConversation()){var b=Conversations.getCurrentSlideJid(),c=UserSettings.getUsername(),b={type:"grade",name:"",description:"",audiences:[],author:c,location:b,id:sprintf("%s_%s_%s",b,c,(new Date).getTime().toString()),gradeType:"numeric",numericMinimum:0,numericMaximum:100,visible:!1,timestamp:0};sendStanza(b)}}).show():y.hide()})};l()},m=function(){"jid"in Conversations.getCurrentConversation()?
b():_.delay(m,500)};m()});return{getGrades:function(){return v},getGradeValues:function(){return n},reRender:l}}();
