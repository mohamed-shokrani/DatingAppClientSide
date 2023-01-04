import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

import { Member } from '../_Models/memebr';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],

})

export class MemberDetailsComponent implements OnInit {
  member: Member
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMemberDetailsByname()
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,//maximum four images underneath the image
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false

    }

    ]
   

  }
  getImages(): NgxGalleryImage[] {
    const imagesUrls = [];
    for (const img of this.member.photos) {
      imagesUrls.push({
        small: img?.url,
        medium: img?.url,
        big: img?.url,


      })

    }
    return imagesUrls
  }
  getMemberDetailsByname() {
    this.memberService.GetMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }


}
