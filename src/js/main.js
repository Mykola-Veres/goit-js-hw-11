import NewApiQuery from "./axiosQuveryServise";
import card from "../templates/card";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';

const inputUserEl = document.querySelector("#search-form");
inputUserEl.addEventListener("submit", handlerInrutUser);
const galleryUserEl = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");
btnLoadMore.addEventListener("click", handlerLoadMore);
btnLoadMore.classList.add("is-hidden");
let totalP = 1;
const newApiQuery = new NewApiQuery();

function handlerInrutUser(event) {
  btnLoadMore.classList.add("is-hidden");
  event.preventDefault();  
  clearImages();
  newApiQuery.query = event.currentTarget.elements.searchQuery.value;  
  newApiQuery.getImg().then(data => {marcupImage(data);
  if(data.hits.length === 0)
  {return Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
  btnLoadMore.classList.remove("is-hidden");    
  return data.totalHits}).then(totalPage).catch(console.error());
  newApiQuery.resetPage();
}
function totalPage(totalHits) {
  totalP = Number(totalHits/newApiQuery.page);
}
function marcupImage({hits}) { 
  console.log(hits)
  galleryUserEl.insertAdjacentHTML("beforeend", card(hits));  
}
function clearImages() {
  galleryUserEl.innerHTML = "";
}
async function handlerLoadMore() {try {
  const data = await newApiQuery.getImg();
  marcupImage(data); totalPage(data.totalHits);
} catch(error) {btnLoadMore.classList.add("is-hidden")
  Notify.failure("We're sorry, but you've reached the end of search results.")
}}
// function handlerLoadMore() {  
//   newApiQuery.getImg().then(data => {marcupImage(data);
//     return data.totalHits}).then(totalPage)
//     .catch(err => {btnLoadMore.classList.add("is-hidden");
//     Notify.failure("We're sorry, but you've reached the end of search results.")})
// }