<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\productoPDFController;
use Illuminate\Support\Facades\Cache;


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

Route::get('/', function () {
    return view('app');
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::get('/api/productos/{id}/exportar-pdf', [productoPDFController::class, 'exportarPDF']);

