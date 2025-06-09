<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;


class ArticleController extends Controller
{

    public function getAllArticles(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $category = $request->query('category');
        $search = $request->query('search');

        $articles = Article::query()
            ->search($search)
            ->category($category)
            ->paginate($perPage);

        return response()->json([
            'message' => 'Articles fetched successfully',
            'data' => $articles->items(),
            'pagination' => [
                'total' => $articles->total(),
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'per_page' => $articles->perPage(),
            ],
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'base_price' => 'required|string',
            'quantity' => 'nullable|integer',
            'height' => 'nullable|integer',
            'width' => 'nullable|integer',
            'depth' => 'nullable|integer',
            'weight' => 'nullable|integer',
            'category_id' => 'required|exists:article_categories,id',
            'file' => 'nullable|image|max:2048',
        ]);

        $article = Article::create($validated);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $filename = Str::random(10) . '.' . $extension;

            $originalPath = "public/articles/{$article->id}/original_$filename";
            $thumbPath = "public/articles/{$article->id}/thumb_$filename";

            Storage::put($originalPath, file_get_contents($file));

            $thumbnail = Image::make($file)->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            })->encode($extension);

            Storage::put($thumbPath, (string) $thumbnail);

            $article->filepath = Storage::url($originalPath);
            $article->thumbnail = Storage::url($thumbPath);
            $article->save();
        }

        return response()->json([
            'message' => 'Artikel gespeichert',
            'article' => $article
        ], 201);
    }

    public function update(Request $request, \App\Models\Article $article)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'base_price' => 'required|string',
            'quantity' => 'nullable|integer',
            'height' => 'nullable|integer',
            'width' => 'nullable|integer',
            'depth' => 'nullable|integer',
            'weight' => 'nullable|integer',
            'category_id' => 'required|exists:article_categories,id',
            'file' => 'nullable|image|max:2048',
        ]);

        $article->update($validated);

        if ($request->hasFile('file')) {
            // optional: altes Bild löschen
            if ($article->filepath) {
                $oldPath = str_replace('/storage/', 'public/', $article->filepath);
                Storage::delete($oldPath);
            }

            $file = $request->file('file');
            $filename = Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs("public/articles/{$article->id}", $filename);

            $article->filepath = Storage::url($path);
            $article->save();
        }

        return response()->json([
            'message' => 'Artikel erfolgreich aktualisiert.',
            'article' => $article
        ], 200);
    }

}
