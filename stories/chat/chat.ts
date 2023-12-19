import { LitElement, css, html } from "lit";
import { property } from "lit/decorators";

import { WaveFile } from "wavefile/dist/wavefile";
import { injectSpriteSheet, PvdButton, PvdIcon } from 'pvd3';


injectSpriteSheet();              // required if you are using any component that renders an icon (injects all icons)
PvdButton.defineCustomElement();  // defines a 'pvd-button' custom element
PvdIcon.defineCustomElement();

import MediaRecorder from "./Speech/index";

export default class VoiceChat extends LitElement {

    mediaRecorder:any = null;
    audiofile?:any = null;
    download:any = this.renderRoot.querySelector("#download");
    siriWave:any = null;

    @property()    
    label:string = "NA",
    
    @property()
    recognizefunc:any = null

    @property()
    token:string =  "abcd"


    message:string  = "ready";
    currentMessage:string = "type or record something";
    showPlay:boolean =  false;
    isRecording:boolean =  false;
    hideAnimation: boolean;
    hideButton: boolean;
    pulseAnimation: boolean;

 


    stop() {
        this.mediaRecorder.stop();
        this.message = "recording stopped hit download";
        this.showPlay = true;
        this.isRecording = false;
    }

    textToSpeech(file:any) {
        var myHeaders = new Headers();
        myHeaders.append("FID-LOG-TRACKING-ID", "IAM_WAS_HERE");
        myHeaders.append("VX-SB-APPID", "AP139709");
        myHeaders.append("BIT", "16");
        myHeaders.append("Authorization", "Bearer " + this.token);
        myHeaders.append(
        "Cookie",
        "MC=9bKZDfxJ_sJq_DWfHxGe1VFUJEcSAmRj6PP5qnMpgeRo39viqjMGBAAAAQAGBWRj6PMAQ03"
        );

        var formdata = new FormData();
        formdata.append("audiofile", file, "Audio1.wav");

        var requestOptions:any = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
        };
        this.message =  "parsing";
        fetch(
        "https://simplibyt-xq1-aws.fmr.com/v1/simplibytes/stt/instant",
        requestOptions
        )
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            
            this.currentMessage = result.text,
            this.message = "",
            
        })
        .catch((error) => console.log("error", error));
    }

  start() {
    this.mediaRecorder.start();
    this.audiofile = null;
    this.showPlay = false;
    this.message = "recording....";
    this.isRecording = true;
    
  }

  play() {
    const audio = new Audio(this.audiofile);
    audio.play();
  }

  send() {
    const sendEvent = new CustomEvent('send', { detail: { message : this.currentMessage } });
    this.dispatchEvent(sendEvent);
    this.currentMessage= "";
    this.showPlay= true;
    this.isRecording = false;
  }



  release() {
    this.hideAnimation = true
    setTimeout(() => {
      this.hideButton = true
      this.dispatchEvent(new Event('action'))
    }, 500)
  }

  showButton() {
    this.hideAnimation = false
    this.hideButton = false
  }

  mouseleave() {
    this.pulseAnimation = false
    setTimeout(() => {
      this.pulseAnimation = true
    }, 500)
  }

  
  handleSuccess(stream:any) {
    this.mediaRecorder = new MediaRecorder(stream);
    let arraybuffer;

    this.mediaRecorder.addEventListener("dataavailable", async (e) => {
      arraybuffer = await e.data.arrayBuffer();

      const wav = new WaveFile(new Uint8Array(arraybuffer));
      wav.toRIFF();
      wav.toBitDepth(16);
      wav.toSampleRate(16000);

      const wavblob = new Blob([wav.toBuffer()], {
        type: "audio/wav",
      });

      this.audiofile = URL.createObjectURL(wavblob);

      arraybuffer = null;

      this.dispatchEvent(new CustomEvent("recored", this.audiofile));

      this.textToSpeech(wavblob);

    });

    this.mediaRecorder.addEventListener("stop", () => {
    this.showPlay= true;
    this.download = this.renderRoot.querySelector("#download");
    this.download.download = "acetest.wav";
    this.download.href = this.audiofile;
    
      setTimeout(() => {
        this.download = this.renderRoot.querySelector("#download");
        this.download.download = "acetest.wav";
        this.download.href = this.audiofile;
      }, 1000);
      arraybuffer = null;
      
    });

  }




  connectedCallback(){
    super.connectedCallback();

    navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((s) => {
      this.message =  "Audio enabled...";
      this.handleSuccess(s);
    });
}


 // Define scoped styles right with your component, in plain CSS


  // Render the UI as a function of component state
  render() {
    
    return html`
  <link rel="stylesheet" href="node_modules/@fmr-ap109253/providence/dist/css/pvd.css" />
    <style>
      .speech {
        text-align:'left';
        border: 1px ${this.isRecording ? "red" : "black"}
          ${this.isRecording ? "dashed" : "solid"};
        padding: 10px;
        
      }

      siri-wave {
        width: 600px;
        height: 300px;
        background-size: cover;
        margin: 20px;
        margin: 0 auto;
        border: 1px dashed rgba(255, 255, 255, 0.4);
      }

      @keyframes disappear {
        0% {
          transform: scale(1.2, 1.2);
        }
        100% {
          transform: rotateX(90deg);
        }
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1, 1);
        }
        50% {
          transform: scale(0.8, 0.8);
        }
        100% {
          transform: scale(1, 1);
        }
      }
      
      @keyframes grow {
        0% {
          transform: scale(1, 1);
        }
        100% {
          transform: scale(1.2, 1.2);
        }
      }
      
      @keyframes shrink {
        0% {
          transform: scale(1.2, 1.2);
        }
        100% {
          transform: scale(1, 1);
        }
      }
      
      .recordButton {
        border-radius: 50%;
        height: 4em;
        width: 4em;
        margin: auto;
        display: inline-block;
        border: 3px solid grey;
        transition: transform 0.2s ease-in-out, background-color 0.1s ease-in-out;
      }
      
      .pulse {
        animation: pulse 6s infinite linear;
      }
      
      @media only screen and (min-width: 915px) {
        .recordButton {
          height: 4em;
          width: 4em;
        }
      }
      
      /* .recordButton:hover {
        animation: grow .5s forwards;
        cursor: pointer;
      } */
      
      @media (hover: hover) and (pointer: fine) {
        .idle-animate:hover {
          animation: grow 0.5s forwards;
          cursor: pointer;
        }
      
        .shrink:not(:hover) {
          animation: shrink 0.5s forwards;
        }
      }
      
      .hide-button {
        animation-name: disappear;
        animation-iteration-count: 1;
        animation-duration: var(--leave-animation-time);
        transform: rotateX(90deg);
      }
    </style>      
<div class="speech">
        ${this.label} <br />

        ${this.isRecording
          ? html`<fid-wave width="300" height="200" id="siri"></fid-wave>`
          : html`
              <textarea
                .value=${this.currentMessage}
                @change=${(e:any) => {
                    this.currentMessage = e.target.value,
               }}
                cols="60"
                rows="5"
              ></textarea>
            `}
        <br />
       
        ${this.showPlay ? html`<pvd-button pvd-variant="invitation" pvd-icon-left="action__chat" @click=${() => this.send()} id="send">Send</pvd-button>` : null}
       
        ${this.isRecording
          ? html` <pvd-button pvd-variant="invitation" pvd-icon-left="action__decrease" @click=${() => this.stop()} id="stop">Stop</pvd-button>`
          : html`<fid-microphone :class="{
            'elevation-5': true,
            'focusable-record-button': true,
            shrink: !pulseAnimation && !hideAnimation,
            pulse: pulseAnimation && !hideAnimation,
            recordButton: true,
            'idle-animate': !hideAnimation,
            'hide-button': hideAnimation
          }"
          :style="{ '--leave-animation-time': leaveAnimationTime + 'ms', height: '10px', width: '10px' }"
          role="button"
          aria-label="Record"
          alt=""
          draggable="false"
          @keyup.enter="release"
          @mouseup="release"
          @mouseleave="mouseleave" @click=${() => this.start()} id="start"></fid-microphone>`}
        ${this.showPlay
          ? html`
          <pvd-button pvd-variant="invitation" pvd-icon-left="media__audio" @click=${() => this.play()}>Play</pvd-button>`
          : ``}
        <br />
        ${this.message}
      </div>

    `;
  }
}


customElements.define("fid-voice-chat", VoiceChat);
