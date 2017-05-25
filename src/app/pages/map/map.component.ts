import { MapserviceService } from './../../services/mapservice.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map: any;
  public seedsData: any = [];
  constructor(public mapservice: MapserviceService) { }

  ngOnInit() {
    this.map = L.map('map')
      .setView([37.8, -96], 4);



    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5pbHBhdGh1cmkiLCJhIjoiY2oybDhmcWF0MDAwMDJxcWtzMDgwZWI3cyJ9.hzryXsu_ec_AafR-QzzVUQ', {
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>',
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoiYW5pbHBhdGh1cmkiLCJhIjoiY2oybDhmcWF0MDAwMDJxcWtzMDgwZWI3cyJ9.hzryXsu_ec_AafR-QzzVUQ',
      id: 'mapbox.light',
    }).addTo(this.map)

    this.getSeedsData();

  }

  getSeedsData() {
    this.mapservice.getSeedsData()
      .subscribe(
      data => {
        this.seedsData = data;
        this.getMapData();
      },
      error => {
        console.log(error)
      }
      );
  }

  getMapData() {
    this.mapservice.getMapData()
      .subscribe(
      data => {
        let key;

        let rightIcon = L.icon({
          iconUrl: "assets/images/right.png",
          iconRetinaUrl: "assets/images/right.png",
          iconSize: [29, 24],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
        let leftIcon = L.icon({
          iconUrl: "assets/images/left.png",
          iconRetinaUrl: "assets/images/left.png",
          iconSize: [29, 24],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        });
        for (key in data) {
          if (data.hasOwnProperty(key)) {
            let selectedSeed = this.seedsData[key] || {};
            let myIcon = rightIcon;
            if (selectedSeed.fips == key) {
              if (selectedSeed && selectedSeed.change > 0) {
                myIcon = rightIcon;
	
              }
              else {
                myIcon = leftIcon;
              }
              L.marker([data[key].lat, data[key].lon], { icon: myIcon })
                .bindPopup('<b>' + data[key].county + '</b> </br>' + '2016 : ' + this.seedsData[key].nps2016 + ' </br>' + '2015 : ' + this.seedsData[key].nps2015)
                .on('mouseover', function (e) {
                  this.openPopup();
                })
                .on('mouseout', function (e) {
                  this.closePopup();
                })
                .addTo(this.map);
            }
          }
        }

      },
      error => {
        console.log(error)
      }
      );
  }
}
