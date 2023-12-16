import { html } from '../../node_modules/lit-html/lit-html.js';
import { api } from '../api.js';
import { dataService } from '../dataService.js';


const detailsTemplate = (item, isOwner) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">${item.year}</p>
                <p class="mileage">${item.mileage}</p>
                <p class="contact">${item.contact}</p>
                   <p id = "motorcycle-description">${item.about}</p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${isOwner ? 
               html`
               <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${delMotor} href="" id="delete-btn">Delete</a>
          </div>
               ` : 
               ""}
            </div>
        </div>
      </section>
`




let context = null;
export async function showDetailsView (ctx) {
  context = ctx;
  
    const id = ctx.params.id;
    const data = await api.get(`data/motorcycles/${id}`)

    let currentId = JSON.parse(sessionStorage.getItem("userdata")) && JSON.parse(sessionStorage.getItem("userdata"))._id;
    const isOwner = currentId == data._ownerId

    ctx.render(detailsTemplate(data, isOwner))
}

async function delMotor(e) {
  e.preventDefault()
  if (window.confirm('Do you want to delete your Fact?')) {
    const id = context.params.id
    await dataService.delMotor(id);
    context.goTo('/dashboard')
  }
  
}