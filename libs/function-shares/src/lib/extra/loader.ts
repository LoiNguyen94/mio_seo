export interface ImgCustom {
    src: any;
    width?: number;
    quality?: number;
  }
  
  export function imageLoader({ src, width, quality = 100 }: ImgCustom) {
    return `${src}?w=${width}&q=${quality}`; // REPLACE WITH YOUR IMAGE DIRECTORY
  }
  
  export default imageLoader;