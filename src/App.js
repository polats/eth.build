import React from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';
import LiteGraphJS from 'litegraph.js/build/litegraph.js'
import 'litegraph.js/css/litegraph.css'
import CustomNodes from './CustomNodes'
// import ICON from './icon.png'
import StackGrid from "react-stack-grid";

import QrReader from "react-qr-reader";

import Dragger from './Dragger.js';
import { useDrop } from 'react-dnd'

import { Icon, Tooltip, Button, CardActions, Divider, Drawer, Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import lessons from './data/lessons';

import SaveDialog from "./dialogs/SaveDialog";
import LoadDialog from "./dialogs/LoadDialog";
import AboutDialog from './dialogs/AboutDialog';
import SettingsDialog from './dialogs/SettingsDialog';

import html2canvas from 'html2canvas';

var codec = require('json-url')('lzw');
var QRCode = require('qrcode.react')
const axios = require('axios');


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin:"5%"
  },
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },
});


console.log("LOAD MODULES")
let dynamicallyloadedis = require('./Modules')
console.log("dynamicallyloadedis",dynamicallyloadedis);
global.modules = {
  "price": {"nodes":[{"type":"Modules/Module","pos":[280,310],"size":{"0":140,"1":46},"flags":{},"order":0,"mode":0,"outputs":[{"name":"price","type":0,"links":null}],"properties":{"enabled":"on","title":"Price","color":"7eccc2"},"subgraph":{"last_node_id":16,"last_link_id":21,"nodes":[{"id":3,"type":"Control/Timer","pos":[180,220],"size":{"0":140,"1":26},"flags":{},"order":0,"mode":0,"outputs":[{"name":"on_tick","type":-1,"links":[10],"label":"30000ms"}],"properties":{"interval":30000,"event":"tick"},"boxcolor":"#222"},{"id":7,"type":"Storage/Variable","pos":[1110,190],"size":{"0":140,"1":26},"flags":{},"order":8,"mode":0,"inputs":[{"name":"in","type":0,"link":19}],"outputs":[{"name":"out","links":[11]}],"properties":{"varname":"price","global":true}},{"id":10,"type":"Modules/Output","pos":[1130,310],"size":[180,40],"flags":{},"order":10,"mode":0,"inputs":[{"name":"","type":0,"link":11}],"properties":{"name":"price"}},{"id":11,"type":"Input/Text","pos":[80,360],"size":[300,50],"flags":{},"order":1,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"string","links":[]}],"properties":{"blockieSize":50,"placeholder":"enter text here","title":"Text","value":"https://api.radarrelay.com/v2/markets/WETH-DAI/ticker"}},{"id":2,"type":"Input/Text","pos":[80,70],"size":[300,50],"flags":{},"order":2,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"string","links":[12]}],"properties":{"blockieSize":50,"placeholder":"enter text here","title":"Text","value":"https://api.coinmarketcap.com/v1/ticker/ethereum/"}},{"id":1,"type":"Network/Request","pos":[430,160],"size":{"0":180,"1":46},"flags":{},"order":4,"mode":0,"inputs":[{"name":"[url]","type":"string","link":12},{"name":"request","type":-1,"link":10}],"outputs":[{"name":"output","type":"object","links":[14],"label":1}],"properties":{"url":"https://api.coinmarketcap.com/v1/ticker/ethereum/","debounce":1000}},{"id":14,"type":"Input/Number","pos":[540,360],"size":[190,50],"flags":{"collapsed":true},"order":3,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"number","links":[15]}],"properties":{"placeholder":"#","title":"Number","value":"0"}},{"id":13,"type":"Object/index","pos":[650,320],"size":[190,60],"flags":{},"order":5,"mode":0,"inputs":[{"name":"obj","type":0,"link":14},{"name":"index","type":"number","link":15}],"outputs":[{"name":"value","type":"string,object,array","links":[17]},{"name":"index","type":"number","links":null}],"properties":{}},{"id":4,"type":"Object/property","pos":[670,190],"size":[190,30],"flags":{},"order":6,"mode":0,"inputs":[{"name":"obj","type":0,"link":17}],"outputs":[{"name":"","type":"","links":[18]}],"properties":{"value":"price_usd"}},{"id":6,"type":"Display/Watch","pos":[850,70],"size":[200,60],"flags":{},"order":9,"mode":0,"inputs":[{"name":"","type":0,"link":21,"label":""}],"properties":{}},{"id":16,"type":"Utils/To Float","pos":[900,220],"size":[170,30],"flags":{},"order":7,"mode":0,"inputs":[{"name":"","type":0,"link":18}],"outputs":[{"name":"","type":"number","links":[19,21]}],"properties":{}}],"links":[[10,3,0,1,1,-1],[11,7,0,10,0,0],[12,2,0,1,0,"string"],[14,1,0,13,0,0],[15,14,0,13,1,"number"],[17,13,0,4,0,0],[18,4,0,16,0,0],[19,16,0,7,0,0],[21,16,0,6,0,0]],"groups":[],"config":{},"version":0.4}}],"links":[]}
}

const touchHandler = (event)=>{



  //console.log("global.showLibrary",global.showLibrary)

    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; if(global.showLibrary==true){}else{event.preventDefault()};break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);



}


function App() {
  console.log("APP")

  /*
  window.addEventListener("wheel", event => {
    console.info(event.deltaY)
    event.preventDefault();
  });*/


  const [menu, setMenu] = React.useState("");

  const [selectToolActive, setSelectToolActive] = React.useState(false);




//  var defaultPrevent=function(e){e.preventDefault();}
//document.addEventListener("touchstart", defaultPrevent);
//document.addEventListener("touchmove" , defaultPrevent);
//
//
//
  const [moreInfo, setMoreInfo] = React.useState(false);

  const [drawing, setDrawing] = React.useState(false);
  const [drawingColor, setDrawingColor] = React.useState("#03A9F4");

  const classes = useStyles();

  const [snackbar, setSnackbar] = React.useState({msg:"",color:""});
  global.setSnackbar = setSnackbar

  const [readQr, setReadQr] = React.useState(false);

  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openAboutDialog, setOpenAboutDialog] = React.useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = React.useState(false);
  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const [openLoadDialog, setOpenLoadDialog] = React.useState(false);

  const [currentScreenShot, setCurrentScreenShot] = React.useState(null);

  const handleOpenSaveDialog = async () => {
    let canvas = await html2canvas(document.body);
    let canvasImg = canvas.toDataURL("image/png", 0.35);
    console.log({canvasImg});
    setCurrentScreenShot(canvasImg);
    setOpenSaveDialog(true);
  }

  const dynamicWidth = window.innerWidth/3
  /*
   document.ontouchstart = touchHandler
   document.ontouchmove = touchHandler
   document.ontouchend = touchHandler
   document.ontouchcancel = touchHandler
   */

    document.addEventListener("touchstart", touchHandler, {passive: false});
    document.addEventListener("touchmove", touchHandler, {passive: false});
    document.addEventListener("touchend", touchHandler, {passive: false});
    document.addEventListener("touchcancel", touchHandler, {passive: false});

    //console.log("ADDING KEY DOWN!!!",document.onkeydown)
    document.onkeydown = (keydown)=>{

      //console.log("EVENT")
      switch (keydown.key) {
        case "Escape":
          resetControls();
        break;
        case "`":
        case "~":
          toggleEmbedView();
        default:
          // console.log(keydown);
        break;
      }
    }

    const [{ isOver, isOverCurrent }, drop] = useDrop({
      accept: "node",
      drop(item, monitor) {
        //console.log("DROP!",item.monitor)
        const didDrop = monitor.didDrop()
        if (didDrop) {
          return
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    })

    const [{ isOver2, isOverCurrent2 }, drop2] = useDrop({
      accept: "node",
      drop(item, monitor) {
        //console.log("DROP!",item.monitor)
        const didDrop = monitor.didDrop()
        if (didDrop) {
          return
        }
      },
      collect: monitor => ({
        isOver2: monitor.isOver(),
        isOverCurrent2: monitor.isOver({ shallow: true }),
      }),
    })

// react state variables affected by local storage
const [showVideoLibrary, setShowVideoLibrary] = React.useState();
const [live, setLive] = React.useState();
const [embed, setEmbed] = React.useState();

function initializeSettings() {
  let showLibrary = localStorage.getItem("eth.build.showLibrary");
  let initialMode = localStorage.getItem("liveMode");
  let embedView = localStorage.getItem("embedView");

  setShowVideoLibrary(showLibrary === 'true');

  // uncomment to enable saving of initial states
  // setLive(initialMode);
  // setShare(shareView === 'true');
  //
  // if (initialMode === "View") {
  //   toggleLiveMode();
  // }

  // set some settings as global variables
  global.showLibrary = showLibrary;
  global.embedView = embedView;
}

function resetControls() {
    setMenu("")
    setDrawing("")
    global.graph.canvas.drawing = false
    global.graph.canvas.selectToolActive = false
    setSelectToolActive(global.graph.canvas.selectToolActive)
}

function toggleEmbedView() {
  localStorage.setItem("shareView", !embed);
  setEmbed(!embed);
}

function toggleLiveMode() {
  global.graph.canvas.switchLiveMode(true);
  setLive(!live);
}

// main code starts here
React.useEffect(()=>{
  console.log("MOUNT",LiteGraphJS)

  global.title = "eth.build"

  global.LiteGraphJS = LiteGraphJS
  var graph = new LiteGraphJS.LGraph();

  global.graph = graph

  //config
  LiteGraphJS.LiteGraph.debug = true

  console.log("can we set grid here?",LiteGraphJS.LiteGraph)

  var canvas = new LiteGraphJS.LGraphCanvas("#main", graph);

  window.addEventListener("resize", function() { canvas.resize(); } );

  graph.onAfterExecute = function() {
    canvas.draw(true);
  };

  window.onpagehide = function(){
    var data = JSON.stringify( graph.serialize() );
    localStorage.setItem("litegraph", data );
  }

  CustomNodes(LiteGraphJS)

  let url = window.location.pathname
  console.log("URL",url)
  if(url&&url.length>1){
    url = url.substring(1)

    if(url.indexOf("wof")==0){
      console.log("decompressing",url)

      var urlParams = new URLSearchParams(window.location.search);

      // if e key found on query string, this is an embedded share
      if (urlParams.has('e')) {
        setEmbed(true);
      }

      codec.decompress(url).then(json => {
        console.log("configure graph with:",json)
        graph.configure( json );
        //graph.start()
        graph.canvas = canvas

        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)

        window.history.pushState("", "", '/');

        setShowVideoLibrary(false);global.showLibrary=false;
      })
    }else if(url.indexOf("build")==0){
      console.log("THIS IS A BUILD")
      let key = window.location.hash.replace("#","")

      //let result = await axios.get("https://network.eth.build:44386/build",{})
      axios.get('https://network.eth.build:44386/build', {
        params: {
          key
        }
      }).then((result)=>{
        console.log("GET BUILD RESULT",result)
        let compressed = result.data.compressed
        codec.decompress(compressed).then(json => {
          console.log("configure graph with:",json)
          graph.configure( json );
          //graph.start()
          graph.canvas = canvas

          setLiteGraph(graph)
          setLiteGraphCanvas(canvas)

          window.history.pushState("", "", '/');

          setShowVideoLibrary(false);global.showLibrary=false;
        })
      })

    }


  }else{
    var data = localStorage.getItem("litegraph");
    if(data) {
      graph.configure( JSON.parse( data ) );
      //graph.start()
      graph.canvas = canvas
      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)
    } else {
      let defaultData = "wofCrGxhc3Rfbm9kZV9pZMONAcKZxIHEg8SFbGlua8SLxI0CH8KlxIfEiXPClsKKwqLEjMSOwobCpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpI6YMKkc2l6ZcKSw4zDiDLCpWbEgmdzwoDCpW9yxIlyAMKkbcSIZQDCpsSVxK50c8KRwoPCpG5hbWXCoMSmxKhlw7_CpMSUxJbDgMKnb8SvxZrEusWexaDFosWkxKfEqcO_wqXFqmvFnMONAhDFssWhxaPFpcSpwqdib29sZWFuxbnElcW7w4DCqnByb8SpcnRpZXPCg8KldmFsdWXCqGdlbmVyYXRlwqXGl3TGicKmxLJ0xLTGjGPFrm50S8ShxKMBXcaDZcKvQ3LEqMS0L0tleSBQYWlyxLfEucKSZMOMw5zEvsWAZcKCwqEww4pDU8KZwprCoTFCxYfFicWLxY3Fj8amAsWTxZXFl8WZxK_FscWfxoHCrVvGkmnGncapIGvHhsa8xbZlwqbEhHLElWfFqcaOxI7DpsaAxaLGosakxqbGqGXGvcWoxbrFrMWudMWwwpPIhWXCq8eyx7Rlx7bHhsa9x7x0x75uZ8aNxJZzwpDIlMaRdWLElGPImnnInMe9x7_IosW7yKXHrsWiwqdhZGRyxplzyK7InsiwxbrEusW9AsW9FsaRxpPGlcaXxpnCgcmGx7PIiseFecOZQjB4MzdjY2I3MGM4ZMmdZDc3NWHJpGI1M2RhyZs2OWZiyZxkMDJhYzA1NmFmOGPJrmLJujAxMTI4M2PEiTdmNjJkYsKJxKLEjQHCkca9wq9EaXNwxIJ5L0HIuMi6c3PHjcmBAWjDjMOSx5PFgcKSxI5UUMehYcWKxYzFjsWQBceoxInHqsStx6zFnci0xoLHusWSxbrJhMmGxpTGpsmJc8KEwqvIqW9ja8aYU8eUMsiWxIJjZWjGiMWQwqDGq2nGrWXCp8qcyLnIu8acxp7GoMOZKsmTN2LJsjFmNMmzYTI0MzFjYWVkM8m_NWZmN2XLuWU4MDDJpDljy6UzxrnKkFzKk8eAx4JvL03GpcWUbmljyqHKqQE2ZMqnx5XHl8eZOsu4x57HoMWIyq7Ho8qxxqYByrTFlsWYyrfFm8iTyrrCqlttzI_EtcySx7nFpsidyJ_IgMiOyJTCp1vElcSJeMy0xKnCpm51bWLGpsiBxavIlMiHxqXGp8apyIzNiGvFvRDFrcWvx6zCksiUyJbHvsiYyKzIvcy3yLHFvAHIhMq6wqjMsGXMkMySzZ3Iv8aOxbwCE8uAyYjGmHPCgcKlzL1leADKjsa6wojGvcKtypXKl8qZL1fGqGNozJQyw5DCnMyZyqkDVTzKrcqvx6TFkAPMp8q2xbDCkcKEyrrFtcWmyr3Igs2txblhzYZswqDNr8uCzbHCgM25ypB9xr3Cqs2-yphhyppRUsyUw4zCqsSOwprOisSOwpDOuc6PzKPHpXIEzpTMqc6WzpjFs8q7zpvNkMmCzp_Oocuiy6TLpjLLqMuqyaTLrcuvy7HLs8u1y77Lt8u8y7zLvsyAYcyCzITOpMaWzbHCgcKmcXLLjMWBxI4YzZ_ClcKWyIPEjlwAxI5dxZfIr8igz64CyYPGu8-6fQAAz7gQxKTPsgFcAsO_z7gTz7ABxI7CiM--z7gWz7PPusKRz77CpmfGk3VwyKTCpsa0bmZpZ8KAwqd2xqbEv8S1w4s_w5nCmdCq0KrCmg"
      codec.decompress(defaultData).then(json => {
        global.graph.configure( json )
        //graph.start()
        graph.canvas = canvas
        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)
      })
    }
  }

  initializeSettings();

  setInterval(()=>{
    //console.log(graph)
    graph.runStep()
  },250)
},[])


const barHeight = 45

//let compressed = await codec.compress(liteGraph.serialize())
//liteGraph?JSON.stringify( liteGraph.serialize(), null, 2 ):""
//

let allCards = []

allCards = lessons.map(lesson => {
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={()=>{  window.open(lesson.video) }}>
        <div style={{padding:3,fontSize:18,backgroundColor:lesson.color,color:"#FFFFFF",fontFamily: "'Rubik Mono One', sans-serif"}}>
          {lesson.header}
        </div>
        <CardMedia
          className={classes.media}
          image={lesson.image}
          title={lesson.name}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {lesson.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {lesson.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent:"center"}}>

        <Button size="small" variant="contained" onClick={()=>{
            codec.decompress(lesson.save).then(json => {
              global.graph.configure( json )
              global.graph.stop()
              global.graph.start()
              setShowVideoLibrary(false);global.showLibrary=false;
            })
          }}>
          Load
        </Button>

        <Button size="small" style={{marginLeft:20}} variant="contained" onClick={()=>{
            window.open(lesson.video)
          }}>
          Watch
        </Button>

      </CardActions>
    </Card>
  )
})


/* FOR TOP MENU FOR TABLETS:
<div style={{zIndex:1,position:"fixed",right:0,top:0,width:"100%"}}>
  <div style={{borderRadius:"0px 0px 8px 8px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,right:0,top:0,width:475,backgroundColor:"#DFDFDF"}}>
    <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

      <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
          alert("click")
        }}>
        <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
          <Icon>
            swap_vert
          </Icon>
        </Tooltip>
      </span>

    </div>
  </div>
</div>
*/

/*
<div style={{zIndex:1,position:"fixed",width:"100%",left:0,top:0}}>
  <Grid container className={classes.root} spacing={2}>
    {customNodes}
  </Grid>
</div>

 */


let [width, height] = useWindowSize();

const toggleDraw = (e)=>{
    let currentDrawing = drawing
    console.log("toggle draw",currentDrawing,drawingColor)
    currentDrawing = !currentDrawing
    if(currentDrawing){
      currentDrawing = drawingColor
      global.graph.canvas.drawing = drawingColor
      global.graph.canvas.selectToolActive = false
      setSelectToolActive(global.graph.canvas.selectToolActive)
    }else{
      global.graph.canvas.drawing = false
    }

    setDrawing(currentDrawing)
    console.log("toggle draw is now",global.graph.canvas.drawing)

}


let spacing = 0

const mouseEnter = (name,e)=>{
  //console.log(e.pageY,height)
  if(e.pageY > 60 && e.pageY < height-60){
    setMenu("")
  }else{
    setMenu(name)
  }
}

const mouseLeave = (e)=>{
  setMenu("")
}

const tabFontSize = 14

let extraTabs = []
//console.log("MENU:",menu)
let customNodes = []

if(!showVideoLibrary && !embed){

  for(let n in global.customNodes){
    //console.log("GRID",global.customNodes[n])
    //if(global.customNodes[n].name!="Special" && global.customNodes[n].name!="Modules"){
      if(!drawing && global.customNodes[n].name==menu){
        let positionStyle = {position:"absolute"}
        let style = {borderBottom:'3px solid #888888',whiteSpace:"nowrap",letterSpacing:-1,fontSize:14,margin:4,borderRadius:"8px 8px 8px 8px",padding:6,textAlign:"center",color:"#FFFFFF",backgroundColor:"#"+global.customNodes[n].color}
        if(n < 6 ){
          positionStyle.left = 0
        }else{
          positionStyle.right = 0
        }


        let items = []
        let itemspace = 40
        for(let i in global.customNodeItems[global.customNodes[n].name]){
          let item = global.customNodeItems[global.customNodes[n].name][i]
          //console.log("Add item",item)
          items.push([
            <div style={{...positionStyle,top:50+itemspace*i}}>
            <Dragger key={"dragger"+n+"_"+i} name={item.title} drop={(name,x,y)=>{
                //console.log("DO A DROP AT ",name,x,y)
                setMenu("")
                var node_watch = global.LiteGraphJS.LiteGraph.createNode(menu+"/"+item.title);
                node_watch.pos = [x-40+global.graph.canvas.visible_area[0],y+global.graph.canvas.visible_area[1]];
                //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                global.graph.canvas.graph.add(node_watch);
              }}>
              <div onMouseUp={()=>{
                  if(menu){
                    setMenu("")
                    var node_watch = global.LiteGraphJS.LiteGraph.createNode(menu+"/"+item.title);
                    node_watch.pos = [width/2-40+global.graph.canvas.visible_area[0],height/2+global.graph.canvas.visible_area[1]];
                    //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                    global.graph.canvas.graph.add(node_watch);
                  }

              }} style={style}>
                {item.title}
              </div>
            </Dragger>
            </div>
          ])
        }

        if(global.customNodes[n].name=="Modules"){

          /*
          items.push(<div key={"bar4"} style={{padding:4,position:"absolute",bottom:itemspace*4,width:"80%",borderTop:"1px solid #888888"}}></div>)

          let count = 3
          for(let m in global.modules){
            items.push(
              <Dragger key={"draggercustom"+m} name={m}  drop={(name,x,y)=>{
                  //console.log("DO A DROP AT ",name,x,y)
                  setMenu("")

                  localStorage.setItem("litegrapheditor_clipboard",JSON.stringify(global.modules[m]))
                  global.graph.canvas.last_mouse_position[0] = width/2
                  global.graph.canvas.last_mouse_position[1] = height/2
                  global.graph.canvas.pasteFromClipboard()
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();
                }}>
                  <div style={{...style,bottom:itemspace*count++}}>
                    {m}
                  </div>
              </Dragger>
            )
          }

          //items.push(<div key ={"bar3"} style={{padding:10,position:"absolute",bottom:itemspace*3,width:"100%",borderTop:"1px solid #999999"}}></div>)

          items.push(<div key={"bar3"} style={{padding:4,position:"absolute",bottom:itemspace*2,width:"80%",borderTop:"1px solid #888888"}}></div>)

          */



          items.push(
            <div style={{...positionStyle,bottom:itemspace*1}}>
              <div onMouseUp={()=>{
                  console.log("copying global to canvas")
                global.graph.canvas.copyToClipboard()
                let item = localStorage.getItem("litegrapheditor_clipboard")
                console.log(item)

                let webfile = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>URL</key>
    <string>https://eth.build/`+codec.compress(item)+`</string>
  </dict>
  </plist>
    `

                var file = new Blob([item]);
                var url = URL.createObjectURL( file );
                var element = document.createElement("a");
                element.setAttribute('href', url);
                element.setAttribute('download', "eth.build.module" );
                element.style.display = 'none';
                if(document.body){
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                  setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 );
                  setOpenSaveDialog(false)
                }
              }} style={{...style,bottom:itemspace*1}}>
                Save
              </div>
            </div>
          )
          items.push(
            <div style={{...positionStyle,bottom:itemspace*2}}>
              <div onMouseUp={()=>{
                document.getElementById("moduleloader").click()
              }} style={{...style,bottom:0}}>
                Load
              </div>
            </div>
          )
        }


        if(width < 1000 && global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"63% 52%",height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )

        } else if( global.customNodes[n].name=="Modules"){



            extraTabs.push(
              <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
                <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                    {global.customNodes[n].name}


                    {items}

                </div>
              </div>
            )

        }else if(width < 1000 && global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"46% 52%",height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )


        } else if(global.customNodes[n].name=="Components"){

            extraTabs.push(
              <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
                <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                    {global.customNodes[n].name}


                    {items}

                </div>
              </div>
            )

        }else{
          customNodes.push(
            <Grid key={"girdder"+n} onMouseLeave={mouseLeave}  item xs={1} style={{zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {width>800?global.customNodes[n].name:global.customNodes[n].icon}


                  {items}

              </div>
            </Grid>
          )
        }


      }else{
        if(drawing){
          if(global.customNodes[n].name!="Modules" && global.customNodes[n].name!="Special" && global.customNodes[n].name!="Components"){
            customNodes.push(
              <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-3,fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{
                  //console.log("SET COLOR",global.customNodes[n].color)
                  setDrawingColor("#"+global.customNodes[n].color)
                  global.graph.canvas.drawing = "#"+global.customNodes[n].color
                  setDrawing("#"+global.customNodes[n].color)
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();

                }}>
                <div style={{borderRadius:"0px 0px 8px 8px",padding:6,paddingTop:16,paddingBottom:8,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                </div>
              </Grid>
            )

          }

          //setDrawingColor
        }else if(width < 1000 && global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{overflow:"hidden",position:"absolute",bottom:80,height:200,right:0,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                  setMenu(global.customNodes[n].name)
                //}
              }}>
              <div style={{transform:"rotate(-90deg)",transformOrigin:"100px 30px",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:200,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(width < 1000 && global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{overflow:"hidden",position:"absolute",bottom:80,height:200,left:0,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                  setMenu(global.customNodes[n].name)
                //}
              }}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"22px 30px",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:200,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if( global.customNodes[n].name=="Special"){

        }else{
          customNodes.push(
            <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-3,fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY>60){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"0px 0px 8px 8px",padding:6,paddingTop:16,paddingBottom:8,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {width>800?global.customNodes[n].name:global.customNodes[n].icon}

              </div>
            </Grid>
          )
        }
      }

    //}

  }
}




let clickawayscreen = ""
if(!showVideoLibrary && !embed && menu){
  clickawayscreen = (
    <div ref={drop}  style={{position:"absolute",left:0,top:0,zIndex:1,width:"100%",height:"100%"}} onClick={()=>{setMenu("");if(global.graph&&global.graph.canvas.search_box)  global.graph.canvas.search_box.close()}}></div>
  )
}

let tools = ""


if(!showVideoLibrary && !embed && global.graph && global.graph.canvas){
  //console.log("TOOLSm",selectToolActive)
  tools = (
    <div>


      <div style={{margin:5}} onClick={async (e)=>{
          if(global.graph.canvas.search_box){
            global.graph.canvas.search_box.close()
            setMenu("")
          }else{
            global.graph.canvas.last_mouse_position[0] = e.clientX-209
            global.graph.canvas.last_mouse_position[1] = e.clientY
            global.graph.canvas.showSearchBox()
            //setMenu("search")
            setMenu("")
          }
          global.graph.canvas.last_mouse_position[0] = width/2
          global.graph.canvas.last_mouse_position[1] = height/2
        }}>
        <Tooltip title="Add Item [space bar]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            add_circle_outline
          </Icon>
        </Tooltip>
      </div>



      <div style={{margin:5}} onClick={async ()=>{
          if(global.graph.canvas.search_box) global.graph.canvas.search_box.close()
          global.graph.canvas.closeSubgraph()
          global.graph.canvas.ds.reset()
          global.graph.canvas.setDirty(true);
          global.graph.canvas.graph.change();
          setDrawing("")
          global.graph.canvas.drawing = false
          global.graph.canvas.selectToolActive = false
          setSelectToolActive(global.graph.canvas.selectToolActive)
        }}>
        <Tooltip title="Reorient [esc key]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            aspect_ratio
          </Icon>
        </Tooltip>
      </div>

      <div style={{margin:5,color:drawing?drawingColor:"#dddddd"}} onClick={toggleDraw}>
        <Tooltip title="Draw" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            create
          </Icon>
        </Tooltip>
      </div>


      <div style={{margin:5,color:selectToolActive?"#03A9F4":"#dddddd"}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectToolActive = !global.graph.canvas.selectToolActive
          setSelectToolActive(global.graph.canvas.selectToolActive)
          setDrawing("")
          global.graph.canvas.drawing = false
        }}>
        <Tooltip title="Select [hold ctrl]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            photo_size_select_small
          </Icon>
        </Tooltip>
      </div>



            <div style={{margin:5}} onClick={async ()=>{
                try{
                  global.graph.canvas.copyToClipboard()

                }catch(e){console.log(e)}
              }}>
              <Tooltip title="Copy [ctrl+c]" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  file_copy
                </Icon>
              </Tooltip>
            </div>

            <div style={{margin:5}} onClick={async ()=>{
              global.graph.canvas.pasteFromClipboard()
              global.graph.canvas.setDirty(true);
              global.graph.canvas.graph.change();
              }}>
              <Tooltip title="Paste [ctrl+v]" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  dynamic_feed
                </Icon>
              </Tooltip>
            </div>


            <div style={{margin:5,color:moreInfo?"#03A9F4":"#dddddd"}} onClick={async ()=>{
              global.graph.canvas.moreInfo = !global.graph.canvas.moreInfo
              setMoreInfo(global.graph.canvas.moreInfo)
              console.log("global.graph.canvas.moreInfo",global.graph.canvas.moreInfo)
              }}>
              <Tooltip title="Properties" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  more
                </Icon>
              </Tooltip>
            </div>


      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectNodes()
        }}>
        <Tooltip title="Select All [ctrl+a]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            select_all
          </Icon>
        </Tooltip>
      </div>




      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.deleteSelectedNodes()
          //console.log("global.graph.canvas",global.graph.canvas)
          global.LiteGraphJS.LiteGraph.closeAllContextMenus();
          if(drawing){
            //console.log("CLEAR INK FROM",global.graph.canvas)
            global.graph.canvas.ink = []
            global.graph.canvas.setDirty(true);
            global.graph.canvas.graph.change();
          }
        }}>
        <Tooltip title="Delete Selected [delete key]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            delete
          </Icon>
        </Tooltip>
      </div>




    </div>

  )
}

let extraMenus = ""
let bottomMenu = ""

bottomMenu = (
  <div style={{zIndex:1,position:"fixed",height:barHeight,left:0,bottom:0,width:"100%"}}>
    <div style={{borderRadius:"8px 8px 0px 0px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,left:0,bottom:0,width:575,backgroundColor:"#DFDFDF"}}>
      <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

        <span style={{margin:5,borderRight:"1px solid #cccccc",height:barHeight}} onClick={()=>{
            if (liteGraphCanvas.live_mode === true) {
                localStorage.setItem("liveMode", "Edit")
            } else {
              localStorage.setItem("liveMode", "View")
            }

            liteGraphCanvas.switchLiveMode(true);
            setLive(!live)
            liteGraphCanvas.draw();
          }}>
          <Tooltip title={live?"Edit":"View"} style={{marginRight:10,cursor:"pointer"}}>
            <Icon>
              {live?"create":"visibility"}
            </Icon>
          </Tooltip>
        </span>
        <span style={{margin:5,borderRight:"1px solid #cccccc",height:barHeight}} onClick={()=>{
            //console.log(liteGraph.status,playing)//cccccc.status==2
            if(playing){
              liteGraph.start()
              setPlaying(false)
            }else{
              liteGraph.stop()
              setPlaying(true)
            }
          }}>
          <Tooltip title={playing?"Playing":"Fast Forwarding"} style={{marginRight:10,cursor:"pointer"}}>
            <Icon>
              {playing ? "play_circle_outline":"fast_forward"}
            </Icon>
          </Tooltip>
        </span>

        <span onClick={()=>{setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true);}}
          onTouchStart={()=>{setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true);}}
        >
          <span style={{color:"#03a9f4"}}>eth</span>
          <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
          <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
        </span>

        <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={()=>{
            handleOpenSaveDialog()
          }}>
          <Tooltip title="Save" style={{marginLeft:10,cursor:"pointer"}}>
            <Icon>
              save
            </Icon>
          </Tooltip>
        </span>
        <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
            // document.getElementById("loadjsonfile").click()
            setOpenLoadDialog(true);
          }}>
          <Tooltip title="Load" style={{marginLeft:10,cursor:"pointer"}}>
            <Icon>
              open_in_browser
            </Icon>
          </Tooltip>
        </span>
        <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
            setOpenAboutDialog(true)
          }}>
          <Tooltip title="About" style={{marginLeft:10,cursor:"pointer"}}>
            <Icon>
              info
            </Icon>
          </Tooltip>
        </span>

        <span style={{margin:5,paddingLeft:10,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
            setReadQr(!readQr)
          }}>
          <Tooltip title="Scan" style={{marginLeft:10,cursor:"pointer"}}>
            <svg style={{width:24,height:24,opacity:0.95}} viewBox="0 0 24 24">
              <path fill="#000000" d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" />
            </svg>
          </Tooltip>
        </span>

        <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
            setOpenSettingsDialog(true)
            console.log("SDF")
          }}>
          <Tooltip title="Settings" style={{marginLeft:10,cursor:"pointer"}}>
            <Icon>
              build
            </Icon>
          </Tooltip>
        </span>

        <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
            setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true)
          }}>
          <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
            <Icon>
              swap_vert
            </Icon>
          </Tooltip>
        </span>

      </div>
    </div>
  </div>
)

if(!showVideoLibrary && !embed){
  extraMenus = (
    <div>
      <div style={{zIndex:8,position:"fixed",right:0,top:"20%",width:50}}>
        <div style={{borderRadius:"8px 0px 0px 8px",textAlign:"left",color:"#dddddd",height:400,right:0,top:0,width:475,backgroundColor:"#333333"}}>
          <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

            {tools}
          </div>
        </div>
      </div>

      <div style={{zIndex:2,marginRight:8,position:"fixed",width:width-16,left:8,top:0}} ref={drop2} >
        <Grid container spacing={3}>
          {customNodes}
        </Grid>
      </div>

      {extraTabs}

      {clickawayscreen}
    </div>
  )
}

let qrReader = ""
if(readQr){
  qrReader = (
    <div style={{zIndex:5,position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundColor:"#111111",}} onClick={()=>{setReadQr(false)}}>
      <QrReader
        delay={500}
        onError={(e)=>{
          console.log("ERROR",e)
        }}
        onScan={(result)=>{
          console.log("SCAN",result)
          if(result){
            if(result.indexOf("http")>=0){
              window.location = result
            }else{
              window.location = "https://eth.build/"+result
            }
          }
        }}
        style={{ margin:"auto", maxWidth: "80%", maxHeight: "80%"}}
        resolution={1200}
      />
    </div>
  )
}

return (
  <div className="App" style={{color:"#FFFFFF"}}>
    {qrReader}

    {extraMenus}

    <AboutDialog setOpenAboutDialog={setOpenAboutDialog} openAboutDialog={openAboutDialog}/>
    <SettingsDialog setOpenSettingsDialog={setOpenSettingsDialog} openSettingsDialog={openSettingsDialog}/>
    <SaveDialog liteGraph={liteGraph} setOpenSaveDialog={setOpenSaveDialog} openSaveDialog={openSaveDialog} dynamicWidth={dynamicWidth} screenshot={currentScreenShot} />
    <LoadDialog liteGraph={liteGraph} setOpenLoadDialog={setOpenLoadDialog} openLoadDialog={openLoadDialog} dynamicWidth={dynamicWidth} live={live} />

    {!embed ? bottomMenu : null }





    {/* <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="loadjsonfile" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result
              //console.log("compressedString",compressedString)
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                //console.log("loc",loc,"endloc",endloc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)
              codec.decompress(compressedString).then(json => {
                console.log("configure graph with:",json)
                if(json){
                  localStorage.setItem("litegraph",JSON.stringify(json));
                  liteGraph.configure( json );
                }
              })
            }
            try{
              reader.readAsText(e.target.files[0])
            }catch(e){console.log(e)}
          }}>
        </input>
      </span>
    </div> */}

    <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="moduleloader" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result

              /*
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)*/


                if(compressedString){
                  let json = compressedString
                  //  codec.decompress(compressedString).then(json => {
                      /////////
                      console.log("CLIP:",json)
                      localStorage.setItem("litegrapheditor_clipboard",json)
                      global.graph.canvas.last_mouse_position[0] = width/2
                      global.graph.canvas.last_mouse_position[1] = height/2
                      global.graph.canvas.pasteFromClipboard()
                      global.graph.canvas.setDirty(true);
                      global.graph.canvas.graph.change();
                  //  })

                }

            }
            try{
              reader.readAsText(e.target.files[0])
            }catch(e){console.log(e)}
          }}>
        </input>
      </span>
    </div>


    <div id="mainCanvas" style={{position:"relative",overflow:'hidden',background:"#222",width:'100%',height:"100%"}}>
      <canvas id='main' width={Math.max(100,width)} height={Math.max(100,height)} tabIndex={10} style={{background:"#111111",outline: 'none',borderBottom:'1px solid #666666'}}></canvas>
      <div id="reactElements"></div>
    </div>

    <canvas id="chart"  style={{outline: 'none', position:'absolute',left:-10000,top:-10000,zIndex:-1,width:320,height:240}}></canvas>

    <div id="clipboarddiv" style={{position:'absolute',left:-10000,top:-10000,zIndex:-1}}></div>


    <Drawer
      variant="persistent"
      anchor="bottom"
      open={showVideoLibrary}
      >
      <div style={{height:height*0.6,backgroundColor:"#eeeeee"}}>
        <div style={{margin:"auto",textAlign:"center",color:"#222222",height:barHeight+3,left:0,bottom:0,width:"100%",backgroundColor:"#DFDFDF"}}>
          <div style={{cursor:"pointer",letterSpacing:-5,borderBottom:"1px solid #999999",borderLeft:"1px solid #999999",borderRight:"1px solid #999999",fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}
            onTouchStart={
              async ()=>{
                setShowVideoLibrary(false);global.showLibrary=false;
                localStorage.setItem("eth.build.showLibrary",false)
              }
            }
            onClick={async ()=>{
              setShowVideoLibrary(false);global.showLibrary=false;
              localStorage.setItem("eth.build.showLibrary",false)
            }}>
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
            <span style={{margin:5,borderLeft:"1px solid #BBBBBB",height:barHeight}}>
              <Tooltip title="Collapse" style={{marginLeft:10,cursor:"pointer"}}>
                <Icon>
                  swap_vert
                </Icon>
              </Tooltip>
            </span>
          </div>
          <div>
            <StackGrid columnWidth={350}>
              {allCards}
            </StackGrid>
          </div>
        </div>
      </div>
    </Drawer>


    <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        key={'bottomcentersnackbar'}
        open={snackbar && snackbar.msg && snackbar.msg!=""}
        onClose={()=>{setSnackbar({msg:"",color:""})}}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        style={{marginBottom:100}}
        message={<span id="message-id" style={{fontFamily: "monospace",color:snackbar.color?snackbar.color:"#d33535",fontSize:22}}>{snackbar.msg}</span>}
      />
  </div>
);
}

//,borderRadius:"16px 16px 0px 0px"


function useWindowSize() {
  let [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([(window.clientWidth||window.scrollWidth||window.innerWidth),(window.clientHeight||window.scrollHeight||window.innerHeight)-8]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export default App;
