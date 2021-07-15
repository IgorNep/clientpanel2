import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/Settings';
import { SettingsService } from 'src/app/services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings!: Settings;
  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }
  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved!', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
