var app=angular.module("gwcMills",["ui.router","ui.bootstrap"]);app.controller("gwcMain",["$scope",function(e){"use strict";e.classModule=""}]).filter({toHTML:["$sce",function(e){"use strict";return function(t){return e.trustAsHtml(t)}}]}),app.constant("CONTENT_ROUTE",[{name:"main",title:"Girls Who Code",url:"/",views:{"@":{templateUrl:"home.html"}}},{name:"variables",url:"/variables",children:[{name:"summary",url:"/summary",views:{"@":{templateUrl:"variables/summary.html",controller:"varSummaryCtrl"}}},{name:"types",url:"/types",views:{"@":{templateUrl:"variables/variable-types.html",controller:"varTypeCtrl"}}}]},{name:"operations",url:"/operations",children:[{name:"summary",url:"/summary",views:{"@":{templateUrl:"operations/summary.html",controller:"opSummaryCtrl"}}},{name:"symbols",url:"/symbol",views:{"@":{templateUrl:"operations/symbols.html",controller:"opSymbolCtrl"}}},{name:"try",url:"/try",views:{"@":{templateUrl:"operations/try.html",controller:"opTryCtrl"}}}]},{name:"game",url:"/game",views:{"@":{templateUrl:"game/main-interface.html",controller:"gameCtrl"}}},{name:"guess",url:"/guess",views:{"@":{templateUrl:"function/function.html",controller:"guessCtrl"}}},{name:"html",url:"/html",children:[{name:"struct",url:"/structure",views:{"@":{templateUrl:"html/main.html"}}},{name:"lib",url:"/libraries",views:{"@":{templateUrl:"html/library.html"}}},{name:"samples",url:"/samples",views:{"@":{templateUrl:"html/sample.html"}}}]}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider","CONTENT_ROUTE",function(e,t,a,o){"use strict";function s(t,a){_.forEach(t,function(t){var o=a+"."+t.name;e.state(o,t),_.has(t,"children")&&s(t.children,o)})}_.forEach(o,function(t){e.state(t,t.name),s(t.children,t.name)}),t.otherwise("404"),a.html5Mode(!0)}]),app.controller("guessCtrl",["$scope",function(e){"use strict";e.test=""}]),app.controller("gameCtrl",["$scope","$timeout","$interval","$uibModal","VARIABLE_PROPERTIES","INSTRUCTIONS",function(e,t,a,o,s,n){"use strict";function r(t,a){delete t.message,e.cat[t.name]={value:a,text:t.text}}function i(){0===e.cat.happiness.value&&(a.cancel(m),e.gameSetting.lost=!0)}function l(t){e.modal={questions:[]},f=o.open({templateUrl:"game/game-modal.html",backdrop:"static",scope:e}),h=t,d=!0}function c(){2!==e.gameSetting.page||d||(_.isEmpty(e.messages)||e.messages.shift(),0===e.timer?(e.timer=10,e.cat.happiness.value--,e.cat.coins.value+=2,e.messages.push("happiness--"),e.messages.push("coins += 2"),i(),0!==u?u--:e.showerCat(!0),e.gameSetting.petCycle>0&&e.gameSetting.petCycle--):e.timer--)}function p(t,a,o,s){var n=[],r="+"===o?"increased":"reduced";1===a&&n.push(t+o+o+";"),n.push(t+" "+o+"= "+a+";"),n.push(t+" = "+t+" "+o+" "+a+";"),e.modal.questions.push({q:"<code>"+t+"</code> is "+r+" by <code>"+a+"</code>",name:s,answers:n})}e.catLists=["blackCat.png","blueCat.png","brownCat.png","greyCat.png","whiteCat.png","yellowCat.png"],e.variableProperties=_.cloneDeep(s),e.gameInstructions=_.cloneDeep(n),e.messages=[];var m,u,d,h,f,g=/^var [a-zA-Z]+ = [a-zA-Z0-9-\.\"]+;$/,y=[/^console.log\(.*\);$/,/^alert\(.*\);$/,/^window.alert\(.*\);$/],v=e.gameInstructions.length;e.closeModal=function(){d=!1,f.dismiss("cancel")},e.reset=function(){e.cat={inventory:{food:1,toy:1}},e.variableDefinitions={},e.timer=10,e.gameSetting={page:0,petCycle:0},u=5},e.noMessages=function(){var t=!0;return _.some(e.variableProperties,function(e){if(e.message)return void(t=!1)}),t},e.verifyInput=function(t,a){if(!e.variableDefinitions[t.name])return a[t.formName].$setDirty(),void(t.message="This field is required.");var o=e.variableDefinitions[t.name];if(_.isNull(o.match(g)))return void(t.message="Check your syntax.");try{if(window.eval(o),!_.has(window,t.name))return void(t.message=t.name+" is undefined");var s=window[t.name];if("number"==typeof s&&("integer"===t.type||"double"===t.type))return"integer"===t.type&&s!==parseInt(s)?void(t.message="Value of "+t.name+" must be an integer"):s>t.max||s<t.min?void(t.message="Value of "+t.name+" must be between "+t.min+" and "+t.max):void r(t,s);if(typeof s===t.type)return void r(t,s);t.message="Value of "+t.name+" must be a "+t.type}catch(e){t.message="Invalid input."}},e.getHelp=function(){e.gameSetting.help=!0,d=!0,e.gameSetting.helpStep=0},e.nextHelpHint=function(){e.gameSetting.helpStep++,e.gameSetting.helpStep===v&&e.closeHelp()},e.closeHelp=function(){m||(m=a(c,1e3)),e.gameSetting.help=!1,d=!1},e.talk=function(){l("talkToPet"),e.modal.questions=[{q:"What would you like to say to your pet? Use either <code>console.log</code> or <code>alert</code>",name:"talk"}]},e.showerCat=function(t){t||(l("showerCat"),p("happiness",e.cat.shower.value,"-","shower"))},e.petCat=function(){l("petCat"),p("happiness",e.cat.pet.value,"+","pet")},e.addInventory=function(t){l("addInventory"),p("coins",e.cat[t].value,"-","coin"),p(t,1,"+",t),e.modal.type=t},e.useInventory=function(t,a){l("useInventory"),p("happiness",e.cat[t].value,"+",t),p(a,1,"-",a),e.modal.type=a,e.modal.action=t},e.confirmAnswer=function(){e.gameSetting.verifyAnswer="";var t=[];if(_.forEach(e.modal.questions,function(e,a){if(_.has(e,"answers"))e.answers.indexOf(e.a)===-1&&t.push(a+1);else{var o=!1;_.some(y,function(t){if(!_.isNull(e.a.match(t)))return void(o=!0)}),o||t.push(1)}}),_.isEmpty(t)){"talkToPet"!==h&&e.closeModal(!0);var a,o;switch(e.messages.push(""),h){case"useInventory":a=e.modal.type,o=e.modal.action,e.cat.inventory[a]--,e.cat.happiness.value+=e.cat[o].value,e.messages.push(a+"--"),e.messages.push("happiness += "+e.cat[o].value);break;case"addInventory":if(a=e.modal.type,e.cat.coins.value<e.cat[a].value)return void e.messages.push("Not enough money :(");e.cat.inventory[a]++,e.cat.coins.value-=e.cat[a].value,e.messages.push(a+"++"),e.messages.push("coins -= "+e.cat[a].value);break;case"petCat":e.cat.happiness.value+=e.cat.pet.value,e.gameSetting.petCycle=5,e.messages.push("happiness += "+e.cat.pet.value);break;case"showerCat":e.cat.happiness.value-=e.cat.shower.value,e.messages.push("happiness -= "+e.cat.shower.value),u=5,i();break;case"talkToPet":try{if(window.eval(e.modal.questions[0].a),e.closeModal(!0),0===e.modal.questions[0].a.indexOf("console.log")){var s=/\((.*)\)/;e.messages.push(s.exec(e.modal.questions[0].a)[1])}}catch(t){console.log(t),e.gameSetting.verifyAnswer="Verify your syntax"}}}else e.gameSetting.verifyAnswer="Verify your answer for #"+t.join(",")},e.reset()}]),app.constant("INSTRUCTIONS",[{style:"top: 0; left: 70px;",rules:["This is the help button. It'll walk through all the game rules.","You may press the 'x' on the top-right-corner to stop it anytime.","Press the 'Next' button to proceed to the next rule."]},{style:"top: 50px; left: 40%;",rules:["This is a countdown timer.","<code>happiness--</code> everytime it becomes 0.","<code>coins += 2</code> everytime it becomes 0."]},{style:"top: 80px; right: 150px;",rules:["This is your pet's current happiness level.","You will lose when happiness level becomes 0."]},{style:"top: 80px; right: 10px;",rules:["This is your money.","You'll need it to buy inventories for your pet."]},{style:"top: 180px; left: 120px;",rules:["This is your Inventory: Food & Toy","To start-off, you are given 1 food & 1 toy for free!","Click on the item to add to your inventory."]},{style:"top: 360px; left: 80px;",rules:["You can now talk to your pet!"]},{style:"top: 250px; right: 90px;",rules:["These are the actions you can do with your pet.","It will change the happiness of your pet.","Cilck on the item to interact with your pet.","Shower is automatically done every 5 cycles.","You can only pet your cat once every 5 cycles."]},{style:"top: 250px; left: 30%;",rules:["Your pet is already at the playground.","Click 'Next' to start the game!","Remember actions only take effect when you correctly answered the question!"]}]),app.constant("VARIABLE_PROPERTIES",[{name:"petName",text:"name",formName:"nameInput",type:"string",description:"Name of your pet"},{name:"isFemale",text:"gender",formName:"genderInput",type:"boolean",description:"Is your cat a girl or a boy?"},{name:"happiness",text:"initial happiness",formName:"happinessInput",type:"integer",description:"Initial happiness level of your pet. Must be an integer between 20 and 50.",max:50,min:20},{name:"eat",text:"food reward",formName:"eatInput",type:"integer",description:"Amount of happiness your pet gains after eating. Must be an integer between 1 and 5.",min:1,max:5},{name:"play",text:"play reward",formName:"playInput",type:"integer",description:"Amount of happiness your pet gains after playing. Must be an integer between 1 and 5.",min:1,max:5},{name:"pet",text:"pet reward",formName:"petInput",type:"integer",description:"Amount of happiness your pet gains after being petted. Must be an integer between 1 and 3.",min:1,max:3},{name:"shower",text:"shower penalty",formName:"showerInput",type:"integer",description:"Amount of happiness your pet loses after a shower. Must be an integer between 3 and 8.",min:3,max:8},{name:"coins",text:"money",formName:"coinsInput",type:"double",description:"Amount of money you have to start the game. Must be a double between 20 and 50.",max:50,min:20},{name:"food",text:"food cost",formName:"foodInput",type:"number",restriction:"double",description:"Cost to feed your pet. Must be a double between 3 and 8.",min:3,max:8},{name:"toy",text:"toy cost",formName:"toyInput",type:"double",description:"Cost to play with your pet. Must be a double between 3 and 8.",min:3,max:8}]),app.controller("mainCtrl",["$scope",function(e){"use strict";e.test=""}]),app.controller("opSummaryCtrl",["$scope",function(e){"use strict";e.content={basics:[{sign:'<span class="font-lg">+</span>',description:'Same as the plus sign in math, it sums the two numbers: <code>var x = 4 + 2;</code> x is 6.<br />You may also use it for strings, which joins them together: <code>var y = "a" + "b";</code> y is "ab".'},{sign:'<span class="font-lg">-</span>',description:"Same as the minus sign in math, resultant is the difference between the two numbers: <code>var x = 4 - 2;</code> x is 2."},{sign:'<span class="font-lg">*</span>',description:"Same as the multiply sign in math, resultant is the product between the two numbers: <code>var x = 4 * 2;</code> x is 8."},{sign:'<span class="font-lg">/</span>',description:"Same as the divide sign in math, resultant is the quotient between the two numbers: <code>var x = 4 / 2;</code> x is 2.<br />Please note: for JavaScript, <code>var x = 3 / 2;</code> will give you <code>1.5</code>, while for some other languages, it'll be <code>1</code>."},{sign:'<span class="font-lg">%</span>',description:"This is the modulo symbol, resultant is the remainder of a / b: <code>var x = 7 % 3;</code> x is 1, since 7 - 6 = 1, where 6 = 3 * 2."}],one:[{sign:'<span class="font-lg">++</span>',description:"immediate <em>before</em> or <em>after</em> a variable: <code>++x</code> or <code>x++</code>.<br />The final result is <strong>one more</strong> than before. <br />For example, if <code>var x = 1;</code>, then with <code>x++</code>, x will become 2 (one more than before)."},{sign:'<span class="font-lg">--</span>',description:"immediate <em>before</em> or <em>after</em> a variable: <code>--x</code> or <code>x--</code>.<br />The final result is <strong>one less</strong> than before. <br />For example, if <code>var x = 1;</code>, then with <code>x--</code>, x will become 0 (one less than before)."}],equation:[{sign:'<span class="font-lg">+=</span>',description:"add right-hand-side value to self. For example: <code> x += y;</code> is the same as <code>x + y</code>.<br />So <code>x += 1;</code> is the same as <code>x++</code>, which is increment x by 1."},{sign:'<span class="font-lg">-=</span>',description:"subtract right-hand-side value from self. For example: <code> x -= y;</code> is the same as <code>x - y</code>.<br />So <code>x -= 1;</code> is the same as <code>x--</code>, which is decrement x by 1."},{sign:'<span class="font-lg">*=</span>',description:"multiply right-hand-side value to self. For example: <code> x *= y;</code> is the same as <code>x * y</code>."},{sign:'<span class="font-lg">/=</span>',description:"divide right-hand-side value to self. For example: <code> x /= y;</code> is the same as <code>x / y</code>."}]}}]),app.controller("opSymbolCtrl",["$scope",function($scope){"use strict";function _limitDecimalPlace(e){if(Math.floor(e)!==e){var t=e.toString().split(".")[1].length;t>5&&(e=Number(e).toFixed(5))}return e}function _evaluate(op){return eval(a+op+b)}var opIdx="",a,b,res;$scope.operations=["+","-","*","/","%"],$scope.reset=function(){a=Math.ceil(50*Math.random()),b=Math.ceil(50*Math.random()),opIdx=Math.floor(Math.random()*$scope.operations.length),res=_evaluate($scope.operations[opIdx]),res=_limitDecimalPlace(res);var e=a+" ___ "+b+" = "+res;$scope.variable={value:e,message:0,symbol:""}},$scope.verifyAnswer=function(){if(delete $scope.variable.message,$scope.variable.result=$scope.operations[opIdx]===$scope.variable.symbol,$scope.variable.result)return void($scope.variable.value=$scope.variable.value.replace("___",$scope.variable.symbol));var e=_evaluate($scope.variable.symbol);e===res&&($scope.variable.message="Correct! But there is another answer. Can you spot it?")},$scope.reset()}]),app.controller("opTryCtrl",["$scope",function(e){"use strict";function t(e){var t="name"===e?o:n,r=Math.floor(Math.random()*t);if("name"===e){var i=a[r];return o--,a.splice(r,1),i}return s[r]}var a,o,s=["+","-","*","/","%","++","--"],n=s.length;e.reset=function(s){a="abcdefghijklmnopqrstuvwxyz".split(""),o=a.length,s&&s.$setPristine(),e.answer=void 0,e.first={name:t("name")},e.op={name:t("operator")},e.second="++"!==e.op.name&&"--"!==e.op.name?{name:t("name")}:void 0},e.validateInput=function(t){if(!_.has(e[t],"value"))return!0;try{var a=e[t].value;window.eval(a);var o=e[t].name;if(!_.has(window,o))return e[t].message=o+" is undefined",!1;var s=window[o];return"number"!=typeof s?(e[t].message=o+" is not a number",!1):(delete e[t].message,e[t].num=s,!0)}catch(a){return e[t].message="Incorrect JavaScript format",!1}},e.getAnswer=function(){var t;if(e.second){t=e.first.num+" "+e.op.name+" "+e.second.num;var a=window.eval(t);e.answer=e.first.name+" "+e.op.name+" "+e.second.name+" = "+a}else t=e.first.num+e.op.name,window.eval(e.op.value),e.answer=e.first.name+" becomes "+window[e.first.name]},e.reset()}]),app.controller("varSummaryCtrl",["$scope",function(e){"use strict";e.content={variables:[{title:"Name Tag",description:"A name tag is a variable that stores a person's name.",img:"lib/assets/nametag.png"},{title:"Box",description:"A box is a variable that stores a present.",img:"lib/assets/box.jpeg"},{title:"Lockers",description:"A locker is a variable that stores personal belongings",img:"lib/assets/lockers.jpg"}],types:[{title:"String",description:'String is a sequence of characters enclosed by quotation marks <code>"</code>.'},{title:"Boolean",description:"Boolean is either <code>true</code> (yes) or <code>false</code> (no)."},{title:"Number",description:"Number is either an <code>integer</code> or a <code>double</code>.<br />An integer is any whole number, i.e.: -1, 0, 1.<br />A double is any number with a decimal point, i.e.: 1.0, 0.9"}]}}]),app.controller("varTypeCtrl",["$scope",function(e){"use strict";function t(){var e=Math.floor(100*Math.random());return!!(e%2)}function a(e){var t="integer"===e?0:Math.floor(10*Math.random()+1),a=100*Math.random();return Number(a).toFixed(t)}function o(){var o=Math.floor(3*Math.random());if(s=e.optionKeys[o],"boolean"===s)return t();if("integer"===s||"double"===s)return a(s);var r=Math.floor(Math.random()*l+2),i="";return i=r===l?t():r>l?a("double"):n[r],'"'+i+'"'}var s="",n="abcdefghijklmnopqrstuvwxyz ;:?/.>,<!@#$%^&*()_-=+[]{}".split(""),r=["Do you see quotes around the variables?","Is it true or false?","Is it a word?","Does it have a decimal point?","Is this a numeric value?"],i=r.length,l=n.length;e.optionKeys=["integer","double","string","boolean"],e.verifyAnswer=function(){return e.variable.message=1,e.variable.result=s===e.variable.type,e.variable.result},e.reset=function(){e.variable={value:o(),message:0,type:""}},e.getHelp=function(){var e=Math.floor(Math.random()*i);return r[e]},e.reset()}]);