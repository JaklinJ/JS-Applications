import { html } from "../../node_modules/lit-html/lit-html.js";
import { api } from "../api.js";
import { dataService } from "../dataService.js";


const addTemplate = () => html`
 <section id="create">
          <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form @submit=${onSubmit} class="create-form">
              <input type="text" name="model" id="model" placeholder="Model"/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`

let context = null;
export async function showAddView (ctx) {
    context = ctx;
    ctx.render(addTemplate());
}

async function onSubmit (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { model, imageUrl, price, weight, speed, about } = Object.fromEntries(formData);
    
    if (!model || !imageUrl || !price || !weight || !speed || !about) {
       return window.alert('Error');
    }

   await api.post('data/cars', {model, imageUrl, price, weight, speed, about})
   context.goTo('/dashboard')
}
