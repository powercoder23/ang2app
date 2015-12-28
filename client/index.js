import {Component, View, bootstrap} from 'angular2/angular2';
import {Yo1} from 'yo-1';

@Component({
  selector: 'main'
})

@View({
  directives: [Yo1],
  template: `
    <yo-1></yo-1>
  `
})

class Main {

}

bootstrap(Main);
