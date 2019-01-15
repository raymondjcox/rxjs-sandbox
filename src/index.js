import { of, fromEvent} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { flatMap, switchMap, map, filter, startWith, take, merge } from 'rxjs/operators';

let refreshButton = document.querySelector('.refresh');
let refreshClick$ = fromEvent(refreshButton, 'click');
let container = document.querySelector('.content-container');

let request$ = refreshClick$.pipe(
  startWith('page load'),
  map(() => {
    let randomOffset = Math.floor(Math.random() * 500);
    return `https://api.github.com/users?since=${randomOffset}`;
  })
);

let response$ = request$.pipe(
  flatMap((requestUrl) => ajax.getJSON(requestUrl))
);

let suggestions$ = response$.pipe(
  map((users) => users.slice(0, 3)),
  switchMap((users) => users),
  merge(refreshClick$.pipe(map(() => null)))
);

suggestions$.subscribe((suggestion) => {
  if (suggestion === null) {
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }
  } else {
    let ele = document.createElement('div');
    ele.innerHTML = suggestion.login;
    container.appendChild(ele);
  }
});
