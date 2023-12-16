import { Injectable } from '@angular/core';
import { TaskServiceService } from './task-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

//Create input class

export class InputDialogService {

  constructor(public dataService: TaskServiceService, public alertCtrl: AlertController) {
    console.log('Hello InputDialogService Provider');
  }

  async showPrompt(task?: any, index?: number, id?: any) {
    const alert = await this.alertCtrl.create({
      header: index !== undefined ? 'Edit Task' : 'Add Task',
      subHeader: index !== undefined ? 'Edit Task' : 'Add a Task',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
          }
        },
        {
          text: 'Save',
          handler: (task: any) => {
            if (index !== undefined) {
              this.dataService.editTask(task, index, id);
            } else {
              this.dataService.addTask(task)
            }
          }
        }
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: task? task.name: null
        },
        {
          name: 'duedate',
          type: 'date',
          placeholder: 'Due Date',
          value: task? task.duedate: null
        },
        {
          name: 'priority',
          type: 'string',
          placeholder: 'Priority level',
          value: task? task.priority: null
        }
      ]
       
    });

    await alert.present();
  }
}

