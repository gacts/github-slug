require('./sourcemap-register.js');(()=>{var e={241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);i(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issue=t.issueCommand=void 0;const s=o(n(87));const a=n(278);function issueCommand(e,t,n){const r=new Command(e,t,n);process.stdout.write(r.toString()+s.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const u="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=u+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const r=this.properties[n];if(r){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(r)}`}}}}e+=`${u}${escapeData(this.message)}`;return e}}function escapeData(e){return a.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return a.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},186:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);i(t,e);return t};var s=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){i(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:true});t.getState=t.saveState=t.group=t.endGroup=t.startGroup=t.info=t.notice=t.warning=t.error=t.debug=t.isDebug=t.setFailed=t.setCommandEcho=t.setOutput=t.getBooleanInput=t.getMultilineInput=t.getInput=t.addPath=t.setSecret=t.exportVariable=t.ExitCode=void 0;const a=n(241);const u=n(717);const c=n(278);const l=o(n(87));const f=o(n(622));var p;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(p=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const n=c.toCommandValue(t);process.env[e]=n;const r=process.env["GITHUB_ENV"]||"";if(r){const t="_GitHubActionsFileCommandDelimeter_";const r=`${e}<<${t}${l.EOL}${n}${l.EOL}${t}`;u.issueCommand("ENV",r)}else{a.issueCommand("set-env",{name:e},n)}}t.exportVariable=exportVariable;function setSecret(e){a.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){u.issueCommand("PATH",e)}else{a.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${f.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}if(t&&t.trimWhitespace===false){return n}return n.trim()}t.getInput=getInput;function getMultilineInput(e,t){const n=getInput(e,t).split("\n").filter((e=>e!==""));return n}t.getMultilineInput=getMultilineInput;function getBooleanInput(e,t){const n=["true","True","TRUE"];const r=["false","False","FALSE"];const i=getInput(e,t);if(n.includes(i))return true;if(r.includes(i))return false;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n`+`Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}t.getBooleanInput=getBooleanInput;function setOutput(e,t){process.stdout.write(l.EOL);a.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){a.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=p.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){a.issueCommand("debug",{},e)}t.debug=debug;function error(e,t={}){a.issueCommand("error",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.error=error;function warning(e,t={}){a.issueCommand("warning",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.warning=warning;function notice(e,t={}){a.issueCommand("notice",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.notice=notice;function info(e){process.stdout.write(e+l.EOL)}t.info=info;function startGroup(e){a.issue("group",e)}t.startGroup=startGroup;function endGroup(){a.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return s(this,void 0,void 0,(function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n}))}t.group=group;function saveState(e,t){a.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},717:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);i(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issueCommand=void 0;const s=o(n(747));const a=o(n(87));const u=n(278);function issueCommand(e,t){const n=process.env[`GITHUB_${e}`];if(!n){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!s.existsSync(n)){throw new Error(`Missing file at path: ${n}`)}s.appendFileSync(n,`${u.toCommandValue(t)}${a.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},278:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:true});t.toCommandProperties=t.toCommandValue=void 0;function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue;function toCommandProperties(e){if(!Object.keys(e).length){return{}}return{title:e.title,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}}t.toCommandProperties=toCommandProperties},797:(e,t,n)=>{var r=n(997),i=n(659),o=i.repeat,s=i.truncate,a=i.pad;function Table(e){this.options=i.options({chars:{top:"─","top-mid":"┬","top-left":"┌","top-right":"┐",bottom:"─","bottom-mid":"┴","bottom-left":"└","bottom-right":"┘",left:"│","left-mid":"├",mid:"─","mid-mid":"┼",right:"│","right-mid":"┤",middle:"│"},truncate:"…",colWidths:[],colAligns:[],style:{"padding-left":1,"padding-right":1,head:["red"],border:["grey"],compact:false},head:[]},e)}Table.prototype.__proto__=Array.prototype;Table.prototype.__defineGetter__("width",(function(){var e=this.toString().split("\n");if(e.length)return e[0].length;return 0}));Table.prototype.render;Table.prototype.toString=function(){var e="",t=this.options,n=t.style,u=t.head,c=t.chars,l=t.truncate,f=t.colWidths||new Array(this.head.length),p=0;if(!u.length&&!this.length)return"";if(!f.length){var d=this.slice(0);if(u.length){d=d.concat([u])}d.forEach((function(e){if(typeof e==="object"&&e.length){extractColumnWidths(e)}else{var t=Object.keys(e)[0],n=e[t];f[0]=Math.max(f[0]||0,get_width(t)||0);if(typeof n==="object"&&n.length){extractColumnWidths(n,1)}else{f[1]=Math.max(f[1]||0,get_width(n)||0)}}}))}p=(f.length==1?f[0]:f.reduce((function(e,t){return e+t})))+f.length+1;function extractColumnWidths(e,t){var t=t||0;e.forEach((function(e,n){f[n+t]=Math.max(f[n+t]||0,get_width(e)||0)}))}function get_width(e){return typeof e=="object"&&e.width!=undefined?e.width:(typeof e=="object"?i.strlen(e.text):i.strlen(e))+(n["padding-left"]||0)+(n["padding-right"]||0)}function line(e,n,r,i){var s=0,e=n+o(e,p-2)+r;f.forEach((function(t,n){if(n==f.length-1)return;s+=t+1;e=e.substr(0,s)+i+e.substr(s+1)}));return applyStyles(t.style.border,e)}function lineTop(){var t=line(c.top,c["top-left"]||c.top,c["top-right"]||c.top,c["top-mid"]);if(t)e+=t+"\n"}function generateRow(e,n){var r=[],i=0;if(!Array.isArray(e)&&typeof e==="object"){var o=Object.keys(e)[0],s=e[o],a=true;if(Array.isArray(s)){e=s;e.unshift(o)}else{e=[o,s]}}e.forEach((function(e,t){var n=e.toString().split("\n").reduce((function(e,n){e.push(string(n,t));return e}),[]);var o=n.length;if(o>i){i=o}r.push({contents:n,height:o})}));var u=new Array(i);r.forEach((function(e,r){e.contents.forEach((function(e,i){if(!u[i]){u[i]=[]}if(n||a&&r===0&&t.style.head){e=applyStyles(t.style.head,e)}u[i].push(e)}));for(var o=e.height,s=i;o<s;o++){if(!u[o]){u[o]=[]}u[o].push(string("",r))}}));var l="";u.forEach((function(e,n){if(l.length>0){l+="\n"+applyStyles(t.style.border,c.left)}l+=e.join(applyStyles(t.style.border,c.middle))+applyStyles(t.style.border,c.right)}));return applyStyles(t.style.border,c.left)+l}function applyStyles(e,t){if(!t)return"";e.forEach((function(e){t=r[e](t)}));return t}function string(e,r){var e=String(typeof e=="object"&&e.text?e.text:e),u=i.strlen(e),c=f[r]-(n["padding-left"]||0)-(n["padding-right"]||0),p=t.colAligns[r]||"left";return o(" ",n["padding-left"]||0)+(u==c?e:u<c?a(e,c+(e.length-u)," ",p=="left"?"right":p=="middle"?"both":"left"):l?s(e,c,l):e)+o(" ",n["padding-right"]||0)}if(u.length){lineTop();e+=generateRow(u,n.head)+"\n"}if(this.length)this.forEach((function(t,r){if(!u.length&&r==0)lineTop();else{if(!n.compact||r<!!u.length?1:false||t.length==0){var i=line(c.mid,c["left-mid"],c["right-mid"],c["mid-mid"]);if(i)e+=i+"\n"}}if(t.hasOwnProperty("length")&&!t.length){return}else{e+=generateRow(t)+"\n"}}));var h=line(c.bottom,c["bottom-left"]||c.bottom,c["bottom-right"]||c.bottom,c["bottom-mid"]);if(h)e+=h;else e=e.slice(0,-1);return e};e.exports=Table;e.exports.version="0.0.1"},659:(e,t)=>{t.repeat=function(e,t){return Array(t+1).join(e)};t.pad=function(e,t,n,r){if(t+1>=e.length)switch(r){case"left":e=Array(t+1-e.length).join(n)+e;break;case"both":var i=Math.ceil((padlen=t-e.length)/2);var o=padlen-i;e=Array(o+1).join(n)+e+Array(i+1).join(n);break;default:e=e+Array(t+1-e.length).join(n)}return e};t.truncate=function(e,t,n){n=n||"…";return e.length>=t?e.substr(0,t-n.length)+n:e};function options(e,t){for(var n in t){if(n==="__proto__"||n==="constructor"||n==="prototype"){continue}if(t[n]&&t[n].constructor&&t[n].constructor===Object){e[n]=e[n]||{};options(e[n],t[n])}else{e[n]=t[n]}}return e}t.options=options;t.strlen=function(e){var t=/\u001b\[(?:\d*;){0,5}\d*m/g;var n=(""+e).replace(t,"");var r=n.split("\n");return r.reduce((function(e,t){return t.length>e?t.length:e}),0)}},595:(e,t,n)=>{var r={};e["exports"]=r;r.themes={};var i=r.styles=n(104);var o=Object.defineProperties;r.supportsColor=n(662);if(typeof r.enabled==="undefined"){r.enabled=r.supportsColor}r.stripColors=r.strip=function(e){return(""+e).replace(/\x1B\[\d+m/g,"")};var s=r.stylize=function stylize(e,t){return i[t].open+e+i[t].close};var a=/[|\\{}()[\]^$+*?.]/g;var escapeStringRegexp=function(e){if(typeof e!=="string"){throw new TypeError("Expected a string")}return e.replace(a,"\\$&")};function build(e){var t=function builder(){return applyStyle.apply(builder,arguments)};t._styles=e;t.__proto__=c;return t}var u=function(){var e={};i.grey=i.gray;Object.keys(i).forEach((function(t){i[t].closeRe=new RegExp(escapeStringRegexp(i[t].close),"g");e[t]={get:function(){return build(this._styles.concat(t))}}}));return e}();var c=o((function colors(){}),u);function applyStyle(){var e=arguments;var t=e.length;var n=t!==0&&String(arguments[0]);if(t>1){for(var o=1;o<t;o++){n+=" "+e[o]}}if(!r.enabled||!n){return n}var s=this._styles;var a=s.length;while(a--){var u=i[s[a]];n=u.open+n.replace(u.closeRe,u.open)+u.close}return n}function applyTheme(e){for(var t in e){(function(t){r[t]=function(n){return r[e[t]](n)}})(t)}}r.setTheme=function(e){if(typeof e==="string"){try{r.themes[e]=require(e);applyTheme(r.themes[e]);return r.themes[e]}catch(e){console.log(e);return e}}else{applyTheme(e)}};function init(){var e={};Object.keys(u).forEach((function(t){e[t]={get:function(){return build([t])}}}));return e}var l=function sequencer(e,t){var n=t.split(""),r=0;n=n.map(e);return n.join("")};r.trap=n(302);r.zalgo=n(743);r.maps={};r.maps.america=n(936);r.maps.zebra=n(989);r.maps.rainbow=n(210);r.maps.random=n(441);for(var f in r.maps){(function(e){r[e]=function(t){return l(r.maps[e],t)}})(f)}o(r,init())},302:e=>{e["exports"]=function runTheTrap(e,t){var n="";e=e||"Run the trap, drop the bass";e=e.split("");var r={a:["@","Ą","Ⱥ","Ʌ","Δ","Λ","Д"],b:["ß","Ɓ","Ƀ","ɮ","β","฿"],c:["©","Ȼ","Ͼ"],d:["Ð","Ɗ","Ԁ","ԁ","Ԃ","ԃ"],e:["Ë","ĕ","Ǝ","ɘ","Σ","ξ","Ҽ","੬"],f:["Ӻ"],g:["ɢ"],h:["Ħ","ƕ","Ң","Һ","Ӈ","Ԋ"],i:["༏"],j:["Ĵ"],k:["ĸ","Ҡ","Ӄ","Ԟ"],l:["Ĺ"],m:["ʍ","Ӎ","ӎ","Ԡ","ԡ","൩"],n:["Ñ","ŋ","Ɲ","Ͷ","Π","Ҋ"],o:["Ø","õ","ø","Ǿ","ʘ","Ѻ","ם","۝","๏"],p:["Ƿ","Ҏ"],q:["্"],r:["®","Ʀ","Ȑ","Ɍ","ʀ","Я"],s:["§","Ϟ","ϟ","Ϩ"],t:["Ł","Ŧ","ͳ"],u:["Ʊ","Ս"],v:["ט"],w:["Ш","Ѡ","Ѽ","൰"],x:["Ҳ","Ӿ","Ӽ","ӽ"],y:["¥","Ұ","Ӌ"],z:["Ƶ","ɀ"]};e.forEach((function(e){e=e.toLowerCase();var t=r[e]||[" "];var i=Math.floor(Math.random()*t.length);if(typeof r[e]!=="undefined"){n+=r[e][i]}else{n+=e}}));return n}},743:e=>{e["exports"]=function zalgo(e,t){e=e||"   he is here   ";var n={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},r=[].concat(n.up,n.down,n.mid),zalgo={};function randomNumber(e){var t=Math.floor(Math.random()*e);return t}function is_char(e){var t=false;r.filter((function(n){t=n===e}));return t}function heComes(e,t){var r="",i,o;t=t||{};t["up"]=t["up"]||true;t["mid"]=t["mid"]||true;t["down"]=t["down"]||true;t["size"]=t["size"]||"maxi";e=e.split("");for(o in e){if(is_char(o)){continue}r=r+e[o];i={up:0,down:0,mid:0};switch(t.size){case"mini":i.up=randomNumber(8);i.min=randomNumber(2);i.down=randomNumber(8);break;case"maxi":i.up=randomNumber(16)+3;i.min=randomNumber(4)+1;i.down=randomNumber(64)+3;break;default:i.up=randomNumber(8)+1;i.mid=randomNumber(6)/2;i.down=randomNumber(8)+1;break}var s=["up","mid","down"];for(var a in s){var u=s[a];for(var c=0;c<=i[u];c++){if(t[u]){r=r+n[u][randomNumber(n[u].length)]}}}}return r}return heComes(e)}},936:(e,t,n)=>{var r=n(595);e["exports"]=function(){return function(e,t,n){if(e===" ")return e;switch(t%3){case 0:return r.red(e);case 1:return r.white(e);case 2:return r.blue(e)}}}()},210:(e,t,n)=>{var r=n(595);e["exports"]=function(){var e=["red","yellow","green","blue","magenta"];return function(t,n,i){if(t===" "){return t}else{return r[e[n++%e.length]](t)}}}()},441:(e,t,n)=>{var r=n(595);e["exports"]=function(){var e=["underline","inverse","grey","yellow","red","green","blue","white","cyan","magenta"];return function(t,n,i){return t===" "?t:r[e[Math.round(Math.random()*(e.length-1))]](t)}}()},989:(e,t,n)=>{var r=n(595);e["exports"]=function(e,t,n){return t%2===0?e:r.inverse(e)}},104:e=>{var t={};e["exports"]=t;var n={reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],grey:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBG:[40,49],redBG:[41,49],greenBG:[42,49],yellowBG:[43,49],blueBG:[44,49],magentaBG:[45,49],cyanBG:[46,49],whiteBG:[47,49]};Object.keys(n).forEach((function(e){var r=n[e];var i=t[e]=[];i.open="["+r[0]+"m";i.close="["+r[1]+"m"}))},662:e=>{var t=process.argv;e.exports=function(){if(t.indexOf("--no-color")!==-1||t.indexOf("--color=false")!==-1){return false}if(t.indexOf("--color")!==-1||t.indexOf("--color=true")!==-1||t.indexOf("--color=always")!==-1){return true}if(process.stdout&&!process.stdout.isTTY){return false}if(process.platform==="win32"){return true}if("COLORTERM"in process.env){return true}if(process.env.TERM==="dumb"){return false}if(/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)){return true}return false}()},997:(e,t,n)=>{var r=n(595);e["exports"]=r},481:function(e){(function(t,n,r){if(true){e.exports=r();e.exports.default=r()}else{}})("slugify",this,(function(){var e=JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}');var t=JSON.parse('{"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"}}');function replace(n,r){if(typeof n!=="string"){throw new Error("slugify: string argument expected")}r=typeof r==="string"?{replacement:r}:r||{};var i=t[r.locale]||{};var o=r.replacement===undefined?"-":r.replacement;var s=r.trim===undefined?true:r.trim;var a=n.normalize().split("").reduce((function(t,n){return t+(i[n]||e[n]||(n===o?" ":n)).replace(r.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")}),"");if(r.strict){a=a.replace(/[^A-Za-z0-9\s]/g,"")}if(s){a=a.trim()}a=a.replace(/\s+/g,o);if(r.lower){a=a.toLowerCase()}return a}replace.extend=function(t){Object.assign(e,t)};return replace}))},373:e=>{e.exports=Object.freeze({GITHUB_WORKFLOW:"GITHUB_WORKFLOW",GITHUB_JOB:"GITHUB_JOB",GITHUB_ACTION:"GITHUB_ACTION",GITHUB_ACTOR:"GITHUB_ACTOR",GITHUB_REPOSITORY:"GITHUB_REPOSITORY",GITHUB_EVENT_NAME:"GITHUB_EVENT_NAME",GITHUB_WORKSPACE:"GITHUB_WORKSPACE",GITHUB_SHA:"GITHUB_SHA",GITHUB_REF:"GITHUB_REF",GITHUB_HEAD_REF:"GITHUB_HEAD_REF",GITHUB_BASE_REF:"GITHUB_BASE_REF",RUNNER_OS:"RUNNER_OS",RUNNER_TEMP:"RUNNER_TEMP"})},865:e=>{function getEnv(e){if(e in process.env){const t=process.env[e];if(typeof t==="string"&&t.length>0){return t}}return undefined}e.exports={getEnv:getEnv}},280:(e,t,n)=>{const{getEnv:r}=n(865);const i=n(373);const{slug:o}=n(666);const{VersionInfo:s}=n(554);const a="/";function isOnBranch(){const e=r(i.GITHUB_REF);if(e!==undefined){const t=e.split(a);return t.length>=3&&["heads","pull"].includes(t[1].trim().toLowerCase())}return false}function isOnTag(){const e=r(i.GITHUB_REF);if(e!==undefined){const t=e.split(a);return t.length>=3&&t[1].trim().toLowerCase()==="tags"}return false}class Branch{name="";slug="";constructor(e,t){this.name=e;this.slug=t}}function currentBranch(){const toResult=e=>new Branch(e.trim(),o(e));const e=r(i.GITHUB_HEAD_REF);if(e!==undefined){return toResult(e)}const t=r(i.GITHUB_REF);if(t!==undefined){const e=t.split(a);if(e.length>=3){const t=e.slice(2,e.length).filter((e=>typeof e==="string"&&e.trim().length>0)).join(a);if(t.length===0){return undefined}return toResult(t)}}return undefined}class Tag{name="";slug="";constructor(e,t){this.name=e;this.slug=t}}function currentTag(){const e=r(i.GITHUB_REF);if(e!==undefined){const t=e.split(a);if(t.length>=3){const e=t.slice(2,t.length).filter((e=>typeof e==="string"&&e.trim().length>0)).join(a).trim();if(e.length===0){return undefined}return new Tag(e,o(e))}}return undefined}class Version{version="";major=0;minor=0;patch=0;semantic=""}function version(){const e=isOnTag(),t=currentTag();if(e&&t!==undefined){const e=new s(t.name),n=new Version;if(e.formatted.length>0){n.version=e.formatted}else{n.version=t.slug}if(e.semantic.length>0){n.semantic=e.semantic}else{n.semantic=`0.0.0-${t.slug}`}n.major=e.major;n.minor=e.minor;n.patch=e.patch;return n}const n=isOnBranch(),o=currentBranch();if(n&&o!==undefined){const e=new s(o.name),t=new Version;if(e.formatted.length>0){t.version=e.formatted}else{t.version=o.slug}if(e.semantic.length>0){t.semantic=e.semantic}else{t.semantic=`0.0.0-${o.slug}`}t.major=e.major;t.minor=e.minor;t.patch=e.patch;return t}const a=r(i.GITHUB_SHA);if(typeof a==="string"&&a.length>=7){const e=new Version,t=a.substring(0,7).toLowerCase();e.version=t;e.semantic=`0.0.0-${t}`;return e}const u=new Version,c="undefined-version";u.version=c;u.semantic=`0.0.0-${c}`;return u}e.exports={isOnBranch:isOnBranch,isOnTag:isOnTag,currentBranch:currentBranch,currentTag:currentTag,version:version}},666:(e,t,n)=>{const r=n(481);function slug(e){return r(e.replace(/[._/()#+]/g,"-"),{replacement:"-",lower:true,strict:true})}e.exports={slug:slug}},608:(e,t,n)=>{const{getEnv:r}=n(865);const i=n(373);let o=n(797);class ActionID{currentID;constructor(){this.currentID=r(i.GITHUB_ACTION)}isUsable(){return this.currentID!==undefined&&(isNaN(parseFloat(this.currentID))&&this.currentID!=="__self")}toString(){return this.isUsable()?this.currentID:""}}class Output{name="";value;description="";constructor(e,t,n){this.name=e;this.description=n;this.value=t}}class CLITable{t;constructor(e){this.t=new o({head:e,style:{head:["green"]}})}push(e){this.t.push(e)}toString(){return this.t.toString()}}e.exports={ActionID:ActionID,Output:Output,CLITable:CLITable}},554:(e,t,n)=>{const{slug:r}=n(666);class VersionInfo{major=0;minor=0;patch=0;tail="";formatted="";semantic="";constructor(e){const t=VersionInfo.clearVersionString(VersionInfo.rejectVersionPrefix(e.trimLeft()));const n=VersionInfo.splitVersionStringIntoParts(t);if(n.length>0){let e=0;for(let t=0;t<=2;t++){if(t<n.length){if(n[t].length>=1&&["-","+","_"].includes(n[t].charAt(0))){break}let r=parseFloat(n[t]);if(!isNaN(r)&&r>=0){e++;switch(t){case 0:{this.major=r;break}case 1:{this.minor=r;break}case 2:{this.patch=r;break}}}else{break}}else{break}}if(e>0){this.formatted=n.slice(0,e).join(".")}this.semantic=`${this.major}.${this.minor}.${this.patch}`;if(n.length>e){this.tail=r(n.slice(e).join("-"))}if(this.tail.length>0){this.formatted+="-"+this.tail;this.semantic+="-"+this.tail}}}static rejectVersionPrefix(e){return e.replace(/^[vV][._\s-]?(\d.*)/,"$1").replace(/^ver[._\s-]?(\d.*)/i,"$1").replace(/^version[._\s-]?(\d.*)/i,"$1")}static clearVersionString(e){return e.replace(/([^a-zA-Z0-9+_.-]+)/g,"-")}static splitVersionStringIntoParts(e){const t=e.match(/^(?<major>\d+)(\.(?<minor>\d+)(\.(?<patch>\d+))?)?(?<tail>.*)?$/);let n=[];if(t){Object.keys(t.groups).forEach((e=>{n.push(t.groups[e])}))}return n.filter((e=>typeof e==="string"&&e.length>0))}}e.exports={VersionInfo:VersionInfo}},747:e=>{"use strict";e.exports=require("fs")},87:e=>{"use strict";e.exports=require("os")},622:e=>{"use strict";e.exports=require("path")}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var i=t[n]={exports:{}};var o=true;try{e[n].call(i.exports,i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[n]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n={};(()=>{const e=__nccwpck_require__(186);const{isOnBranch:t,isOnTag:n,currentTag:r,currentBranch:i,version:o}=__nccwpck_require__(280);const{ActionID:s,Output:a,CLITable:u}=__nccwpck_require__(608);async function run(){const c=[];const l=t(),f=n();c.push(new a("is-branch",l.toString(),"Is branch"));c.push(new a("is-tag",f.toString(),"Is tag"));const p=i();if(l&&p!==undefined){c.push(new a("branch-name",p.name,"Branch name"));c.push(new a("branch-name-slug",p.slug,"Branch name slug"))}const d=r();if(f&&d!==undefined){c.push(new a("tag-name",d.name,"Tag name"));c.push(new a("tag-name-slug",d.slug,"Tag name slug"))}const h=o();c.push(new a("version",h.version,"Version"));c.push(new a("version-major",h.major,"Major version"));c.push(new a("version-minor",h.minor,"Minor version"));c.push(new a("version-patch",h.patch,"Patch version"));c.push(new a("version-semantic",h.semantic,"Semantic version"));const m=new u(["Name","Description","How to use in your workflow","Value"]),g=new s;e.startGroup("Setup");c.forEach((t=>{e.setOutput(t.name,t.value);m.push([t.name,t.description,`${"${{ steps."+(g.isUsable()?g.toString():"<this-step-id>")+".outputs."+t.name+" }}"}`,t.value])}));e.endGroup();console.log(m.toString())}try{run()}catch(t){e.setFailed(t.message)}})();module.exports=n})();
//# sourceMappingURL=index.js.map