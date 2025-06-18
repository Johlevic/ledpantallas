<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Cache;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/pdf-presupuesto', function () {
    $data = request()->all();

    return view('pdf.presupuesto', $data); // Vista Blade con datos
});
Route::get('/pdf-download/{key}', function ($key) {
    $pdfContent = Cache::get($key);
    if (!$pdfContent) {
        abort(404);
    }
    return response($pdfContent)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment');
})->name('pdf.download');
