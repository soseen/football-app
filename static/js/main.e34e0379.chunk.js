(this["webpackJsonpreact-app-1"]=this["webpackJsonpreact-app-1"]||[]).push([[0],{50:function(e,t,a){e.exports=a.p+"static/media/bg-1.e4e2cd7f.jpg"},54:function(e,t,a){e.exports=a(88)},59:function(e,t,a){},64:function(e,t,a){},66:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),l=a.n(c),s=(a(59),a(60),a(61),a(62),a(15)),o=a(16),m=a(19),i=a(17),u=a(18),h=(a(63),a(64),a(8)),d=a.n(h),g=a(95),p=a(96),f=a(43),w=a(97),E=(a(66),function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(m.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={selectedLeague:"PL"},a.findClub=function(){a.props.selectLeague(a.state.selectedLeague)},a.handleChange=function(e){var t=e.target.options[e.target.selectedIndex].getAttribute("name");a.setState({selectedLeague:t})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(g.a,{bg:"dark",variant:"dark",className:"navbar"},r.a.createElement(p.a,{inline:!0},r.a.createElement(f.a,null,r.a.createElement(p.a.Control,{as:"select",name:"select",id:"selectLeague",className:" mr-sm-2",ref:"club",onChange:function(t){return e.handleChange(t)}},r.a.createElement("option",{name:"PL"},"Premier League"),r.a.createElement("option",{name:"PD"},"La Liga"),r.a.createElement("option",{name:"SA"},"Serie A"),r.a.createElement("option",{name:"BL1"},"Bundesliga"),r.a.createElement("option",{name:"FL1"},"Ligue 1"))),r.a.createElement(w.a,{variant:"dark",id:"btn-1",onClick:this.findClub},"Search")))}}]),t}(r.a.Component)),T=a(93),b=a(44),y=a(94),x=a(31),v=(a(87),"d4a9110b90c6415bb3d252836a4bf034"),k=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(m.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={leagueCode:" ",leagueIndex:0,leagueTable:[],leagueFixtures:[],leagueResults:[],currentWeek:0,matchInfo:[],collapseID:""},a.getData=function(e){var t,n,r;return d.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,d.a.awrap(fetch("https://api.football-data.org/v2/competitions",{headers:{"X-Auth-Token":v},mode:"cors"}));case 2:return t=c.sent,c.next=5,d.a.awrap(t.json());case 5:for(r in(n=c.sent).competitions)n.competitions[r].code===e&&a.setState({leagueCode:n.competitions[r].code,leagueIndex:n.competitions[r].id});a.getStandings(),a.getCurrentWeekFixtures();case 9:case"end":return c.stop()}}))},a.getStandings=function(){var e,t,n,r,c;return d.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,d.a.awrap(fetch("https://api.football-data.org/v2/competitions/".concat(a.state.leagueIndex,"/standings"),{headers:{"X-Auth-Token":v},mode:"cors"}));case 2:return e=l.sent,l.next=5,d.a.awrap(e.json());case 5:for(r in t=l.sent,console.log(t.standings),n=t.standings[0],a.setState({leagueTable:[]}),n.table)(c=a.state.leagueTable.slice()).push({position:n.table[r].position,index:n.table[r].team.id,name:n.table[r].team.name,crest:n.table[r].team.crestUrl,points:n.table[r].points,played:n.table[r].playedGames,won:n.table[r].won,drew:n.table[r].draw,lost:n.table[r].lost,goalsFor:n.table[r].goalsFor,goalsAgainst:n.table[r].goalsAgainst,goalDifference:n.table[r].goalDifference}),a.setState({leagueTable:c});console.log(a.state.leagueTable);case 11:case"end":return l.stop()}}))},a.getCurrentWeekFixtures=function(){var e,t;return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.a.awrap(fetch("https://api.football-data.org/v2/competitions/".concat(a.state.leagueIndex,"/matches?status=SCHEDULED"),{headers:{"X-Auth-Token":v},mode:"cors"}));case 2:return e=n.sent,n.next=5,d.a.awrap(e.json());case 5:t=n.sent,console.log(t),a.setState({leagueFixtures:[],currentWeek:t.matches[0].matchday}),console.log(a.state.currentWeek),a.getFixtures(a.state.currentWeek);case 10:case"end":return n.stop()}}))},a.getFixtures=function(e){var t,n,r,c;return d.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,d.a.awrap(fetch("https://api.football-data.org/v2/competitions/".concat(a.state.leagueIndex,"/matches?matchday=").concat(e),{headers:{"X-Auth-Token":v},mode:"cors"}));case 2:return t=l.sent,l.next=5,d.a.awrap(t.json());case 5:for(r in n=l.sent,console.log(n),a.setState({leagueFixtures:[]}),n.matches)c=a.state.leagueFixtures.slice(),null==n.matches[r].score.fullTime.homeTeam&null==n.matches[r].score.fullTime.awayTeam?c.push({index:n.matches[r].id,status:n.matches[r].status,homeTeamName:n.matches[r].homeTeam.name,homeTeamID:n.matches[r].homeTeam.id,awayTeamName:n.matches[r].awayTeam.name,awayTeamID:n.matches[r].awayTeam.id,homeTeamScore:"-",awayTeamScore:"-"}):c.push({index:n.matches[r].id,status:n.matches[r].status,homeTeamName:n.matches[r].homeTeam.name,homeTeamID:n.matches[r].homeTeam.id,awayTeamName:n.matches[r].awayTeam.name,awayTeamID:n.matches[r].awayTeam.id,homeTeamScore:n.matches[r].score.fullTime.homeTeam,awayTeamScore:n.matches[r].score.fullTime.awayTeam}),a.setState({leagueFixtures:c});console.log(a.state.leagueFixtures);case 10:case"end":return l.stop()}}))},a.displayPreviousGameweek=function(){var e=a.state.currentWeek-1;a.setState({currentWeek:a.state.currentWeek-1}),a.getFixtures(e)},a.displayNextGameweek=function(){var e=a.state.currentWeek+1;a.setState({currentWeek:a.state.currentWeek+1}),a.getFixtures(e)},a.displayMatchStatistics=function(e){var t,n,r;return d.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,d.a.awrap(fetch("https://api.football-data.org/v2/matches/".concat(e),{headers:{"X-Auth-Token":v},mode:"cors"}));case 2:return t=c.sent,c.next=5,d.a.awrap(t.json());case 5:n=c.sent,console.log(n),a.setState({matchInfo:[]});try{(r=a.state.matchInfo.slice()).push({index:n.match.id,status:n.match.status,matchday:n.match.matchday,homeTeamName:n.match.homeTeam.name,homeTeamID:n.match.homeTeam.id,awayTeamName:n.match.awayTeam.name,awayTeamID:n.match.awayTeam.id,homeTeamScore:n.match.score.fullTime.homeTeam,awayTeamScore:n.match.score.fullTime.awayTeam,halfTimehomeTeamScore:n.match.score.halfTime.awayTeam,halfTimeawayTeamScore:n.match.score.halfTime.awayTeam,referee:n.match.referees[0].name,venue:n.match.venue}),a.setState({matchInfo:r}),console.log(a.state.matchInfo)}catch(l){alert("No Details")}case 9:case"end":return c.stop()}}))},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(E,{selectLeague:this.getData}),r.a.createElement(T.a,null,r.a.createElement(b.a,null,this.state.leagueTable.length>0&&r.a.createElement(y.a,{className:"league-table",width:"40%",striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{colSpan:"10",align:"center"},"League Table")),r.a.createElement("tr",null,r.a.createElement("th",null,"Position"),r.a.createElement("th",null,"Team"),r.a.createElement("th",null,"Played"),r.a.createElement("th",null,"Points"),r.a.createElement("th",null,"W"),r.a.createElement("th",null,"D"),r.a.createElement("th",null,"L"),r.a.createElement("th",null,"GF"),r.a.createElement("th",null,"GA"),r.a.createElement("th",null,"GD"))),r.a.createElement("tbody",null,this.state.leagueTable.map((function(e){return r.a.createElement("tr",{key:e.position},r.a.createElement("td",null,e.position),r.a.createElement("td",{width:"20%",className:"table-team-name"},r.a.createElement("img",{src:e.crest,alt:"crest",className:"crest"})," ",e.name),r.a.createElement("td",{width:"10%"},e.played),r.a.createElement("td",{width:"10%"},e.points),r.a.createElement("td",{width:"10%"},e.won),r.a.createElement("td",{width:"10%"},e.drew),r.a.createElement("td",{width:"10%"},e.lost),r.a.createElement("td",{width:"10%"},e.goalsFor),r.a.createElement("td",{width:"10%"},e.goalsAgainst),r.a.createElement("td",{width:"10%"},e.goalDifference))}))))),r.a.createElement(b.a,null,this.state.leagueFixtures.length>0&&r.a.createElement(y.a,{className:"fixtures-table",width:"40%%",striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{colSpan:"3"},r.a.createElement(w.a,{variant:"dark",id:"btn-1",className:"arrow-left",onClick:this.displayPreviousGameweek},r.a.createElement(x.d,{icon:"caret-left"})),"Gameweek ",this.state.currentWeek,r.a.createElement(w.a,{variant:"dark",id:"btn-1",className:"arrow-right",onClick:this.displayNextGameweek},r.a.createElement(x.d,{icon:"caret-right"}))))),r.a.createElement("tbody",null,this.state.leagueFixtures.map((function(t){return r.a.createElement("tr",{onClick:function(){return e.displayMatchStatistics(t.index)},className:"fixture-row",key:t.index},r.a.createElement("td",{width:"40%",align:"right"},t.homeTeamName),r.a.createElement("td",{width:"20%"},t.homeTeamScore," : ",t.awayTeamScore),r.a.createElement("td",{width:"40%",align:"left"},t.awayTeamName))})))))),r.a.createElement(T.a,null,r.a.createElement(b.a,null),r.a.createElement(b.a,null,this.state.matchInfo.length>0&&r.a.createElement(y.a,{className:"fixtures-table",width:"40%%",striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("tbody",null,this.state.matchInfo.map((function(e){return r.a.createElement("tr",{key:e.index},r.a.createElement("td",{width:"40%",align:"right"},e.homeTeamName),r.a.createElement("td",{width:"20%"},e.homeTeamScore," : ",e.awayTeamScore),r.a.createElement("td",{width:"40%",align:"left"},e.awayTeamName))})),this.state.matchInfo.map((function(e){return r.a.createElement("tr",{key:e.index},r.a.createElement("td",{colSpan:"3"},"Referee: ",e.referee))})),this.state.matchInfo.map((function(e){return r.a.createElement("tr",{key:e.index},r.a.createElement("td",{colSpan:"3"},"Venue: ",e.venue))})))))))}}]),t}(r.a.Component),S=a(50),I={width:"88%%",height:"1200px",background:"url(".concat(a.n(S).a,")"),backgroundSize:"cover",backgroundPosition:"center"},N=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{style:I},r.a.createElement("div",null,r.a.createElement(k,null)))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[54,1,2]]]);
//# sourceMappingURL=main.e34e0379.chunk.js.map