import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminService/admin.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
user = localStorage.getItem("user");
firstName = JSON.parse(this.user);
  constructor(private adminservice:AdminService,private toastr:ToastrService,private route:Router) { }
listAccounts(){
  this.adminservice.listDisabledAccounts().subscribe(resp=>{
    this.toastr.success("'Welcome" +  + "'");
  })
}
  ngOnInit(): void {
    this.listAccounts()
  }

}
