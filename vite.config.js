import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',

                // 'resources/template/css/sb-admin-2.css',
                'resources/template/js/sb-admin-2.js',
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            $: '../template/vendor/jquery/jquery',
            jQuery: '../template/vendor/jquery/jquery',
            jquery: '../template/vendor/jquery/jquery',
        },
    },
});
