import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "@jbhive/auth_fe";
import { AuthGuard } from "@jbhive/auth_fe";


const routes: Routes = [
  
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}