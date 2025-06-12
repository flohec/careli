import React, {useState, useMemo, useEffect} from 'react'
import { Slider, Card, Switch, Button, Alert, notification } from 'antd'
import 'antd/dist/reset.css'
import ServerRackViewer from '../components/ServerRackViewer.jsx'
import {useUser} from "../context/UserContext.jsx";
import { Trash2 } from 'lucide-react';


export default function About() {
    const [errorMsg, setErrorMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(2)
    const [depth, setDepth] = useState(1)
    const [color, setColor] = useState('#808080')
    const [hasDoor, setHasDoor] = useState(false)
    const [shelfCount, setShelfCount] = useState(3) // Standardwert z. B. 3

    const volume = width * height * depth
    const doorArea = width * height
    const doorPrice = hasDoor ? doorArea * 200 : 0  // 200 €/m² als Beispiel
    const materialPrice = volume * 100
    const shelfArea = width * depth
    const shelfPrice = shelfCount * shelfArea * 100 // 100 €/m² pro Regalboden
    const totalPrice = Math.round((materialPrice + doorPrice + shelfPrice) * 100) / 100

    const { user } = useUser();

    const [configs, setConfigs] = useState([])

    const handleConfigSelect = (config) => {
        setWidth(config.width);
        setHeight(config.height);
        setDepth(config.depth);
        setColor(config.color);
        setHasDoor(config.has_door);
        setShelfCount(config.shelf_count);
    };

    const handleDeleteConfig = async (id) => {
        try {
            const response = await fetch(`/api/user/config/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            if (response.ok) {
                notification.success({ message: 'Gelöscht', description: 'Konfiguration gelöscht.' });
                loadConfigs();
            } else {
                notification.error({ message: 'Fehler', description: 'Löschen fehlgeschlagen.' });
            }
        } catch (err) {
            notification.error({ message: 'Fehler', description: 'Beim Löschen ist ein Fehler aufgetreten.' });
        }
    };


    const loadConfigs = () => {
        fetch('/api/user/configs', {
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        })
            .then(res => res.json())
            .then(data => setConfigs(data))
            .catch(() => setErrorMsg('Fehler beim Laden der Konfigurationen.'));
    };

    useEffect(() => {
        if (user) {
            loadConfigs();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) {
            setErrorMsg("Bitte melden Sie sich an, um zu speichern.");
            return;
        }

        try {
            const response = await fetch('/api/user/config/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    width,
                    height,
                    depth,
                    color,
                    has_door: hasDoor,
                    shelf_count: shelfCount,
                    total_price: totalPrice,
                })
            });

            if (response.ok) {
                notification.success({
                    message: 'Erfolg',
                    description: 'Konfiguration erfolgreich gespeichert!',
                });
                loadConfigs(); // ⬅️ Refresh configs after save
            } else {
                notification.error({
                    message: 'Fehler',
                    description: 'Speichern fehlgeschlagen.',
                });
            }
        } catch (err) {
            notification.error({
                message: 'Netzwerkfehler',
                description: 'Beim Speichern ist ein Fehler aufgetreten.',
            });
        }
    };


    return (
        <div style={{ padding: '0 5%' }}>
            {errorMsg && (
                <Alert
                    message="Fehler"
                    description={errorMsg}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setErrorMsg(null)}
                    style={{ marginBottom: 16 }}
                />
            )}

            {successMsg && (
                <Alert
                    message="Erfolg"
                    description={successMsg}
                    type="success"
                    showIcon
                    closable
                    onClose={() => setSuccessMsg(null)}
                    style={{ marginBottom: 16 }}
                />
            )}
            <h1 className="page-title">Serverschrank Konfigurator</h1>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
                {/* Konfigurator (75%) */}
                <div style={{ flex: 3 }}>
                    <Card
                        style={{
                            width: '100%',
                            padding: '24px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            borderRadius: '16px',
                            height: '100%', // wichtig für gleichmäßige Höhe
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {/* Sliders + Farbe */}
                            <div style={{width: '40%', paddingRight: '5%'}}>
                                <label>Breite (m)</label>
                                <Slider min={0.5} max={5} step={0.1} value={width} onChange={setWidth}/>

                                <label>Höhe (m)</label>
                                <Slider min={0.5} max={5} step={0.1} value={height} onChange={setHeight}/>

                                <label>Tiefe (m)</label>
                                <Slider min={0.5} max={5} step={0.1} value={depth} onChange={setDepth}/>

                                <label>Farbe</label><br/>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    style={{width: '100%', height: '40px', marginTop: '10px'}}
                                />

                                <label style={{marginTop: '16px', display: 'block'}}>Glastür</label>
                                <Switch
                                    checkedChildren="mit Tür"
                                    unCheckedChildren="ohne Tür"
                                    onChange={(checked) => setHasDoor(checked)}
                                    style={{marginBottom: '20px'}}
                                />

                                <label style={{marginTop: '16px', display: 'block'}}>Anzahl Regalböden</label>
                                <Slider min={0} max={10} step={1} value={shelfCount} onChange={setShelfCount}/>
                            </div>

                            {/* 3D Vorschau */}
                            <div style={{flex: 1}}>
                                <ServerRackViewer
                                    width={width}
                                    height={height}
                                    depth={depth}
                                    color={color}
                                    hasDoor={hasDoor}
                                    shelfCount={shelfCount}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Preisübersicht (25%) */}
                <div style={{ flex: 1, display: 'flex' }}>
                    <Card
                        title="Preisübersicht"
                        style={{
                            width: '100%',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            borderRadius: '16px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{marginBottom: '30px'}}>
                            <strong style={{fontSize: '15px'}}>Volumen:</strong>
                            <p style={{fontSize: '15px'}}> {volume.toFixed(2)} m³</p>
                            <strong style={{fontSize: '15px'}}>Materialpreis:</strong>
                            <p style={{fontSize: '15px'}}> {materialPrice.toFixed(2)} €
                            </p>
                            <strong style={{fontSize: '15px'}}>Glastüre:</strong>
                            <p style={{fontSize: '15px'}}>
                                 {hasDoor ? `${doorArea.toFixed(2)} m² × 200 € = ${doorPrice.toFixed(2)} €` : "0.00 €"}
                            </p>
                            <strong style={{fontSize: '15px'}}>Regalböden:</strong>
                            <p style={{fontSize: '15px'}}>
                                {shelfCount} × {shelfArea.toFixed(2)} m² × 100 €
                                = {shelfPrice.toFixed(2)} €</p>
                            <hr style={{margin: '16px 0'}}/>
                            <h3 style={{fontSize: '1.2rem'}}>Endpreis:</h3>
                            <h2 style={{color: '#1677ff', fontSize: '1.8rem', margin: 0}}>
                                {totalPrice.toFixed(2)} €
                            </h2>
                        </div>

                        <div style={{marginTop: '24px', display: 'flex', gap: '12px' }}>
                            <Button type="default" block onClick={handleSave}>Speichern</Button>
                            <Button type="primary" block>Zum Warenkorb</Button>
                        </div>
                    </Card>
                </div>
            </div>
            <div style={{ marginBottom: '5%'}}>
                <h2 className="page-title" style={{marginTop: '2%'}}>Gespeicherte Serverschränke</h2>

                {user === null ? (
                    <Alert
                        message="Anmeldung erforderlich"
                        description="Bitte melden Sie sich an, um Ihre gespeicherten Serverschränke sehen zu können."
                        type="info"
                        showIcon
                        style={{marginTop: '16px'}}
                    />
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {configs.length === 0 ? (
                            <Alert
                                message="Sie haben noch keine Konfigurationen gespeichert"
                                description="Bitte erstellen Sie eine neue Konfiguration, um sie hier zu sehen."
                                type="info"
                                showIcon
                                style={{marginTop: '16px'}}
                            />
                        ) : (
                            configs?.map((config, index) => (
                                <Card
                                    key={config.id}
                                    title={`Konfiguration #${index + 1}`}
                                    style={{ width: 324, cursor: 'pointer', position: 'relative' }}
                                    onClick={() => handleConfigSelect(config)}
                                >
                                    <Trash2
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents triggering `onClick` on the card
                                            handleDeleteConfig(config.id);
                                        }}
                                        style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer', color: 'red' }}
                                    />

                                    <p><strong>Größe:</strong> {config.width} × {config.height} × {config.depth} m</p>
                                    <p><strong>Farbe:</strong> <span style={{
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: config.color,
                                        border: '1px solid #ccc'
                                    }}/></p>
                                    <p><strong>Tür:</strong> {config.has_door ? 'Ja' : 'Nein'}</p>
                                    <p><strong>Regalböden:</strong> {config.shelf_count}</p>
                                    <p><strong>Preis:</strong> {config.total_price.toFixed(2)} €</p>
                                </Card>

                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
