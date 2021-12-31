import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RedirectGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    let admin = localStorage.getItem("admin");
    if (admin == "yes") {
      this.router.navigate(["admin"]);
      return false;
    }
    return true;
  }
}
