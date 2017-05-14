import { MapserviceService } from './../../services/mapservice.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
public map:any;
  constructor(public mapservice:MapserviceService) { }

  ngOnInit() {
    this.map = L.map('map')
      .setView([37.8, -96], 4);



    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5pbHBhdGh1cmkiLCJhIjoiY2oybDhmcWF0MDAwMDJxcWtzMDgwZWI3cyJ9.hzryXsu_ec_AafR-QzzVUQ', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoiYW5pbHBhdGh1cmkiLCJhIjoiY2oybDhmcWF0MDAwMDJxcWtzMDgwZWI3cyJ9.hzryXsu_ec_AafR-QzzVUQ',
       id: 'mapbox.light',
    }).addTo(this.map)
    
    this.getMapData();

  }



	getMapData(){
		this.mapservice.getMapData()
		.subscribe(
			data => {
				L.geoJSON(data.json()).addTo(this.map);
			},
			error => {
        console.log(error)
			}
		);
	}

  getColor(d) {
    
}

style(feature) {
  console.log(this);
    return {
        fillColor: feature.properties.density > 1000 ? '#800026' :
           feature.properties.density > 500  ? '#BD0026' :
           feature.properties.density > 200  ? '#E31A1C' :
           feature.properties.density > 100  ? '#FC4E2A' :
           feature.properties.density > 50   ? '#FD8D3C' :
           feature.properties.density > 20   ? '#FEB24C' :
           feature.properties.density > 10   ? '#FED976' :
                      '#FFEDA0',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

}
