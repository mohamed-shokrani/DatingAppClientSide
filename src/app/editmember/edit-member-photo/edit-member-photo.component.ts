import { Component, Input } from '@angular/core';
//import { FileUploadModule } from 'ng2-file-upload'
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_Models/memebr';
import { User } from 'src/app/_Models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-member-photo',
  templateUrl: './edit-member-photo.component.html',
  styleUrls: ['./edit-member-photo.component.css']
})
export class EditMemberPhotoComponent {
  @Input() member:Member;
  uploader:FileUploader;
  hasBaseDropZoneOver=false;
  baseUrl =environment.apiUrl;
  user:User;
  constructor(private accountService:AccountService){
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(user=>{
      this.user =user
    })
  }
  ngOnInit(): void {
   this.intializeUploader();
    
  }
  fileBaseOver(e:any){  //take an event of time zone 
  this.hasBaseDropZoneOver=e;

  }
intializeUploader(){
  this.uploader = new FileUploader({
    url :this.baseUrl + 'users/add-photo',
    authToken:'Bearer ' + this.user.token,
    isHTML5:true,
    allowedFileType:['image'],
    removeAfterUpload:true,
    autoUpload:false,
    maxFileSize: 10*1024*1024
  });
  this.uploader.onAfterAddingFile = (file)=>{
    file.withCredentials =false;
  }
  this.uploader.onSuccessItem = (item,response,status, headers)=>{
    if(response){
      const photo = JSON.parse(response);
      this.member.photos.push(photo)
    }

  }
}
}
