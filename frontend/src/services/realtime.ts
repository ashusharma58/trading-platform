
// WebSocket service with reconnection logic
export function createRealtimeConnection(url: string, onMessage: (data: any) => void) {
    let ws: WebSocket;
    let reconnectAttempts = 0;

    function connect() {
        ws = new WebSocket(url);
        ws.onopen = () => {
            console.log("WebSocket connected");
            reconnectAttempts = 0;
        };
        ws.onmessage = (event) => onMessage(JSON.parse(event.data));
        ws.onclose = () => {
            const timeout = Math.min(10000, 1000 * Math.pow(2, reconnectAttempts));
            console.warn(`WebSocket closed. Reconnecting in ${timeout}ms...`);
            setTimeout(connect, timeout);
            reconnectAttempts++;
        };
        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            ws.close();
        };
    }

    connect();
    return () => ws && ws.close();
}
