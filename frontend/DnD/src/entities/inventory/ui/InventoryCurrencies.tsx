import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import TollTwoToneIcon from '@mui/icons-material/TollTwoTone';
import ClickableToolTip from "@/shared/ui/ClickableToolTip";
import { tryParseNumber } from "@/shared/utils/parsers";
import { Currency as CurrencyType } from "@/shared/types/domainTypes";

interface CurrencyProps {
    color: string;
    label: string;
    value: number | undefined;
    onChange?: (value?: number | undefined) => void;
}

function Currency({label, value, onChange, color}: CurrencyProps) {

    const onCurrencyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const strValue = e.target.value.trim();
        if (strValue.length == 0) {
            onChange?.();
            return;
        }

        const { success, value } = tryParseNumber(strValue);
        if (!success) {
            onChange?.();
            return;
        }

        const floored = Math.floor(value!);
        onChange?.(floored < 0 ? 0 : floored);
    };

    return  <Box display="flex" justifyContent="space-between">
        <Container>
            <ClickableToolTip title={label} icon={<TollTwoToneIcon sx={{color}} />} />
        </Container>
        <TextField 
            error={value == undefined || value < 0}
            value={value}
            onChange={onCurrencyChange}
        />
    </Box>
}

interface InventoryCurrenciesProps {
    gold: number | undefined;
    silver: number | undefined;
    electrum: number | undefined;
    platinum: number | undefined;
    copper: number | undefined;
    setCurrency?: (name: CurrencyType, value: number | undefined) => void
}

export default function InventoryCurrencies({gold,
    silver,
    electrum,
    platinum,
    copper,
    setCurrency,
}: InventoryCurrenciesProps) {

    return <Stack alignItems="flex-start" justifyContent="center">
        <Typography component="div" fontWeight="bold" textAlign="end" margin="dense">
            Кошель
        </Typography>
        <Currency color="#b87333" label="Медь" value={copper} onChange={(val) => setCurrency?.("copper", val)} />
        <Currency color="#c0c0c0" label="Серебро" value={silver} onChange={(val) => setCurrency?.("silver", val)} />
        <Currency color="#e7c697" label="Электрум" value={electrum} onChange={(val) => setCurrency?.("electrum", val)} />
        <Currency color="#FFD700" label="Золото" value={gold} onChange={(val) => setCurrency?.("gold", val)} />
        <Currency color="#8893b9" label="Платина" value={platinum} onChange={(val) => setCurrency?.("platinum", val)} />
    </Stack>
}