<?php

namespace App\Http\Controllers;

use App\Models\ServerRackConfig;
use Illuminate\Http\Request;

class ServerRackConfigController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'width' => 'required|numeric',
            'height' => 'required|numeric',
            'depth' => 'required|numeric',
            'color' => 'required|string',
            'has_door' => 'required|boolean',
            'shelf_count' => 'required|integer',
            'total_price' => 'required|numeric',
        ]);

        $validated['user_id'] = auth()->id();

        $config = ServerRackConfig::create($validated);

        return response()->json(['message' => 'Konfiguration gespeichert.', 'data' => $config], 201);
    }

    // app/Http/Controllers/ServerRackConfigController.php
    public function show(Request $request)
    {
        return response()->json(
            $request->user()->serverRackConfigs()->get()
        );
    }

    public function destroy($id)
    {
        $config = ServerRackConfig::findOrFail($id);

        if ($config->user_id !== auth()->id()) {
            return response()->json(['message' => 'Nicht autorisiert.'], 403);
        }

        $config->delete();

        return response()->json(['message' => 'Konfiguration gelöscht.'], 200);
    }


}
