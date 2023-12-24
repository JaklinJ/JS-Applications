import { html } from "../../node_modules/lit-html/lit-html.js";
import { api } from "../api.js";


const searchFruitCard = (data) => html`
 <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
${data.map(item => {
    return html `

<h4>Results:</h4>
<div class="search-result">
  <div class="fruit">
  <img src=${item.itemUrl} alt="example1" />
  <h3 class="title">${item.name}</h3>
  <p class="description">${item.details}</p>
  <a class="details-btn" href="/details/${item._id}">More Info</a>
</div>
  </div>
        </section>`})}
`



  



let context = null;
export async function showSearchView(ctx) {
    context = ctx;

    const data = await api.get(`data/fruits?where=name%20LIKE%20%22${data.name}%22`)
    let template;

    if(data.length >0) {
        template = searchFruitCard(data);
        context.render(template)
    } else {
        template = html `
        <section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  <div class="search-result">
 <p class="no-result">No result.</p>
 </div>
        </section>
        `
        context.render(template);
    }
}