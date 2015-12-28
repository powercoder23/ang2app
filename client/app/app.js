import {Component, View, bootstrap} from 'angular2/angular2';
//import {PVHeader} from 'app/components/header';
//import {Search} from 'app/components/search/search';
//import {RouteConfig, Router, RouterOutlet, RouterLink, Route} from 'angular2/router';

@Component({
  selector: 'app'
})

@View({
  //directives: [PVHeader],
  template: '<div>Hello Angular2</div>'
})

class App {
	constructer(){
		
	}
}

bootstrap(App);
