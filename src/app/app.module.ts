import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// App routing modules
import { AppRoutingModule1 } from './Auth_1/shared/routing/app-routing.module';
// Auth service
import { AuthService } from './Auth_1/shared/services/auth.service';
import { DashboardComponent } from './Auth_1/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Auth_1/components/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './Auth_1/components/sign-in/sign-in.component';
import { SignUpComponent } from './Auth_1/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './Auth_1/components/verify-email/verify-email.component';
import { environment } from '../environments/environment';
import { CardComponent } from './card/card.component';
import { SortPlayersPipe } from './pipes/sort-players.pipe';
import { PlayerDialogComponent } from './dialogs/player-dialog/player-dialog.component';
import { CountPipe } from './pipes/count.pipe';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SortPlayersPipe,
    CountPipe,
    PlayerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule1,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  entryComponents: [
    PlayerDialogComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
