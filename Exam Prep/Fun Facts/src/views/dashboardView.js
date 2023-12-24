import { html } from "../../node_modules/lit-html/lit-html.js"
import {api} from '../api.js'



const funFactCard = (data) => html`
<h2>Fun Facts</h2>
  <section id="dashboard">
    ${data.map(item => {
      return html`
      <div class="fact">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="category">${item.category}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>
      `
    })}
    </section>
`

export async function showDashboardView(ctx) {
    const data = await api.get('data/facts?sortBy=_createdOn%20desc')
    let template;

    if (data.length > 0) {
        template = funFactCard(data)
    } else {
        template = html`
        <h2>Fun Facts</h2>
        <h2>No Fun Facts yet.</h2>
       `
    }

        ctx.render(template);
}