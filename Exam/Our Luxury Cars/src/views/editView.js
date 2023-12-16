import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";

const editTemplate = (item) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                value=${item.name}
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                value=${item.imageUrl}
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
              >${item.description}</textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
              >${item.nutrition}</textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

const editTemp = (item) => html`
<section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input type="text" name="model" id="model" value=${item.model} placeholder="Model" />
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                value=${item.imageUrl}
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                value=${item.price}
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                value=${item.weight}
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                value=${item.speed}
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              >${item.about}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`

let context = null;
export async function showEditView (ctx) {
context = ctx;
const id = context.params.id;
const data = await dataService.getSingleCar(id)
context.render(editTemp(data))
}

async function onSubmit (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const {model, imageUrl, price, weight, speed, about} = Object.fromEntries(formData);
    
    if (!model || !imageUrl || !price || !weight || !speed || !about) {
       return window.alert('Error')
    }
    const id = context.params.id
    await dataService.editCar(id, {model, imageUrl, price, weight, speed, about});
    context.goTo(`/details/${id}`);
}