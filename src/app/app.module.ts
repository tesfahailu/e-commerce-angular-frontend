import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule,
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
