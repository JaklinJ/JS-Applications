import page from './node_modules/page/page.mjs';
import {render} from './node_modules/lit-html/lit-html.js';
import {userHelper} from './src/userHelper.js';
import { userService } from './src/userService.js';
import { showHomeView } from './src/views/homeView.js';
import { showRegisterView } from './src/views/registerView.js';
import { showLoginView } from './src/views/loginView.js';
import { showDashboardView } from './src/views/dashboardView.js';
import { showAddView } from './src/views/addView.js';
import { showDetailsView } from './src/views/detailsView.js';
import { showEditView } from './src/views/editView.js';
import { showSearchView } from './src/views/searchView.js';



const root = document.querySelector('main');
const loggedUser = document.querySelector('.user');
const guestUser = document.querySelector('.guest');


page(decorationContext);
page('/', showHomeView)
page('/dashboard', showDashboardView)
page('/login', showLoginView)
page('/register', showRegisterView)
page('/search', showSearchView)
page('/details/:id', showDetailsView)
page('/edit/:id', showEditView)
page('/delete/:id', () => console.log('delete'))
page('/add', showAddView)
page('/logout', logout);

page.start();
updateNav();

async function logout(){
    await userService.logout();
    updateNav();
    goTo('/');
}

function renderer (template){
    render(template, root);
}

function updateNav(){
    const userdata = userHelper.getUserData();

    if (userdata) {
        loggedUser.style.display = "block";
        guestUser.style.display = 'none';
    } else{
        loggedUser.style.display = "none";
        guestUser.style.display = 'block';
    }
}

function goTo(path){
    page.redirect(path);
}

function decorationContext(ctx, next){
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next();
}