import { LitElement, css, html } from "lit";

export default class Microphone extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .svg-size {
      height: 44px;
      width: 44px;
    }
    .st0 {
      fill: none;
      stroke: #4c4c4c;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st1 {
      fill: none;
      stroke: #99b466;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;

  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    return html`<svg
      version="1.1"
      id="SimpliSpeak"
      xmlns:svg="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style="enable-background: new 0 0 24 24"
      class="svg-size"
      xml:space="preserve"
    >
      <svg:style type="text/css">
        .st0 {
          fill: none;
          stroke: #4c4c4c;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .st1 {
          fill: none;
          stroke: #99b466;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      </svg:style>
      <g id="Base">
        <path
          class="st0"
          d="M4,10.5v2c0,4.4,3.5,8,7.9,8c0,0,0.1,0,0.1,0c4.4,0,8-3.5,8-7.9c0,0,0-0.1,0-0.1v-2"
        />
        <line class="st0" x1="12" y1="20.5" x2="12" y2="23.5" />
        <line class="st0" x1="6" y1="23.5" x2="18" y2="23.5" />
        <line class="st0" x1="4" y1="12.5" x2="6" y2="12.5" />
        <line class="st0" x1="18" y1="12.5" x2="20" y2="12.5" />
      </g>
      <g id="Mic">
        <path
          class="st1"
          d="M18,12.5c0,3.3-2.7,6-6,6s-6-2.7-6-6v-6c0-3.3,2.7-6,6-6s6,2.7,6,6V12.5z"
        />
        <line class="st1" x1="12" y1="0.5" x2="12" y2="3.5" />
        <line class="st1" x1="14" y1="0.8" x2="14" y2="3.5" />
        <line class="st1" x1="10" y1="0.8" x2="10" y2="3.5" />
        <line class="st1" x1="6" y1="6.5" x2="10" y2="6.5" />
        <line class="st1" x1="6" y1="8.5" x2="10" y2="8.5" />
        <line class="st1" x1="18" y1="6.5" x2="14" y2="6.5" />
        <line class="st1" x1="18" y1="8.5" x2="14" y2="8.5" />
        <line class="st1" x1="6" y1="10.5" x2="10" y2="10.5" />
        <line class="st1" x1="18" y1="10.5" x2="14" y2="10.5" />
      </g>
    </svg>`;
  }
}


customElements.define("fid-microphone", Microphone);
