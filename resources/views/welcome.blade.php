<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">   

        <title>{{ config('app.name', 'Kanban') }}</title>

        <link href="/css/app.css" rel="stylesheet">


        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>
        </script>

        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
