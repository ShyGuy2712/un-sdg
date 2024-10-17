import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class unSdg extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg";
  }

  // sets default vars
  constructor() {
    super();
    this.goal = 'circle';  // deafault to SDG logo
    this.width = '254px';
    this.altText = 'Sustainable developments logo';     // altText for when img doesn't load
    this.colorOnly = false;
    this.loading = 'lazy';
    this.fetchPriority = 'low';
  }

  // sets variably types
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      width: { type: Number },
      altText: { type: String },
      colorOnly: { type: Boolean, reflect: true },
      loading: { type: String, reflect: true },
      fetchPriority: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        // create var for background color for each goal
        --un-sdg-goal-1: rgb(235, 28, 44);
        --un-sdg-goal-2: rgb(210, 160, 42);
        --un-sdg-goal-3: rgb(44, 155, 72);
        --un-sdg-goal-4: rgb(194, 31, 51);
        --un-sdg-goal-5: rgb(239, 64, 42);
        --un-sdg-goal-6: rgb(0, 173, 216);
        --un-sdg-goal-7: rgb(253, 183, 19);
        --un-sdg-goal-8: rgb(143, 23, 55);
        --un-sdg-goal-9: rgb(243, 109, 36);
        --un-sdg-goal-10: rgb(224, 21, 131);
        --un-sdg-goal-11: rgb(249, 157, 37);
        --un-sdg-goal-12: rgb(207, 141, 42);
        --un-sdg-goal-13: rgb(72, 119, 61);
        --un-sdg-goal-14: rgb(0, 125, 187);
        --un-sdg-goal-15: rgb(63, 175, 73);
        --un-sdg-goal-16: rgb(1, 85, 138);
        --un-sdg-goal-17: rgb(25, 54, 103);

        display: block;
        background-color: white;    // default bg color = white
      }
      // sets width & bg color of img/wrapper classes
      .img
      .wrapper {
        width: var(--width, 254px);
        background-color: var(--goal-color);
        display: block;   //removes weird margin when inline img
      }
      .color.wrapper {
        height: var(--width, 254px);    //ensures square dimension
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  getAltText() {
    if (!this.altText){   // if altText is not defined, return altText according to goal
      if (Number.isInteger(Number(this.goal))){   // if goal is Number, use this
        const SDGAltText = [    // list of SDG goal sorted in order
          "No Poverty",
          "Zero Hunger",
          "Good Health and well-Being",
          "Gender Equality",
          "Clean Water and Sanitation",
          "Affordable and Clean Energy",
          "Decent Work and Economic Growth",
          "Industry, Innovation, and Infrastructure",
          "Reduced Inequalities",
          "Sustainable Cities and communities",
          "Resonsible Consumption and Production",
          "Climate Action",
          "Life Below Water",
          "Life on Land",
          "Peace, Justice, and Strong Institutions",
          "Partnerships for the Goals"
        ];
        return SDGAltText[this.goal-1];
      }
      else if (this.goal === "all"){
        return "UN Sustainable Development Goals"
      }
      else if (this.goal === "circle") {
        return "UN Sustainable Development Goals Logo"
      }
      else {    // return empty string if this.goal out of scope
        return "";
      }
    }
    else {
      return this.altText;
    }
  }

  // gets url for img based on this.goal
  getImgSrc() {
    let imgSrc= new URL(`../lib/svg/${this.goal}.svg`, import.meta.url).href;
    return imgSrc
  }

  render() {
    return html`
      ${this.colorOnly ? html`
      <!-- if colorOnly true render div with class .color, and without an img -->
       <div class="color wrapper" style="--width: ${this.width} --goal-color: var(--un-sdg-color-${this.goal})" height=${this.width}></div>
      ` : html`
      <!-- if colorOnly false, render div with class .svg, and with an img -->
       <div class="svg wrapper" style="--width: ${this.width}px; --goal-color: var(--un-sdg-color-${this.goal})">
        <img src=${this.getImgSrc()} alt=${this.getAltText()}  fetchpriority=${this.fetchPriority} height=${this.width}>  <!-- Need loading to be overrided -->
       </div>
      `
      }
    `
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);