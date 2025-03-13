import os

# Укажите директорию, где находятся файлы
project_dir = 'C:/projects/my-test-project'

# Файлы, которые будут обновлены
files_to_update = [
    os.path.join(project_dir, 'index.html'),
    os.path.join(project_dir, 'libs/three/three.module.js'),
    os.path.join(project_dir, 'libs/three/OrbitControls.js')
]

# Функция для обновления содержимого файла
def update_file(file_path, new_content):
    try:
        with open(file_path, 'w') as file:
            file.write(new_content)
        print(f'Файл обновлен: {file_path}')
    except Exception as e:
        print(f'Ошибка при обновлении файла {file_path}: {e}')

# Пример изменения содержимого для `index.html`
def get_updated_html_content():
    # Пример нового содержимого index.html
    return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Example</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script type="module">
        import * as THREE from './libs/three/three.module.js';
        import { OrbitControls } from './libs/three/OrbitControls.js';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    </script>
</body>
</html>'''

# Основная функция, которая обновит все файлы
def update_files():
    # Обновим index.html
    update_file(files_to_update[0], get_updated_html_content())
    
    # Для других файлов, если нужно, можно сделать аналогично
    # Пример обновления других файлов:
    with open(files_to_update[1], 'w') as f:
        # Пример записи нового содержимого
        f.write('const updated_three_module_content = "new content";')
    
    with open(files_to_update[2], 'w') as f:
        # Пример записи нового содержимого
        f.write('const updated_orbit_controls_content = "new content";')

if __name__ == "__main__":
    update_files()
