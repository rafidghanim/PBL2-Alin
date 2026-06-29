from PIL import Image 
import numpy as np

def load_image(file_path):
    #digunakan untuk membaca gambar yang diupload pengguna
    image = Image.open(file_path)

    #digunakan untuk mengubah gambar menjadi RGB agar warna tetap dipertahankan
    image = image.convert("RGB")

    #digunakan untuk mengubah gambar menjadi array Numpy
    image_array = np.array(image,dtype=np.float64)

    return image_array 


def save_image(image_array,output_path):
    #nilai piksel memiliki batasan antara 0 sampai 255
    image_array = np.clip(image_array, 0, 255)

    #mengubah array menjadi gambar
    image = Image.fromarray(image_array.astype(np.uint8))

    #menyimpan gambar
    image.save(output_path)
