import { html } from '../../node_modules/lit-html/lit-html.js';
import { api } from '../api.js';
import { dataService } from '../dataService.js';

const detailsTemp = (item, isOwner, isLoggedIn) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${item.description}</p>
                   <p id ="more-info">${item.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">0</span></h3>

               <!--Edit and Delete are only for creator-->
               ${isOwner ? 
               html`
               <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${delFact} href="" id="delete-btn">Delete</a>
               ` :
              ""}

             <!--Bonus - Only for logged-in users ( not authors )-->
             ${isLoggedIn ? 
             html`
             <a href="/like" id="like-btn">Like</a>
             ` : 
            ""}
          </div>
            </div>
        </div>
      </section>
`

let context = null;
export async function showDetailsView (ctx) {
  context = ctx;
    const id = ctx.params.id;
    const data = await api.get(`data/facts/${id}`)

    let currentId = JSON.parse(sessionStorage.getItem("userdata")) && JSON.parse(sessionStorage.getItem("userdata"))._id;
    const isOwner = currentId == data._ownerId

    let isLoggedIn = false;
    if (!isOwner) {
       isLoggedIn = true;
    }
    ctx.render(detailsTemp(data, isOwner, isLoggedIn))
}

async function delFact(e) {
  e.preventDefault()
  if (window.confirm('Do you want to delete your Fact?')) {
    const id = context.params.id
    await dataService.delFact(id);
    context.goTo('/dashboard')
  }
  
}