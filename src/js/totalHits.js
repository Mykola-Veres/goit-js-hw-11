export function scrollTo (galleryUserEl) {
  const cardHeight = galleryUserEl.firstElementChild.getBoundingClientRect().height
  window.scrollBy({
    left: 0, 
    top: cardHeight * 4, 
    behavior: 'smooth'
  })
}