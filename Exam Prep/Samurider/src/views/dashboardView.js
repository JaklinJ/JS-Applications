import { html } from "../../node_modules/lit-html/lit-html.js"
import {api} from '../api.js'
import { dataService } from "../dataService.js";

const motorcycleCard = (data) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
  ${data.map(item => {
    return html`
    <div class="motorcycle">
    <img src=${item.imageUrl} alt="example1" />
    <h3 class="model">${item.model}</h3>
    <p class="year">${item.year}</p>
    <p class="mileage">${item.mileage}</p>
    <p class="contact">${item.contact}</p>
    <a class="details-btn" href="/details/${item._id}">More Info</a>
  </div>
    `
  })}
  </section>
`;



export async function showDashboardView(ctx) {
    const data = await dataService.getAllMotors()
    let template;

    if (data.length > 0) {
        template = motorcycleCard(data)
    } else {
        template = html`
        <h2>Available Motorcycles</h2>
        <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>
       `
    }

        ctx.render(template);
}