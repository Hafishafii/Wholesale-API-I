export const getCroppedImg = (imageSrc: string, pixelCrop: any): Promise<string> => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const ctx = canvas.getContext("2d")!;
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            resolve(canvas.toDataURL("image/jpeg"));
        };
        image.onerror = (error) => reject(error);
    });
}
