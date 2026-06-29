import os
import time
import uuid

import numpy as np
from flask import jsonify, render_template, request, send_from_directory, url_for
from werkzeug.utils import secure_filename

from core.compressor import ImageCompressor
from core.metrics import compression_percentage, compression_ratio, file_size, mse, psnr


ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "bmp", "webp"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def format_bytes(size):
    units = ["B", "KB", "MB", "GB"]
    value = float(size)
    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.1f} {unit}" if unit != "B" else f"{int(value)} B"
        value /= 1024


def make_job_paths(app, filename):
    job_id = uuid.uuid4().hex
    upload_dir = os.path.join(app.instance_path, "uploads")
    output_dir = os.path.join(app.instance_path, "compressed")
    data_dir = os.path.join(app.instance_path, "data")
    os.makedirs(upload_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(data_dir, exist_ok=True)

    safe_name = secure_filename(filename)
    stem = os.path.splitext(safe_name)[0] or "image"
    original_path = os.path.join(upload_dir, f"{job_id}_{safe_name}")
    compressed_name = f"{job_id}_{stem}_pca.png"
    data_name = f"{job_id}_{stem}_pca.npy"

    return {
        "job_id": job_id,
        "original_path": original_path,
        "compressed_path": os.path.join(output_dir, compressed_name),
        "data_path": os.path.join(data_dir, data_name),
        "compressed_name": compressed_name,
        "data_name": data_name,
    }


def register_routes(app):
    @app.route("/")
    def index():
        return render_template("index.html", title="PCA Image Compressor")

    @app.post("/api/compress")
    def compress():
        uploaded_file = request.files.get("image")
        if uploaded_file is None or uploaded_file.filename == "":
            return jsonify({"error": "Pilih gambar terlebih dahulu."}), 400

        if not allowed_file(uploaded_file.filename):
            return jsonify({"error": "Format file tidak didukung."}), 400

        try:
            k = int(request.form.get("k", 150))
        except ValueError:
            return jsonify({"error": "Nilai k harus berupa angka."}), 400

        k = max(1, min(k, 300))
        paths = make_job_paths(app, uploaded_file.filename)
        uploaded_file.save(paths["original_path"])

        started_at = time.perf_counter()
        try:
            compressor = ImageCompressor(k)
            _, retained_variance, original_array, compressed_array = compressor.compress_image(
                paths["original_path"],
                paths["compressed_path"],
            )
            np.save(paths["data_path"], compressed_array)
        except Exception as exc:
            return jsonify({"error": f"Gagal memproses gambar: {exc}"}), 500

        runtime = time.perf_counter() - started_at
        original_size = file_size(paths["original_path"])
        compressed_size = file_size(paths["compressed_path"])
        height, width = original_array.shape[:2]

        return jsonify({
            "image_url": url_for("compressed_file", filename=paths["compressed_name"]),
            "download_url": url_for("compressed_file", filename=paths["compressed_name"], download="1"),
            "data_url": url_for("data_file", filename=paths["data_name"], download="1"),
            "filename": uploaded_file.filename,
            "k": k,
            "width": width,
            "height": height,
            "channels": original_array.shape[2] if original_array.ndim == 3 else 1,
            "runtime_seconds": runtime,
            "runtime_label": f"{runtime:.2f} s",
            "retained_variance": retained_variance,
            "retained_variance_label": f"{retained_variance:.2f}%",
            "mse": float(mse(original_array, compressed_array)),
            "psnr": float(psnr(original_array, compressed_array)),
            "compression_ratio": float(compression_ratio(paths["original_path"], paths["compressed_path"])),
            "compression_percentage": float(compression_percentage(paths["original_path"], paths["compressed_path"])),
            "compression_ratio_label": f"{compression_ratio(paths['original_path'], paths['compressed_path']):.2f} : 1",
            "compression_percentage_label": f"{compression_percentage(paths['original_path'], paths['compressed_path']):.1f}%",
            "original_size": original_size,
            "compressed_size": compressed_size,
            "original_size_label": format_bytes(original_size),
            "compressed_size_label": format_bytes(compressed_size),
        })

    @app.get("/outputs/<path:filename>")
    def compressed_file(filename):
        return send_from_directory(
            os.path.join(app.instance_path, "compressed"),
            filename,
            as_attachment=request.args.get("download") == "1",
        )

    @app.get("/data/<path:filename>")
    def data_file(filename):
        return send_from_directory(
            os.path.join(app.instance_path, "data"),
            filename,
            as_attachment=request.args.get("download") == "1",
        )
