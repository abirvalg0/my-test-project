import os

def scan_all_folders(output_file="foldercontent.txt"):
    script_path = os.path.abspath(__file__)  # Полный путь к текущему скрипту
    script_dir = os.path.dirname(script_path)
    
    with open(output_file, "w", encoding="utf-8") as f:
        for root, _, files in os.walk(script_dir):
            for file in files:
                file_path = os.path.join(root, file)
                
                # Пропускаем:
                # 1. Сам файл-результат (output_file)
                # 2. Текущий скрипт (чтобы не копировать свой же код)
                if file == output_file or os.path.abspath(file_path) == script_path:
                    continue
                
                # Записываем разделитель и путь к файлу
                f.write("\n" + "=" * 50 + "\n")
                f.write(f"📂 Файл: {file_path.replace(script_dir, '')}\n")
                f.write("=" * 50 + "\n\n")
                
                # Пытаемся прочитать содержимое
                try:
                    with open(file_path, "r", encoding="utf-8") as content_file:
                        content = content_file.read()
                        f.write(f"{content}\n")
                except UnicodeDecodeError:
                    f.write("⚠ Файл не текстовый (бинарный/изображение)\n")
                except Exception as e:
                    f.write(f"⚠ Ошибка: {e}\n")
                
                # Добавляем отступ после файла
                f.write("\n" + "-" * 50 + "\n")

    print(f"✅ Готово! Результат в '{output_file}'")

scan_all_folders()