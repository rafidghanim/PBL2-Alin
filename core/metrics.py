import numpy as np
import os

def mse(original, compressed):
    "menghitung Mean Squared Error (MSE)"
    
    return np.mean((original - compressed) ** 2)

def psnr(original, compressed):
    "menghitung Peak Signal-to Noise Ratio (PSNR)"

    mse_value = mse(original, compressed)

    if mse_value == 0:
        return float("inf")
    
    max_pixel = 255.0

    return 20 * np.log10(max_pixel / np.sqrt(mse_value))

def file_size(file_path):
    #menghitung ukuran file dalam byte
    
    return os.path.getsize(file_path)

def compression_ratio(original_path, compressed_path):
    #menghitung Compression Ratio (CR)
    original_size = file_size(original_path)
    compressed_size = file_size(compressed_path)
    if compressed_size == 0:
        return 0
    
    return original_size / compressed_size


def compression_percentage(original_path, compressed_path):
    #menghitung persentase penghematan ukuran file
    original_size = file_size(original_path)
    compressed_size = file_size(compressed_path)

    return ((original_size - compressed_size) / original_size) * 100
