import {ComponentMetadata as Component, ViewMetadata as View} from 'angular2/angular2';

@Component({
  selector: 'pv-header'
})

@View({
  templateUrl: 'app/components/header.html'
})

export class PVHeader {

  constructor() {
    
  }

  sayHello(){
  	console.log("hello there!")
  }

}
