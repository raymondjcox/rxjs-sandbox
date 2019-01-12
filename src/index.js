import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { flatMap, map, filter } from 'rxjs/operators';

let requestStream = of('https://api.github.com/users');
let responseStream = requestStream.pipe(
  flatMap((requestUrl) => ajax.getJSON(requestUrl))
);

responseStream.subscribe((response) => {
  console.log(response);
});
