import numpy as np

class PCA:

    def __init__(self, k):
        self.k = k 
    
    def compute_mean(self, matrix):
        "untuk menghitung rata-rata setiap kolom pada matriks gambar"
        
        return np.mean(matrix, axis=0)
    
    def center_data(self, matrix, mean):
        "untuk mengurangi setiap data dengan nilai rata-ratanya"

        return matrix - mean 
    
    def covariance_matrix(self, centered_matrix):
        "untuk menghitung matriks kovarians"

        return np.cov(centered_matrix, rowvar=False)
    
    def eigen_decomposition(self, covariance):
        eigenvalues, eigenvectors = np.linalg.eig(covariance)

        return eigenvalues, eigenvectors 
    
    def sort_eigen(self, eigenvalues, eigenvectors):
        index = np.argsort(eigenvalues)[::-1]
        eigenvalues = eigenvalues[index]
        eigenvectors = eigenvectors[:,index]

        return eigenvalues, eigenvectors
    
    def select_components(self, eigenvectors):
        
        return eigenvectors[:, :self.k]
    
    def transform(self, centered_matrix, components):

        return np.dot(centered_matrix, components)
    
    def reconstruct(self, transformed_data, components, mean):

        return np.dot(transformed_data, components.T) + mean 
    
    def compress(self, matrix):
        #untuk menghitung rata-rata
        mean = self.compute_mean(matrix)

        #untuk centering data
        centered = self.center_data(matrix, mean)

        #matriks kovarians
        covariance = self.covariance_matrix(centered)

        #eigenvalue dan eigenvector
        eigenvalues,eigenvectors = self.eigen_decomposition(covariance)

        #untuk mengurutkan eigenvalue dan eigenvector
        eigenvalues,eigenvectors = self.sort_eigen(eigenvalues, eigenvectors)

        #untuk memilih komponen utama
        components = self.select_components(eigenvectors)

        #transformasi data
        transformed = self.transform(centered, components)

        #rekontruksi data
        reconstructed = self.reconstruct(transformed, components, mean)

        return reconstructed
