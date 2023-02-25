import { Component, Input } from '@angular/core';
//import { FileUploadModule } from 'ng2-file-upload'
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_Models/memebr';
import { Photo } from 'src/app/_Models/photo';
import { User } from 'src/app/_Models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
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
  constructor(private accountService:AccountService,private memberSevice:MembersService){
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
setMainPhoto(photo:Photo){
  console.log(photo.id);
  this.memberSevice.setMainPhoto(photo.id).subscribe(()=>{
  console.log(photo.id);
  
    this.user.photoUrl = photo.url;
    this.accountService.setCurrentUser(this.user);//which is gonna update both our current user observable 
    //and update our user photo inside local storage 
    this.member.photoUrl =photo.url;
    this.member.photos.forEach(p=>{
      if(p.isMain) p.isMain =false;
      if(p.id === photo.id) p.isMain = true
    })
  })
}
DeletePhotoByUser(photoId:number){
  this.memberSevice.DeletePhoto(photoId).subscribe(()=>{
    this.member.photos = this.member.photos.filter(x=>x.id != photoId);//just filter out all of the other photo // 
    //returns an array of all of the photo that are not equal to the photo id that we passing in paramter
    //we do not need to worry about handling the errors because our interceptors taken care of this for us
    
  })
}
}
