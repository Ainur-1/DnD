import { ClickAwayListener, IconButton, Tooltip,  } from "@mui/material";

import { ReactNode, useState } from "react";

interface ClickableToolTipProps {
    title: string;
    icon: ReactNode;
}

export default function ClickableToolTip({title, icon,}: ClickableToolTipProps) {
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => setOpen(false);

    const handleTooltipOpen= () => setOpen(true);

    return <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={title}
      >
        <IconButton onClick={handleTooltipOpen}>
            {icon}
        </IconButton>
      </Tooltip>
  </ClickAwayListener>
}