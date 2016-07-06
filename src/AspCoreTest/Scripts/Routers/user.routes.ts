import {RouterConfig} from "@angular/router";
import {UsersViewComponent } from "../Components/UsersViewComponent";
import {UserInfoComponent} from "../Components/UserInfoComponent";
import {UserRegisterComponent} from "../Components/UserRegisterComponent";
import {UserLoginComponent} from "../Components/UserLoginComponent"

export const UserRoutes: RouterConfig = [
    { path: "UsersView", component: UsersViewComponent },
    { path: "UserInfo:id", component: UserInfoComponent },
    { path: "UserRegister", component: UserRegisterComponent },
    { path: "UserLogin", component: UserLoginComponent }
]