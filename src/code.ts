import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {from} from "rxjs/observable/from";
import 'rxjs/add/operator/pluck';

const subject = new Subject();
const behaviourSubject = new BehaviorSubject('intial');
/*
Subject is simply an observer thats also able to emit values.
So its both and observable and observer
 */
/*
Behaviour Subject listens the last value sent
 */

const observable = Observable.create((observer:any)=>{
    observer.next('Hello Mohit');
    observer.next('Next HI');
   // observer.complete();
    observer.next('After complete');
});
const observer = observable.subscribe(
    (x:any)=>
    addItem(x),
(x:any)=>addItem(x),()=>addItem("Completed"));

const observer2 = observable.subscribe((x:any)=>
        addItem(x),
    (x:any)=>addItem(x),()=>addItem("Completed"));

observer.add(observer2); // To unsubscribe both the observer

setTimeout(() => {
    observer.unsubscribe();
},4000);


const observerSubject1 = subject.subscribe((x:any)=>{
    addItem(x);
});

subject.next('This is send by Subject');

const observerSubject2 = subject.subscribe((x:any)=>{
    addItem(x);
});

subject.next('This is send after when you subscribe the Subject, ObseverSubject');
behaviourSubject.next('This is last value send by Behaviour Subject');
behaviourSubject.subscribe((x:any)=>{
  addItem(x);
});

/*
Create an Observable using from operator and using pluck operator to
fetch the values from object.
 */
from([{first:'Mohit',last:'Kumar',age:34},
    {first:'Himanshu',last:'parkash',age:28}])
    .pluck('first')
    .subscribe((val)=> addItem(val));




function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}