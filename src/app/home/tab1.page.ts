import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TaskServiceService } from '../task-service.service';
import { InputDialogService } from './../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Taskify";
  tasks: any = [];
  errorMessage: string | undefined;
id: any;



  constructor(public toastController: ToastController, public alertCtrl: AlertController, public dataService: TaskServiceService,
    public InputDialogService: InputDialogService, public socialSharing: SocialSharing) {

    this.loadTasks();

    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadTasks();
    });
  }

  ionViewDidLoad() {
    this.loadTasks();
  }


  // Load tasks

  loadTasks() {
    this.dataService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = <any>error
      );
  }
  // Remove Task from Task App

  async removeTask(task: any, id: any) {
    this.dataService.removeTask(id);
  }

  //Edit Existing Tasks
  async editTask(task: any, index: number, id: any) {
    console.log("Edit Task -", task, index);
    const toast = this.toastController.create({
      message: 'Editing Task -' + index + "...",
      duration: 3000,
    });

    // let result = (await toast).present();
    this.InputDialogService.showPrompt(task, index,id)
  }

  async addTask() {
    const toast = await this.toastController.create({
      message: 'Adding task ...',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    this.InputDialogService.showPrompt(toast);
  }




}
