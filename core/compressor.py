import numpy as np

from core.image_handler import load_image, save_image
from core.pca import PCA

class ImageCompressor:

    def __init__(self, k):
        self.k = k

    def compress_image(self, input_path, output_path):
        #untuk membaca gambar
        image = load_image(input_path)

        #melakukan kompresi setiap channel agar gambar berwarna tetap RGB
        channels = []
        variances = []
        for channel_index in range(image.shape[2]):
            pca = PCA(self.k)
            compressed_channel, retained_variance = pca.compress(image[:, :, channel_index])
            channels.append(compressed_channel)
            variances.append(retained_variance)

        compressed = np.stack(channels, axis=2)

        #menyimpan hasilnya
        save_image(compressed, output_path)

        return output_path, float(np.mean(variances)), image, compressed
