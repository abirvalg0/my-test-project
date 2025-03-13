import os
import urllib.request

# Папка, в которую будут сохранены файлы
project_folder = "C:\projects\my-test-project"

# Список файлов для скачивания
files = {
    "three.module.js": "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js",
    "OrbitControls.js": "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js"
}

# Папка для хранения библиотеки Three.js
threejs_folder = os.path.join(project_folder, "libs", "three")

# Создаем необходимые директории
os.makedirs(threejs_folder, exist_ok=True)

# Функция для скачивания файлов
def download_file(url, save_path):
    try:
        print(f"Скачивание файла: {url}...")
        urllib.request.urlretrieve(url, save_path)
        print(f"Файл сохранен как {save_path}")
    except Exception as e:
        print(f"Ошибка при скачивании {url}: {e}")

# Скачиваем все файлы
for filename, url in files.items():
    file_path = os.path.join(threejs_folder, filename)
    download_file(url, file_path)

print("Все файлы скачаны и размещены в проекте.")
