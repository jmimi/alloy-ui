AUI.add("aui-node-base",function(O){var D=O.Lang,K=D.isArray,J=D.isObject,L=D.isString,C=D.isUndefined,R=D.isValue,F=O.ClassNameManager.getClassName,N=false,B="helper",T=F(B,"hidden"),P=F(B,"unselectable"),Q="innerHTML",S="nextSibling",H="none",G="parentNode",I="script",E="value";var M=document.createElement("div");M.innerHTML="&nbsp;";if(M.attachEvent&&M.fireEvent){M.attachEvent("onclick",function(){N=true;M.detachEvent("onclick",arguments.callee);});M.cloneNode(true).fireEvent("onclick");}O.mix(O.Node.prototype,{ancestors:function(U){var A=this;var W=[];var X=A.getDOM();while(X&&X.nodeType!==9){if(X.nodeType===1){W.push(X);}X=X.parentNode;}var V=new O.all(W);if(U){V=V.filter(U);}return V;},ancestorsByClassName:function(W){var A=this;var V=[];var U=new RegExp("\\b"+W+"\\b");var X=A.getDOM();while(X&&X.nodeType!==9){if(X.nodeType===1&&U.test(X.className)){V.push(X);}X=X.parentNode;}return O.all(V);},appendTo:function(U){var A=this;O.one(U).append(A);return A;},attr:function(U,X){var A=this;if(!C(X)){var W=A.getDOM();if(U in W){A.set(U,X);}else{A.setAttribute(U,X);}return A;}else{if(J(U)){for(var V in U){A.attr(V,U[V]);}return A;}return A.get(U)||A.getAttribute(U);}},clone:(function(){var A;if(N){A=function(){var U=this.getDOM();var V;if(U.nodeType!=3){V=O.Node.create(this.outerHTML());}else{V=O.one(U.cloneNode());}return V;};}else{A=function(){return this.cloneNode(true);};}return A;})(),center:function(Y){var A=this;Y=(Y&&O.one(Y))||O.getBody();var W=Y.get("region");var V=A.get("region");var X=W.left+(W.width/2);var U=W.top+(W.height/2);A.setXY([X-(V.width/2),U-(V.height/2)]);},empty:function(){var A=this;A.all(">*").remove().purge();var U=O.Node.getDOMNode(A);while(U.firstChild){U.removeChild(U.firstChild);}return A;},getDOM:function(){var A=this;return O.Node.getDOMNode(A);},guid:function(V){var U=this;var A=U.get("id");if(!A){A=O.stamp(U);U.set("id",A);}return A;},hide:function(U){var A=this;A.addClass(U||A._hideClass||T);return A;},hover:function(V,U){var A=this;var W;var Z=A._defaultHoverOptions;if(J(V,true)){W=V;W=O.mix(W,Z);V=W.over;U=W.out;}else{W=O.mix({over:V,out:U},Z);}A._hoverOptions=W;var Y=new O.DelayedTask(A._hoverOverTaskFn,A);var X=new O.DelayedTask(A._hoverOutTaskFn,A);W.overTask=Y;W.outTask=X;A.on(W.overEventType,A._hoverOverHandler,A);A.on(W.outEventType,A._hoverOutHandler,A);},html:function(){var A=arguments,U=A.length;if(U){this.set(Q,A[0]);}else{return this.get(Q);}return this;},outerHTML:function(){var A=this;var V=A.getDOM();if("outerHTML" in V){return V.outerHTML;}var U=O.Node.create("<div></div>").append(this.clone());try{return U.html();}catch(W){}finally{U=null;}},placeAfter:function(U){var A=this;return A._place(U,A.get(S));},placeBefore:function(U){var A=this;return A._place(U,A);},prependTo:function(U){var A=this;O.one(U).prepend(A);return A;},radioClass:function(U){var A=this;A.siblings().removeClass(U);A.addClass(U);return A;},resetId:function(U){var A=this;A.attr("id",O.guid(U));return A;},selectText:function(Z,V){var A=this;var U=A.getDOM();var X=A.val().length;V=R(V)?V:X;Z=R(Z)?Z:0;try{if(U.setSelectionRange){U.setSelectionRange(Z,V);}else{if(U.createTextRange){var W=U.createTextRange();W.moveStart("character",Z);W.moveEnd("character",V-X);W.select();}else{U.select();}}if(U!=document.activeElement){U.focus();}}catch(Y){}return A;},selectable:function(){var A=this;A.getDOM().unselectable="off";A.detach("selectstart");A.setStyles({"MozUserSelect":"","KhtmlUserSelect":""});A.removeClass(P);return A;},show:function(U){var A=this;A.removeClass(U||A._hideClass||T);return A;},swallowEvent:function(U,V){var A=this;var W=function(X){X.stopPropagation();if(V){X.preventDefault();X.halt();}return false;};if(K(U)){O.Array.each(U,function(X){A.on(X,W);});return this;}else{A.on(U,W);}return A;},text:function(V){var A=this;var U=A.getDOM();if(!C(V)){V=O.DOM._getDoc(U).createTextNode(V);return A.empty().append(V);}return A._getText(U.childNodes);},toggle:function(U){var A=this;var V="hide";var W=U||A._hideClass||T;if(A.hasClass(W)){V="show";}A[V](W);return A;},unselectable:function(){var A=this;A.getDOM().unselectable="on";A.swallowEvent("selectstart",true);A.setStyles({"MozUserSelect":H,"KhtmlUserSelect":H});A.addClass(P);return A;},val:function(U){var A=this;if(C(U)){return A.get(E);}else{return A.set(E,U);}},_getText:function(Y){var A=this;var W=Y.length;var V;var X=[];for(var U=0;U<W;U++){V=Y[U];if(V&&V.nodeType!=8){if(V.nodeType!=1){X.push(V.nodeValue);}if(V.childNodes){X.push(A._getText(V.childNodes));}}}return X.join("");},_hoverOutHandler:function(V){var A=this;var U=A._hoverOptions;U.outTask.delay(U.outDelay,null,null,[V]);},_hoverOverHandler:function(V){var A=this;var U=A._hoverOptions;U.overTask.delay(U.overDelay,null,null,[V]);},_hoverOutTaskFn:function(V){var A=this;var U=A._hoverOptions;U.overTask.cancel();U.out.apply(U.context||V.currentTarget,arguments);},_hoverOverTaskFn:function(V){var A=this;var U=A._hoverOptions;U.outTask.cancel();U.over.apply(U.context||V.currentTarget,arguments);},_place:function(V,U){var A=this;var W=A.get(G);if(W){if(D.isString(V)){V=O.Node.create(V);}W.insertBefore(V,U);}return A;},_defaultHoverOptions:{overEventType:"mouseenter",outEventType:"mouseleave",overDelay:0,outDelay:0,over:D.emptyFn,out:D.emptyFn}},true);O.NodeList.importMethod(O.Node.prototype,["after","appendTo","attr","before","empty","hide","hover","html","outerHTML","prepend","prependTo","purge","selectText","selectable","show","text","toggle","unselectable","val"]);O.mix(O.NodeList.prototype,{all:function(V){var U=this;var Z=[];var W=U._nodes;var Y=W.length;var A;for(var X=0;X<Y;X++){A=O.Selector.query(V,W[X]);if(A&&A.length){Z.push.apply(Z,A);}}Z=O.Array.unique(Z);return O.all(Z);},first:function(){var A=this;return instacne.item(0);},getDOM:function(){var A=this;return O.NodeList.getDOMNodes(this);},last:function(){var A=this;return A.item(A._nodes.length-1);},one:function(U){var A=this;var X=null;var V=A._nodes;var Y=V.length;for(var W=0;W<Y;W++){X=O.Selector.query(U,V[W],true);
if(X){X=O.one(X);break;}}return X;}});O.mix(O,{getBody:function(){var A=this;if(!A._bodyNode){A._bodyNode=O.one(document.body);}return A._bodyNode;},getDoc:function(){var A=this;if(!A._documentNode){A._documentNode=O.one(document);}return A._documentNode;},getWin:function(){var A=this;if(!A._windowNode){A._windowNode=O.one(window);}return A._windowNode;}});},"@VERSION@",{requires:["aui-base"]});