
import React, { useState, useEffect } from 'react';

interface PriceAlertProps {
    ticker: string;
    currentPrice: number;
}

export const PriceAlert: React.FC<PriceAlertProps> = ({ ticker, currentPrice }) => {
    const [threshold, setThreshold] = useState<number | null>(null);
    const [alertTriggered, setAlertTriggered] = useState(false);

    useEffect(() => {
        if (threshold !== null && currentPrice > threshold && !alertTriggered) {
            setAlertTriggered(true);
            alert(`Alert: ${ticker} price crossed ${threshold}`);
        }
    }, [currentPrice, threshold, alertTriggered, ticker]);

    return (
        <div style={{ marginTop: '1rem' }}>
            <input
                type="number"
                placeholder="Set alert price"
                value={threshold || ''}
                onChange={(e) => setThreshold(Number(e.target.value))}
            />
            {alertTriggered && <span style={{ color: 'red' }}>Threshold crossed!</span>}
        </div>
    );
};
