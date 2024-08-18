import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/template/template.scss',
                'resources/template/template.js',
                'resources/template/js/sb-admin-2.js',
            ],
            refresh: true,
        }),
    ],
});
