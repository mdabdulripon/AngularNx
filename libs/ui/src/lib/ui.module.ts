import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BannerComponent, ImageGalleryComponent],
    exports: [BannerComponent, ImageGalleryComponent]
})
export class UiModule {}
