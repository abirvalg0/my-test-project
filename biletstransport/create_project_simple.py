import os
import urllib.request

# Путь для создания проекта
PROJECT_DIR = "watertransportservice"

# Структура директорий
DIRECTORIES = [
    "",  # Корневой каталог
    "css",
    "js",
    "data",
    "img",
    "img/ships",
    "img/icons"
]

# Изображения для загрузки
IMAGES = {
    "img/ships/aurora.jpg": "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80",
    "img/ships/neva.jpg": "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80",
    "img/ships/baltic.jpg": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80",
    "img/ships/fontanka.jpg": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "img/hero-bg.jpg": "https://images.unsplash.com/photo-1545726435-2264def54e76?w=1500&q=80"
}

# Основные файлы
HTML_FILES = ["index.html", "tickets.html", "checkout.html", "confirmation.html"]
CSS_FILES = ["style.css", "responsive.css"]
JS_FILES = ["app.js", "firebase-config.js", "tickets.js", "checkout.js", "confirmation.js"]
DATA_FILES = ["ships.js"]

def create_directories():
    """Создает структуру каталогов"""
    print(f"Создание структуры проекта в {PROJECT_DIR}...")
    
    for directory in DIRECTORIES:
        path = os.path.join(PROJECT_DIR, directory)
        os.makedirs(path, exist_ok=True)
        print(f"Создана директория: {path}")

def download_images():
    """Загружает изображения"""
    print("Загрузка изображений...")
    
    for img_path, url in IMAGES.items():
        full_path = os.path.join(PROJECT_DIR, img_path)
        try:
            print(f"Загрузка {img_path}...")
            urllib.request.urlretrieve(url, full_path)
            print(f"Изображение сохранено: {full_path}")
        except Exception as e:
            print(f"Ошибка при загрузке {img_path}: {e}")

def create_empty_files():
    """Создает пустые файлы"""
    print("Создание файлов...")
    
    # HTML файлы
    for filename in HTML_FILES:
        path = os.path.join(PROJECT_DIR, filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(f"<!-- {filename} - Здесь будет HTML код -->")
        print(f"Создан файл: {path}")
    
    # CSS файлы
    for filename in CSS_FILES:
        path = os.path.join(PROJECT_DIR, "css", filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(f"/* {filename} - Здесь будут стили CSS */")
        print(f"Создан файл: {path}")
    
    # JS файлы
    for filename in JS_FILES:
        path = os.path.join(PROJECT_DIR, "js", filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(f"// {filename} - Здесь будет код JavaScript")
        print(f"Создан файл: {path}")
    
    # DATA файлы
    for filename in DATA_FILES:
        path = os.path.join(PROJECT_DIR, "data", filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(f"// {filename} - Здесь будут данные")
        print(f"Создан файл: {path}")
    
    # README.md
    readme_path = os.path.join(PROJECT_DIR, "README.md")
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write("# ВодныйТранспорт - Прототип сайта по продаже билетов на теплоходы\n\nСоздано с помощью скрипта Python.")
    print(f"Создан файл: {readme_path}")

def main():
    # Создаем директории
    create_directories()
    
    # Загружаем изображения
    download_images()
    
    # Создаем пустые файлы
    create_empty_files()
    
    print("\nПроект успешно создан!")
    print(f"Путь к проекту: {os.path.abspath(PROJECT_DIR)}")
    print("\nЧто делать дальше:")
    print("1. Перейдите в директорию проекта.")
    print("2. Скопируйте HTML, CSS и JavaScript код из сообщений Claude.")
    print("3. Откройте index.html в браузере для просмотра сайта.")

if __name__ == "__main__":
    main()