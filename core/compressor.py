from core.image_handler import load_image, save_image 
from core.pca import PCA 

class ImageCompressor:

    def __init__(self, k):
        self.k = k

    def compress_image(self, input_path, output_path):
        #untuk membaca gambar
        image = load_image(input_path)

        #untuk membuat objek PCA
        pca = PCA(self.k)

        #melakukan kompresi
        compressed = pca.compress(image)

        #menyimpan hasilnya
        save_image(compressed, output_path)

        return output_path