import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-image-gallery',
    templateUrl: './image-gallery.component.html'
})
export class ImageGalleryComponent implements OnInit {
    selectedImageUrl!: string;
    @Input() images!: string[];

    ngOnInit(): void {
        this.images.push('http://localhost:3000/public/uploads/5.jpeg-1655611602797.jpeg')
        this.images.push('http://localhost:3000/public/uploads/3.jpeg-1655636571682.jpeg')
        if (this.hasImages) {
            this.selectedImageUrl = this.images[0];
        }
    }

    changeSelectedImage(imageUrl: string) {
        this.selectedImageUrl = imageUrl;
    }

    get hasImages() {
        return this.images?.length > 0;
    }
}
