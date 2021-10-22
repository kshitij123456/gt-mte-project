import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapService } from '../map.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private map : MapService, private fb : FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  areaData;
  totalNodes=0;
  totalRoads=0;
  totalElements=0;
  betweennessChoice = new FormControl();
  threshold = new FormControl();
  form: FormGroup;

  createForm(){
    this.form = this.fb.group({
      basis : this.betweennessChoice,
      thres : this.threshold,
    });



    //this.form.valueChanges.subscribe((data) => this.onValueChanged(data));

    //this.onValueChanged();
  }

  onButtonClick(){
    this.map.removeAllLayers(this.areaData);
    this.map.getData().subscribe(data => {
      console.log(data);
      this.areaData = data;
      this.totalElements = this.areaData.elements.length;
      let totals = this.map.createNodeMapping(this.areaData);
      this.totalNodes = totals[0];
      this.totalRoads = totals[1];
      //this.map.mapRoads(this.areaData);
    });
  }

  findCriticalRoads(){
    this.map.removeAllLayers(this.areaData);
    this.map.findCriticalRoads();
    this.areaData = null;
  }

  getMore(){
    console.log(this.form.get('basis').value);
    console.log(this.form.get('thres').value);

    if(this.form.get('basis').value=='Quartiles'){
      this.map.removeAllLayers(this.areaData);
      this.map.quartileDist();
      this.areaData = [];
    }else if(this.form.get('basis').value=='Threshold'){
      this.map.removeAllLayers(this.areaData);
      this.map.thresholdDist(this.form.get('thres').value);
      this.areaData = [];
    }

  }

}
