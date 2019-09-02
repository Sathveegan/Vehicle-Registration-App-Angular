import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vehicleForm: FormGroup;

  vintagePlatePattern: any;
  oldPlatePattern: any;
  modernPlatePattern: any;

  validLicensePlateNumber: boolean;
  licensePlateNumberType: string;

  constructor() {
    /**
     * initialize the licence plate type patterns */ 
    this.vintagePlatePattern = /^[0-9]{1,2}[ ]{1,}(Sri)[ ]{1,}[0-9]{4}$/;
    this.oldPlatePattern = /^[0-9]{2,3}[ ]{0,}[- ][ ]{0,}[0-9]{4}$/;
    this.modernPlatePattern = /^([A-Z]{2}[ ]{1,})*[A-Z]{2,3}[ ]{0,}[- ][ ]{0,}[0-9]{4}$/;
  }

  ngOnInit() {
    this.vehicleForm = new FormGroup({
      licensePlate: new FormControl('', Validators.required)
    });
  }

  get licensePlate() { return this.vehicleForm.get('licensePlate'); }

  /**
   * @description validate a string as a valid license plate number
   * @param licensePlate 
   * @returns boolean - valid or invalid
   */
  validateLicensePlate(licensePlate: string): boolean {
    let vintagePlateValid = this.vintagePlatePattern.test(licensePlate);
    let oldPlateValid = this.oldPlatePattern.test(licensePlate);
    let modernPlateValid = this.modernPlatePattern.test(licensePlate);

    if(vintagePlateValid || oldPlateValid || modernPlateValid)
      return true;
    else
      return false;
  }

  /**
   * @description determines the license plate type (vintage, old or modern)
   * @param licensePlate 
   * @returns string - license plate type
   */
  getLicensePlateType(licensePlate: string): string {
    let vintagePlateValid = this.vintagePlatePattern.test(licensePlate);
    let oldPlateValid = this.oldPlatePattern.test(licensePlate);
    let modernPlateValid = this.modernPlatePattern.test(licensePlate);

    if(vintagePlateValid)
      return "vintage";
    else if(oldPlateValid)
      return "old";
    else if(modernPlateValid)
      return "modern";
  }

  /**
   * @description display the license plate type
   * @param licensePlate 
   */
  displayLicensePlateType(licensePlate: string): void {
    this.validLicensePlateNumber = false;
    if(this.validateLicensePlate(licensePlate)) {
      this.validLicensePlateNumber = true;
      this.licensePlateNumberType = this.getLicensePlateType(licensePlate);
    }
  }

}
