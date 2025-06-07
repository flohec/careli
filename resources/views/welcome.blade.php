<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel + React</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
<div id="app"></div>
</body>
</html>
