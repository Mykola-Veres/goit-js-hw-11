import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function totalPage(totalHits, newApiQuery) {
  totalP = Number(totalHits/newApiQuery);
  if(totalHits)
  {Notify.info(`Hooray! We found ${totalHits} images.`)}  
}

let totalP = 1;