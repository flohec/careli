<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ServerRack;
use App\Models\ServerRackConfig;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'article_id' => 'required|exists:articles,id',
            'quantity' => 'required|integer|min:1',
            'type' => 'required|in:article,config',
        ]);


        ShoppingCart::create([
            'user_id' => auth()->id(),
            'cartable_id' => $validated['article_id'],
            'cartable_type' => $validated['type'] === 'article' ? Article::class : ServerRackConfig::class,
            'quantity' => $validated['quantity'],
        ]);

        return response()->json(['message' => 'Artikel zum Warenkorb hinzugefügt.']);
    }

    public function storeConfig(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:config',
            'quantity' => 'required|integer|min:1',
            'config.width' => 'required|numeric',
            'config.height' => 'required|numeric',
            'config.depth' => 'required|numeric',
            'config.color' => 'required|string',
            'config.has_door' => 'required|boolean',
            'config.shelf_count' => 'required|integer|min:0',
            'config.total_price' => 'required|numeric',
        ]);

        // 1. Konfiguration speichern
        $config = \App\Models\ServerRackConfig::create([
            'user_id' => auth()->id(),
            'width' => $request->config['width'],
            'height' => $request->config['height'],
            'depth' => $request->config['depth'],
            'color' => $request->config['color'],
            'has_door' => $request->config['has_door'],
            'shelf_count' => $request->config['shelf_count'],
            'total_price' => $request->config['total_price'],
        ]);

        // 2. In den Warenkorb
        \App\Models\ShoppingCart::create([
            'user_id' => auth()->id(),
            'cartable_id' => $config->id,
            'cartable_type' => \App\Models\ServerRackConfig::class,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Konfiguration wurde dem Warenkorb hinzugefügt.']);
    }

    public function getCart()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Nicht authentifiziert.'], 401);
        }

        $cartItems = ShoppingCart::with(['cartable'])
            ->where('user_id', $user->id)
            ->get();

        return response()->json([
            'items' => $cartItems,
        ]);
    }

}
