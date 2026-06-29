# PBL2-Alin

> Aplikasi Web Kompresi Citra Menggunakan Principal Component Analysis (PCA)

---

## 📖 Deskripsi

**PBL2-Alin** merupakan aplikasi web berbasis **Flask** yang digunakan untuk melakukan kompresi citra digital menggunakan metode **Principal Component Analysis (PCA)**.

Aplikasi ini memungkinkan pengguna untuk mengunggah gambar, melakukan proses kompresi dengan menentukan jumlah komponen utama, membandingkan gambar sebelum dan sesudah kompresi, serta melihat metrik evaluasi kualitas hasil kompresi.

Proyek ini dibuat sebagai bagian dari **Project Based Learning (PBL)** pada mata kuliah **Aljabar Linear**, dengan tujuan untuk mengimplementasikan konsep PCA dalam kasus nyata, yaitu kompresi citra digital.

---

## 🧠 Konsep Singkat PCA

**Principal Component Analysis (PCA)** adalah metode reduksi dimensi yang digunakan untuk menyederhanakan data tanpa menghilangkan terlalu banyak informasi penting.

Pada kompresi citra, PCA bekerja dengan cara:

1. Membaca gambar sebagai matriks piksel.
2. Memisahkan informasi warna atau intensitas gambar.
3. Menghitung komponen utama dari matriks gambar.
4. Menyimpan sebagian komponen utama yang paling berpengaruh.
5. Merekonstruksi kembali gambar menggunakan komponen yang dipilih.

Semakin sedikit jumlah komponen yang digunakan, semakin kecil informasi yang dipertahankan. Namun, kualitas gambar juga dapat menurun. Sebaliknya, semakin banyak komponen yang digunakan, kualitas gambar akan semakin mendekati gambar asli.

---

## ✨ Fitur

* Upload gambar melalui web.
* Kompresi gambar menggunakan metode PCA.
* Menampilkan gambar asli dan gambar hasil kompresi.
* Menampilkan metrik evaluasi hasil kompresi.
* Visualisasi variance PCA.
* Download gambar hasil kompresi.
* Tampilan antarmuka sederhana dan mudah digunakan.
* Perbandingan kualitas gambar sebelum dan sesudah kompresi.

---

## 🖼️ Tampilan Aplikasi

### Halaman Utama

![Halaman utama aplikasi](/assets/image.png)

### Halaman Upload Gambar

![Halaman upload gambar](/assets/image-1.png)

### Hasil Kompresi dan Perbandingan Gambar

![Hasil kompresi dan perbandingan gambar](/assets/image-4.png)

### Visualisasi Variance PCA

![Visualisasi variance PCA](/assets/image-3.png)

---

## 🛠 Tech Stack

Proyek ini menggunakan beberapa teknologi berikut:

| Teknologi    | Keterangan                            |
| ------------ | ------------------------------------- |
| Python 3     | Bahasa pemrograman utama              |
| Flask        | Framework backend web                 |
| NumPy        | Operasi matriks dan komputasi numerik |
| Pillow / PIL | Pemrosesan gambar                     |
| HTML         | Struktur halaman web                  |
| CSS          | Styling tampilan                      |
| JavaScript   | Interaksi pada halaman web            |

---

## ⚙️ Instalasi

Clone repository:

```bash
git clone https://github.com/rafidghanim/PBL2-Alin.git
```

Masuk ke direktori project:

```bash
cd PBL2-Alin
```

Buat virtual environment:

```bash
python -m venv venv
```

Aktifkan virtual environment.

Untuk Linux atau macOS:

```bash
source venv/bin/activate
```

Untuk Windows:

```bash
venv\Scripts\activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

---

## ▶️ Menjalankan Aplikasi

Jalankan aplikasi dengan perintah:

```bash
python app.py
```

Atau menggunakan Flask:

```bash
flask run
```

Kemudian buka browser dan akses:

```text
http://127.0.0.1:5000
```

---

## 📂 Struktur Project

```text
PBL2-Alin/
├── app.py
├── requirements.txt
├── README.md
├── core/
│   └── [file logic PCA dan pemrosesan gambar]
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   └── [file HTML tampilan aplikasi]
├── assets/
│   └── [gambar dokumentasi README]
└── instance/
    └── [folder penyimpanan sementara/upload]
```

Keterangan:

| Folder/File        | Fungsi                                            |
| ------------------ | ------------------------------------------------- |
| `app.py`           | File utama untuk menjalankan aplikasi Flask       |
| `requirements.txt` | Daftar library yang dibutuhkan                    |
| `core/`            | Berisi logic utama kompresi citra menggunakan PCA |
| `static/`          | Berisi file CSS, JavaScript, dan aset statis      |
| `templates/`       | Berisi template HTML                              |
| `assets/`          | Berisi gambar dokumentasi untuk README            |
| `instance/`        | Berisi file upload atau hasil proses sementara    |

---

## 📌 Cara Penggunaan

1. Jalankan aplikasi Flask.
2. Buka aplikasi melalui browser.
3. Upload gambar yang ingin dikompresi.
4. Tentukan parameter kompresi PCA.
5. Klik tombol kompresi.
6. Lihat perbandingan gambar asli dan gambar hasil kompresi.
7. Periksa metrik evaluasi hasil kompresi.
8. Download gambar hasil kompresi bila diperlukan.

---

## 🔄 Alur Kerja Aplikasi

```text
User Upload Gambar
        ↓
Gambar Dibaca oleh Sistem
        ↓
Gambar Diproses sebagai Matriks
        ↓
PCA Mengambil Komponen Utama
        ↓
Gambar Direkonstruksi
        ↓
Hasil Kompresi Ditampilkan
        ↓
User Dapat Mengunduh Hasil
```

[Butuh gambar: diagram alur kerja aplikasi]

---

## 📊 Metrik Evaluasi

Aplikasi ini dapat menampilkan metrik evaluasi untuk membantu pengguna memahami kualitas hasil kompresi.

Beberapa metrik yang dapat digunakan antara lain:

| Metrik             | Fungsi                                                                    |
| ------------------ | ------------------------------------------------------------------------- |
| MSE                | Mengukur rata-rata kesalahan piksel antara gambar asli dan hasil kompresi |
| PSNR               | Mengukur kualitas hasil rekonstruksi gambar                               |
| Compression Ratio  | Membandingkan ukuran gambar sebelum dan sesudah kompresi                  |
| Explained Variance | Menunjukkan seberapa besar informasi yang dipertahankan oleh komponen PCA |

Catatan:

Pada beberapa kondisi, ukuran file hasil kompresi dapat lebih besar dari gambar asli. Hal ini dapat terjadi karena format penyimpanan, metadata gambar, mode warna, atau proses encoding ulang setelah gambar direkonstruksi.

Oleh karena itu, pada proyek ini kompresi PCA lebih difokuskan untuk memahami proses reduksi dimensi dan rekonstruksi citra, bukan hanya untuk mengecilkan ukuran file akhir.

---

## 🧪 Format Gambar yang Didukung

Format gambar yang umum digunakan:

* `.jpg`
* `.jpeg`
* `.png`

Disarankan menggunakan gambar dengan ukuran yang tidak terlalu besar agar proses kompresi berjalan lebih cepat.

---

## 📷 Contoh Hasil

### Gambar Asli

![Gambar asli](/assets/gambar_asli.jpeg)

### Hasil Kompresi

| Komponen Lebih Kecil                                      | Komponen Lebih Besar                                       |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| ![Hasil kompresi komponen kecil](/assets/hasil_kecil.png) | ![Hasil kompresi komponen besar](/assets/hasil_rendah.png) |

Contoh perbandingan:

| Jumlah Komponen | Kualitas Gambar | Ukuran Informasi |
| --------------- | --------------- | ---------------- |
| Rendah          | Lebih buram     | Lebih kecil      |
| Sedang          | Cukup baik      | Sedang           |
| Tinggi          | Mendekati asli  | Lebih besar      |

---

## 🚧 Batasan Project

Beberapa batasan dari aplikasi ini:

* Hasil kompresi sangat bergantung pada jumlah komponen PCA yang digunakan.
* Gambar dengan detail tinggi membutuhkan lebih banyak komponen agar kualitas tetap baik.
* Ukuran file hasil akhir tidak selalu lebih kecil karena dipengaruhi format dan proses penyimpanan gambar.
* Proyek ini difokuskan untuk pembelajaran konsep PCA, bukan sebagai aplikasi kompresi gambar produksi.

---

## 📚 Tujuan Pembelajaran

Melalui proyek ini, konsep Aljabar Linear yang diterapkan antara lain:

* Matriks dan operasi matriks.
* Transformasi linear.
* Eigenvalue dan eigenvector.
* Reduksi dimensi.
* Principal Component Analysis.
* Rekonstruksi data dari komponen utama.

---

## 👨‍💻 Tim Pengembang

| Nama                 | NIM      | GitHub                                          |
| -------------------- | -------- | ----------------------------------------------- |
| Febi Febrian Fahrani | L0125011 | [febifebriann](https://github.com/febifebriann) |
| Okto Ramadhan        | L0125059 | [oktoramadhan](https://github.com/oktoramadhan) |
| Rafid Ghani Mahadri  | L0125063 | [rafidghanim](https://github.com/rafidghanim)   |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dalam kegiatan **Project Based Learning (PBL)**.

Proyek ini tidak ditujukan untuk penggunaan komersial tanpa izin dari tim pengembang.

---


| Keterangan     | Detail                                       |
| -------------- | -------------------------------------------- |
| Mata Kuliah    | Aljabar Linear Kelas C                       |
| Dosen Pengampu | Prof. Drs. Bambang Harjito, M.App.Sc., Ph.D. |
| Universitas    | Universitas Sebelas Maret                    |
| Semester       | Genap 2025/2026                              |

