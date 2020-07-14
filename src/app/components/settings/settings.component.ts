import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/Settings'
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings 

  constructor(
    private settingsSerivice: SettingsService,
    private flashMessage: FlashMessagesService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.settings = this.settingsSerivice.getSettings();
  }

  onSubmit() {
    this.settingsSerivice.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {
      cssClass: 'alert-success', timeout: 4000
    });
  }
}
