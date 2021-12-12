import { fromEvent } from "rxjs";

const button = document.getElementById("refresh");

const myObservable = fromEvent(button, "click");

const subscription = myObservable.subscribe(event => console.log(event));
const subscription1 = myObservable.subscribe(event => console.log(event));
