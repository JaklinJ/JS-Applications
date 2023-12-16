import { html } from "../../node_modules/lit-html/lit-html.js"
import {api} from '../api.js'


const carCard = (data) => html`
<h3 class="heading">Our Cars</h3>
        <section id="dashboard">
  ${data.map(item => {
    return html`
     <div class="car">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="model">${item.model}</h3>
            <div class="specs">
              <p class="price">Price: €${item.price}</p>
              <p class="weight">Weight: ${item.weight} kg</p>
              <p class="top-speed">Top Speed: ${item.speed} kph</p>
            </div>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>
    `
  })}
`


export async function showDashboardView(ctx) {
    const data = await api.get('data/cars?sortBy=_createdOn%20desc')
    let template;

    if (data.length > 0) {
        template = carCard(data)
    } else {
        template = html`
        <h3 class="heading">Our Cars</h3>
        <h3 class="nothing">Nothing to see yet</h3>
       `
    }

        ctx.render(template);
}