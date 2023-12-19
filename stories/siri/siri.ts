import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import SiriWave from "siriwave";

const BUFFER_SIZE = 1024;
const MAX_READING = 80; // How loud of audio till we consider it max
const ZERO = 127;
const UPDATE_INTERVAL = 50; // How often in ms do we update
const MAX_AMPLITUDE = 4; // The max amplitude of the waveform
const RECORD_SPEED = 0.3; // The speed of the waveform when recording
const STANDBY_AMPLITUDE = 0.5; // The amplitude of the waveform when in standby
const STANDBY_SPEED = 0.001; // The speed of the waveform on standby

const COLOR_ONE = "86, 130, 0";
const COLOR_TWO = "121,181,0";
const COLOR_THREE = "86, 130, 0";
const SUPPORT_LINE_COLOR = "121,181,0";

const ELEMENT_ID = "#siriwave";

@customElement("fid-wave")
class Siri extends LitElement {
  siriWave: any = null;

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      this.InitSiriWare();
    }, 1000);
  }

  static styles = css`
    #siriwave {
      background-size: cover;
      margin: 20px;
      margin: 0 auto;
      background-color: white;
      border: 1px dashed rgba(255, 255, 255, 0.4);
    }

    #siriwave canvas {
      float: left;
    }
  `;

  InitSiriWare() {

    debugger;
    this.siriWave = new SiriWave({
      container:
        this.renderRoot.querySelector(ELEMENT_ID) || document.createElement("div"),
      height: this.height,
      style: "ios9",
      speed: RECORD_SPEED,
      color: "#000000",
      pixelDepth: 0.4,
      curveDefinition: [
        {
          color: SUPPORT_LINE_COLOR,
          supportLine: true,
        },
        {
          color: COLOR_ONE,
        },
        {
          color: COLOR_TWO,
        },
        {
          color: COLOR_THREE,
        },
      ],
    });
  }

  constructor() {
    super();
  }

  @property({ type: Number })
  height: number = 100;

  @property({ type: Number })
  width: number = 300;

  @property()
  show: boolean = true;

  render() {
    return html`
      <div
        id="siriwave"
        style="height:${this.height}px;width:${this.width}px"
        class="wave"
      ></div>
    `;
  }
}

export default Siri;
