import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";


const editTemplate = (item) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              value=${item.category}
              placeholder="Category"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              value=${item.imageUrl}
              placeholder="Image URL"
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
          >${item.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
          >${item.moreInfo}</textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`

let context = null;
export async function showEditView (ctx) {
context = ctx;
const id = context.params.id;
const data = await dataService.getSingleFact(id)
context.render(editTemplate(data))
}

async function onSubmit (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info')
    
    if (!category || !imageUrl || !description || !moreInfo) {
       return window.alert('Error');
    }

    const id = context.params.id
    await dataService.editFact(id, {category, imageUrl, description, moreInfo});
    context.goTo(`/details/${id}`);
}