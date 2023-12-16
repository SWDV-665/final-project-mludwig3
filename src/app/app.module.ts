import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskServiceService } from './task-service.service';
import { InputDialogService } from './input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import{ HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy,useClass: IonicRouteStrategy},
                TaskServiceService,
                InputDialogService,
                SocialSharing],
  bootstrap: [AppComponent],
})
export class AppModule {}
