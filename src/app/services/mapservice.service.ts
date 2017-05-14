import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MapserviceService {

  constructor(public http:  Http) { }

   

  getMapData(){
		return this.http.get('assets/data.json');
	}

}
