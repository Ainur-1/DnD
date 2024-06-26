import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ItemIcon } from './item';

interface InventoryItemCardProps {
    title: string,
    count: number,
    iconUrl?: string,
    cardHeight: number
}

export default function InventoryItemCard({count, cardHeight, iconUrl, title}: InventoryItemCardProps) {
  return (
    <Card sx={{display: "flex", alignItems: "center", height: cardHeight}}>
        <ItemIcon height={cardHeight} iconUrl={iconUrl} />
        <CardContent sx={{
            display:"flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }}>
            <Typography component="div" variant="h5" sx={{
                fontSize: 13,
                marginBottom: 0.5,
                fontWeight: "bold"
            }}>
                {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{
                fontSize: 10
            }}>
                {count > 0 && `x ${count}`}
            </Typography>
        </CardContent>
    </Card>
  );
}
