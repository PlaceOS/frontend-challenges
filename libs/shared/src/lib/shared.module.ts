import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/http-code/not-found.component';
import { UnauthorizedComponent } from './components/http-code/unauthorized.component';
import { LoginComponent } from './components/login/login.component';
import { TaskItemComponent } from './components/task-viewer/task-item.component';
import { TaskViewerComponent } from './components/task-viewer/task-viewer.component';
import { UserViewerComponent } from './components/user-viewer/user-viewer.component';
import { MaterialModule } from './material.module';
import { ForbiddenComponent } from './components/http-code/forbidden.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [ LoginComponent, 
                  HeaderComponent, 
                  TaskViewerComponent, 
                  TaskItemComponent, 
                  UserViewerComponent, 
                  UnauthorizedComponent, 
                  NotFoundComponent, ForbiddenComponent],
  exports:[ LoginComponent, 
            HeaderComponent, 
            TaskViewerComponent,
            UserViewerComponent,
            ]
})
export class SharedModule {}
