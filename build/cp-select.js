/*!
 * cp-select
 * author: Bret Little
 * copyright: 2015
 * license: MIT
 * version: 1.4.2
 */
!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var o=(n(1),n(2));o.module("cp-select",[]),n(3)},function(e,t,n){e.exports=$},function(e,t,n){e.exports=angular},function(e,t,n){"use strict";var o=n(2),i=n(4),l=n(5);n(6),o.module("cp-select").directive("cpSelect",["$timeout",function(e){return{restrict:"E",transclude:!0,scope:{collection:"=",placeholder:"@",keyModel:"@"},require:"ng-Model",template:l,link:function(e,t,n,o){function l(t){return i.find(e.collection,{key:t})}function s(t){p+=String.fromCharCode(t);var n=r(p);n>-1&&(e.selectedIndex=n,e.showDialog?a(e.collection[e.selectedIndex]):e.updateModel(e.collection[e.selectedIndex])),u=setTimeout(function(){p=""},1e3)}function c(t){if(!t)return-1;var n=i.has(t,"value");return i.findIndex(e.collection,function(e){return n?t.key===e.key:t===e})}function r(t){return t=t.toLowerCase(),i.findIndex(e.collection,function(e){return 0===d(e).toLowerCase().indexOf(t)})}function d(e){return e.value||e}function a(n){var o=c(n),i=e.collection.length-o;o>5&&6>i?e.collection.length<11?e.dialogStyle={top:-2+(36*o*-1-20)+"px"}:(e.dialogStyle={top:-226-36*(5-i)+"px"},setTimeout(function(){t.find(".cp-select__menu").scrollTop(36*o-180)})):o>5?(e.dialogStyle={top:"-203px"},setTimeout(function(){t.find(".cp-select__menu").scrollTop(36*o-180)})):e.dialogStyle={top:-2+(36*o*-1-20)+"px"}}var u,p="",f=!i.isUndefined(n.keyModel);e.showDialog=!1,e.selectedIndex=null,o.$render=function(){var n=o.$viewValue?d(o.$viewValue):"";f&&(n=l(n),n=n?n.value:""),t.find(".cp-select__selected").text(n||e.placeholder)},e.updateModel=function(n){f&&(n=n.key),o.$setViewValue(n),o.$render(),e.closeDialog(),setTimeout(function(){t.find("input").focus()})},e.focusSelect=function(){t.find(".cp-select").addClass("+focus")},n.$observe("disabled",function(){e.disabled=i.has(n,"disabled")}),e.keyDown=function(t){var n=t.which,l=o.$viewValue;9!==n&&t.preventDefault(),13===n?e.updateModel(e.collection[e.selectedIndex]):38===n?(e.showDialog=!0,e.selectedIndex=i.isNull(e.selectedIndex)?c(l):e.selectedIndex-1,a(e.collection[e.selectedIndex])):40===n?(e.showDialog=!0,e.selectedIndex=i.isNull(e.selectedIndex)?c(l):e.selectedIndex+1,a(e.collection[e.selectedIndex])):27===n?e.closeDialog():s(t.which)},e.toggleDialog=function(){var n=o.$viewValue;e.showDialog?(e.showDialog=!1,t.find("input").focus()):(e.selectedIndex=null,n&&a(n),e.showDialog=!0,t.find("input").focus())},e.onBlur=function(n){t.find(".cp-select").removeClass("+focus"),e.closeDialog()},e.closeDialog=function(t){e.showDialog=!1}}}}])},function(e,t,n){e.exports=_},function(e,t,n){e.exports='<input class=cp-select__hidden-input ng-disabled=disabled ng-focus=focusSelect() ng-blur=onBlur($event) ng-keydown=keyDown($event)><div class=cp-select ng-click="!disabled && toggleDialog()" ng-class="{\'+disabled\': disabled}"><div class=cp-select__selected></div><div class=cp-select__icon></div></div><ul ng-style=dialogStyle class="cp-select__menu cps-dropdown-menu" role=menu ng-if=showDialog><li ng-mousedown=updateModel(item) ng-repeat="item in ::collection" ng-class="{\'+selected\': (selectedIndex === $index)}"><a>{{item.value ? (item.value) : (item)}}</a></li></ul>'},function(e,t,n){var o=n(7);"string"==typeof o&&(o=[[e.id,o,""]]);n(9)(o,{})},function(e,t,n){t=e.exports=n(8)(),t.push([e.id,"cp-select{position:relative;height:32px;font-size:12px}.cp-select{border-radius:2px;box-shadow:0 1px 4px 0 rgba(0,0,0,.26);display:inline-block;padding:8px 14px;min-width:140px;color:#AFAFAF;background-color:#fff;cursor:pointer;width:100%;height:32px}.cps-has-error .cp-select{box-shadow:0 1px 4px 0 #FE996C}.cp-select.\\+disabled{cursor:not-allowed;background-color:#F9F9F9;opacity:1;border:1px dashed #CFCFCF}.cp-select.\\+focus{box-shadow:0 0 0 2px rgba(76,175,80,.3)}.cp-select__selected{width:calc(100% - 15px);display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cp-select__icon{display:inline-block;border-color:#AFAFAF transparent;border-style:solid;border-width:6px 6px 0 6px;height:0;width:0;float:right;position:relative;top:6px}cp-select .cp-select__menu{display:block;max-height:400px;overflow:auto;width:100%;position:absolute;font-size:12px}cp-select .cp-select__menu li{height:36px!important}cp-select .cp-select__menu li.\\+selected>a{color:#333;text-decoration:none;background-color:#f7f7f7}.cp-select__hidden-input{opacity:0;position:absolute;left:0;top:0;width:0;height:0}",""])},function(e,t,n){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e}},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],i=a[o.id];if(i){i.refs++;for(var l=0;l<i.parts.length;l++)i.parts[l](o.parts[l]);for(;l<o.parts.length;l++)i.parts.push(s(o.parts[l],t))}else{for(var c=[],l=0;l<o.parts.length;l++)c.push(s(o.parts[l],t));a[o.id]={id:o.id,refs:1,parts:c}}}}function i(e){for(var t=[],n={},o=0;o<e.length;o++){var i=e[o],l=i[0],s=i[1],c=i[2],r=i[3],d={css:s,media:c,sourceMap:r};n[l]?n[l].parts.push(d):t.push(n[l]={id:l,parts:[d]})}return t}function l(){var e=document.createElement("style"),t=f();return e.type="text/css",t.appendChild(e),e}function s(e,t){var n,o,i;if(t.singleton){var s=g++;n=h||(h=l()),o=r.bind(null,n,s,!1),i=r.bind(null,n,s,!0)}else n=l(),o=d.bind(null,n),i=function(){n.parentNode.removeChild(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else i()}}function c(e,t,n){var o=["/** >>"+t+" **/","/** "+t+"<< **/"],i=e.lastIndexOf(o[0]),l=n?o[0]+n+o[1]:"";if(e.lastIndexOf(o[0])>=0){var s=e.lastIndexOf(o[1])+o[1].length;return e.slice(0,i)+l+e.slice(s)}return e+l}function r(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=c(e.styleSheet.cssText,t,i);else{var l=document.createTextNode(i),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(l,s[t]):e.appendChild(l)}}function d(e,t){var n=t.css,o=t.media,i=t.sourceMap;if(i&&"function"==typeof btoa)try{n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(JSON.stringify(i))+" */",n='@import url("data:text/css;base64,'+btoa(n)+'")'}catch(l){}if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var a={},u=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},p=u(function(){return/msie 9\b/.test(window.navigator.userAgent.toLowerCase())}),f=u(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,g=0;e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=p());var n=i(e);return o(n,t),function(e){for(var l=[],s=0;s<n.length;s++){var c=n[s],r=a[c.id];r.refs--,l.push(r)}if(e){var d=i(e);o(d,t)}for(var s=0;s<l.length;s++){var r=l[s];if(0===r.refs){for(var u=0;u<r.parts.length;u++)r.parts[u]();delete a[r.id]}}}}}]);